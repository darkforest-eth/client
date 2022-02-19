import { isLocatable } from '@darkforest_eth/gamelogic';
import { EthAddress, Planet } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { GameObjects } from '../../Backend/GameLogic/GameObjects';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { AccountLabel } from '../Components/Labels/Labels';
import { Row } from '../Components/Row';
import { Sub } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { EmojiPlanetNotification } from './EmojiPlanetNotification';

export const enum PlanetNotifType {
  PlanetCanUpgrade,
  Claimed,
  DistanceFromCenter,
  CanAddEmoji,
}

const StyledPlanetNotifications = styled.div`
  font-size: ${dfstyles.fontSizeXS};
`;

export function getNotifsForPlanet(
  planet: Planet | undefined,
  account: EthAddress | undefined
): PlanetNotifType[] {
  const notifs: PlanetNotifType[] = [];
  if (!planet) return notifs;

  if (planet?.owner === account && account !== undefined) {
    if (GameObjects.planetCanUpgrade(planet)) notifs.push(PlanetNotifType.PlanetCanUpgrade);
    if (process.env.DF_WEBSERVER_URL) notifs.push(PlanetNotifType.CanAddEmoji);
  }

  return notifs;
}

function EmojiRow({ wrapper }: { wrapper: Wrapper<Planet | undefined> }) {
  return <EmojiPlanetNotification wrapper={wrapper} />;
}

const PlanetCanUpgradeRow = () => (
  <Row>
    <Sub>This planet can upgrade!</Sub>
  </Row>
);

export const DistanceFromCenterRow = ({ planet }: { planet: Wrapper<Planet | undefined> }) =>
  planet.value && isLocatable(planet.value) ? (
    <Row>
      <Sub>
        Distance From Center:{' '}
        {Math.floor(
          Math.sqrt(
            planet.value.location.coords.x ** 2 + planet.value.location.coords.y ** 2 + 0.001
          )
        ).toLocaleString()}
      </Sub>
    </Row>
  ) : (
    <Sub>Unclaimed</Sub>
  );

export const PlanetClaimedRow = ({ planet }: { planet: Wrapper<Planet | undefined> }) =>
  planet.value?.claimer ? (
    <Row>
      <Sub>
        Claimed by{' '}
        <AccountLabel ethAddress={planet.value?.claimer} includeAddressIfHasTwitter={true} />
      </Sub>
    </Row>
  ) : (
    <Sub>Unclaimed</Sub>
  );

function renderNotification(notif: PlanetNotifType, planet: Wrapper<Planet | undefined>) {
  switch (notif) {
    case PlanetNotifType.PlanetCanUpgrade:
      return <PlanetCanUpgradeRow />;
    case PlanetNotifType.CanAddEmoji:
      return <EmojiRow wrapper={planet} key={notif + (planet.value?.locationId + '')} />;
    case PlanetNotifType.Claimed:
      return <PlanetClaimedRow key={notif + (planet.value?.locationId + '')} planet={planet} />;
    case PlanetNotifType.DistanceFromCenter:
      return <DistanceFromCenterRow planet={planet} />;
    default:
      return null;
  }
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
        <div key={i}>{renderNotification(notif, planet)}</div>
      ))}
    </StyledPlanetNotifications>
  );
}
