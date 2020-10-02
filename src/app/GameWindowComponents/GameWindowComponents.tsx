import React, { useState } from 'react';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import { GameWindowZIndex } from '../GameWindow';

export const WindowWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: ${dfstyles.colors.background};
  height: 100%;
  width: 100%;

  font-size: ${dfstyles.game.fontSize};
`;

export const StyledPane = styled.div`
  display: flex;
  flex-direction: column;

  .pane-header {
    padding: 16pt 8pt;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 1.5em;

    & > p {
      text-decoration: underline;
      line-height: 1em;
    }

    & > div {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      & > p,
      & > span,
      & > div {
        margin-left: 0.2em;
      }
    }
  }
  .pane-content {
    padding: 4pt 8pt 8pt 8pt;
    position: relative;
  }
`;

export const StyledToolbarPane = styled(StyledPane)`
  justify-content: space-between;
  height: 100%;
  & .pane-content {
    flex-grow: 1;
    overflow-y: auto;
  }
  border-right: 1px solid ${dfstyles.colors.subtext};
`;

export const StyledSidebarPane = styled(StyledPane)`
  border-bottom: 1px solid ${dfstyles.colors.subtext};
  width: 14em;

  & .pane-header:hover {
    background: ${dfstyles.colors.backgroundlight};
  }

  // for extra header items
  & .pane-header > div {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    & > span,
    & > a {
      margin-left: 0.5em;
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

export type PaneProps = {
  children: React.ReactNode;
  title: string;
  headerStyle?: React.CSSProperties;
  headerItems?: React.ReactNode;
};

// no-op on header style
export function SidebarPane({ children, title, headerItems }: PaneProps) {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  return (
    <StyledSidebarPane>
      <div className='pane-header' onClick={() => setCollapsed((b) => !b)}>
        <p>{title}</p>
        <div>{headerItems}</div>
      </div>

      {!collapsed && <div className='pane-content'>{children}</div>}
    </StyledSidebarPane>
  );
}

export const MainWindow = styled.div`
  // position and sizing
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  flex-grow: 1;

  // styling
  background: ${dfstyles.colors.background};

  // display inner things
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const CanvasContainer = styled.div`
  flex-grow: 1;
  position: relative;
`;

export const CanvasWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

export const UpperLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

export const MenuBar = styled.div`
  // position: absolute;
  // top: 0;
  // left: 0;

  background: ${dfstyles.colors.background};
  z-index: ${GameWindowZIndex.MenuBar};
  padding: 0.5em;
  width: fit-content;
  border-right: 1px solid ${dfstyles.colors.text};
  border-bottom: 1px solid ${dfstyles.colors.text};

  display: flex;
  flex-direction: row;

  & > span {
    margin-left: 4pt;
    &:first-child {
      margin-left: 0;
    }
  }
`;

export const LHSWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

export * from './Sidebar';
export * from './Toolbar';
export * from './Btn';
