import { ArenaLeaderboard, ArtifactRarity, Leaderboard, LeaderboardEntry } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRank, Rank } from '../../Backend/Utils/Rank';
import { Spacer } from '../Components/CoreUI';
import { Gnosis, Star } from '../Components/Icons';
import { TwitterLink } from '../Components/Labels/Labels';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Red, Subber } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { RarityColors } from '../Styles/Colors';
import dfstyles from '../Styles/dfstyles';
import { useArenaLeaderboard, useCompetitiveLeaderboard } from '../Utils/AppHooks';
import { roundEndTimestamp, roundStartTimestamp } from '../Utils/constants';
import { formatDuration } from '../Utils/TimeUtils';
import { GenericErrorBoundary } from './GenericErrorBoundary';
import { SortableTable } from './SortableTable';
import { Table } from './Table';

const errorMessage = 'Error Loading Leaderboard';

export function ArenaLeaderboardDisplay() {
  // const { leaderboard, error } = useArenaLeaderboard(true);

  const { competitiveLeaderboard, competitiveError } = useCompetitiveLeaderboard(true);

  return (
    <GenericErrorBoundary errorMessage={errorMessage}>
      <LeaderboardContainer>
        <StatsTableContainer>
          <StatsTable>
            <LeaderboardContainer>
              <CountDown />
              <ArenasCreated leaderboard={competitiveLeaderboard} error={competitiveError} />
            </LeaderboardContainer>
          </StatsTable>
        </StatsTableContainer>
        <Spacer height={8} />
        <CompetitiveLeaderboardBody leaderboard={competitiveLeaderboard} error={competitiveError} />
      </LeaderboardContainer>
    </GenericErrorBoundary>
  );
}

function scoreToString(score?: number | null) {
  if (score === null || score === undefined) {
    return 'n/a';
  }
  score = Math.floor(score);
  if (score < 10000) {
    return score + '';
  }

  return score.toLocaleString();
}

function scoreToTime(score?: number | null) {
  if (score === null || score === undefined) {
    return 'n/a';
  }
  score = Math.floor(score);

  const seconds = String(score % 60).padStart(2, '0');
  const minutes = String(Math.floor(score / 60) % 60).padStart(2, '0');
  const hours = String(Math.min(99, Math.floor(score / 3600))).padStart(2, '0');

  return hours + ':' + minutes + ':' + seconds;
}

// pass in either an address, or a twitter handle. this function will render the appropriate
// component
function compPlayerToEntry(
  playerAddress: string,
  playerTwitter: string | undefined,
  color: string
) {
  return (
    <span
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '5px' }}
    >
      {playerTwitter ? (
        <TwitterLink twitter={playerTwitter} color={color} />
      ) : (
        <TextPreview text={playerAddress} focusedWidth={'150px'} unFocusedWidth={'150px'} />
      )}

      <a
        style={{ display: 'flex', alignItems: 'center' }}
        target="_blank"
        href={`https://blockscout.com/xdai/optimism/address/${playerAddress}`}
      >
        <GnoButton>
          <Gnosis height='25px' width='25Fpx' />
        </GnoButton>
      </a>
    </span>
  );
}

function playerToEntry(playerStr: string, color: string) {
  // if this is an address
  if (playerStr.startsWith('0x') && playerStr.length === 42) {
    return <TextPreview text={playerStr} focusedWidth={'150px'} unFocusedWidth={'150px'} />;
  }

  return <TwitterLink twitter={playerStr} color={color} />;
}

function getRankColor([rank, score]: [number, number | undefined]) {
  if (score === undefined || score === null) {
    return dfstyles.colors.subtext;
  }

  if (getRank(score) == Rank.GOLD) {
    return dfstyles.colors.dfgold;
  }
  if (getRank(score) == Rank.SILVER) return dfstyles.colors.dfsilver;

  if (getRank(score) == Rank.BRONZE) return dfstyles.colors.dfbronze;

  return dfstyles.colors.subtext;
}

function getRankStar(rank: number) {
  const gold =
    'invert(73%) sepia(29%) saturate(957%) hue-rotate(354deg) brightness(100%) contrast(95%)';
  const purple =
    'invert(39%) sepia(54%) saturate(6205%) hue-rotate(264deg) brightness(100%) contrast(103%)';
  if (rank < 6) {
    return <Star width={'20px'} height={'20px'} color={rank == 0 ? gold : purple}></Star>;
  }
  return <></>;
}
type Row = [string, number | undefined, number | undefined];

