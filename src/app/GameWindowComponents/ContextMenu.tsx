import React, { useContext } from 'react';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import { ContextMenuContext, ContextMenuType } from '../GameWindow';
import { PaneProps, StyledPane } from './GameWindowComponents';

export const ContextMenu = styled.div`
  min-width: 10em;
  min-height: 10em;

  width: fit-content;
  height: fit-content;

  border-top: 1px solid ${dfstyles.colors.text};
  border-right: 1px solid ${dfstyles.colors.text};

  background: ${dfstyles.colors.background};
`;

const StyledContextMenuPane = styled(StyledPane)<{ visible: boolean }>`
  display: ${(props) => (props.visible ? 'block' : 'none')};

  // TODO there's def a better way to do this
  .fill-target {
    background: ${dfstyles.colors.text};
    & path {
      fill: ${dfstyles.colors.background};
    }
    color: ${dfstyles.colors.background};
  }
`;

export function ContextPane({
  children,
  title,
  name,
  headerItems,
}: PaneProps & {
  name: ContextMenuType;
}) {
  const currentMenu = useContext<ContextMenuType>(ContextMenuContext);

  return (
    <StyledContextMenuPane visible={currentMenu === name}>
      <div className='pane-header'>
        <p>{title}</p>
        <div>{headerItems}</div>
      </div>

      <div className='pane-content'>{children}</div>
    </StyledContextMenuPane>
  );
}
