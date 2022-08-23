import { Leaderboard } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GraphConfigPlayer } from '@darkforest_eth/types';
import { getRank, Rank } from '../../../Backend/Utils/Rank';
import { Gnosis, Star, Twitter } from '../../Components/Icons';
import { Red, Subber } from '../../Components/Text';
import { TextPreview } from '../../Components/TextPreview';
import dfstyles from '../../Styles/dfstyles';
import { useArenaLeaderboard, useEloLeaderboard, useTwitters } from '../../Utils/AppHooks';
import { roundEndTimestamp, roundStartTimestamp } from '../../Utils/constants';
import { formatDuration } from '../../Utils/TimeUtils';
import { GenericErrorBoundary } from '../GenericErrorBoundary';
import { SortableTable } from '../SortableTable';
import { Table } from '../Table';

const errorMessage = 'Error Loading Leaderboard';

export function ArenaLeaderboardWithData({ config }: { config: string }) {
  const { arenaLeaderboard, arenaError } = useArenaLeaderboard(false, config);
  return <ArenaLeaderboardDisplay leaderboard={arenaLeaderboard} error={arenaError} />;
}

export function ArenaLeaderboardDisplay({
  leaderboard,
  error,
  multiplayer,
}: {
  leaderboard: Leaderboard | undefined;
  error: Error | undefined;
  multiplayer?: boolean;
}) {
  return (
    <GenericErrorBoundary errorMessage={errorMessage}>
      <LeaderboardContainer>
        <StatsTableContainer>
          <StatsTable>
            {/* <CountDown /> */}
            <ArenasCreated leaderboard={leaderboard} error={error} />
          </StatsTable>
        </StatsTableContainer>
        {/* <Spacer height={8} /> */}
        <ArenaLeaderboardBody leaderboard={leaderboard} error={error} />
      </LeaderboardContainer>
    </GenericErrorBoundary>
  );
}

export function EloLeaderboardWithData({ config }: { config: string }) {
  const { eloLeaderboard, eloError } = useEloLeaderboard(false, config);
  return <EloLeaderboardDisplay leaderboard={eloLeaderboard} error={eloError} />;
}

export function EloLeaderboardDisplay({
  leaderboard,
  error,
  totalPlayers = true,
}: {
  leaderboard: GraphConfigPlayer[] | undefined;
  error: Error | undefined;
  totalPlayers?: boolean;
}) {
  return (
    <GenericErrorBoundary errorMessage={errorMessage}>
      <LeaderboardContainer>
        <StatsTableContainer>
          <StatsTable>
            {/* <CountDown /> */}
            {totalPlayers && <TotalPlayers leaderboard={leaderboard} error={error} />}
          </StatsTable>
        </StatsTableContainer>
        {/* <Spacer height={8} /> */}
        <EloLeaderboardBody leaderboard={leaderboard} error={error} />
      </LeaderboardContainer>
    </GenericErrorBoundary>
  );
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
export function compPlayerToEntry(
  playerAddress: string,
  playerTwitter: string | undefined,
  color: string | undefined = `${dfstyles.colors.text}`
) {
  return (
    <Link
      to={`/portal/account/${playerAddress}`}
      style={{ color: color, textDecoration: 'underline', fontWeight: 'bolder' }}
      target='_blank'
    >
      {playerTwitter ? (
        `@${playerTwitter}`
      ) : (
        <TextPreview
          style={{ textDecoration: 'underline' }}
          disabled
          text={playerAddress}
          focusedWidth={'130px'}
          unFocusedWidth={'130px'}
        />
      )}
    </Link>
  );
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

interface Row {
  address: string;
  twitter: string | undefined;
  time: number | undefined;
  moves: number | undefined;
}

interface EloRow {
  address: string;
  twitter: string | undefined;
  score: number | undefined;
  wins: number;
  losses: number;
}

function CountDown() {
  const [time, setTime] = useState<string | undefined>();
  const [str, setStr] = useState<string | undefined>();

  const update = () => {
    const roundStartTime = new Date(roundStartTimestamp).getTime();

    const roundEndTime = new Date(roundEndTimestamp).getTime();

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
    <tbody style={{ fontSize: '1.25em' }}>
      <tr>
        <td>{str}</td>
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
      <tbody style={{ fontSize: '1.25em' }}>
        <tr>
          <td>Total Matches</td>
          <td>{leaderboard.length}</td>
        </tr>
      </tbody>
    );
  } else {
    return <></>;
  }
}

function TotalPlayers({
  leaderboard,
  error,
}: {
  leaderboard: GraphConfigPlayer[] | undefined;
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
      <tbody style={{ fontSize: '1.25em' }}>
        <tr>
          <td>Total matches</td>
          <td>{leaderboard.length}</td>
        </tr>
      </tbody>
    );
  } else {
    return <></>;
  }
}

