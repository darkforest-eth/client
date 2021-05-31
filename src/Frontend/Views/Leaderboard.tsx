import { AggregateLeaderboard, Leaderboard_060 } from '@darkforest_eth/types';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Red } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { useLeaderboard } from '../Utils/AppHooks';
import { Table } from './Table';

export function Leaderboard() {
  const { leaderboard, error } = useLeaderboard();

  return (
    <>
      {!leaderboard && !error && <LoadingSpinner initialText={'Loading Leaderboard...'} />}
      {leaderboard && <LeaderboardBody leaderboard={leaderboard} />}
      {error && <Red>error loading leaderboard</Red>}
    </>
  );
}

function scoreToString(score: number) {
  score = Math.floor(score);

  if (score === 0) {
    return 'n/a';
  }

  if (score < 10000) {
    return score + '';
  }

  return score.toLocaleString();
}

// pass in either an address, or a twitter handle. this function will render the appropriate
// component
function playerToEntry(playerStr: string) {
  // if this is an address
  if (playerStr.startsWith('0x') && playerStr.length === 42) {
    return <TextPreview text={playerStr} focusedWidthPx={150} unFocusedWidthPx={150} />;
  }

  return <LinkToTwitter href={`https://twitter.com/${playerStr}`}>@{playerStr}</LinkToTwitter>;
}

const LinkToTwitter = styled.a`
  text-decoration: underline;

  &:hover {
    color: #a59bff;
  }
`;

function LeaderboardTable({ leaderboard }: { leaderboard: Leaderboard_060 }) {
  const entries = Object.getOwnPropertyNames(leaderboard.scoresByPlayer).map((name) => [
    name,
    leaderboard.scoresByPlayer[name],
  ]);

  const sortedEntries = _.sortBy(entries, (row) => -row[1]);

  return (
    <TableContainer>
      <Table
        alignments={['r', 'l', 'r']}
        headers={[
          <Cell key='place'>place</Cell>,
          <Cell key='player'>player</Cell>,
          <Cell key='score'>score</Cell>,
        ]}
        rows={sortedEntries}
        columns={[
          (row: [string, number], i) => <Cell>{row[1] === 0 ? 'unranked' : i + 1 + '.'}</Cell>,
          (row: [string, number]) => {
            return <Cell>{playerToEntry(row[0])}</Cell>;
          },
          (row: [string, number]) => {
            return <Cell>{scoreToString(row[1])}</Cell>;
          },
        ]}
      />
    </TableContainer>
  );
}

function LeaderboardBody({ leaderboard }: { leaderboard: AggregateLeaderboard }) {
  const keys = Object.getOwnPropertyNames(leaderboard);
  const forVersion = leaderboard[keys[0]];

  return <LeaderboardTable leaderboard={forVersion} />;
}

const Cell = styled.div`
  padding: 4px 8px;
`;

const TableContainer = styled.div`
  display: inline-block;
  border-radius: 2px 2px 0 0px;
  border-bottom: none;
  padding: 16px;
`;
