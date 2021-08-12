import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { snips } from '../Styles/dfstyles';
import { useHoverPlanet, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { GameWindowZIndex } from '../Utils/constants';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { PlanetCard } from '../Views/PlanetCard';

const StyledHoverPlanetPane = styled.div`
  ${snips.absoluteTopLeft}
  ${snips.defaultBackground}
  ${snips.roundedBordersWithEdge}
  width: 350px;
`;

/**
 * This is the pane that is rendered when you hover over a planet.
 */
export function HoverPlanetPane() {
  const uiManager = useUIManager();
  const hoverWrapper = useHoverPlanet(uiManager);
  const hovering = hoverWrapper.value;
  const selected = useSelectedPlanet(uiManager).value;

  /* really bad way to do this but it works for now */
  const [sending, setSending] = useState<boolean>(false);

  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();
    const setSendTrue = () => setSending(true);
    const setSendFalse = () => setSending(false);

    uiEmitter.addListener(UIEmitterEvent.SendCancelled, setSendFalse);
    uiEmitter.addListener(UIEmitterEvent.SendInitiated, setSendTrue);
    uiEmitter.addListener(UIEmitterEvent.SendCompleted, setSendFalse);

    return () => {
      uiEmitter.removeListener(UIEmitterEvent.SendCancelled, setSendFalse);
      uiEmitter.removeListener(UIEmitterEvent.SendInitiated, setSendTrue);
      uiEmitter.removeListener(UIEmitterEvent.SendCompleted, setSendFalse);
    };
  }, []);

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

  const visible = useMemo(
    () =>
      !!hovering &&
      hovering?.locationId !== selected?.locationId &&
      !sending &&
      !uiManager.getMouseDownCoords(),
    [hovering, selected, sending, uiManager]
  );

  return (
    <StyledHoverPlanetPane
      ref={paneRef}
      style={{ display: visible ? undefined : 'none', zIndex: GameWindowZIndex.Tooltip }}
    >
      {visible && <PlanetCard standalone planetWrapper={hoverWrapper} />}
    </StyledHoverPlanetPane>
  );
}
