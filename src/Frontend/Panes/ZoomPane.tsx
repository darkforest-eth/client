import React from 'react';
import styled from 'styled-components';
import { LongDash } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { DFZIndex } from '../Utils/constants';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';

const StyledZoomPane = styled.div`
  z-index: ${DFZIndex.MenuBar};
  padding-left: 0.75em;
  padding-top: 0.1em;
  margin-top: 0;
  display: flex;
  font-size: 1.5em;
  flex-direction: row;
  justify-content: flex-end;
  height: fit-content;
  & > a:first-child {
    margin-right: 0.75em;
  }
  color: ${dfstyles.colors.subtext};
  & > a {
    &:hover {
      color: ${dfstyles.colors.text};
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
    <StyledZoomPane>
      <a onClick={() => uiEmitter.emit(UIEmitterEvent.ZoomOut)}>
        <LongDash />
      </a>
      <a onClick={() => uiEmitter.emit(UIEmitterEvent.ZoomIn)}>+</a>
    </StyledZoomPane>
  );
}
