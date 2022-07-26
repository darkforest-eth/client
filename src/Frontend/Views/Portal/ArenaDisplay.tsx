import { getConfigName } from '@darkforest_eth/procedural';
import { GraphArena } from '@darkforest_eth/types';
import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { convertGraphConfig } from '../../../Backend/Network/ConfigApi';
import { Minimap } from '../../Components/Minimap';
import { TextPreview } from '../../Components/TextPreview';
import { generateMinimapConfig } from '../../Panes/Lobby/MinimapUtils';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';

export interface ArenaData {
  configHash: string;
  startTime: number;
  config: LobbyInitializers;
  count: number;
}

function convertGraphArena(arena: GraphArena): ArenaData {
  return {
    configHash: arena.configHash,
    startTime: arena.startTime,
    count: 1,
    config: convertGraphConfig(arena).config,
  };
}

const mapSize = '125px';

function ArenaCard({ arena }: { arena: ArenaData }) {
  const lastPlayed = new Date(arena.startTime * 1000);
  const formattedDate = `${lastPlayed.getMonth() + 1}/${lastPlayed.getDate() + 1}/${lastPlayed.getFullYear()}`;
  return (
    <Link
      to={`/portal/map/${arena.configHash}`}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: '50%',
        background: 'rgba(255, 255, 255, 0.04)',
        padding: '5px',
        gap: '5px',
      }}
    >
      <Minimap
        style={{ height: mapSize, width: mapSize }}
        minimapConfig={generateMinimapConfig(arena.config, 10)}
      />
      <DetailsContainer>
        <div style={{ fontSize: '1.5em' }}>{getConfigName(arena.configHash)}</div>
        <TextPreview text={arena.configHash} unFocusedWidth={'100px'} focusedWidth='150px' />
        <span>Games: {arena.count}</span>
        <span>Last played: {formattedDate}</span>
      </DetailsContainer>
    </Link>
  );
}

export function ArenaDisplay({ arenas }: { arenas: { arena: GraphArena }[] | undefined }) {
  if (!arenas) return <></>;
  const uniqueArenas: ArenaData[] = [];
  for (const arena of arenas) {
    const found = uniqueArenas.find((a) => a.configHash == arena.arena.configHash);
    if (found) {
      found.count++;
      if (found.startTime < arena.arena.startTime) found.startTime = arena.arena.startTime;
    } else if (!!arena.arena.config) uniqueArenas.push(convertGraphArena(arena.arena));
  }
  uniqueArenas.sort((a, b) => b.count - a.count);

  return (
    <MapInfoContainer>
      {uniqueArenas.map((arena) => (
        <ArenaCard arena={arena} key={`arena-${arena.startTime}-${arena.configHash}`} />
      ))}
    </MapInfoContainer>
  );
}

const MapInfoContainer = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: column;
  height: 100%;
  width: 100%;
  align-items: center;
  padding: 10px;
  gap: 10px;
  overflow: scroll;
`;

const ArenaCardContainer = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  width: '100%',
  background: 'rgba(255, 255, 255, 0.04)',
};

const DetailsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  margin-top: 4px;
  margin-bottom: 4px;
`;
