import { Planet } from '@darkforest_eth/types';
import React from 'react';
import { isLocatable } from '../../_types/global/GlobalTypes';
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
    >
      {children}
    </Link>
  );
}
