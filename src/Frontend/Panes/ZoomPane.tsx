import React from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import { GameWindowZIndex } from '../Utils/constants';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';

const _ZoomPane = styled.div`
  z-index: ${GameWindowZIndex.MenuBar};
  padding-left: 0.75em;
  padding-top: 0.1em;
  margin-top: 0;
  display: flex;
  font-size: 1.5em;
  flex-direction: row;
  justify-content: flex-end;
  & > a:first-child {
    margin-right: 0.75em;
  }
  & > a {
    &:hover {
      color: ${dfstyles.colors.subtext};
      cursor: pointer;
    }
    &:active {
      color: ${dfstyles.colors.subbertext};
    }
  }
`;

export function ZoomPane() {
  const uiEmitter = UIEmitter.getInstance();
  return (
    <_ZoomPane>
      <a onClick={() => uiEmitter.emit(UIEmitterEvent.ZoomOut)}>-</a>
      <a onClick={() => uiEmitter.emit(UIEmitterEvent.ZoomIn)}>+</a>
    </_ZoomPane>
  );
}
