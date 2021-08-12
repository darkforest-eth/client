import { Planet } from '@darkforest_eth/types';
import React from 'react';
import {
  blocksLeftToProspectExpiration,
  prospectExpired,
} from '../../../Backend/GameLogic/ArrivalUtils';
import { Btn } from '../../Components/Btn';
import { Spacer } from '../../Components/CoreUI';
import { ScoreLabel } from '../../Components/Labels/KeywordLabels';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Red, Sub, White } from '../../Components/Text';

export function Find({
  find,
  isFinding,
  currentBlockNumber,
  planet,
  roundOver,
}: {
  find: () => void;
  isFinding: boolean;
  currentBlockNumber: number | undefined;
  planet: Planet;
  roundOver: boolean;
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
      <Btn wide onClick={find} disabled={roundOver}>
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
      {roundOver && <Red>Round 3 is over, and you can no longer mint artifacts!</Red>}
      <Sub>
        Once the artifact is found, it will be placed directly onto this planet. You have{' '}
        <White>
          {blocksLeftToProspectExpiration(currentBlockNumber, planet.prospectedBlockNumber)} blocks
        </White>{' '}
        to find an artifact on this planet, otherwise the prospect will expire. Finding artifacts
        increases your <ScoreLabel />!{' '}
      </Sub>
    </>
  );
}
