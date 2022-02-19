import React, { useLayoutEffect, useRef } from 'react';
import styled from 'styled-components';
import { snips } from '../Styles/dfstyles';
import { DFZIndex } from '../Utils/constants';

const StyledHoverPane = styled.div`
  ${snips.absoluteTopLeft}
  ${snips.defaultBackground}
  ${snips.roundedBordersWithEdge}
  width: 350px;
`;

/**
 * This is the pane that is rendered when you hover over a planet.
 */
export function HoverPane({
  style,
  visible,
  element,
}: {
  style?: React.CSSProperties;
  visible: boolean;
  element: React.ReactChild;
}) {
  const paneRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!paneRef.current) return;

    let leftOffset;
    let topOffset;

    const doMouseMove = (e: MouseEvent) => {
      if (!paneRef.current) return;

      const width = paneRef.current.offsetWidth;
      const height = paneRef.current.offsetHeight;

      if (e.clientX < window.innerWidth / 2) leftOffset = 10;
      else leftOffset = -10 - width;

      if (e.clientY < window.innerHeight / 2) topOffset = 10;
      else topOffset = -10 - height;

      paneRef.current.style.top = e.clientY + topOffset + 'px';
      paneRef.current.style.left = e.clientX + leftOffset + 'px';
    };

    window.addEventListener('mousemove', doMouseMove);

    return () => window.removeEventListener('mousemove', doMouseMove);
  }, [paneRef]);

  return (
    <StyledHoverPane
      ref={paneRef}
      style={{ display: visible ? undefined : 'none', zIndex: DFZIndex.Tooltip, ...style }}
    >
      {element}
    </StyledHoverPane>
  );
}
