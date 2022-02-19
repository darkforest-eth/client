import { isLocatable } from '@darkforest_eth/gamelogic';
import { Planet } from '@darkforest_eth/types';
import React from 'react';
import { Link } from '../Components/CoreUI';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';

export function PlanetLink({ planet, children }: { planet: Planet; children: React.ReactNode }) {
  const uiManager = useUIManager();
  const uiEmitter = UIEmitter.getInstance();

  return (
    <Link
      color={dfstyles.colors.text}
      onClick={() => {
        if (isLocatable(planet)) {
          uiManager?.setSelectedPlanet(planet);
          uiEmitter.emit(UIEmitterEvent.CenterPlanet, planet);
        }
      }}
      onMouseEnter={() => {
        if (isLocatable(planet)) uiManager?.setHoveringOverPlanet(planet, false);
      }}
      onMouseLeave={() => {
        uiManager?.setHoveringOverPlanet(undefined, false);
      }}
    >
      {children}
    </Link>
  );
}
