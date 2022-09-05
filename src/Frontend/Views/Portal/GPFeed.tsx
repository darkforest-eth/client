import { getConfigName } from '@darkforest_eth/procedural';
import { address } from '@darkforest_eth/serde';
import { CleanConfigPlayer, CleanMatchEntry, EthAddress, ExtendedMatchEntry, Leaderboard, LeaderboardEntry } from '@darkforest_eth/types';
import dfstyles from '@darkforest_eth/ui/dist/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { useLiveMatches, useTwitters } from '../../Utils/AppHooks';
import { DAY_IN_SECONDS, DEV_CONFIG_HASH_1, DUMMY } from '../../Utils/constants';
import { formatStartTime } from '../../Utils/TimeUtils';
import { compPlayerToEntry } from '../Leaderboards/ArenaLeaderboard';
import { Orb } from './Components/FlashingOrb';
import { PaddedRow } from './Components/PaddedRow';
import { MatchButton } from './FindMatch';
import { scoreToTime, truncateAddress } from './PortalUtils';

export interface MapDetailsProps {
  configHash: string | undefined;
}

export function getPlayer(entry: CleanMatchEntry): EthAddress {
  if(entry.players && entry.players.length > 0) return address(entry.players[0]);
  else return entry.creator
}
// TODO: This currently displays the latest scores in a leaderboard (by time)
// Ideally, it would do something similar to useLiveMatches()
// because right now it doesn't update live.
export const GPFeed: React.FC<MapDetailsProps> = ({ configHash }) => {
  const twitters = useTwitters();
  // Updates every x ms.
  const { liveMatches, spyError } = useLiveMatches(configHash, !DUMMY ? 5000 : undefined);
  
  const latest = liveMatches?.entries
    .map((m) => {
      return {
        ...m,
        time: m.gameOver ? m.endTime : m.startTime,
      };
    })
    .sort((a, b) => {
      return b.time - a.time;
    })
    .slice(0, 4);

  return (
    <div
      style={{
        marginBottom: '1rem',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        {latest && latest.length > 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {latest &&
              latest.map((entry: CleanMatchEntry, i: number) => (
                <PaddedRow key={`latest-${i}`}>
                  {/* <Orb /> */}
                  {entry.gameOver ? (
                    <span>
                      🎖{' '}
                      {formatStartTime(entry.startTime)}{' '}
                      {compPlayerToEntry(getPlayer(entry), twitters[getPlayer(entry)])}  {' '}
                      <Link
                        style={{ color: dfstyles.colors.dfgreenlight }}
                        to={`/play/${entry.lobbyAddress}`}
                        target='_blank'
                      >
                        finished{' '}
                      </Link>
                      in {scoreToTime(entry.duration)}{' '}({DAY_IN_SECONDS - entry.duration} points)
                    </span>
                  ) : (
                    <span>
                      🚀{' '}
                      {formatStartTime(entry.startTime)}{' '}
                      {compPlayerToEntry(getPlayer(entry), twitters[getPlayer(entry)])}  {' '}
                      <Link
                        style={{ color: dfstyles.colors.dfgreenlight }}
                        to={`/play/${entry.lobbyAddress}`}
                        target='_blank'
                      >
                        started{' '}
                      </Link>
                      to race
                    </span>
                  )}
                </PaddedRow>
              ))}
          </div>
        )}
        {/* we do this to make sure we always show 3 rows */}
        {/* {latest &&
          latest.length < 3 &&
          [...Array(3 - latest.length)].map((_, i) => (
            <PaddedRow key={`latest-placeholder-${i}`}>
              <Orb />
              <span>Waiting for players...</span>
            </PaddedRow>
          ))} */}
      </div>
    </div>
  );
};
