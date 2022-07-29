import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { competitiveConfig, tutorialConfig } from '../../Utils/constants';
import { loadRecentMaps, MapInfo } from '../../../Backend/Network/GraphApi/MapsApi';
import { OfficialGameBanner } from './Components/OfficialGameBanner';

export const PortalHomeView: React.FC<{}> = () => {
  const [portalMaps, setPortalMaps] = useState<MapInfo[]>([]);

  useEffect(() => {
    loadRecentMaps(10)
      .then((maps) => {
        if (!maps) return;
        const uniqueMaps = maps.filter(
          (m, i) =>
            m.configHash !== '0x00' && maps.findIndex((m2) => m2.configHash == m.configHash) == i
        );
        setPortalMaps(uniqueMaps);
      })

      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <Container>
      <Content>
        <span style={{ fontSize: '3em', gridColumn: '1/7' }}>Welcome to Dark Forest Arena!</span>
        <OfficialGameBanner
          title='Play Galactic League'
          description='Race the clock to finish fastest!'
          style={{ gridColumn: '1 / 4' }}
          link={`/portal/map/${competitiveConfig}`}
          imageUrl='/public/img/deathstar.png'
        />
        <OfficialGameBanner
          title='Find a match (IP)'
          description='Use on-chain matchmaking to join a game'
          disabled
          style={{ gridColumn: '4 / 7' }}
          link={`/portal/map/${competitiveConfig}`}
          imageUrl='/public/img/deathstar.png'
        />
        <OfficialGameBanner
          title='Tutorial (IP)'
          description='Learn to play'
          disabled
          style={{ gridColumn: '1 / 3', gridRow: '3/4' }}
          link={`/portal/map/${tutorialConfig}`}
          imageUrl='/public/img/tutorial-banner.png'
        />
        <OfficialGameBanner
          title='Create a map'
          description='Design the round of your dreams'
          style={{ gridColumn: '3 / 5', gridRow: '3/4' }}
          link={`/arena`}
          imageUrl='/public/img/deathstar.png'
        />
        <OfficialGameBanner
          title='Community Maps (IP)'
          description='Explore maps created by others'
          disabled
          style={{ gridColumn: '5 / 7', gridRow: '3/4' }}
          link={`/portal/map/${competitiveConfig}`}
          imageUrl='/public/img/deathstar.png'
        />
      </Content>
    </Container>
  );
};
const Content = styled.div`
  display: grid;
  height: 100%;
  overflow: hidden;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 50px calc(60% - 40px) calc(40% - 40px);
  grid-gap: 16px;
  padding: 24px;
  height: 100%;
  width: 70%;
`;
const Container = styled.div`
  display: flex;
  gap: 10px;
  width: 100%;
  justify-content: center;
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
