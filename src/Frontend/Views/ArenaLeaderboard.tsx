import { ArenaLeaderboard, ArtifactRarity } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spacer } from '../Components/CoreUI';
import { TwitterLink } from '../Components/Labels/Labels';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Red } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { RarityColors } from '../Styles/Colors';
import dfstyles from '../Styles/dfstyles';
import { useArenaLeaderboard } from '../Utils/AppHooks';
import { formatDuration } from '../Utils/TimeUtils';
import { GenericErrorBoundary } from './GenericErrorBoundary';
import { SortableTable } from './SortableTable';

export function ArenaLeaderboardElt() {
  const { leaderboard, error } = useArenaLeaderboard();

  const errorMessage = 'Error Loading Leaderboard';

  return (
    <GenericErrorBoundary errorMessage={errorMessage}>
      {!leaderboard && !error && <LoadingSpinner initialText={'Loading Leaderboard...'} />}
      {leaderboard && <ArenaLeaderboardBody leaderboard={leaderboard} />}
      {error && <Red>{errorMessage}</Red>}
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

// pass in either an address, or a twitter handle. this function will render the appropriate
// component
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

  if (score === 0) {
    return RarityColors[ArtifactRarity.Legendary];
  }

  return dfstyles.colors.dfgreen;
}

function numberSort(a: number | undefined, b: number | undefined) {
  if (a == undefined && b == undefined) {
    return 0;
  }
  if (a == undefined) {
    return 1;
  }
  if (b == undefined) {
    return -1;
  }

  return b - a;
}

type Row = [string, number | undefined, number | undefined];

const sortFunctions = [
  (
    left: Row,
    right: Row
  ) => {
    if(!left && !right) return 0;
    if(!left || !left[0]) return 1;
    if(!right || right[0]) return -1;
    return left[0].localeCompare(right[0]);
  },
  (
    left: Row,
    right: Row
  ) => {
    if(!left && !right) return 0;
    if(!left || !left[1]) return 1;
    if(!right || !right[1]) return -1;
    return right[1] - left[1];
  },
  (
    left: Row,
    right: Row
  ) => {
    if(!left && !right) return 0;
    if(!left || !left[2]) return 1;
    if(!right || !right[2]) return -1;
    return right[2] - left[2];
  },
];

function ArenaLeaderboardTable({
  rows,
}: {
  rows: Row[];
}) {
  return (
    <TableContainer>
      <SortableTable
        alignments={['r', 'l', 'r']}
        headers={[
          <Cell key='player'>player</Cell>,
          <Cell key='score'>games</Cell>,
          <Cell key='place'>wins</Cell>,
        ]}
        sortFunctions={sortFunctions}
        rows={rows}
        columns={[
          (row: Row, i) => {
            const color = getRankColor([i, row[2]]);
            return <Cell style={{ color }}>{playerToEntry(row[0], color)}</Cell>;
          },
          (row: Row, i) => (
            <Cell style={{ color: getRankColor([i, row[2]]) }}>
              {row[1] === undefined || row[1] === null ? '0' : scoreToString(row[1])}
            </Cell>
          ),

          (row: Row, i) => {
            return (
              <Cell style={{ color: getRankColor([i, row[2]]) }}>{scoreToString(row[2])}</Cell>
            );
          },
        ]}
      />
    </TableContainer>
  );
}

// TODO: update this each round, or pull from contract constants
const roundEndTimestamp = '2022-03-01T05:00:00.000Z';
const roundEndTime = new Date(roundEndTimestamp).getTime();

function CountDown() {
  const [str, setStr] = useState('');

  const update = () => {
    const timeUntilEndms = roundEndTime - new Date().getTime();
    if (timeUntilEndms <= 0) {
      setStr('yes');
    } else {
      setStr(formatDuration(timeUntilEndms));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      update();
    }, 499);

    update();

    return () => clearInterval(interval);
  }, []);

  return <>{str}</>;
}

function ArenaLeaderboardBody({ leaderboard }: { leaderboard: ArenaLeaderboard }) {
  const rows: [string, number | undefined, number | undefined][] = leaderboard.entries.map(
    (entry) => {
      if (typeof entry.twitter === 'string') {
        return [entry.twitter, entry.games, entry.wins];
      }

      return [entry.address, entry.games, entry.wins];
    }
  );

  return (
    <div>
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
    </div>
  );
}

const Cell = styled.div`
  padding: 4px 8px;
  color: ${dfstyles.colors.text};
  background: transparent
`;

const TableContainer = styled.div`
  display: inline-block;
  border-radius: 2px 2px 0 0px;
  border-bottom: none;
  padding: 16px;
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
