import { EthAddress, LiveMatch, ExtendedMatchEntry, CleanMatchEntry } from '@darkforest_eth/types';
import React, { CSSProperties } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Subber } from '../../Components/Text';
import dfstyles from '../../Styles/dfstyles';
import { useTwitters } from '../../Utils/AppHooks';
import { formatStartTime } from '../../Utils/TimeUtils';
import { compPlayerToEntry } from '../Leaderboards/ArenaLeaderboard';
import { GenericErrorBoundary } from '../GenericErrorBoundary';
import { getConfigName } from '@darkforest_eth/procedural';
import { Btn } from '../../Components/Btn';
import { Row } from '../../Components/Row';
import _ from 'lodash';
import Button from '../../Components/Button';

export interface FindMatchProps {
  game: LiveMatch | undefined;
}

export interface MatchDetails {
  configHash: string;
  creator: EthAddress;
  matchType: 'Solo' | '1v1';
  totalSpots: number;
  spotsTaken: number;
  matchId: string;
  startTime: number;
  players: string[] | undefined;
}

export const MatchComponent: React.FC<MatchDetails> = ({
  configHash,
  creator,
  matchType,
  totalSpots,
  spotsTaken,
  matchId,
  startTime,
  players,
}) => {
  const { twitters } = useTwitters();
  const history = useHistory();

  return (
    <MatchContainer>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <Button onClick={() => history.push(`map/${configHash}`)}>
          {getConfigName(configHash)}
        </Button>
        <span>By: {compPlayerToEntry(creator, twitters[creator])}</span>
        {players && players.length > 0 && (
          <span>
            Players:{' '}
            {players.map((p) => (
              <span key={p}>{compPlayerToEntry(p, twitters[p])}</span>
            ))}
          </span>
        )}
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
        <Link to={`/play/${matchId}`} target='_blank'>
          {totalSpots == spotsTaken ? (
            <MatchButton>View</MatchButton>
          ) : (
            <MatchButton>Join</MatchButton>
          )}
        </Link>
      </div>
    </MatchContainer>
  );
};

const chunkSize = 2;

export const FindMatch: React.FC<FindMatchProps> = ({ game }) => {
  return (
    <GenericErrorBoundary errorMessage={"Couldn't load matches"}>
      <Container>
        {!game ? (
          <span>Loading...</span>
        ) : game.entries.length == 0 ? (
          <Subber>No live games</Subber>
        ) : (
          _.chunk(game.entries, chunkSize).map((items, rowIdx) => (
            <Row
              key={`row-${rowIdx}`}
              style={{ gap: '16px' } as CSSStyleDeclaration & CSSProperties}
            >
              {items
                .filter((entry) => entry.numSpawn > 0)
                .map((entry: CleanMatchEntry) => (
                  <MatchComponent
                    configHash={entry.configHash}
                    key={entry.lobbyAddress}
                    creator={entry.creator}
                    matchType='1v1'
                    totalSpots={entry.numSpawn}
                    spotsTaken={entry.players.length}
                    matchId={entry.lobbyAddress}
                    startTime={entry.startTime}
                    players={entry.players}
                  />
                ))}
            </Row>
          ))
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
  width: 100%;
`;

const MatchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border: 1px solid ${dfstyles.colors.borderDark};
  background: ${dfstyles.colors.backgrounddark};
  padding: 16px;
  border-radius: 6px;
  width: 100%;
  height: 100%;
`;

export const MatchButton = styled.button`
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
