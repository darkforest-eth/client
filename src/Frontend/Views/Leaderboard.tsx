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
            return (
              <Cell>
                <TextPreview text={row[0]} focusedWidthPx={150} unFocusedWidthPx={150} />
              </Cell>
            );
          },
          (row: [string, number]) => {
            return <Cell>{row[1] === 0 ? 'n/a' : row[1]}</Cell>;
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
