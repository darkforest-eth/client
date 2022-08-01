import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadRecentMaps, MapInfo } from '../../../Backend/Network/GraphApi/MapsApi';
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

// TODO: Replace this with LobbyButton when #68 is merged
export const ArenaPortalButton = styled.button<{ secondary?: boolean }>`
  padding: 8px 16px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: ${({ secondary }) => (!secondary ? '2px solid #2EE7BA' : '1px solid #5F5F5F')};
  color: ${({ secondary }) => (!secondary ? '#2EE7BA' : '#fff')};
  background: ${({ secondary }) => (!secondary ? '#09352B' : '#252525')};
  padding: 16px;
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 80ms ease 0s, border-color;
  &:hover {
    background: ${({ secondary }) => (!secondary ? '#0E5141' : '#3D3D3D')};
    border-color: ${({ secondary }) => (!secondary ? '#30FFCD' : '#797979')};
  }
`;

const MoreGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  grid-gap: 10px;
  margin-top: 16px;
`;

const MoreMapsContainer = styled.div`
  overflow-y: auto;
`;
