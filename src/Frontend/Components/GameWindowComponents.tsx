import React from 'react';
import styled from 'styled-components';
import dfstyles from '../../Frontend/Styles/dfstyles';

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

export type PaneProps = {
  title: string | ((small: boolean) => React.ReactNode);
  children: React.ReactNode;
  headerItems?: React.ReactNode;
};

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
  left: 0;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;