const sortFunctions = [
  (left: Row, right: Row) => {
    if (!left && !right) return 0;
    if (!left || !left[0]) return 1;
    if (!right || right[0]) return -1;
    return left[0].localeCompare(right[0]);
  },
  (left: Row, right: Row) => {
    if (!left && !right) return 0;
    if (!left || !left[1]) return 1;
    if (!right || !right[1]) return -1;
    return right[1] - left[1];
  },
  (left: Row, right: Row) => {
    if (!left && !right) return 0;
    if (!left || !left[2]) return 1;
    if (!right || !right[2]) return -1;
    return right[2] - left[2];
  },
];

function ArenaLeaderboardTable({ rows }: { rows: Row[] }) {
  return (
    <TableContainer>
      <SortableTable
        alignments={['r', 'r', 'l', 'r']}
        headers={[
          <Cell key='player'>place</Cell>,
          <Cell key='twitter'>twitter</Cell>,
          <Cell key='score'>games</Cell>,
          <Cell key='place'>wins</Cell>,
        ]}
        sortFunctions={sortFunctions}
        rows={rows}
        columns={[
          (row: Row, i) => (
            <Cell style={{ color: getRankColor([i, row[1]]) }}>
              {row[1] === undefined || row[1] === null ? 'unranked' : i + 1 + '.'}
            </Cell>
          ),
          (row: Row, i) => {
            const color = getRankColor([i, row[1]]);
            return <Cell style={{ color }}>{playerToEntry(row[0], color)}</Cell>;
          },
          (row: Row, i) => (
            <Cell style={{ color: getRankColor([i, row[1]]) }}>
              {row[1] === undefined || row[1] === null ? '0' : scoreToString(row[1])}
            </Cell>
          ),

          (row: Row, i) => {
            return (
              <Cell style={{ color: getRankColor([i, row[1]]) }}>{scoreToString(row[2])}</Cell>
            );
          },
        ]}
      />
    </TableContainer>
  );
}


function CompetitiveLeaderboardTable({
  rows,
}: {
  rows: LeaderboardEntry[];
}) {
  if (rows.length == 0) return <Subber>No players finished</Subber>;
  return (
    <TableContainer>
      <Table
        alignments={['r', 'r', 'l', 'l', 'r']}
        headers={[
          <Cell key='star'></Cell>,
          <Cell key='place'></Cell>,
          <Cell key='player'>Player</Cell>,
          <Cell key='moves'>Moves</Cell>,
          <Cell key='time'>Time</Cell>,

          <Cell key='score'>Score</Cell>,
        ]}
        rows={rows}
        columns={[
          (row: LeaderboardEntry, i) => getRankStar(i),
          (row: LeaderboardEntry, i) => (
            <Cell style={{ color: getRankColor([i, row.score]) }}>
              {row.score === undefined || row.score === null ? 'unranked' : i + 1 + '.'}
            </Cell>
          ),
          (row: LeaderboardEntry, i) => {
            const color = getRankColor([i, row.score]);
            return (
              <Cell style={{ color }}>
                {compPlayerToEntry(row.ethAddress, row.twitter, color)}
              </Cell>
            );
          },
          (row: LeaderboardEntry, i) => {
            return <Cell style={{ color: getRankColor([i, row.score]) }}>{row.moves}</Cell>;
          },
          (row: LeaderboardEntry, i) => {
            return <Cell style={{ color: getRankColor([i, row.score]) }}>{formatDuration(row.time * 1000)}</Cell>;
          },
          (row: LeaderboardEntry, i) => {
            return <Cell style={{ color: getRankColor([i, row.score]) }}>{row.score}</Cell>;
          },
        ]}
      />
    </TableContainer>
  );
}

const roundStartTime = new Date(roundStartTimestamp).getTime();

const roundEndTime = new Date(roundEndTimestamp).getTime();

