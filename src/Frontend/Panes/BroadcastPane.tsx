import React, { useState, useEffect } from 'react';
import { ModalPane, ModalName, ModalHook } from '../Views/ModalPane';
import styled from 'styled-components';
import { EthAddress } from '@darkforest_eth/types';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext, Spacer } from '../Components/CoreUI';
import { Blue, Sub, White } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useUIManager, useSelectedPlanet } from '../Utils/AppHooks';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { TimeUntil } from '../Components/TimeUntil';
import { TextPreview } from '../Components/TextPreview';
import { EMPTY_ADDRESS } from '@darkforest_eth/constants';

const BroadcastWrapper = styled.div`
  width: 30em;
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

function HelpContent() {
  return (
    <div>
      <p>
        Broadcasting a planet reveals its coordinates on-chain. This means that every single player
        will be able to see the broadcasted planet on their map, even if they haven't mined it yet.
      </p>
      <Spacer height={8} />
      <p>
        Broadcasting can be a potent offensive tactic! Reveal a powerful enemy's location, and maybe
        someone else will take care of them for you?
      </p>
    </div>
  );
}

export function BroadcastPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const selectedWrapper = useSelectedPlanet(uiManager);
  const selected = selectedWrapper.value;

  const getLoc = () => {
    if (!selected || !uiManager) return { x: 0, y: 0 };
    const loc = uiManager.getLocationOfPlanet(selected.locationId);
    if (!loc) return { x: 0, y: 0 };
    return loc.coords;
  };

  const getOwner = () => {
    if (!selected || !uiManager) return;
    const twitter = uiManager.getTwitter(selected.owner);
    let name = selected.owner as string;
    if (twitter) name = '@' + twitter;

    if (name === EMPTY_ADDRESS) {
      return 'Unclaimed';
    }

    return <TextPreview text={name} />;
  };

  const broadcast = () => {
    if (!selected || !uiManager) return;
    const loc = uiManager.getLocationOfPlanet(selected.locationId);
    if (!loc) return;

    uiManager.revealLocation(loc.hash);
  };

  const [account, setAccount] = useState<EthAddress | undefined>(undefined); // consider moving this one to parent
  const isRevealed = selected?.coordsRevealed;
  const broadcastCooldownPassed = uiManager.getNextBroadcastAvailableTimestamp() <= Date.now();
  const currentlyBroadcastingAnyPlanet = uiManager.isCurrentlyRevealing();

  useEffect(() => {
    if (!uiManager) return;
    setAccount(uiManager.getAccount());
  }, [uiManager]);

  const windowName = (): string => {
    return 'Broadcast Planet Coordinates';
  };

  let revealBtn = undefined;

  if (isRevealed) {
    revealBtn = <Btn disabled={true}>Broadcast Coordinates</Btn>;
  } else if (selected?.unconfirmedReveal) {
    revealBtn = (
      <Btn disabled={true}>
        {selected.unconfirmedReveal && <LoadingSpinner initialText={'Broadcasting...'} />}
        {!selected.unconfirmedReveal && 'Broadcast Coordinates'}
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
      {selected?.owner === account && (
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
    <ModalPane
      hook={hook}
      title={windowName()}
      name={ModalName.TwitterVerify}
      helpContent={HelpContent}
    >
      {selected ? (
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
          <div className='row'>
            <span>Owner</span>
            <span>{getOwner()}</span>
          </div>
          <Spacer height={8} />
          <p style={{ textAlign: 'right' }}>{revealBtn}</p>
        </BroadcastWrapper>
      ) : (
        <CenterBackgroundSubtext width='300px' height='75px'>
          Select a Planet
        </CenterBackgroundSubtext>
      )}
    </ModalPane>
  );
}
