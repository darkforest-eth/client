import { EthAddress, MapInfo } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dfstyles from '../../Styles/dfstyles';
import { Text } from '../../Components/Text';
import { Link, useHistory } from 'react-router-dom';
import { ArenaPortalButton } from './PortalHomeView';
import { loadRecentMaps } from '../../../Backend/Network/GraphApi/MapsApi';
import { getConfigName } from '@darkforest_eth/procedural';
import { formatDate } from '../../Utils/TimeUtils';
import { useEthConnection } from '../../Utils/AppHooks';

const SidebarMap: React.FC<{
  configHash: string;
  startTime?: number;
}> = ({ configHash, startTime }) => {
  const history = useHistory();
  const lastPlayed = startTime && new Date(startTime * 1000);
  const formattedDate = lastPlayed && `${formatDate(lastPlayed)}`;
  return (
    <SidebarMapContainer onClick={() => history.push(`/portal/map/${configHash}`)}>
      <SidebarMapTitle>{getConfigName(configHash)}</SidebarMapTitle>
      <span>Last played {formattedDate}</span>
    </SidebarMapContainer>
  );
};

export function PortalSidebarView() {
  const [recentlyPlayedMaps, setRecentlyPlayedMaps] = useState<MapInfo[]>([]);
  const connection = useEthConnection();
  useEffect(() => {
    loadRecentMaps(15, undefined, connection.getAddress())
      .then((maps: MapInfo[]) => {
        if (!maps) return;
        const uniqueMaps = maps.filter(
          (m, i) => maps.findIndex((m2) => m2.configHash == m.configHash) == i
        );
        setRecentlyPlayedMaps(uniqueMaps);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);

  return (
    <SidebarContainer>
      <Text style={{ fontSize: '1.5em', textTransform: 'uppercase' }}>Dark Forest Arena</Text>
      <Link style={{ width: '100%' }} to={`/arena/`} target='blank'>
        <ArenaPortalButton secondary>New Arena</ArenaPortalButton>
      </Link>
      <span>
        {recentlyPlayedMaps.length > 0
          ? 'Your recently created maps'
          : 'Your recently created maps will appear here'}
      </span>
      {recentlyPlayedMaps.map((m) => (
        <SidebarMap
          key={`index-${m.configHash}`}
          configHash={m.configHash}
          startTime={m.startTime}
        />
      ))}
    </SidebarContainer>
  );
}

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 16px 12px;
  box-sizing: border-box;
  z-index: 10;
  overflow-y: auto;
  width: 246px;
  gap: 15px;
`;

const SidebarMapContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 8px 16px;
  border-radius: 4px;
  background-color: ${dfstyles.colors.backgrounddark};
  color: #bbb;
  cursor: pointer;
`;

const SidebarMapTitle = styled.span`
  font-size: 16px;
  color: #fff;
`;
