import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { TooltipName } from '@darkforest_eth/types';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import { useOverlayContainer } from '../Utils/AppHooks';
import { DFZIndex } from '../Utils/constants';
import { TooltipContent } from './TooltipPanes';

/**
 * Each {@link TooltipName} has a corresponding tooltip element.
 */
export interface TooltipTriggerProps {
  /**
   * The name of the tooltip element to display. You can see all the concrete tooltip contents in
   * the file called {@link TooltipPanes}. Set to `undefined` to not render the tooltip.
   */
  name: TooltipName | undefined;

  /**
   * A {@link TooltipTrigger} wraps this child, and causes a tooltip to appear when the user hovers
   * over it.
   */
  children: React.ReactNode;

  /**
   * You can append some dynamic content to the given tooltip by setting this field to a React node.
   */
  extraContent?: React.ReactNode;

  /**
   * You can optionally style the tooltip trigger element, not the tooltip itself.
   */
  style?: React.CSSProperties;
}

export interface TooltipProps extends TooltipTriggerProps {
  top: number;
  left: number;
}

/**
 * When the player hovers over this element, triggers the tooltip with the given name to be
 * displayed on top of everything.
 */
export function TooltipTrigger(props: TooltipTriggerProps) {
  const overlayContainer = useOverlayContainer();
  const [hovering, setHovering] = useState(false);
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const doMouseMove = (e: MouseEvent) => {
      setMouseCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', doMouseMove);

    return () => {
      window.removeEventListener('mousemove', doMouseMove);
    };
  });

  return (
    <>
      <StyledTooltipTrigger
        style={{ ...props.style }}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {props.children}
      </StyledTooltipTrigger>

      {overlayContainer &&
        hovering &&
        ReactDOM.createPortal(
          <Tooltip {...props} top={mouseCoords.y} left={mouseCoords.x} />,
          overlayContainer
        )}
    </>
  );
}

/**
 * At any given moment, there can only be one tooltip visible in the game. This is true because a
 * player only has one mouse cursor on the screen, and therefore can only be hovering over a single
 * {@link TooltipTrigger} element at any given time. This component is responsible for keeping track
 * of which tooltip has been hovered over, and rendering the corresponding content.
 */
export function Tooltip(props: TooltipProps) {
  const elRef = useRef<HTMLDivElement>(document.createElement('div'));

  const [height, setHeight] = useState<number>(20);
  const [width, setWidth] = useState<number>(20);

  const [leftOffset, setLeftOffset] = useState<number>(10);
  const [topOffset, setTopOffset] = useState<number>(10);

  // sync size to content size
  useLayoutEffect(() => {
    setHeight(elRef.current.offsetHeight);
    setWidth(elRef.current.offsetWidth);
  }, [elRef.current.offsetHeight, elRef]);

  // point it in the right direction based on quadrant
  useLayoutEffect(() => {
    if (props.left < window.innerWidth / 2) {
      setLeftOffset(10);
    } else {
      setLeftOffset(-10 - width);
    }

    if (props.top < window.innerHeight / 2) {
      setTopOffset(10);
    } else {
      setTopOffset(-10 - height);
    }
  }, [width, height, props.left, props.top]);

  if (props.name !== undefined) {
    return (
      <StyledTooltip
        ref={elRef}
        onMouseEnter={(e) => e.preventDefault()}
        onMouseLeave={(e) => e.preventDefault()}
        style={{
          top: `${props.top + topOffset}px`,
          left: `${props.left + leftOffset}px`,
        }}
      >
        <TooltipContent name={props.name} />
        {props.extraContent}
      </StyledTooltip>
    );
  }

  return null;
}

const StyledTooltipTrigger = styled.span`
  border-radius: 2px;
  display: ${(props) => props?.style?.display || 'inline'};
`;

const StyledTooltip = styled.div`
  max-width: ${RECOMMENDED_MODAL_WIDTH};
  position: absolute;
  border: 1px solid ${dfstyles.colors.border};
  background: ${dfstyles.colors.background};
  padding: 0.5em 1em;
  border-radius: 3px;
  line-height: 1.5em;
  z-index: ${DFZIndex.Tooltip};
`;
