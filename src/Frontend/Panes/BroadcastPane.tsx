import { EthAddress, LocationId } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext, PaddedRecommendedModalWidth, Spacer } from '../Components/CoreUI';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Blue, Sub, White } from '../Components/Text';
import { TimeUntil } from '../Components/TimeUntil';
import dfstyles from '../Styles/dfstyles';
import { usePlanet, usePopAllOnSelectedPlanetChanged, useUIManager } from '../Utils/AppHooks';
import { ModalHandle } from '../Views/ModalPane';

const BroadcastWrapper = styled.div`
  & .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    & > span {
      &:first-child {
        color: ${dfstyles.colors.subtext};
        padding-right: 1em;
      }
    }
  }
  & .message {
    margin: 1em 0;

    & p {
      margin: 0.5em 0;

      &:last-child {
        margin-bottom: 1em;
      }
    }
  }
`;

export function BroadcastPaneHelpContent() {
  return (
    <div>
      Reveal this planet's location to all other players on-chain!
      <Spacer height={8} />
      Broadcasting can be a potent offensive tactic! Reveal a powerful enemy's location, and maybe
      someone else will take care of them for you?
    </div>
  );
}

export function BroadcastPane({
  planetId,
  modal,
}: {
  modal: ModalHandle;
  planetId: LocationId | undefined;
}) {
  const uiManager = useUIManager();
  const planetWrapper = usePlanet(uiManager, planetId);
  const planet = planetWrapper.value;

  usePopAllOnSelectedPlanetChanged(modal, planetId);

  const getLoc = () => {
    if (!planet || !uiManager) return { x: 0, y: 0 };
    const loc = uiManager.getLocationOfPlanet(planet.locationId);
    if (!loc) return { x: 0, y: 0 };
    return loc.coords;
  };

  const broadcast = () => {
    if (!planet || !uiManager) return;
    const loc = uiManager.getLocationOfPlanet(planet.locationId);
    if (!loc) return;

    uiManager.revealLocation(loc.hash);
  };

  const [account, setAccount] = useState<EthAddress | undefined>(undefined); // consider moving this one to parent
  const isRevealed = planet?.coordsRevealed;
  const broadcastCooldownPassed = uiManager.getNextBroadcastAvailableTimestamp() <= Date.now();
  const currentlyBroadcastingAnyPlanet = uiManager.isCurrentlyRevealing();

  useEffect(() => {
    if (!uiManager) return;
    setAccount(uiManager.getAccount());
  }, [uiManager]);

  let revealBtn = undefined;

  if (isRevealed) {
    revealBtn = <Btn disabled={true}>Broadcast Coordinates</Btn>;
  } else if (planet?.unconfirmedReveal) {
    revealBtn = (
      <Btn disabled={true}>
        {planet.unconfirmedReveal && <LoadingSpinner initialText={'Broadcasting...'} />}
        {!planet.unconfirmedReveal && 'Broadcast Coordinates'}
      </Btn>
    );
  } else if (!broadcastCooldownPassed) {
    revealBtn = <Btn disabled={true}>Broadcast Coordinates</Btn>;
  } else {
    revealBtn = (
      <Btn disabled={currentlyBroadcastingAnyPlanet} onClick={broadcast}>
        Broadcast Coordinates
      </Btn>
    );
  }

  const warningsSection = (
    <div>
      {currentlyBroadcastingAnyPlanet && (
        <p>
          <Blue>INFO:</Blue> <Sub>Revealing...</Sub>
        </p>
      )}
      {planet?.owner === account && (
        <p>
          <Blue>INFO:</Blue>{' '}
          <Sub>You own this planet! Revealing its location is a dangerous flex.</Sub>
        </p>
      )}
      {isRevealed && (
        <p>
          <Blue>INFO:</Blue>{' '}
          <Sub>This planet's location is already, and can't be revealed again!</Sub>
        </p>
      )}
      {!broadcastCooldownPassed && (
        <p>
          <Blue>INFO:</Blue>{' '}
          <Sub>
            You must wait{' '}
            <TimeUntil
              timestamp={uiManager.getNextBroadcastAvailableTimestamp()}
              ifPassed={'now!'}
            />{' '}
            to reveal another planet.
          </Sub>
        </p>
      )}
    </div>
  );

  return (
    <PaddedRecommendedModalWidth>
      {planet ? (
        <BroadcastWrapper>
          <div>
            <Sub>
              You can broadcast a planet to publically reveal its location on the map. You can only
              broadcast a planet's location once every{' '}
              <White>
                {Math.floor(uiManager.getContractConstants().LOCATION_REVEAL_COOLDOWN / 60 / 60)}
              </White>{' '}
              hours.
            </Sub>
          </div>
          <div className='message'>{warningsSection}</div>
          <div className='row'>
            <span>Coordinates</span>
            <span>{`(${getLoc().x}, ${getLoc().y})`}</span>
          </div>
          <Spacer height={8} />
          <p style={{ textAlign: 'right' }}>{revealBtn}</p>
        </BroadcastWrapper>
      ) : (
        <CenterBackgroundSubtext width='100%' height='75px'>
          Select a Planet
        </CenterBackgroundSubtext>
      )}
    </PaddedRecommendedModalWidth>
  );
}
