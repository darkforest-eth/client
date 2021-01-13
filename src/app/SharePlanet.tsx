import React, { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { isLocatable, LocationId, Planet } from '../_types/global/GlobalTypes';
import { PlanetScape } from './planetscape/PlanetScape';
import { getPlanetShortHash } from '../utils/Utils';
import { ProcgenUtils } from '../utils/ProcgenUtils';
import LandingPageCanvas from './LandingPageCanvas';
import dfstyles from '../styles/dfstyles';
import { Sub } from '../components/Text';
import SinglePlanetDataStore, {
  SinglePlanetDataStoreEvent,
} from '../api/SinglePlanetDataStore';
import { CheckedTypeUtils } from '../utils/CheckedTypeUtils';
import EthConnection from '../api/EthConnection';

const PlanetCard = styled.div`
  width: 36em;
  margin: 2em auto;
  font-size: 14pt;
  z-index: 1000;
  background: ${dfstyles.colors.background};
  border-radius: 3px;
  border: 1px solid ${dfstyles.colors.text};

  & > div {
    width: 100%;
    padding: 0.5em;
    &:nth-child(1) {
      // header
      border-bottom: 1px solid ${dfstyles.colors.subtext};
    }
    &:nth-child(2) {
      // scape
      height: 350px;
    }
  }
`;

const SharePlanetWrapper = styled.div`
  width: 100%;
  height: 100%;

  & p {
    margin: 0.5em 0;
    & a {
      color: ${dfstyles.colors.dfblue};
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;

export function SharePlanet({ match }: RouteComponentProps) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { locationId } = match.params as { locationId: LocationId };

  const [loading, setLoading] = useState<boolean>(true);
  const [
    planetDataStore,
    setPlanetDataStore,
  ] = useState<SinglePlanetDataStore | null>(null);
  const [planet, setPlanet] = useState<Planet | null>(null);
  const [biome, setBiome] = useState<number | null>(null);
  const [ownerTwitter, setOwnerTwitter] = useState<string | null>(null);

  const knownAddrs = EthConnection.getInstance().getKnownAccounts();

  /**
   * 2nd order function because u need to pass in a function for click handler
   */
  const selectAccount = (addr: string) => () => {
    planetDataStore?.switchAccount(CheckedTypeUtils.address(addr));
  };

  useEffect(() => {
    SinglePlanetDataStore.create(locationId).then((store) => {
      setPlanetDataStore(store);
      setLoading(false);
      store.on(SinglePlanetDataStoreEvent.REFRESHED_PLANET, () => {
        const refreshedPlanet = store.getPlanet();
        if (refreshedPlanet) {
          setPlanet(refreshedPlanet);
          if (isLocatable(refreshedPlanet)) setBiome(refreshedPlanet.biome);
          setOwnerTwitter(store.getPlanetOwnerTwitter());
        }
      });
    });
  }, [locationId]);

  return loading ? (
    <p>loading...</p>
  ) : (
    <SharePlanetWrapper>
      <LandingPageCanvas />
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 2,
        }}
      >
        <div>
          <p>view as account...</p>
          {knownAddrs.map((addr, i) => (
            <p onClick={selectAccount(addr)} key={i}>
              {addr}
            </p>
          ))}
        </div>
        <PlanetCard>
          <div>
            {getPlanetShortHash(planet)} {ProcgenUtils.getPlanetName(planet)}
          </div>
          <div>
            <PlanetScape planet={planet} info={null} keepDrawing={true} />
          </div>
          <div>
            <p>
              <em>{ProcgenUtils.getPlanetTagline(planet)}...</em>
              <p>
                <Sub>{ProcgenUtils.getPlanetBlurb(planet)}</Sub>
              </p>
            </p>
            <p>{`Owner: ${ownerTwitter || planet?.owner}`}</p>
            <p>{`Energy: ${planet?.energy}`}</p>
            <p>{`Biome: ${biome || 'unknown'}`}</p>
            <p>
              Find this planet in-game at <a href='/'>http://zkga.me</a> to read
              more!
            </p>
          </div>
        </PlanetCard>
      </div>
    </SharePlanetWrapper>
  );
}
