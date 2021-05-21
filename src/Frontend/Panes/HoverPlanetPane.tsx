import React, { useEffect, useMemo, useRef } from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import { useHoverPlanet, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { GameWindowZIndex } from '../Utils/constants';
import { PlanetCard } from '../Views/PlanetCard';

const StyledHoverPlanetPane = styled.div<{ visible: boolean }>`
  width: 22em;
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${GameWindowZIndex.Tooltip};
  border-radius: ${dfstyles.borderRadius};
  border: 1px solid ${dfstyles.colors.subtext};
  background: ${dfstyles.colors.background};

  ${({ visible }) => !visible && 'display: none;'}
`;

export function HoverPlanetPane() {
  const uiManager = useUIManager();
  const hoverWrapper = useHoverPlanet(uiManager);
  const hovering = hoverWrapper.value;
  const selected = useSelectedPlanet(uiManager).value;
  const visible = useMemo(
    () => !!hovering && hovering?.locationId !== selected?.locationId,
    [hovering, selected]
  );

  const paneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
    <StyledHoverPlanetPane visible={visible} ref={paneRef}>
      <PlanetCard planetWrapper={hoverWrapper} />
    </StyledHoverPlanetPane>
  );
}
