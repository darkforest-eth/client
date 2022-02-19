import { isLocatable } from '@darkforest_eth/gamelogic';
import { LocationId, TooltipName } from '@darkforest_eth/types';
import React from 'react';
import { CenterBackgroundSubtext } from '../Components/CoreUI';
import { AccountLabel } from '../Components/Labels/Labels';
import { TextPreview } from '../Components/TextPreview';
import dfstyles from '../Styles/dfstyles';
import { usePlanet, useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { TooltipTrigger } from './Tooltip';

/**
 * This pane contains misc info about the planet, which does not have a place in the main Planet Context Pane.
 */
export function PlanetInfoPane({ initialPlanetId }: { initialPlanetId: LocationId | undefined }) {
  const uiManager = useUIManager();
  const planetId = useEmitterValue(uiManager.selectedPlanetId$, initialPlanetId);
  const planet = usePlanet(uiManager, planetId).value;

  if (!isLocatable(planet)) {
    return (
      <CenterBackgroundSubtext width='100%' height='200px'>
        planet with <br /> unknown location
      </CenterBackgroundSubtext>
    );
  } else {
    return (
      <>
        <TooltipTrigger name={TooltipName.Empty} extraContent={<>id</>}>
          <TextPreview
            style={{ color: dfstyles.colors.subtext }}
            text={planet?.locationId}
            focusedWidth={'150px'}
            unFocusedWidth={'150px'}
          />
        </TooltipTrigger>
        <br />
        <TooltipTrigger name={TooltipName.Empty} extraContent={<>coords</>}>
          <TextPreview
            style={{ color: dfstyles.colors.subtext }}
            text={`(${planet.location.coords.x}, ${planet.location.coords.y})`}
            focusedWidth={'150px'}
            unFocusedWidth={'150px'}
          />
        </TooltipTrigger>
        <br />
        <TooltipTrigger name={TooltipName.Empty} extraContent={<>owner</>}>
          <AccountLabel
            style={{ color: dfstyles.colors.subtext }}
            ethAddress={planet.owner}
            includeAddressIfHasTwitter
          />
        </TooltipTrigger>
      </>
    );
  }
}