function CountDown() {
  const [time, setTime] = useState('');
  const [str, setStr] = useState('');

  const update = () => {
    const timeUntilStartms = roundStartTime - new Date().getTime();
    const timeUntilEndms = roundEndTime - new Date().getTime();
    if (timeUntilStartms > 0) {
      setStr('Grand Prix starts in');
      setTime(`${formatDuration(timeUntilStartms)}`);
    } else if (timeUntilEndms <= 0) {
      setStr('');
      setTime('Grand Prix complete');
    } else {
      setStr('Grand Prix time left');
      setTime(formatDuration(timeUntilEndms));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 499);

    update();

    return () => clearInterval(interval);
  }, []);

  return (
    <tbody>
      <tr>
        {str && <td>{str}</td>}
        <td>{time}</td>
      </tr>
    </tbody>
  );
}

function ArenasCreated({
  leaderboard,
  error,
}: {
  leaderboard: Leaderboard | undefined;
  error: Error | undefined;
}) {
  if (error) {
    return (
      <LeaderboardContainer>
        <Red>{errorMessage}</Red>
      </LeaderboardContainer>
    );
  }
  if (leaderboard) {
    return (
      <div>
        <tbody>
          <tr>
            <td>Total races</td>
            <td>{leaderboard.length}</td>
          </tr>
        </tbody>
      </div>
    );
  } else {
    return <></>;
  }
}

function CompetitiveLeaderboardBody({
  leaderboard,
  error,
}: {
  leaderboard: Leaderboard | undefined;
  error: Error | undefined;
}) {
  if (error) {
    return (
      <LeaderboardContainer>
        <Red>{errorMessage}</Red>
      </LeaderboardContainer>
    );
  }

  if (leaderboard == undefined) {
    return <Subber>Leaderboard loading...</Subber>;
  }

  leaderboard.entries.sort((a, b) => {
    if (typeof a.score !== 'number' && typeof b.score !== 'number') {
      return 0;
    } else if (typeof a.score !== 'number') {
      return 1;
    } else if (typeof b.score !== 'number') {
      return -1;
    }

    return a.score - b.score;
  });

  return <CompetitiveLeaderboardTable rows={leaderboard.entries} />;
}

function ArenaLeaderboardBody({
  leaderboard,
  error,
}: {
  leaderboard: ArenaLeaderboard | undefined;
  error: Error | undefined;
}) {
  if (leaderboard == undefined || error) {
    return (
      <LeaderboardContainer>
        <Red>{errorMessage}</Red>
      </LeaderboardContainer>
    );
  }

  leaderboard.entries.sort((a, b) => {
    if (typeof a.games !== 'number' && typeof b.games !== 'number') {
      return 0;
    } else if (typeof a.games !== 'number') {
      return 1;
    } else if (typeof b.games !== 'number') {
      return -1;
    }

    return b.games - a.games;
  });

  const rows: [string, number | undefined, number | undefined][] = leaderboard.entries.map(
    (entry) => {
      if (typeof entry.twitter === 'string') {
        return [entry.twitter, entry.games, entry.wins];
      }

      return [entry.address, entry.games, entry.wins];
    }
  );

  return (
    <LeaderboardContainer>
      <StatsTableContainer>
        <StatsTable>
          <tbody>
            <tr>
              <td>players</td>
              <td>{leaderboard.entries.length}</td>
            </tr>
            <tr>
              <td>lobbies created</td>
              <td>{leaderboard.entries.reduce((partialSum, a) => partialSum + a.games, 0)}</td>
            </tr>
          </tbody>
        </StatsTable>
      </StatsTableContainer>
      <Spacer height={8} />
      <ArenaLeaderboardTable rows={rows} />
    </LeaderboardContainer>
  );
}

const Cell = styled.div`
  padding: 4px 8px;
  color: ${dfstyles.colors.text};
  background: transparent;
`;

const TableContainer = styled.div`
  display: inline-block;
  border-radius: 2px 2px 0 0px;
  border-bottom: none;
  padding: 16px;
`;

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const StatsTableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${dfstyles.colors.text};
`;

const StatsTable = styled.table`
  td {
    padding: 4px 8px;

    &:first-child {
      text-align: right;
      color: ${dfstyles.colors.subtext};
    }

    &:last-child {
      text-align: left;
    }
  }
`;

const GnoButton = styled.button`
  // background-color: ${dfstyles.colors.text};
  border-radius: 30%;
  border-color: ${dfstyles.colors.border};
`;
