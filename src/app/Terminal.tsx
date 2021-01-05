import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import dfstyles from '../styles/dfstyles';
import Typist from 'react-typist';
import TerminalEmitter, {
  TerminalEvent,
  TerminalTextStyle,
} from '../utils/TerminalEmitter';
import _ from 'lodash';
import {
  Green,
  BashPrompt,
  JSPrompt,
  Blue,
  Sub,
  White,
  Red,
  Invisible,
  BasicLink,
} from '../components/Text';
import { isFirefox } from '../utils/Utils';
import { TerminalPromptType } from '../_types/darkforest/app/board/utils/TerminalTypes';

const TerminalContainer = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  overflow: scroll;
  white-space: pre-wrap;
  overflow-wrap: break-word;

  // & .myinput {
  //   &:focus {
  //     background: ${dfstyles.colors.backgroundlight} !important;
  //   }
  // }

  & span {
    word-break: break-all;
  }

  & div.Typist {
    display: inline;
  }

  @media (max-width: ${dfstyles.screenSizeS}) {
    font-size: ${dfstyles.fontSizeXS};
  }
`;
type TypistProps = {
  startDelay: number;
  avgTypingDelay: number;
  stdTypingDelay: number;
  cursor: { show: boolean };
};
type FragmentData = {
  fragment: React.ReactNode;
  skipTyping: boolean;
  typistProps: TypistProps;
  id: number;
};

export const defaultTypistProps = {
  startDelay: 0,
  avgTypingDelay: 0,
  stdTypingDelay: 0,
  cursor: { show: false },
};

export const shellProps = defaultTypistProps;

// export const shellProps = {
//   startDelay: 125,
//   avgTypingDelay: 75,
//   stdTypingDelay: 35,
//   cursor: { show: false },
// };

const ENTER_KEY_CODE = 13;
const UP_ARROW_KEY_CODE = 38;

function TerminalFragment({
  fragment,
  skipAllTyping,
  idToType,
  onCharTyped,
  onDone,
}: {
  fragment: FragmentData;
  skipAllTyping: boolean;
  idToType: number;
  onCharTyped: () => void;
  onDone: (nextId: number) => void;
}) {
  if (fragment.id < idToType) {
    return <span>{fragment.fragment}</span>;
  }

  if (fragment.id === idToType) {
    if (!fragment.skipTyping && !skipAllTyping) {
      return (
        <Typist
          onCharacterTyped={onCharTyped}
          onTypingDone={() => {
            onDone(fragment.id + 1);
          }}
          {...fragment.typistProps}
        >
          {fragment.fragment}
        </Typist>
      );
    } else {
      onDone(fragment.id + 1);
      return <span></span>;
    }
  }

  return <span></span>;
}

let fragmentId = 0;

export default function Terminal() {
  const ref = useRef(document.createElement('div'));
  const inputRef = useRef(document.createElement('textarea'));
  const heightMeasureRef = useRef(document.createElement('textarea'));

  const [prompt, setPrompt] = useState<TerminalPromptType>(
    TerminalPromptType.BASH
  );
  const [fragments, setFragments] = useState<FragmentData[]>([]);
  const [isTyping, setIsTyping] = useState<boolean>(true);
  const [alwaysFocusInput, setAlwaysFocusInput] = useState<boolean>(true);
  const [userInputEnabled, setUserInputEnabled] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [idToType, setIdToType] = useState<number>(0);
  const [inputHeight, setInputHeight] = useState<number>(1);

  const [previousInput, setPreviousInput] = useState<string>('');

  const [skipAllTyping, setSkipAllTyping] = useState<boolean>(false);

  const newline = () => {
    setFragments((lines) => {
      return [
        ...lines.slice(-199),
        {
          fragment: <br />,
          skipTyping: true,
          typistProps: defaultTypistProps,
          id: fragmentId++,
        },
      ];
    });
  };

  const print = (
    str: string,
    style: TerminalTextStyle = TerminalTextStyle.Default,
    skipTyping = false,
    onClick: (() => void) | undefined = undefined,
    typistProps: TypistProps | undefined = undefined,
    recordAsInput: string | null = null
  ) => {
    setFragments((fragments) => {
      let fragment: React.ReactNode;
      let innerFragment: React.ReactNode = <span>{str}</span>;

      if (onClick !== undefined) {
        innerFragment = (
          <BasicLink onClick={onClick}>{innerFragment}</BasicLink>
        );
      }

      switch (style) {
        case TerminalTextStyle.Green:
          fragment = <Green>{innerFragment}</Green>;
          break;
        case TerminalTextStyle.Blue:
          fragment = <Blue>{innerFragment}</Blue>;
          break;
        case TerminalTextStyle.Sub:
          fragment = <Sub>{innerFragment}</Sub>;
          break;
        case TerminalTextStyle.White:
          fragment = <White>{innerFragment}</White>;
          break;
        case TerminalTextStyle.Red:
          fragment = <Red>{innerFragment}</Red>;
          break;
        case TerminalTextStyle.Invisible:
          fragment = <Invisible>{innerFragment}</Invisible>;
          break;
        case TerminalTextStyle.Underline:
          fragment = (
            <Sub>
              <u>{innerFragment}</u>
            </Sub>
          ); // only sub u for now
          break;
        default:
          fragment = <Sub>{innerFragment}</Sub>;
      }
      if (recordAsInput !== null) {
        setPreviousInput(recordAsInput);
      }
      return [
        ...fragments.slice(-199),
        {
          fragment,
          skipTyping,
          typistProps: typistProps || defaultTypistProps,
          id: fragmentId++,
        },
      ];
    });
  };

  const onKeyUp = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    (async () => {
      if (e.keyCode === ENTER_KEY_CODE && !e.shiftKey && !isTyping) {
        e.preventDefault();
        if (prompt === TerminalPromptType.BASH) {
          print('$ ', TerminalTextStyle.Green, true);
        } else if (prompt === TerminalPromptType.JS) {
          print('> ', TerminalTextStyle.Blue, true);
        }
        print(inputText, TerminalTextStyle.White, true);
        newline();
        TerminalEmitter.getInstance().emit(
          TerminalEvent.UserEnteredInput,
          inputText
        );
        setPreviousInput(inputText);
        setInputHeight(1);
        setInputText('');
      } else if (
        e.keyCode === UP_ARROW_KEY_CODE &&
        inputText === '' &&
        previousInput !== '' &&
        !isTyping
      ) {
        setInputHeight(1);
        setInputText(previousInput);
      }
    })();
  };

  const preventEnterDefault = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    // TODO: this prevents users from doing shift-enter on firefox
    // if it's attached to onKeyDown
    if (e.keyCode === ENTER_KEY_CODE && !e.shiftKey && !isTyping) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    const terminalEmitter = TerminalEmitter.getInstance();

    terminalEmitter
      .on(
        TerminalEvent.Print,
        (
          str: string,
          style?: TerminalTextStyle,
          skipTyping?: boolean,
          typistProps?: TypistProps,
          recordAsInput?: string | null
        ) => {
          print(str, style, skipTyping, undefined, typistProps, recordAsInput);
        }
      )
      .on(
        TerminalEvent.PrintLink,
        (
          str: string,
          onClick: () => void,
          style: TerminalTextStyle,
          skipTyping: boolean
        ) => {
          print(str, style, skipTyping, onClick);
        }
      )
      .on(TerminalEvent.Newline, newline)
      .on(TerminalEvent.EnableUserInput, () => {
        setUserInputEnabled(true);
      })
      .on(TerminalEvent.DisableUserInput, () => {
        setUserInputEnabled(false);
      })
      .on(TerminalEvent.SkipAllTyping, () => {
        setSkipAllTyping(true);
      })
      .on(TerminalEvent.AllowUnfocusInput, () => {
        setAlwaysFocusInput(false);
      })
      .on(TerminalEvent.ChangePromptType, (promptType: TerminalPromptType) => {
        setPrompt(promptType);
      });
  }, []);

  useEffect(() => {
    if (userInputEnabled) {
      inputRef.current.focus();
    }
  }, [userInputEnabled]);

  const scrollToEnd = () => {
    const el = ref.current;
    el.scrollTo(0, el.scrollHeight);
  };

  useEffect(() => {
    setIsTyping(idToType < fragmentId);
    scrollToEnd();
  }, [idToType, fragments]);

  useEffect(() => {
    setInputHeight(heightMeasureRef.current.scrollHeight);
  }, [inputText]);

  return (
    <TerminalContainer ref={ref}>
      {fragments.map((fragment) => (
        <span key={fragment.id}>
          <TerminalFragment
            fragment={fragment}
            skipAllTyping={skipAllTyping}
            idToType={idToType}
            onDone={setIdToType}
            onCharTyped={scrollToEnd}
          />
        </span>
      ))}

      {/* User input prompt */}

      <span
        style={{
          opacity: userInputEnabled ? 1 : 0,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
        onClick={() => {
          if (userInputEnabled && !isTyping) inputRef.current.focus();
        }}
      >
        {prompt === TerminalPromptType.BASH ? <BashPrompt /> : <JSPrompt />}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '100%',
          }}
        >
          <textarea
            style={{
              background: 'none',
              outline: 'none',
              border: 'none',
              color: dfstyles.colors.text,
              height: `${inputHeight}px`,
              resize: 'none',
              flexGrow: 1,
            }}
            className={'myinput'}
            ref={inputRef}
            onBlur={() => {
              if (userInputEnabled && alwaysFocusInput)
                inputRef.current.focus();
            }}
            onFocus={() => {
              if (!userInputEnabled && alwaysFocusInput)
                inputRef.current.blur();
            }}
            onKeyUp={onKeyUp}
            onKeyDown={preventEnterDefault}
            onKeyPress={isFirefox() ? () => {} : preventEnterDefault}
            value={inputText}
            onChange={(e) => {
              if (userInputEnabled) {
                setInputText(e.target.value);
              }
            }}
          />
          {/* "ghost" textarea used to measure the scrollHeight of the input */}
          <textarea
            style={{
              background: 'none',
              outline: 'none',
              border: 'none',
              color: dfstyles.colors.text,
              // caretColor: 'transparent',
              height: `0px`,
              resize: 'none',
              flexGrow: 0,
            }}
            className={'myinput'}
            ref={heightMeasureRef}
            // to prevent a react warning, we pass a no-op function here
            onChange={() => {}}
            value={inputText}
          />
        </div>
      </span>
    </TerminalContainer>
  );
}
