import { Leaderboard, LeaderboardEntry } from '@darkforest_eth/types';
import React from 'react';
import { formatStartTime } from '../../Utils/TimeUtils';
import { Orb } from './Components/FlashingOrb';
import { PaddedRow } from './Components/PaddedRow';
import { truncateAddress } from './PortalUtils';

export interface MapDetailsProps {
  leaderboard: Leaderboard | undefined;
}

// TODO: This currently displays the latest scores in a leaderboard (by time)
// Ideally, it would do something similar to useLiveMatches()
// because right now it doesn't update live.
export const GPFeed: React.FC<MapDetailsProps> = ({ leaderboard }) => {
  const latest = leaderboard?.entries
    .sort((a, b) => {
      // sort in order of latest endTime
      return b.endTime - a.endTime;
    })
    .slice(0, 2);

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
              latest.map((entry: LeaderboardEntry, i: number) => (
                <PaddedRow key={`latest-${i}`}>
                  <Orb />
                  <span>
                    {formatStartTime(entry.endTime)}{' '}
                    {entry.twitter ?? truncateAddress(entry.ethAddress)} scored {entry.score ?? 0}
                  </span>
                </PaddedRow>
              ))}
          </div>
        )}
        {/* we do this to make sure we always show 3 rows */}
        {latest &&
          latest.length < 3 &&
          [...Array(3 - latest.length)].map((_, i) => (
            <PaddedRow key={`latest-placeholder-${i}`}>
              <Orb />
              <span>Waiting for players...</span>
            </PaddedRow>
          ))}
      </div>
    </div>
  );
};
