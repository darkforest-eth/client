import { isLocatable } from '@darkforest_eth/gamelogic';
import { getPlanetBlurb, getPlanetName, getPlanetTagline } from '@darkforest_eth/procedural';
import { LocationId, Planet } from '@darkforest_eth/types';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import ReaderDataStore from '../../Backend/Storage/ReaderDataStore';
import { getPlanetShortHash } from '../../Backend/Utils/Utils';
import { Sub } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { Share } from '../Views/Share';

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

interface SharePlanetData {
  planet: Planet;
  biome: number | null;
  ownerTwitter: string | null;
}

export function SharePlanet({ match }: RouteComponentProps<{ locationId: LocationId }>) {
  async function load(dataStore: ReaderDataStore): Promise<SharePlanetData> {
    const loadedPlanet = await dataStore.loadPlanetFromContract(match.params.locationId);

    return {
      planet: loadedPlanet,
      biome: isLocatable(loadedPlanet) ? loadedPlanet.biome : null,
      ownerTwitter: dataStore.getTwitter(loadedPlanet?.owner) || null,
    };
  }

  return (
    <Share load={load}>
      {(data: SharePlanetData | undefined, loading: boolean, error: Error | undefined) => {
        if (loading) {
          return 'loading';
        }

        if (error || !data) {
          return 'error';
        }

        return (
          <PlanetCard>
            <div>
              {getPlanetShortHash(data.planet)} {getPlanetName(data.planet)}
            </div>
            <div>
              <p>
                <em>{getPlanetTagline(data.planet)}...</em>
                <span>
                  <Sub>{getPlanetBlurb(data.planet)}</Sub>
                </span>
              </p>
              <p>{`Owner: ${data.ownerTwitter || data.planet.owner}`}</p>
              <p>{`Energy: ${data.planet.energy}`}</p>
              <p>{`Biome: ${data.biome || 'unknown'}`}</p>
              <p>
                Find this planet in-game at <a href='/'>http://zkga.me</a> to read more!
              </p>
            </div>
          </PlanetCard>
        );
      }}
    </Share>
  );
}
