import React, { useEffect, useMemo, useState } from 'react';
import { snips } from '../Styles/dfstyles';
import { useHoverPlanet, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { PlanetCard } from '../Views/PlanetCard';
import { HoverPane } from './HoverPane';

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

  const visible = useMemo(
    () =>
      !!hovering &&
      (hovering?.locationId !== selected?.locationId || !uiManager.getPlanetHoveringInRenderer()) &&
      !sending &&
      !uiManager.getMouseDownCoords(),
    [hovering, selected, sending, uiManager]
  );

  return (
    <HoverPane
      style={hoverWrapper.value?.destroyed ? snips.destroyedBackground : undefined}
      visible={visible}
      element={<PlanetCard standalone planetWrapper={hoverWrapper} />}
    />
  );
}
