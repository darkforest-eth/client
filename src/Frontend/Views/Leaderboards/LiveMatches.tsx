import { LiveMatch } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Btn } from '../../Components/Btn';
import { Link } from '../../Components/CoreUI';
import { Gnosis } from '../../Components/Icons';
import { TwitterLink } from '../../Components/Labels/Labels';
import { Red, Subber } from '../../Components/Text';
import { TextPreview } from '../../Components/TextPreview';
import dfstyles from '../../Styles/dfstyles';
import { useLiveMatches, useTwitters } from '../../Utils/AppHooks';
import { formatDuration, formatStartTime } from '../../Utils/TimeUtils';
import { GenericErrorBoundary } from '../GenericErrorBoundary';
import { MinimalButton } from '../Portal/PortalMainView';
import { Table } from '../Table';

const errorMessage = 'Error Loading Leaderboard';
export function LiveMatchesDisplay({ config }: { config: string }) {
  const { liveMatches, spyError } = useLiveMatches(config);
  return <LiveMatches game={liveMatches} error={spyError} />;
}

export function LiveMatches({
  game,
  error,
}: {
  game: LiveMatch | undefined;
  error: Error | undefined;
}) {
  const entries = game?.entries.filter((entry) => entry.firstMover !== null);
  return (
    <GenericErrorBoundary errorMessage={errorMessage}>
      <LeaderboardContainer>
        <LeaderboardBody leaderboard={entries ? { entries: entries } : entries} error={error} />
      </LeaderboardContainer>
    </GenericErrorBoundary>
  );
}

// pass in either an address, or a twitter handle. this function will render the appropriate
// component
function playerToEntry(playerAddress: string) {
  const twitters = useTwitters();
  const playerTwitter = twitters[playerAddress];
  return (
    <span
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '5px' }}
    >
      {playerTwitter ? (
        <TwitterLink twitter={playerTwitter} />
      ) : (
        <TextPreview text={playerAddress} focusedWidth={'100px'} unFocusedWidth={'100px'} />
      )}

      <a
        style={{ display: 'flex', alignItems: 'center' }}
        target='_blank'
        href={`https://blockscout.com/xdai/optimism/address/${playerAddress}`}
      >
        <GnoButton>
          <Gnosis height='25px' width='25px' />
        </GnoButton>
      </a>
    </span>
  );
}

type Row = {
  address: string;
  startTime: number;
  id: string;
};

function LeaderboardTable({ rows }: { rows: Row[] }) {
  if (rows.length == 0) return <Subber>No live games</Subber>;

  const [durations, setDurations] = useState<number[]>([]);
  const [startTimes, setStartTimes] = useState<number[]>([]);
  useEffect(() => {
    setStartTimes(rows.map((r) => r.startTime));

    const interval = setInterval(() => {
      const times = rows.map((r) => Date.now() - r.startTime * 1000);
      setDurations(times);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <TableContainer>
      <Table
        alignments={['c', 'c', 'c', 'c']}
        headers={[
          <Cell key='player'>Player</Cell>,
          <Cell key='lobby'>Arena ID</Cell>,
          <Cell key='start_time'>Start Time</Cell>,
          <Cell key='duration'>Duration</Cell>,
          <Cell key='go'></Cell>,
        ]}
        rows={rows}
        columns={[
          (row: Row, i) => {
            return <Cell>{playerToEntry(row.address)}</Cell>;
          },
          (row: Row, i) => {
            return (
              <Cell>
                <TextPreview text={row.id} focusedWidth={'75px'} unFocusedWidth={'75px'} />
              </Cell>
            );
          },
          (row: Row, i) => {
            return <Cell>{startTimes[i] ? formatStartTime(startTimes[i]) : 'loading...'}</Cell>;
          },
          (row: Row, i) => {
            return <Cell>{durations[i] ? formatDuration(durations[i]) : 'loading...'}</Cell>;
          },
          (row: Row, i) => {
            return (
              <Cell>
                <Link to={`https://arena.dfdao.xyz/play/${row.id}`}>
                  <MinimalButton>View</MinimalButton>
                </Link>
              </Cell>
            );
          },
        ]}
      />
    </TableContainer>
  );
}

function LeaderboardBody({
  leaderboard,
  error,
}: {
  leaderboard: LiveMatch | undefined;
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
    if (typeof a.startTime !== 'number' && typeof b.startTime !== 'number') {
      return 0;
    } else if (typeof a.startTime !== 'number') {
      return 1;
    } else if (typeof b.startTime !== 'number') {
      return -1;
    }

    return b.startTime - a.startTime;
  });

  const competitiveRows: Row[] = leaderboard.entries.map((entry) => {
    return {
      id: entry.id,
      address: entry.firstMover.address,
      startTime: entry.startTime,
    };
  });

  return <LeaderboardTable rows={competitiveRows} />;
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
  overflow: auto;
`;

const LeaderboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow: hidden;
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
