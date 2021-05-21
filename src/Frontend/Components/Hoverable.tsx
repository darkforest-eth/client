import React, { useCallback, useState } from 'react';
import ReactDOM from 'react-dom';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import { useTopLevelDiv } from '../Utils/AppHooks';

export const TOOLTIP_SLOW = 1000;

export function Hoverable({
  children,
  hoverContents,
  quick,
  hoverDelay,
}: {
  children: JSX.Element | JSX.Element[];
  hoverContents: () => JSX.Element;
  quick?: boolean;
  hoverDelay?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [coords, setCoords] = useState<{ x: number; y: number } | undefined>();
  const [closeTimeout, setCloseTimeout] = useState<ReturnType<typeof setTimeout> | undefined>();
  const [openTimeout, setOpenTimeout] = useState<ReturnType<typeof setTimeout> | undefined>();
  const [anchorRef, setAnchorRef] = useState<HTMLSpanElement | null>(null);
  const topLevelDiv = useTopLevelDiv();

  const open = useCallback(() => {
    if (!anchorRef) {
      return;
    }

    const rect = anchorRef.getBoundingClientRect();
    setCoords({ x: rect.x, y: rect.y + rect.height + 5 });
    setIsExpanded(true);

    if (closeTimeout) {
      clearTimeout(closeTimeout);
      setCloseTimeout(undefined);
    }
  }, [closeTimeout, anchorRef]);

  const mouseOver = useCallback(() => {
    if (hoverDelay) {
      setOpenTimeout(
        setTimeout(() => {
          open();
        }, hoverDelay)
      );
    } else {
      open();
    }
  }, [hoverDelay, open]);

  const mouseOut = useCallback(() => {
    if (openTimeout) {
      clearTimeout(openTimeout);
      setOpenTimeout(undefined);
    }

    if (quick) {
      setIsExpanded(false);
      setCoords(undefined);
    } else {
      setCloseTimeout(
        setTimeout(() => {
          setIsExpanded(false);
          setCoords(undefined);
        }, 100)
      );
    }
  }, [quick, openTimeout]);

  if (!topLevelDiv) {
    throw new Error('Hoverables require an instance of a top level div to render into');
  }

  return (
    <HoverableElement>
      <HoverableContents
        onMouseOver={mouseOver}
        onMouseOut={mouseOut}
        ref={(ref) => setAnchorRef(ref)}
      >
        {children}
      </HoverableContents>
      {coords &&
        ReactDOM.createPortal(
          <ExpandedElement x={coords.x} y={coords.y} onMouseOver={mouseOver} onMouseOut={mouseOut}>
            {isExpanded && hoverContents()}
          </ExpandedElement>,
          topLevelDiv
        )}
    </HoverableElement>
  );
}

const HoverableElement = styled.span`
  color: ${dfstyles.colors.text};
`;

const HoverableContents = styled.span`
  cursor: pointer;
`;

const ExpandedElement = styled.span`
  ${({ x, y }: { x: number; y: number }) => css`
    position: absolute;
    top: ${y}px;
    left: ${x}px;
    z-index: 9999;
  `}
`;
