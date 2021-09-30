import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { Hook } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import {
  AlignCenterHorizontally,
  CenteredText,
  EmSpacer,
  ShortcutKeyDown,
  Spacer,
  Truncate,
} from '../Components/CoreUI';
import { PaneProps } from '../Components/GameWindowComponents';
import WindowManager from '../Game/WindowManager';
import dfstyles from '../Styles/dfstyles';
import { GameWindowZIndex } from '../Utils/constants';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { useOnUp } from '../Utils/KeyEmitters';
import { MODAL_BACK_SHORTCUT } from '../Utils/ShortcutConstants';
import { DFErrorBoundary } from './DFErrorBoundary';

export type ModalHook = Hook<boolean>;

export const enum ModalName {
  Help,
  PlanetDetails,
  Leaderboard,
  PlanetDex,
  UpgradeDetails,
  TwitterVerify,
  Broadcast,
  Hats,
  Settings,
  YourArtifacts,
  ManageArtifacts,
  Plugins,
  WithdrawSilver,

  ArtifactConversation,
  ArtifactDetails,
  MapShare,
  ManageAccount,
  Onboarding,
  Private,
}

function InformationSection({
  children,
  hide,
  style,
}: {
  children: React.ReactNode;
  hide: () => void;
  style?: React.CSSProperties;
}) {
  return (
    <InfoSectionContainer style={style}>
      <InfoSectionContent>
        {children}
        <BtnContainer>
          <Btn onClick={hide}>close help</Btn>
        </BtnContainer>
      </InfoSectionContent>
    </InfoSectionContainer>
  );
}

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
`;

const InfoSectionContainer = styled.div`
  padding: 8px;
  width: 400px;
  text-align: justify;
`;

const InfoSectionContent = styled.div`
  width: 100%;
  max-width: 100%;
  border-radius: 2px;
  padding: 8px;
  color: ${dfstyles.colors.subtext};
`;

const ModalButtonsContainer = styled.div`
  ${({ minimized }: { minimized: boolean }) => css`
    ${minimized
      ? css`
          margin-left: 8px;
        `
      : css``}

    flex-grow: 0;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  `}
`;

/**
 * Contains the header, and the content of this modal.
 */
const Modal = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: ${GameWindowZIndex.Modal};
  width: fit-content;
  height: fit-content;
  background: ${dfstyles.colors.background};
  border-radius: ${dfstyles.borderRadius};
  border: 1px solid ${dfstyles.colors.borderDark};
  color: ${dfstyles.colors.text};
`;

const Title = styled(Truncate)`
  flex-grow: 1;
  text-align: left;
`;

/**
 * Thet title bar contains the close button, the title,
 * and allows the user to drag the window around.
 */
const TitleBar = styled.div`
  ${({ minimized }: { minimized: boolean }) => css`
    user-select: none;
    line-height: 1.5em;
    width: 100%;
    cursor: grab;
    padding: 8px;
    border-bottom: 1px solid ${minimized ? 'transparent' : dfstyles.colors.borderDark};
    display: flex;
    justify-content: center;
    align-items: flex-end;
  `}
`;

type Coords = { x: number; y: number };

function clipX(x: number, width: number): number {
  let newX = x;
  if (newX + width > window.innerWidth) {
    newX = window.innerWidth - width;
  } else if (newX < 0) newX = 0;
  return newX;
}

const clipY = (y: number, height: number): number => {
  let newY = y;
  if (newY + height > window.innerHeight) {
    newY = window.innerHeight - height;
  } else if (newY < 0) newY = 0;
  return newY;
};

export type ModalProps = PaneProps & {
  title: string | React.ReactNode;
  hook: Hook<boolean>;
  name?: ModalName;
  hideClose?: boolean;
  style?: React.CSSProperties;
  noPadding?: boolean;
  helpContent?: () => React.ReactNode;
  width?: string;
  borderColor?: string;
  initialPosition?: {
    x: number;
    y: number;
  };
};

/**
 * A modal has a {@code content}, and also optionally many {@link ModalFrames} pushed on top of it.
 */
export interface ModalFrame {
  title: string;
  element: () => React.ReactElement;
  helpContent?: React.ReactElement;
}

/**
 * @todo Add things like open, close, set position, etc. Get rid of {@code ModalHook}.
 */
export interface ModalHandle {
  push(frame: ModalFrame): void;
  popAll(): void;
  pop(): void;
  id: string;
  isActive: boolean;
}

