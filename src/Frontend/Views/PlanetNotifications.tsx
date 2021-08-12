import { Planet } from '@darkforest_eth/types';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import {
  enoughEnergyToProspect,
  isFindable,
  isProspectable,
} from '../../Backend/GameLogic/ArrivalUtils';
import { GameObjects } from '../../Backend/GameLogic/GameObjects';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Btn } from '../Components/Btn';
import { Display } from '../Components/CoreUI';
import { SpacedFlexRow } from '../Components/FlexRows';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Sub } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { EmojiPlanetNotification } from './EmojiPlanetNotification';

export const enum PlanetNotifType {
  PlanetCanUpgrade,
  CanProspect,
  CanFindArtifact,
  MaxSilver,
  CanAddEmoji,
}

const StyledPlanetNotifications = styled.div`
  font-size: ${dfstyles.fontSizeXS};

  > div {
    margin-bottom: 4px;

    &:last {
      margin-bottom: 0;
    }
  }
`;

export function getNotifsForPlanet(
  planet: Planet | undefined,
  currentBlockNumber: number | undefined
): PlanetNotifType[] {
  const notifs: PlanetNotifType[] = [];
  if (!planet) return notifs;
  if (GameObjects.planetCanUpgrade(planet)) notifs.push(PlanetNotifType.PlanetCanUpgrade);
  if (isProspectable(planet) && enoughEnergyToProspect(planet))
    notifs.push(PlanetNotifType.CanProspect);
  if (isFindable(planet, currentBlockNumber)) notifs.push(PlanetNotifType.CanFindArtifact);
  if (planet.silver / planet.silverCap > 0.995) notifs.push(PlanetNotifType.MaxSilver);

  notifs.push(PlanetNotifType.CanAddEmoji);

  return notifs;
}

function EmojiRow({ wrapper }: { wrapper: Wrapper<Planet | undefined> }) {
  return <EmojiPlanetNotification wrapper={wrapper} />;
}

const PlanetCanUpgradeRow = () => (
  <SpacedFlexRow>
    <Sub>This planet can upgrade!</Sub>
  </SpacedFlexRow>
);

const PlanetMaxSilverRow = () => (
  <SpacedFlexRow>
    <Sub>This planet has max silver!</Sub>
  </SpacedFlexRow>
);

function FindArtifactRow({ planet }: { planet: Wrapper<Planet | undefined> }) {
  const uiManager = useUIManager();

  const locId = planet.value?.locationId;
  const find = useCallback(() => locId && uiManager?.findArtifact(locId), [locId, uiManager]);

  return (
    <SpacedFlexRow>
      <Sub>Find an artifact on this Foundry for points!</Sub>
      {planet.value?.unconfirmedFindArtifact ? (
        <Sub>
          <LoadingSpinner initialText={'find...'} />
        </Sub>
      ) : (
        <Btn onClick={find}>Find</Btn>
      )}
    </SpacedFlexRow>
  );
}

function CanProspectRow({ planet }: { planet: Wrapper<Planet | undefined> }) {
  const uiManager = useUIManager();
  const prospect = useCallback(
    () => planet.value && uiManager?.prospectPlanet(planet.value.locationId),
    [planet, uiManager]
  );

  return (
    <SpacedFlexRow>
      <Sub>You can prospect this Foundry!</Sub>
      {planet.value?.unconfirmedProspectPlanet ? (
        <Sub>
          <LoadingSpinner initialText={'prospect...'} />
        </Sub>
      ) : (
        <Btn onClick={prospect}>Prospect</Btn>
      )}
    </SpacedFlexRow>
  );
}

export function PlanetNotifications({
  notifs,
  planet,
}: {
  notifs: PlanetNotifType[];
  planet: Wrapper<Planet | undefined>;
}) {
  return (
    <StyledPlanetNotifications>
      {notifs.map((notif, i) => (
        <div key={i}>
          <Display visible={notif === PlanetNotifType.PlanetCanUpgrade}>
            <PlanetCanUpgradeRow />
          </Display>
          <Display visible={notif === PlanetNotifType.MaxSilver}>
            <PlanetMaxSilverRow key={notif + (planet.value?.locationId + '')} />
          </Display>
          <Display visible={notif === PlanetNotifType.CanFindArtifact}>
            <FindArtifactRow planet={planet} key={notif + (planet.value?.locationId + '')} />
          </Display>
          <Display visible={notif === PlanetNotifType.CanProspect}>
            <CanProspectRow planet={planet} key={notif + (planet.value?.locationId + '')} />
          </Display>
          <Display visible={notif === PlanetNotifType.CanAddEmoji}>
            <EmojiRow wrapper={planet} key={notif + (planet.value?.locationId + '')} />
          </Display>
        </div>
      ))}
    </StyledPlanetNotifications>
  );
}