function ArenaLeaderboardTable({ rows }: { rows: Row[] }) {
  if (rows.length == 0) return <Subber>No players finished</Subber>;
  const sortFunctions = [
    (_a: Row, _b: Row): number => 0,
    (_a: Row, _b: Row): number => 0,
    (_a: Row, _b: Row): number => 0,
    (_a: Row, _b: Row): number => 0,
    (a: Row, b: Row): number => {
      if (a.time && b.time) {
        return a.time - b.time;
      }
      return 0;
    },
    (a: Row, b: Row): number => {
      if (a.moves && b.moves) {
        return a.moves - b.moves;
      }
      return 0;
    },
  ];
  return (
    <TableContainer>
      <SortableTable
        sortFunctions={sortFunctions}
        alignments={['r', 'r', 'l', 'l', 'r']}
        headers={[
          // <Cell key='star'></Cell>,
          <Cell key='rank'></Cell>,
          <Cell key='name'></Cell>,
          <Cell key='twitter'></Cell>,
          <Cell key='gnosis'></Cell>,
          <Cell key='time'>Time</Cell>,
          <Cell key='moves'>Moves</Cell>,
        ]}
        rows={rows}
        columns={[
          // (row: Row, i) => getRankStar(i), //star
          (
            row: Row,
            i //rank
          ) => (
            <Cell>
              {row.time === undefined ||
              row.moves === undefined ||
              row.time === null ||
              row.moves === null
                ? 'unranked'
                : i + 1 + '.'}
            </Cell>
          ),
          (row: Row, i) => {
            // name
            // const color = getRankColor([i, row.score]);
            return <Cell>{compPlayerToEntry(row.address, row.twitter)}</Cell>;
          },
          (row: Row, i) => {
            // twitter
            // const color = getRankColor([i, row.score]);
            return (
              <Cell>
                {row.twitter && (
                  <a
                    style={{ display: 'flex', alignItems: 'center' }}
                    target='_blank'
                    href={`https://twitter.com/${row.twitter}`}
                  >
                    <Twitter width='24px' height='24px' />
                  </a>
                )}
              </Cell>
            );
          },
          (row: Row, i) => {
            // gnosis
            // const color = getRankColor([i, row.score]);
            return (
              <Cell>
                {' '}
                <a
                  style={{ display: 'flex', alignItems: 'center' }}
                  target='_blank'
                  href={`https://blockscout.com/xdai/optimism/address/${row.address}`}
                >
                  <GnoButton>
                    <Gnosis width='24px' height='24px' />
                  </GnoButton>
                </a>
              </Cell>
            );
          },
          (row: Row, i) => {
            // score
            return <Cell>{scoreToTime(row.time)}</Cell>;
          },
          (row: Row, i) => {
            return <Cell>{row.moves}</Cell>;
          },
        ]}
      />
    </TableContainer>
  );
}

function ArenaLeaderboardBody({
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

  const arenaRows: Row[] = leaderboard.entries.map((entry) => {
    return {
      address: entry.ethAddress,
      twitter: entry.twitter,
      time: entry.time,
      moves: entry.moves,
    };
  });

  return <ArenaLeaderboardTable rows={arenaRows} />;
}

function EloLeaderboardTable({ rows }: { rows: EloRow[] }) {
  if (rows.length == 0) return <Subber>No players finished</Subber>;
  return (
    <TableContainer>
      <Table
        alignments={['r', 'l', 'c', 'c', 'r', 'r']}
        headers={[
          // <Cell key='star'></Cell>,
          <Cell key='rank'></Cell>,
          <Cell key='name'></Cell>,
          <Cell key='twitter'></Cell>,
          <Cell key='gnosis'></Cell>,
          <Cell key='score'>Elo</Cell>,
          <Cell key='W/L'>W/L</Cell>,
        ]}
        rows={rows}
        columns={[
          // (row: Row, i) => getRankStar(i), //star
          (row: EloRow, i) => (
            <Cell>{row.score === undefined || row.score === null ? 'unranked' : i + 1 + '.'}</Cell>
          ),
          (row: EloRow, i) => {
            // name
            const color = getRankColor([i, row.score]);
            return <Cell>{compPlayerToEntry(row.address, row.twitter)}</Cell>;
          },
          (row: EloRow, i) => {
            // twitter
            return (
              <Cell>
                {row.twitter && (
                  <a
                    style={{ display: 'flex', alignItems: 'center' }}
                    target='_blank'
                    href={`https://twitter.com/${row.twitter}`}
                  >
                    <Twitter width='24px' height='24px' />
                  </a>
                )}
              </Cell>
            );
          },
          (row: EloRow, i) => {
            // gnosis
            return (
              <Cell>
                {' '}
                <a
                  style={{ display: 'flex', alignItems: 'center' }}
                  target='_blank'
                  href={`https://blockscout.com/xdai/optimism/address/${row.address}`}
                >
                  <GnoButton>
                    <Gnosis width='24px' height='24px' />
                  </GnoButton>
                </a>
              </Cell>
            );
          },
          (row: EloRow, i) => {
            // score
            return <Cell>{row.score}</Cell>;
          },
          (row: EloRow, i) => {
            // win/loss
            return (
              <Cell>
                {row.wins}/{row.losses}
              </Cell>
            );
          },
        ]}
      />
    </TableContainer>
  );
}

function EloLeaderboardBody({
  leaderboard,
  error,
}: {
  leaderboard: GraphConfigPlayer[] | undefined;
  error: Error | undefined;
}) {
  const twitters = useTwitters();
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

  if (leaderboard.length !== 0) {
    leaderboard.sort((a, b) => {
      if (typeof a.elo !== 'number' && typeof b.elo !== 'number') {
        return 0;
      } else if (typeof a.elo !== 'number') {
        return -1;
      } else if (typeof b.elo !== 'number') {
        return 1;
      }

      return b.elo - a.elo;
    });
  }

  const eloRows: EloRow[] = leaderboard.map((entry) => {
    return {
      address: entry.address,
      twitter: twitters[entry.address],
      score: entry.elo,
      wins: entry.wins,
      losses: entry.losses,
    };
  });

  return <EloLeaderboardTable rows={eloRows} />;
}

const Cell = styled.div`
  padding: 4px 8px;
  color: ${dfstyles.colors.text};
  background: transparent;
  // font-size: 1.25em;
`;

const TableContainer = styled.div`
  display: inline-block;
  border-radius: 2px 2px 0 0px;
  border-bottom: none;
  padding: 4px;
  overflow: scroll;
`;

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  align-items: center;
  overflow: hidden;
  height: 100%;
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
