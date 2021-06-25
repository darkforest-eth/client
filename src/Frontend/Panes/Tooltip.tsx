import React, { useState, useEffect, useRef, useLayoutEffect, useMemo } from 'react';
import styled, { keyframes, css } from 'styled-components';
import WindowManager, { TooltipName, WindowManagerEvent } from '../Game/WindowManager';
import dfstyles from '../Styles/dfstyles';
import { useControlDown } from '../Utils/AppHooks';
import { GameWindowZIndex } from '../Utils/constants';
import { TooltipContent } from './TooltipPanes';

// activate TooltipName on mouseenter, deactivate on mouse leave
type DisplayType = 'inline' | 'block' | 'inline-block' | 'inline-flex' | 'flex';
type TooltipProps = {
  children: React.ReactNode;
  name: TooltipName;
  needsCtrl?: boolean;
  display?: DisplayType;
  style?: React.CSSProperties;
  className?: string;
};

const fade = keyframes`
  from {
    background: ${dfstyles.colors.dfblue}; 
  }
  to {
    background: ${dfstyles.colors.backgroundlight};
  }
`;

const _animation = css`
  animation: ${fade} 1s ${dfstyles.game.styles.animProps};
`;

// ${(props) => (props.anim ? animation : 'animation: none;')}
const StyledTooltipTrigger = styled.span<{
  anim: boolean;
  display?: DisplayType;
}>`
  border-radius: 2px;
  transition: background-color 0.2s;
  background-color: ${(props) => (props.anim ? dfstyles.colors.dfblue : 'none')};

  display: ${(props) => props.display || 'inline'};
`;

export function TooltipTrigger({
  children,
  name,
  needsCtrl,
  display,
  style,
  className,
}: TooltipProps) {
  // the model for this is a state machine on the state of {hovering, ctrl -> shouldShow}
  const ctrl = useControlDown();
  const shouldShow = useMemo(() => !needsCtrl || (needsCtrl && ctrl), [ctrl, needsCtrl]);
  const [hovering, setHovering] = useState<boolean>(false);

  const active = useMemo(() => shouldShow && hovering, [shouldShow, hovering]);

  const windowManager = WindowManager.getInstance();

  useEffect(() => {
    windowManager.setTooltip(active ? name : TooltipName.None);
  }, [active, windowManager, name]);

  return (
    <StyledTooltipTrigger
      display={display}
      style={{ ...style }}
      className={className}
      anim={ctrl}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {children}
    </StyledTooltipTrigger>
  );
}

const StyledTooltip = styled.div<{
  visible: boolean;
}>`
  position: absolute;
  width: fit-content;
  height: fit-content;
  min-height: 1em;
  min-width: 5em;
  border: 1px solid ${dfstyles.colors.subtext};
  background: ${dfstyles.colors.background};
  padding: 0.5em;
  border-radius: 3px;

  z-index: ${GameWindowZIndex.Tooltip};
  display: ${(props) => (props.visible ? 'block' : 'none')};
`;

export function Tooltip() {
  const [top, setTop] = useState<number>(0);
  const [left, setLeft] = useState<number>(0);

  const [visible, setVisible] = useState<boolean>(false);

  const windowManager = WindowManager.getInstance();

  const [current, setCurrent] = useState<TooltipName>(TooltipName.None);

  const [leftOffset, setLeftOffset] = useState<number>(10);
  const [topOffset, setTopOffset] = useState<number>(10);

  const elRef = useRef<HTMLDivElement>(document.createElement('div'));
  const [height, setHeight] = useState<number>(20);
  const [width, setWidth] = useState<number>(20);

  // subscribe to tooltip changes
  useEffect(() => {
    const checkTooltip = () => {
      const current = windowManager.getTooltip();
      setCurrent(current);
    };
    windowManager.on(WindowManagerEvent.TooltipUpdated, checkTooltip);
    return () => {
      windowManager.removeListener(WindowManagerEvent.TooltipUpdated, checkTooltip);
    };
  }, [windowManager]);

  // sync visible to current tooltip
  useEffect(() => {
    const checkTooltip = () => {
      const current = windowManager.getTooltip();
      if (current === TooltipName.None) setVisible(false);
      else setVisible(true);
    };

    windowManager.on(WindowManagerEvent.TooltipUpdated, checkTooltip);

    return () => {
      windowManager.removeListener(WindowManagerEvent.TooltipUpdated, checkTooltip);
    };
  }, [windowManager, height, width]);

  // sync mousemove event
  useEffect(() => {
    const doMouseMove = (e: MouseEvent) => {
      if (!visible) return;
      setLeft(e.clientX);
      setTop(e.clientY);
    };

    if (visible) {
      window.addEventListener('mousemove', doMouseMove);
    }

    return () => {
      window.removeEventListener('mousemove', doMouseMove);
    };
  }, [visible]);

  // sync size to content size
  useLayoutEffect(() => {
    setHeight(elRef.current.offsetHeight);
    setWidth(elRef.current.offsetWidth);
  }, [elRef.current.offsetHeight, elRef, visible]);

  // point it in the right direction based on quadrant
  useLayoutEffect(() => {
    if (left < window.innerWidth / 2) {
      setLeftOffset(10);
    } else {
      setLeftOffset(-10 - width);
    }

    if (top < window.innerHeight / 2) {
      setTopOffset(10);
    } else {
      setTopOffset(-10 - height);
    }
  }, [left, top, width, height]);

  return (
    <StyledTooltip
      ref={elRef}
      onMouseEnter={(e) => e.preventDefault()}
      onMouseLeave={(e) => e.preventDefault()}
      style={{
        top: `${top + topOffset}px`,
        left: `${left + leftOffset}px`,
      }}
      visible={visible}
    >
      <TooltipContent name={current} />
    </StyledTooltip>
  );
}
