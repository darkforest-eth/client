import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { loadRecentMaps, MapInfo } from '../../../Backend/Network/MapsApi';
import { Spacer } from '../../Components/CoreUI';
import { competitiveConfig } from '../../Utils/constants';
import { MapGridDetail } from './Components/MapGridDetail';
import { OfficialGameBanner } from './Components/OfficialGameBanner';

export const PortalHomeView: React.FC<{}> = () => {
  const [portalMaps, setPortalMaps] = useState<MapInfo[]>([]);

  useEffect(() => {
    loadRecentMaps(10)
      .then((maps) => {
        if (!maps) return;
        const uniqueMaps = maps.filter(
          (m, i) => m.configHash !== '0x00' && maps.findIndex((m2) => m2.configHash == m.configHash) == i
        );
        setPortalMaps(uniqueMaps);
      })

      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Container>
      <span style = {{fontSize: '3em'}}>Welcome to Dark Forest Arena!</span>
      <span style = {{fontSize: '1.5em'}}>
        Play our official map, discover community-created matches, or view data about other players.
      </span>

      <OfficialGameBanner configHash={competitiveConfig} />
      <Spacer height={24} />
      <span style={{ fontSize: '1rem' }}>Explore Community Maps</span>
      <MoreMapsContainer>
        <MoreGrid>
          {portalMaps.map((m, i) => (
            <MapGridDetail
              configHash={m.configHash}
              creator={m.creator}
              lobbyAddress={m.lobbyAddress ?? undefined}
              key={i}
            />
          ))}
        </MoreGrid>
      </MoreMapsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem;
  overflow-y: auto;
  height: 100%;
  overflow: hidden;
`;

// TODO: Replace this with LobbyButton when #68 is merged
export const ArenaPortalButton = styled.button<{ secondary?: boolean }>`
  padding: 8px 16px;
  border-radius: 3px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
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
