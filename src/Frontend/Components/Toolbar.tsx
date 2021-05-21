import React from 'react';
import styled from 'styled-components';
import dfstyles from '../../Frontend/Styles/dfstyles';
import { ModalIcon } from '../Views/ModalIcon';
import { ModalHook, ModalName } from '../Views/ModalPane';
import { PaneProps, StyledToolbarPane } from './GameWindowComponents';

const StyledToolbar = styled.div`
  height: ${dfstyles.game.toolbarHeight};
  width: 100%;
  position: absolute;
  bottom: 0;
  background: ${dfstyles.colors.background};
  border-top: 1px solid ${dfstyles.colors.text};
  display: flex;
  flex-direction: row;
`;

export function Toolbar({ children }: { children: React.ReactNode }) {
  return <StyledToolbar>{children}</StyledToolbar>;
}

// TODO roll this in under Toolbar? also maybe share styles with sidebarpanes
export function ToolbarPane({
  children,
  title,
  hook,
  modal,
}: PaneProps & { hook: ModalHook; modal: ModalName }) {
  return (
    <StyledToolbarPane>
      <div className='pane-header'>
        <p>{title}</p>
        <a>
          <ModalIcon modal={modal} hook={hook} />
        </a>
      </div>
      <div className='pane-content'>{children}</div>
    </StyledToolbarPane>
  );
}