export function ModalPane({
  children,
  title,
  hook: [visible, setVisible],
  hideClose,
  style,
  helpContent,
  width,
  borderColor,
  initialPosition,
}: ModalProps) {
  const windowManager = WindowManager.getInstance();
  const activeWindowId = useEmitterValue(windowManager.activeWindowId$, undefined);
  const [windowId] = useState(() => uuidv4());
  const isActive = windowId === activeWindowId;
  const [frames, setFrames] = useState<ModalFrame[]>([]);
  const [renderedFrame, setRenderedFrame] = useState<undefined | React.ReactElement>();
  const [renderedFrameHelp, setRenderedFrameHelp] = useState<undefined | React.ReactElement>();
  const [minimized, setMinimized] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [delCoords, setDelCoords] = useState<Coords | null>(null);
  const [mousedownCoords, setMousedownCoords] = useState<Coords | null>(null);
  const [styleClicking, setStyleClicking] = useState<boolean>(false);
  const [clicking, setClicking] = useState<boolean>(false);
  const [zIndex, setZIndex] = useState<number>(GameWindowZIndex.Modal);
  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const headerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const push = useCallback(() => {
    windowManager.activeWindowId$.publish(windowId);
    setZIndex(windowManager.getIndex());
  }, [windowManager, windowId]);
  const [hasSetInitialPosition, setHasSetInitialPosition] = useState(false);
  const [gameSize, setGameSize] =
    useState<
      | {
          width: number;
          height: number;
        }
      | undefined
    >();
  const [showingInformationSection, setShowingInformationSection] = useState(false);
  const onMouseDown = useCallback(
    (e: React.SyntheticEvent) => {
      push();
      e.stopPropagation();
    },
    [push]
  );

  const showingHelp = helpContent !== undefined && showingInformationSection;
  const currentWidth = minimized || showingHelp ? '' : width;

  const api: ModalHandle = useMemo<ModalHandle>(
    () => ({
      pop: () => {
        setFrames((frames) => {
          if (frames.length === 0) return frames;
          frames = [...frames];
          frames.pop();
          return frames;
        });
      },
      push: (args: ModalFrame) => {
        setFrames((frames) => {
          frames = [...frames];
          frames.push(args);

          return frames;
        });
      },
      popAll: () => {
        setFrames([]);
      },
      id: windowId,
      isActive,
    }),
    [windowId, isActive]
  );

  useEffect(() => {
    const onResize = () => {
      setGameSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // attach mouse down handler
  useEffect(() => {
    if (!coords) return;

    const myCurrent = headerRef.current;

    const doMouseDown = (e: MouseEvent) => {
      setMousedownCoords({ x: e.clientX, y: e.clientY });
      setCoords({
        x: containerRef.current.offsetLeft,
        y: containerRef.current.offsetTop,
      });
      setClicking(true);
    };

    myCurrent.addEventListener('mousedown', doMouseDown);

    return () => {
      myCurrent.removeEventListener('mousedown', doMouseDown);
    };
  }, [coords, containerRef]);

  // attach mousemove handler
  useEffect(() => {
    const doMouseMove = (e: MouseEvent) => {
      if (!mousedownCoords) return; // is null, something messed up
      if (!visible || !clicking) return;

      const delX = e.clientX - mousedownCoords.x;
      const delY = e.clientY - mousedownCoords.y;
      setDelCoords({ x: delX, y: delY });
    };

    if (visible && clicking) {
      window.addEventListener('mousemove', doMouseMove);
    }
    return () => {
      window.removeEventListener('mousemove', doMouseMove);
    };
  }, [visible, clicking, mousedownCoords]);

  // attach mouseup handler
  useEffect(() => {
    if (!mousedownCoords || !coords) return;

    const doMouseUp = (e: MouseEvent) => {
      const delX = e.clientX - mousedownCoords.x;
      const delY = e.clientY - mousedownCoords.y;

      const newCoords = {
        x: clipX(coords.x + delX, containerRef.current.offsetWidth),
        y: clipY(coords.y + delY, containerRef.current.offsetHeight),
      };

      setMousedownCoords(null);
      setDelCoords(null);
      setCoords(newCoords);
      setClicking(false);
    };

    if (visible && clicking) {
      window.addEventListener('mouseleave', doMouseUp);
      window.addEventListener('mouseup', doMouseUp);
    }
    return () => {
      window.removeEventListener('mouseup', doMouseUp);
      window.removeEventListener('mouseleave', doMouseUp);
    };
  }, [visible, clicking, mousedownCoords, coords]);

  // inits at center, or provided initial coordinates
  useLayoutEffect(() => {
    if (hasSetInitialPosition) return;
    setHasSetInitialPosition(true);

    if (initialPosition) {
      setCoords(initialPosition);
    } else {
      const newX = 0.5 * (window.innerWidth - containerRef.current.offsetWidth);
      const newY = 0.5 * (window.innerHeight - containerRef.current.offsetHeight);
      setCoords({ x: newX, y: newY });
    }

    push();
  }, [containerRef, windowManager, push, initialPosition, hasSetInitialPosition]);

  // push to top
  useLayoutEffect(() => {
    push();
  }, [visible, windowManager, push]);

  // move the window based on its coordinates, the amount the mouse
  // has moved since it started dragging this window, and finally
  // the size of the game screen.
  useLayoutEffect(() => {
    if (!coords) return;
    const delX = delCoords ? delCoords.x : 0;
    const delY = delCoords ? delCoords.y : 0;

    const left = clipX(coords.x + delX, containerRef.current.offsetWidth) + 'px';
    const top = clipY(coords.y + delY, containerRef.current.offsetHeight) + 'px';

    if (containerRef.current) {
      containerRef.current.style.left = left;
      containerRef.current.style.top = top;
    }
  }, [
    coords,
    delCoords,
    containerRef,
    gameSize,
    containerRef.current.offsetWidth,
    containerRef.current.offsetHeight,
  ]);

  useOnUp(MODAL_BACK_SHORTCUT, () => {
    if (isActive) {
      api.pop();
    }
  });

  useEffect(() => {
    setTimeout(() => {
      const topFrame = frames[frames.length - 1];
      setRenderedFrame((topFrame && topFrame.element()) || undefined);
      setRenderedFrameHelp((topFrame && topFrame.helpContent) || undefined);
    }, 0);
  }, [frames, api]);

  const content = (
    <>
      {visible && !minimized && !showingHelp && renderedFrame}
      <div
        style={{
          display: renderedFrame || !visible || minimized || showingHelp ? 'none' : undefined,
        }}
      >
        {typeof children === 'function' ? children(api) : children}
      </div>
    </>
  );

  function getFrameTitle(args?: ModalFrame) {
    if (!args) return undefined;
    return `${args.title}`;
  }

  const modalTitleElement = typeof title === 'string' ? title : title(frames.length > 0);
  const allSubModalTitleElements = [];

  if (frames.length > 0) {
    allSubModalTitleElements.push(getFrameTitle(frames[frames.length - 1]));
  }

  return (
    <Modal
      style={{
        ...style,
        zIndex: visible ? zIndex : -1000,
        width: currentWidth,
        maxWidth: currentWidth,
        border: borderColor !== undefined ? `1px solid ${borderColor}` : undefined,
      }}
      ref={containerRef}
      onMouseDown={onMouseDown}
    >
      <TitleBar
        ref={headerRef}
        style={{
          cursor: styleClicking ? 'grabbing' : 'grab',
        }}
        minimized={minimized}
        onMouseLeave={(_e) => {
          setStyleClicking(false);
        }}
        onClick={(e) => e.preventDefault()}
        onMouseUp={(e) => {
          e.preventDefault();
          setStyleClicking(false);
        }}
        onMouseDown={(e) => {
          e.preventDefault();
          setStyleClicking(true);
        }}
      >
        <Title>
          {frames.length > 0 && (
            <>
              <AlignCenterHorizontally>
                <Btn
                  noBorder
                  small
                  onClick={() => {
                    api.pop();
                  }}
                >
                  <CenteredText>Back</CenteredText>
                </Btn>
                <EmSpacer width={0.5} />
                <ShortcutKeyDown shortcutKey={MODAL_BACK_SHORTCUT} disabled={!isActive} />
              </AlignCenterHorizontally>
              <EmSpacer width={1} />
            </>
          )}
          <Truncate maxWidth={allSubModalTitleElements.length !== 0 ? '50px' : undefined}>
            {modalTitleElement}
          </Truncate>
          {allSubModalTitleElements.length !== 0 && <EmSpacer width={0.5} />}
          {allSubModalTitleElements}
          <EmSpacer width={1} />
        </Title>

        {/* render the 'close' and 'help me' buttons, depending on whether or not they're relevant */}
        <ModalButtonsContainer minimized={minimized}>
          {helpContent !== undefined && !minimized && (
            <>
              <Btn
                noBorder
                onClick={() => setShowingInformationSection((showing) => !showing)}
                small
              >
                help
              </Btn>
              <Spacer width={4} />
            </>
          )}
          <Btn noBorder onClick={() => setMinimized((minimized) => !minimized)} small>
            {minimized ? 'maximize' : 'minimize'}
          </Btn>
          {!hideClose && (
            <>
              <Spacer width={4} />
              <Btn noBorder onClick={() => setVisible(false)} small>
                close
              </Btn>
            </>
          )}
        </ModalButtonsContainer>
      </TitleBar>

      <InformationSection
        style={{ display: minimized || !showingHelp ? 'none' : undefined }}
        hide={() => setShowingInformationSection(false)}
      >
        {renderedFrameHelp || (helpContent && helpContent())}
      </InformationSection>

      <div style={{ display: minimized ? 'none' : 'initial' }}>
        <DFErrorBoundary>{content}</DFErrorBoundary>
      </div>
    </Modal>
  );
}
