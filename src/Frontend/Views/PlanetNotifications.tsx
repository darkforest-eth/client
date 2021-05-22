import React, { useCallback } from 'react';
import { Planet } from '@darkforest_eth/types';
import styled from 'styled-components';
import { isFindable, isProspectable } from '../../Backend/GameLogic/ArrivalUtils';
import { SpacedFlexRow } from '../Components/FlexRows';
import { Btn } from '../Components/Btn';
import { Sub } from '../Components/Text';
import { ModalHook } from './ModalPane';
import dfstyles from '../Styles/dfstyles';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { useUIManager } from '../Utils/AppHooks';
import { GameObjects } from '../../Backend/GameLogic/GameObjects';

export enum PlanetNotifType {
  PlanetCanUpgrade,
  CanProspect,
  CanFindArtifact,
  MaxSilver,
}

const StyledPlanetNotifications = styled.div`
  font-size: ${dfstyles.fontSizeXS};
`;

export type PlanetNotifHooks = {
  upgradeDetHook: ModalHook;
};

export function getNotifsForPlanet(
  planet: Planet | undefined,
  currentBlockNumber: number | undefined
): PlanetNotifType[] {
  const notifs: PlanetNotifType[] = [];
  if (!planet) return notifs;
  if (GameObjects.planetCanUpgrade(planet)) notifs.push(PlanetNotifType.PlanetCanUpgrade);
  if (isProspectable(planet)) notifs.push(PlanetNotifType.CanProspect);
  if (isFindable(planet, currentBlockNumber)) notifs.push(PlanetNotifType.CanFindArtifact);
  if (planet.silver / planet.silverCap > 0.995) notifs.push(PlanetNotifType.MaxSilver);

  return notifs;
}

const Wrap = styled.div`
  width: 100%;
  height: fit-content;
`;

const PlanetCanUpgradeRow = ({ upgradeDetHook }: PlanetNotifHooks) => (
  <SpacedFlexRow>
    <Sub>This planet can upgrade!</Sub>
    <Btn onClick={() => upgradeDetHook[1](true)}>View</Btn>
  </SpacedFlexRow>
);

const PlanetMaxSilverRow = () => (
  <SpacedFlexRow>
    <Sub>This planet has max silver!</Sub>
  </SpacedFlexRow>
);

function FindArtifactRow({ wrapper }: { wrapper: Wrapper<Planet | undefined> }) {
  const uiManager = useUIManager();
  const find = useCallback(
    () => wrapper.value && uiManager?.findArtifact(wrapper.value.locationId),
    [wrapper, uiManager]
  );

  return (
    <SpacedFlexRow>
      <Sub>You can find an artifact on this Foundry!</Sub>
      {wrapper.value?.unconfirmedFindArtifact ? (
        <Sub>
          <LoadingSpinner initialText={'find...'} />
        </Sub>
      ) : (
        <Btn onClick={find}>Find</Btn>
      )}
    </SpacedFlexRow>
  );
}

function CanProspectRow({ wrapper }: { wrapper: Wrapper<Planet | undefined> }) {
  const uiManager = useUIManager();
  const prospect = useCallback(
    () => wrapper.value && uiManager?.prospectPlanet(wrapper.value.locationId),
    [wrapper, uiManager]
  );

  return (
    <SpacedFlexRow>
      <Sub>You can prospect this Foundry!</Sub>
      {wrapper.value?.unconfirmedProspectPlanet ? (
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
  wrapper,
  upgradeDetHook,
}: { notifs: PlanetNotifType[]; wrapper: Wrapper<Planet | undefined> } & PlanetNotifHooks) {
  return (
    <StyledPlanetNotifications>
      {notifs.map((notif) => (
        <Wrap key={notif}>
          {notif === PlanetNotifType.PlanetCanUpgrade && (
            <PlanetCanUpgradeRow upgradeDetHook={upgradeDetHook} />
          )}
          {notif === PlanetNotifType.MaxSilver && <PlanetMaxSilverRow />}
          {notif === PlanetNotifType.CanFindArtifact && <FindArtifactRow wrapper={wrapper} />}
          {notif === PlanetNotifType.CanProspect && <CanProspectRow wrapper={wrapper} />}
        </Wrap>
      ))}
    </StyledPlanetNotifications>
  );
}
