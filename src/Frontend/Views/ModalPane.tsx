import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import styled, { css } from 'styled-components';
import { Spacer, Truncate } from '../Components/CoreUI';
import { Btn, PaneProps } from '../Components/GameWindowComponents';
import {
  CloseCircleIcon,
  MaximizeCircleIcon,
  MinimizeCircleIcon,
  QuestionCircleIcon,
} from '../Components/Icons';
import WindowManager from '../Game/WindowManager';
import dfstyles from '../Styles/dfstyles';
import { GameWindowZIndex } from '../Utils/constants';

export const RECOMMENDED_WIDTH = '450px';

type ModalIconStateFn = (arg: ((b: boolean) => boolean) | boolean) => void;

export type ModalHook = [boolean, ModalIconStateFn];

export enum ModalName {
  Help,
  PlanetDetails,
  Leaderboard,
  PlanetDex,
  UpgradeDetails,
  TwitterVerify,
  TwitterBroadcast,
  Hats,
  Settings,
  YourArtifacts,
  ManageArtifacts,
  Plugins,
  ArtifactConversation,
  ArtifactDetails,
  MapShare,
  ManageAccount,
  Onboarding,
  Private,
}

function InformationSection({ children, hide }: { children: React.ReactNode; hide: () => void }) {
  return (
    <InfoSectionContainer>
      <InfoSectionContent>
        {children}
        <BtnContainer>
          <Btn color='white' onClick={hide}>
            close help
          </Btn>
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

const BUTTON_SIZE = 24;

const ModalButton = styled.div`
  cursor: pointer;
  width: ${BUTTON_SIZE}px;
  height: ${BUTTON_SIZE}px;
  border-radius: ${BUTTON_SIZE / 2}px;
  justify-content: center;
  align-items: center;
  display: flex;
  line-height: ${BUTTON_SIZE}px;
  text-align: center;
  vertical-align: center;
  font-size: 1.5em;

  span svg path {
    fill: #c2c2c2 !important;
  }

  span:hover svg path {
    fill: white !important;
  }
`;

const ModalButtonsContainer = styled.div`
  ${({ minimized }: { minimized: boolean }) => css`
    ${minimized
      ? css`
          margin-left: 8px;
        `
      : css`
          position: absolute;
          top: 0;
          right: 0;
          margin-right: 8px;
        `}

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
  border-radius: 3px;
  border: 1px solid ${dfstyles.colors.subtext};
`;

/**
 * Contains all the UI inside of this modal, which the
 * users of the `ModalPane` class have full controll over.
 */
const Content = styled.div`
  ${({ noPadding }: { noPadding?: boolean }) => css`
    ${!noPadding && 'padding: 8px;'}
  `}
`;

/**
 * Contains the text of the title of this modal window.
 */
const Center = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${dfstyles.colors.text};
`;

const Title = styled(Truncate)`
  max-width: 300px;
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
    height: 2.5em;
    cursor: grab;
    padding: 8px;
    background-color: ${dfstyles.colors.backgroundlight};
    position: relative;
    border-bottom: 1px solid ${minimized ? 'transparent' : dfstyles.colors.subtext};

    &:hover {
      background: ${dfstyles.colors.backgroundlighter};
    }
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

export function ModalPane({
  children,
  title,
  hook: [visible, setVisible],
  hideClose,
  style,
  noPadding,
  helpContent,
  width,
}: PaneProps & {
  hook: ModalHook;
  name?: ModalName;
  hideClose?: boolean;
  style?: React.CSSProperties;
  noPadding?: boolean;
  helpContent?: () => React.ReactNode;
  width?: string;
}) {
  const windowManager = WindowManager.getInstance();
  const [minimized, setMinimized] = useState(false);
  const [coords, setCoords] = useState<Coords | null>(null);
  const [delCoords, setDelCoords] = useState<Coords | null>(null);
  const [mousedownCoords, setMousedownCoords] = useState<Coords | null>(null);
  const [styleClicking, setStyleClicking] = useState<boolean>(false);
  const [clicking, setClicking] = useState<boolean>(false);
  const [zIndex, setZIndex] = useState<number>(GameWindowZIndex.Modal);
  const containerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const headerRef = useRef<HTMLDivElement>(document.createElement('div'));
  const [left, setLeft] = useState<number>(0);
  const [top, setTop] = useState<number>(0);
  const push = useCallback(() => setZIndex(windowManager.getIndex()), [windowManager]);
  const [gameSize, setGameSize] =
    useState<
      | {
          width: number;
          height: number;
        }
      | undefined
    >();
  const [showingInformationSection, setShowingInformationSection] = useState(false);

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
      window.addEventListener('mouseleave', doMouseUp);
    };
  }, [visible, clicking, mousedownCoords, coords]);

  // inits at center
  useLayoutEffect(() => {
    const newX = 0.5 * (window.innerWidth - containerRef.current.offsetWidth);
    const newY = 0.5 * (window.innerHeight - containerRef.current.offsetHeight);
    setCoords({ x: newX, y: newY });
    push();
  }, [containerRef, windowManager, push]);

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
    setLeft(clipX(coords.x + delX, containerRef.current.offsetWidth));
    setTop(clipY(coords.y + delY, containerRef.current.offsetHeight));
  }, [
    coords,
    delCoords,
    containerRef,
    gameSize,
    containerRef.current.offsetWidth,
    containerRef.current.offsetHeight,
  ]);

  const onMouseDown = useCallback(
    (e: React.SyntheticEvent) => {
      push();
      e.stopPropagation();
    },
    [push]
  );

  const showingHelp = helpContent !== undefined && showingInformationSection;
  const currentWidth = minimized || showingHelp ? '' : width;

  return (
    <Modal
      style={{
        ...style,
        left: left + 'px',
        top: top + 'px',
        zIndex: visible ? zIndex : -1000,
        width: currentWidth,
        maxWidth: currentWidth,
      }}
      ref={containerRef}
      onMouseDown={onMouseDown}
    >
      <TitleBar
        ref={headerRef}
        style={{ cursor: styleClicking ? 'grabbing' : 'grab' }}
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
        {minimized ? (
          <Title>{title}</Title>
        ) : (
          <Center>
            <Title>{title}</Title>
          </Center>
        )}

        {/* render the 'close' and 'help me' buttons, depending on whether or not they're relevant */}
        <ModalButtonsContainer minimized={minimized}>
          {helpContent !== undefined && (
            <>
              <ModalButton onClick={() => setShowingInformationSection((showing) => !showing)}>
                <QuestionCircleIcon />
              </ModalButton>
              <Spacer width={4} />
            </>
          )}
          {!hideClose && (
            <ModalButton onClick={() => setVisible(false)}>
              <CloseCircleIcon />
            </ModalButton>
          )}
          <Spacer width={4} />
          <ModalButton onClick={() => setMinimized((minimized) => !minimized)}>
            {minimized ? <MaximizeCircleIcon /> : <MinimizeCircleIcon />}
          </ModalButton>
        </ModalButtonsContainer>
      </TitleBar>

      {/* only render the content if the modal is not minimized */}
      {!minimized && (
        <>
          {/* render the modal's README/help section */}
          {showingHelp ? (
            <InformationSection hide={() => setShowingInformationSection(false)}>
              {helpContent && helpContent()}
            </InformationSection>
          ) : (
            <Content noPadding={noPadding}>{children}</Content>
          )}
        </>
      )}
    </Modal>
  );
}
