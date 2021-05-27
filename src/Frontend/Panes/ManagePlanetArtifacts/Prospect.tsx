import React from 'react';
import { Planet } from '@darkforest_eth/types';
import { Btn } from '../../Components/Btn';
import { Spacer } from '../../Components/CoreUI';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Sub } from '../../Components/Text';
import { enoughEnergyToProspect } from '../../../Backend/GameLogic/ArrivalUtils';

export function Prospect({
  prospect,
  isProspecting,
  planet,
}: {
  prospect: () => void;
  isProspecting: boolean;
  planet: Planet;
}) {
  let button;

  const energyPercentage = planet.energy / planet.energyCap;
  const enoughEnergy = enoughEnergyToProspect(planet);

  if (isProspecting) {
    button = (
      <Btn wide disabled>
        <LoadingSpinner initialText={'Prospecting...'} />
      </Btn>
    );
  } else {
    button = (
      <Btn wide onClick={prospect} disabled={!enoughEnergy}>
        Prospect
      </Btn>
    );
  }

  return (
    <>
      {button}
      <Spacer height={8} />
      <Sub>
        Before you can find an artifact on a planet, you must prospect it. Prospecting determines
        what artifact you will find!{' '}
        {!enoughEnergy && (
          <>
            This planet must have over 95% energy to prospect for an artifact. (Currently{' '}
            {energyPercentage.toFixed(0)}%)
          </>
        )}
      </Sub>
    </>
  );
}
