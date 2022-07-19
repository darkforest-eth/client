import { EthAddress, LiveMatch, LiveMatchEntry, ExtendedMatchEntry } from '@darkforest_eth/types';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Subber } from '../../Components/Text';
import dfstyles from '../../Styles/dfstyles';
import { useTwitters } from '../../Utils/AppHooks';
import { formatStartTime } from '../../Utils/TimeUtils';
import { compPlayerToEntry } from '../Leaderboards/ArenaLeaderboard';
import { GenericErrorBoundary } from '../GenericErrorBoundary';

export interface FindMatchProps {
  game: LiveMatch | undefined;
  error: Error | undefined;
  nPlayers: number;
}

export interface MatchDetails {
  creator: EthAddress;
  matchType: 'Solo' | '1v1';
  totalSpots: number;
  spotsTaken: number;
  matchId: string;
  startTime: number;
  players: { address: string }[] | undefined;
}

export const MatchComponent: React.FC<MatchDetails> = ({
  creator,
  matchType,
  totalSpots,
  spotsTaken,
  matchId,
  startTime,
  players,
}) => {
  const twitters = useTwitters();

  return (
    <MatchContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <span>By: {compPlayerToEntry(creator, twitters[creator])}</span>
        {players &&
          players.length > 0 && <span>Players: </span> &&
          players.map((p) => (
            <span key={p.address}>{compPlayerToEntry(p.address, twitters[p.address])}</span>
          ))}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>{matchType}</span>
          {totalSpots == spotsTaken ? (
            <span style={{ color: dfstyles.colors.dfred }}>
              {totalSpots - spotsTaken} / {totalSpots} spots available
            </span>
          ) : (
            <span style={{ color: dfstyles.colors.dfgreen }}>
              {totalSpots - spotsTaken} / {totalSpots} spots available
            </span>
          )}
        </div>
        <div>Creation Time: {formatStartTime(startTime)}</div>
      </div>
      <Link to={`/play/${matchId}`} target='_blank'>
        {totalSpots == spotsTaken ? (
          <MatchButton>View</MatchButton>
        ) : (
          <MatchButton>Join</MatchButton>
        )}
      </Link>
    </MatchContainer>
  );
};

export const FindMatch: React.FC<FindMatchProps> = ({ game, error, nPlayers }) => {
  return (
    <GenericErrorBoundary errorMessage={"Couldn't load matches"}>
      <Container>
        {game ? (
          game.entries.length == 0 ? (
            <Subber>No live games</Subber>
          ) : (
            game.entries.map((entry: ExtendedMatchEntry) => (
              <MatchComponent
                key={entry.id}
                creator={entry.creator}
                matchType='1v1'
                totalSpots={nPlayers}
                spotsTaken={entry.players ? entry.players.length : 0}
                matchId={entry.id}
                startTime={entry.startTime}
                players={entry.players}
              />
            ))
          )
        ) : (
          <></>
        )}
      </Container>
    </GenericErrorBoundary>
  );
};

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  overflow: auto;
`;

const MatchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${dfstyles.colors.borderDark};
  background: ${dfstyles.colors.backgrounddark};
  padding: 16px;
  border-radius: 6px;
  align-items: center;
`;

const MatchButton = styled.button`
  border-radius: 3px;
  padding: 8px 16px;
  background: ${dfstyles.colors.backgroundlighter};
  border: 1px solid ${dfstyles.colors.border};
  color: #fff;
  text-transform: uppercase;
  transition: all 0.2s ease;
  &:hover {
    background: ${dfstyles.colors.border};
    text: ${dfstyles.colors.background};
  }
`;
