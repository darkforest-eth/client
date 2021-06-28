import { AggregateLeaderboard, ArtifactRarity } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Spacer } from '../Components/CoreUI';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Red } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { RarityColors } from '../Styles/Colors';
import dfstyles from '../Styles/dfstyles';
import { useLeaderboard } from '../Utils/AppHooks';
import { formatDuration } from '../Utils/TimeUtils';
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

function getRankColor(rank: number) {
  if (rank === 0) {
    return RarityColors[ArtifactRarity.Mythic];
  }

  if (rank === 1 || rank === 2) {
    return RarityColors[ArtifactRarity.Legendary];
  }

  if (rank >= 3 && rank <= 6) {
    return RarityColors[ArtifactRarity.Epic];
  }

  if (rank >= 7 && rank <= 14) {
    return RarityColors[ArtifactRarity.Rare];
  }

  if (rank >= 15 && rank <= 30) {
    return dfstyles.colors.dfgreen;
  }

  if (rank >= 31 && rank <= 62) {
    return 'white';
  }

  return dfstyles.colors.subtext;
}

const LinkToTwitter = styled.a`
  text-decoration: underline;

  &:hover {
    color: #a59bff;
  }
`;

function LeaderboardTable({ rows }: { rows: Array<[string, number]> }) {
  return (
    <TableContainer>
      <Table
        alignments={['r', 'l', 'r']}
        headers={[
          <Cell key='place'>place</Cell>,
          <Cell key='player'>player</Cell>,
          <Cell key='score'>score</Cell>,
        ]}
        rows={rows}
        columns={[
          (row: [string, number], i) => (
            <Cell style={{ color: getRankColor(i) }}>
              {row[1] === 0 ? 'unranked' : i + 1 + '.'}
            </Cell>
          ),
          (row: [string, number], i) => {
            return <Cell style={{ color: getRankColor(i) }}>{playerToEntry(row[0])}</Cell>;
          },
          (row: [string, number], i) => {
            return <Cell style={{ color: getRankColor(i) }}>{scoreToString(row[1])}</Cell>;
          },
        ]}
      />
    </TableContainer>
  );
}

// TODO: update this each round, or pull from contract constants
const round2EndTimestamp = '2021-07-07T21:00:00-07:00';
const round2EndTime = new Date(round2EndTimestamp).getTime();

function CountDown() {
  const [str, setStr] = useState('');

  const update = () => {
    const timeUntilEndms = round2EndTime - new Date().getTime();
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

function LeaderboardBody({ leaderboard }: { leaderboard: AggregateLeaderboard }) {
  const leaderboardRoundNames = Object.getOwnPropertyNames(leaderboard);
  const firstRoundLeaderboard = leaderboard[leaderboardRoundNames[0]];
  const firstRoundScores = Object.getOwnPropertyNames(firstRoundLeaderboard.scoresByPlayer).map(
    (name) => [name, firstRoundLeaderboard.scoresByPlayer[name]]
  );

  const sortedFirstRoundScores = _.sortBy(firstRoundScores, (row) => -row[1]) as Array<
    [string, number]
  >;

  const rankedPlayers = sortedFirstRoundScores.filter((entry) => entry[1] > 0);

  return (
    <div>
      <StatsTableContainer>
        <StatsTable>
          <tbody>
            <tr>
              <td>round 2 complete</td>
              <td>
                <CountDown />
              </td>
            </tr>
            <tr>
              <td>players</td>
              <td>{sortedFirstRoundScores.length}</td>
            </tr>
            <tr>
              <td>ranked players</td>
              <td>{rankedPlayers.length}</td>
            </tr>
          </tbody>
        </StatsTable>
      </StatsTableContainer>
      <Spacer height={8} />
      <LeaderboardTable rows={sortedFirstRoundScores} />
    </div>
  );
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

const StatsTableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
