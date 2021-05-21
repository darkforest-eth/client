import React from 'react';
import { Planet } from '@darkforest_eth/types';
import { Btn } from '../../Components/Btn';
import { Spacer } from '../../Components/CoreUI';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Sub, White } from '../../Components/Text';
import {
  blocksLeftToProspectExpiration,
  prospectExpired,
} from '../../../Backend/GameLogic/ArrivalUtils';

export function Find({
  find,
  isFinding,
  currentBlockNumber,
  planet,
}: {
  find: () => void;
  isFinding: boolean;
  currentBlockNumber: number | undefined;
  planet: Planet;
}) {
  let button;

  if (isFinding) {
    button = (
      <Btn wide disabled>
        <LoadingSpinner initialText={'Finding...'} />
      </Btn>
    );
  } else {
    button = (
      <Btn wide onClick={find}>
        Find
      </Btn>
    );
  }

  if (currentBlockNumber === undefined || planet.prospectedBlockNumber === undefined) {
    return <LoadingSpinner />;
  }

  if (prospectExpired(currentBlockNumber, planet.prospectedBlockNumber)) {
    return <Sub>This planet's prospecting expired after 256 blocks</Sub>;
  }

  return (
    <>
      {button}
      <Spacer height={8} />
      <Sub>
        Once the artifact is found, it will be placed directly onto this planet. You have{' '}
        <White>
          {blocksLeftToProspectExpiration(currentBlockNumber, planet.prospectedBlockNumber)} blocks
        </White>{' '}
        to find an artifact on this planet, otherwise the prospect will expire.{' '}
      </Sub>
    </>
  );
}
