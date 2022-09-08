import { ArtifactRarity, Leaderboard } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spacer } from '../Components/CoreUI';
import { TwitterLink } from '../Components/Labels/Labels';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Red } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { RarityColors } from '../Styles/Colors';
import dfstyles from '../Styles/dfstyles';
import { useLeaderboard } from '../Utils/AppHooks';
import { formatDuration } from '../Utils/TimeUtils';
import { GenericErrorBoundary } from './GenericErrorBoundary';
import { Table } from './Table';

// Refresh every 10s
const SCORE_REFRESH_RATE = 10000
const roundStartTime = new Date(process.env.ROUND_START_TIMESTAMP as string).getTime()
const roundEndTime = new Date(process.env.ROUND_END_TIMESTAMP as string).getTime()

export function LeadboardDisplay() {
  const [leaderboard, setLeaderboard] = useState()
  const [error, setError] = useState()
  const gameBegin = (new Date().getTime() - roundStartTime >= 0)

  useEffect(() => {
    let jobId: number | undefined = undefined

    const fetchScores = async() => {
      try {
        const resp = await fetch(`${process.env.AL_SERVER_URL}/leaderboard`)
        const res = await resp.json()
        setLeaderboard(res)
      } catch (err) {
        setError(err)
      }
    }

    if (gameBegin) {
      fetchScores().then(() => {
        jobId = window.setInterval(fetchScores, SCORE_REFRESH_RATE)
      })
    }

    return (() => {
      jobId && clearInterval(jobId)
    })
  }, [])

  const errorMessage = 'Error Loading Leaderboard';

  return gameBegin
    ? <GenericErrorBoundary errorMessage={errorMessage}>
        {!leaderboard && !error && <LoadingSpinner initialText={'Loading Leaderboard...'} />}
        {leaderboard && <LeaderboardBody leaderboard={leaderboard} />}
        {error && <Red>{errorMessage}</Red>}
      </GenericErrorBoundary>
    : <></>
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

  if (rank === 0) {
    return RarityColors[ArtifactRarity.Mythic];
  }

  if (rank >= 1 || rank <= 5) {
    return RarityColors[ArtifactRarity.Legendary];
  }

  if (rank >= 6 && rank <= 10) {
    return RarityColors[ArtifactRarity.Epic];
  }

  if (rank >= 11 && rank <= 20) {
    return RarityColors[ArtifactRarity.Rare];
  }

  return dfstyles.colors.subtext;
}

function LeaderboardTable({ rows }: { rows: Array<[string, number | undefined]> }) {
  if (rows.length == 0) {
    return null
  } else {
    return <TableContainer>
      <Table
        alignments={['r', 'l', 'r']}
        headers={[
          <Cell key='place'>Place</Cell>,
          <Cell key='player'>Player</Cell>,
          <Cell key='score'>Score</Cell>,
        ]}
        rows={rows}
        columns={[
          (row: [string, number], i) => (
            <Cell style={{ color: getRankColor([i, row[1]]) }}>
              {row[1] === undefined || row[1] === null ? 'unranked' : i + 1 + '.'}
            </Cell>
          ),
          (row: [string, number | undefined], i) => {
            const color = getRankColor([i, row[1]]);
            return <Cell style={{ color }}>{playerToEntry(row[0], color)}</Cell>;
          },
          (row: [string, number], i) => {
            return (
              <Cell style={{ color: getRankColor([i, row[1]]) }}>{scoreToString(row[1])}</Cell>
            );
          },
        ]}
      />
    </TableContainer>
  };
}

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

function LeaderboardBody({ leaderboard }: { leaderboard: Leaderboard }) {
  const rankedPlayers = leaderboard.entries.filter(
    (entry) => entry.score !== undefined && entry.score > 0
  );

  rankedPlayers.sort((a, b) => {
    if (typeof a.score !== 'number' && typeof b.score !== 'number') {
      return 0;
    } else if (typeof a.score !== 'number') {
      return 1;
    } else if (typeof b.score !== 'number') {
      return -1;
    }

    return b.score - a.score;
  });

  const rows: [string, number | undefined][] = rankedPlayers.map((entry) => {
    if (typeof entry.twitter === 'string') {
      return [entry.twitter, entry.score];
    }

    return [entry.ethAddress, entry.score];
  });

  return <div>
    <StatsTableContainer>
      <StatsTable>
        <tbody>
          <tr>
            <td>Round ends in</td>
            <td>
              <CountDown />
            </td>
          </tr>
          <tr>
            <td>Ranked players</td>
            <td>{rankedPlayers.length}</td>
          </tr>
        </tbody>
      </StatsTable>
    </StatsTableContainer>
    <Spacer height={8} />
    <LeaderboardTable rows={rows} />
  </div>
}

const Cell = styled.div`
  padding: 4px 8px;
  color: ${dfstyles.colors.text};
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
