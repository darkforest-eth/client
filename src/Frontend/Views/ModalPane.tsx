import { ModalId } from '@darkforest_eth/types';
import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { EmSpacer, Spacer, Title, Truncate } from '../Components/CoreUI';
import { PaneProps } from '../Components/GameWindowComponents';
import { MaybeShortcutButton } from '../Components/MaybeShortcutButton';
import { DarkForestModal, Modal, PositionChangedEvent } from '../Components/Modal';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { MODAL_BACK_SHORTCUT } from '../Utils/ShortcutConstants';
import { DFErrorBoundary } from './DFErrorBoundary';

function InformationSection({ children, hide }: { children: React.ReactNode; hide: () => void }) {
  return (
    <InfoSectionContent>
      {children}
      <BtnContainer>
        <Btn onClick={hide}>close help</Btn>
      </BtnContainer>
    </InfoSectionContent>
  );
}

const BtnContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 8px;
`;

const InfoSectionContent = styled.div`
  text-align: justify;
  color: ${dfstyles.colors.subtext};
`;

export type ModalProps = PaneProps & {
  title: string | React.ReactNode;
  style?: CSSStyleDeclaration & React.CSSProperties;
  visible: boolean;
  onClose: () => void;
  id: ModalId;
  hideClose?: boolean;
  helpContent?: () => React.ReactNode;
  width?: string;
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
 * @todo Add things like open, close, set position, etc.
 */
export interface ModalHandle {
  push(frame: ModalFrame): void;
  popAll(): void;
  pop(): void;
  id: string;
  isActive: boolean;
}

export function ModalPane({
  style,
  children,
  title,
  visible,
  onClose,
  hideClose,
  helpContent,
  width,
  initialPosition,
  id,
}: ModalProps) {
  const uiManager = useUIManager();
  const modalManager = uiManager.getModalManager();
  const windowPositions = modalManager.getModalPositions();
  const modalPosition = id ? windowPositions.get(id) : undefined;
  const activeModalId = useEmitterValue(modalManager.activeModalId$, undefined);
  const isActive = id === activeModalId;
  const [frames, setFrames] = useState<ModalFrame[]>([]);
  const [renderedFrame, setRenderedFrame] = useState<undefined | React.ReactElement>();
  const [renderedFrameHelp, setRenderedFrameHelp] = useState<undefined | React.ReactElement>();
  const [minimized, setMinimized] = useState(modalPosition?.state === 'minimized');
  const [modalIndex, setModalIndex] = useState<number>(() => modalManager.getIndex());
  const push = useCallback(() => {
    modalManager.activeModalId$.publish(id);
    setModalIndex(modalManager.getIndex());
  }, [modalManager, id]);
  const [showingInformationSection, setShowingInformationSection] = useState(false);
  const onMouseDown = useCallback(
    (e: Event & React.MouseEvent<DarkForestModal>) => {
      push();
      e.stopPropagation();
    },
    [push]
  );

  const initialPos = modalPosition || initialPosition;
  const showingHelp = helpContent !== undefined && showingInformationSection;

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
      id,
      isActive,
    }),
    [id, isActive]
  );

  // push to top
  useLayoutEffect(() => {
    push();
  }, [visible, modalManager, push]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const topFrame = frames[frames.length - 1];
      setRenderedFrame((topFrame && topFrame.element()) || undefined);
      setRenderedFrameHelp((topFrame && topFrame.helpContent) || undefined);
    }, 0);

    return () => clearTimeout(timeout);
  }, [frames, api]);

  const onPositionChanged = useCallback(
    (evt: PositionChangedEvent) => {
      if (!id) return;
      if (visible) {
        modalManager.setModalPosition(id, {
          x: evt.coords.x,
          y: evt.coords.y,
          state: minimized ? 'minimized' : 'open',
          modalId: id,
        });
      }
    },
    [visible, modalManager, minimized, id]
  );

  useEffect(() => {
    if (!id) return;
    if (!visible) {
      modalManager.setModalState(id, 'closed');
    }
  }, [visible, modalManager, id]);

  let content;
  if (showingHelp) {
    content = (
      <InformationSection hide={() => setShowingInformationSection(false)}>
        {renderedFrameHelp || (helpContent && helpContent())}
      </InformationSection>
    );
  } else if (renderedFrame) {
    content = <DFErrorBoundary>{renderedFrame}</DFErrorBoundary>;
  } else {
    content = (
      <DFErrorBoundary>{typeof children === 'function' ? children(api) : children}</DFErrorBoundary>
    );
  }

  function getFrameTitle(args?: ModalFrame) {
    if (!args) return undefined;
    return `${args.title}`;
  }

  const modalTitleElement = typeof title === 'string' ? title : title(frames.length > 0);
  const allSubModalTitleElements = [];

  if (frames.length > 0) {
    allSubModalTitleElements.push(getFrameTitle(frames[frames.length - 1]));
  }

  if (!visible) {
    return null;
  } else {
    return (
      <Modal
        style={style}
        width={width}
        minimized={minimized}
        index={modalIndex}
        initialX={initialPos?.x}
        initialY={initialPos?.y}
        onMouseDown={onMouseDown}
        onPositionChanged={onPositionChanged}
      >
        {frames.length > 0 && (
          <MaybeShortcutButton
            slot='title'
            size='small'
            onClick={() => api.pop()}
            onShortcutPressed={() => api.pop()}
            shortcutKey={MODAL_BACK_SHORTCUT}
            shortcutText={MODAL_BACK_SHORTCUT}
          >
            back
          </MaybeShortcutButton>
        )}
        <Title slot='title'>
          <Truncate maxWidth={allSubModalTitleElements.length !== 0 ? '50px' : undefined}>
            {modalTitleElement}
          </Truncate>
          {allSubModalTitleElements.length !== 0 && <EmSpacer width={0.5} />}
          {allSubModalTitleElements}
        </Title>

        {/* render the 'close' and 'help me' buttons, depending on whether or not they're relevant */}
        <div slot='title' style={{ marginLeft: '8px', flexShrink: 0 }}>
          {helpContent !== undefined && !minimized && (
            <>
              <Btn size='small' onClick={() => setShowingInformationSection((showing) => !showing)}>
                help
              </Btn>
              <Spacer width={4} />
            </>
          )}
          <Btn size='small' onClick={() => setMinimized((minimized: boolean) => !minimized)}>
            {minimized ? 'maximize' : 'minimize'}
          </Btn>
          {!hideClose && (
            <>
              <Spacer width={4} />
              <Btn size='small' onClick={() => onClose()}>
                close
              </Btn>
            </>
          )}
        </div>

        {content}
      </Modal>
    );
  }
}
