import React, { useCallback, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { Input } from './Input';

const DEFAULT_UNFOCUSED_WIDTH = '50px';
const DEFAULT_FOCUSED_WIDTH = '150px';

export function TextPreview({
  text,
  unFocusedWidth,
  focusedWidth,
  style,
}: {
  text?: string;
  unFocusedWidth?: string;
  focusedWidth?: string;
  maxLength?: number;
  style?: React.CSSProperties;
}) {
  const [isTextBox, setIsTextbox] = useState(false);
  const [inputRef, setInputRef] = useState<HTMLInputElement | null>(null);

  const onClick = useCallback((e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsTextbox(true);
  }, []);

  const onBlur = useCallback(() => {
    setIsTextbox(false);
    setInputRef(null);
  }, []);

  useEffect(() => {
    if (inputRef) {
      inputRef.focus();
      inputRef.select();
    }
  }, [inputRef]);

  if (isTextBox) {
    return (
      <InputContainer style={style} width={focusedWidth || DEFAULT_FOCUSED_WIDTH}>
        <PreviewTextInput
          value={text || ''}
          onChange={() => {}}
          onBlur={onBlur}
          ref={(element: HTMLInputElement) => setInputRef(element)}
        />
      </InputContainer>
    );
  }

  return (
    <ShortenedText
      style={style}
      width={unFocusedWidth || DEFAULT_UNFOCUSED_WIDTH}
      onClick={onClick}
    >
      {text || ''}
    </ShortenedText>
  );
}

const ShortenedText = styled.span`
  ${({ width }: { width: string }) => css`
    cursor: zoom-in;
    display: inline-block;
    width: ${width};
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
  `}
`;

const InputContainer = styled.div`
  ${({ width }: { width: string }) => css`
    display: inline-block;
    width: ${width};
  `}
`;

const PreviewTextInput = styled(Input)`
  padding: 2px 4px;
  box-sizing: border-box;
  display: inline-block;
  width: 100%;
`;
