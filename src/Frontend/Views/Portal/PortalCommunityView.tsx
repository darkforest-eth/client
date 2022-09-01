import { MapInfo } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadRecentMaps } from '../../../Backend/Network/GraphApi/MapsApi';
import { MapGridDetail } from './Components/MapGridDetail';

export const PortalCommunityView: React.FC<{}> = () => {
  const [portalMaps, setPortalMaps] = useState<MapInfo[]>([]);
  const [numGamesPerConfig, setNumGamesPerConfig] = useState<Map<string, number>>(
    new Map<string, number>()
  );

  useEffect(() => {
    loadRecentMaps(40)
      .then((maps) => {
        if (!maps) return;
        let gameNumMap = numGamesPerConfig;
        maps.forEach((map) => {
          const numMaps = gameNumMap.get(map.configHash);
          if (!!numMaps && map.configHash !== '0x00') {
            let val = numMaps + 1;
            gameNumMap.set(map.configHash, val);
          } else {
            gameNumMap.set(map.configHash, 1);
          }
        });
        const uniqueMaps = maps.filter((m, i) => {
          return (
            m.configHash !== '0x00' && maps.findIndex((m2) => m2.configHash == m.configHash) == i
          );
        });
        setPortalMaps(uniqueMaps);
        setNumGamesPerConfig(gameNumMap);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Container>
      <Main>
        <span style={{ fontSize: '3em', gridColumn: '1/7' }}>Community Maps</span>
        <Grid>
          {portalMaps
            .filter((map) => map.planets && map.planets.length > 0)
            .sort((a, b) => {
              const aVal = numGamesPerConfig.get(a.configHash) || 0;
              const bVal = numGamesPerConfig.get(b.configHash) || 1;
              return bVal - aVal;
            })
            .map((map, index) => (
              <MapGridDetail
                key={index}
                configHash={map.configHash}
                creator={map.creator}
                lobbyAddress={map.lobbyAddress}
                nGames={numGamesPerConfig.get(map.configHash) || 0}
              />
            ))}
        </Grid>
      </Main>
    </Container>
  );
};

const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  height: 100%;
  overflow-y: auto;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  padding: 24px;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow-y: auto;
  margin: 0 auto;
  height: calc(100vh - 56px);
`;
