import React, { useLayoutEffect, useEffect, useContext } from 'react';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import { GameWindowZIndex } from '../GameWindow';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import { UIDataKey, useStoredUIState } from '../../api/UIStateStorageManager';
import TutorialManager, { TutorialState } from '../../utils/TutorialManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import GameUIManager from '../board/GameUIManager';

const StyledSidebar = styled.div`
  width: fit-content;
  min-width: 1px;
  height: 100%:
  background: ${dfstyles.colors.background};
  position: relative;
`;

const TOGGLER_WIDTH = '1em';
const StyledToggler = styled.div`
  height: 100%;
  width: ${TOGGLER_WIDTH};
  right: -${TOGGLER_WIDTH};
  background: ${dfstyles.colors.text};
  color: ${dfstyles.colors.background};
  position: absolute;
  z-index: ${GameWindowZIndex.Toggler};

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  // transition: opacity 0.2s;
  opacity: 0;

  &:hover {
    opacity: 1;
    cursor: pointer;
  }

  & span {
    font-size: 1.25em;
    transform: scaleY(2);
  }
`;

function Toggler({
  sidebarVisible,
  onClick,
}: {
  sidebarVisible: boolean;
  onClick: () => void;
}) {
  return (
    <StyledToggler onClick={onClick}>
      <span>{sidebarVisible ? '<' : '>'}</span>
    </StyledToggler>
  );
}

const SidebarContent = styled.div<{
  sidebarVisible: boolean;
}>`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  border-right: 1px solid ${dfstyles.colors.text};

  position: ${(props) => (props.sidebarVisible ? 'relative' : 'absolute')};
  left: ${(props) => (props.sidebarVisible ? '0' : '-1000px')};
`;

export function Sidebar({ children }: { children: React.ReactNode }) {
  const gameUIManager = useContext<GameUIManager | null>(GameUIManagerContext);

  const uiEmitter = UIEmitter.getInstance();

  const [visible, setVisible] = useStoredUIState<boolean>(
    UIDataKey.sidebarEnabled,
    gameUIManager
  );

  // const [visible, setVisible] = useState<boolean>(true);

  // it's pretty possible we don't actually need this
  useLayoutEffect(() => {
    uiEmitter.emit(UIEmitterEvent.UIChange);
  }, [visible, uiEmitter]);

  useEffect(() => {
    if (!visible) {
      const tutorialManager = TutorialManager.getInstance();
      tutorialManager.acceptInput(TutorialState.Sidebar);
    }
  }, [visible]);

  return (
    <StyledSidebar>
      <Toggler sidebarVisible={visible} onClick={() => setVisible((v) => !v)} />
      <SidebarContent sidebarVisible={visible}>{children}</SidebarContent>
    </StyledSidebar>
  );
}
