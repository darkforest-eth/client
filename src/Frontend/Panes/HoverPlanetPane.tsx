import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import { useHoverPlanet, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { GameWindowZIndex } from '../Utils/constants';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { PlanetCard } from '../Views/PlanetCard';

const StyledHoverPlanetPane = styled.div<{ visible: boolean }>`
  width: 22em;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: ${dfstyles.borderRadius};
  border: 1px solid ${dfstyles.colors.subtext};
  background: ${dfstyles.colors.background};

  ${({ visible }) =>
    visible
      ? css`
          z-index: ${GameWindowZIndex.Tooltip};
        `
      : css`
          opacity: 0;
          pointer-events: none;
          z-index: -1000 !important;
        `}
`;

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

  const beVisible = useMemo(
    () =>
      !!hovering &&
      hovering?.locationId !== selected?.locationId &&
      !sending &&
      !uiManager.getMouseDownCoords(),
    [hovering, selected, sending, uiManager]
  );

  const visible = beVisible;

  /*
  const [visible, setVisible] = useState<boolean>(false);
  const [openTimeout, setOpenTimeout] = useState<ReturnType<typeof setTimeout> | undefined>();

  useEffect(() => {
    if (beVisible) {
      setOpenTimeout(setTimeout(() => setVisible(true), 500));
    } else setVisible(false);

    return () => {
      clearTimeout(openTimeout);
      setOpenTimeout(undefined);
    };
  }, [beVisible, setVisible, setOpenTimeout]);
  */

  return (
    <StyledHoverPlanetPane visible={visible} ref={paneRef}>
      <PlanetCard planetWrapper={hoverWrapper} />
    </StyledHoverPlanetPane>
  );
}
