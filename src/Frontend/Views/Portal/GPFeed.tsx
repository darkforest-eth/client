import { address } from '@darkforest_eth/serde';
import { CleanMatchEntry, EthAddress } from '@darkforest_eth/types';
import dfstyles from '@darkforest_eth/ui/dist/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import { Btn } from '../../Components/Btn';
import { useLiveMatches, useTwitters } from '../../Utils/AppHooks';
import { HOUR_IN_SECONDS, DEV_CONFIG_HASH_1, DUMMY } from '../../Utils/constants';
import { formatStartTime } from '../../Utils/TimeUtils';
import { compPlayerToEntry } from '../Leaderboards/ArenaLeaderboard';
import { PaddedRow } from './Components/PaddedRow';
import styled from 'styled-components';
import { scoreToTime, truncateAddress } from './PortalUtils';
import { theme } from './styleUtils';

export interface MapDetailsProps {
  configHash: string | undefined;
}

export function getPlayer(entry: CleanMatchEntry): EthAddress {
  if (entry.players && entry.players.length > 0) return address(entry.players[0]);
  else return entry.creator;
}
export const GPFeed: React.FC<MapDetailsProps> = ({ configHash }) => {
  const { twitters } = useTwitters();
  // Updates every 5s.
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
    });
    // .slice(0, 4);

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
              maxHeight: '200px',
              gap: '1rem',
            }}
          >
            {latest &&
              latest.map((entry: CleanMatchEntry, i: number) => (
                <PaddedRow key={`latest-${i}`}>
                  {entry.gameOver ? (
                    <Content>
                      <span>
                        🎖 {formatStartTime(entry.startTime)}{' '}
                        {compPlayerToEntry(
                          getPlayer(entry),
                          twitters[getPlayer(entry)],
                          undefined,
                          truncateAddress(getPlayer(entry))
                        )}{' '}
                        <span style={{ color: dfstyles.colors.dfgreen }}>finished</span> in{' '}
                        {scoreToTime(entry.duration)}
                      </span>
                      <Link to={`/play/${entry.lobbyAddress}`} target='_blank'>
                        <Button>View</Button>
                      </Link>
                    </Content>
                  ) : (
                    <Content>
                      <span>
                        🚀 {formatStartTime(entry.startTime)}{' '}
                        {compPlayerToEntry(
                          getPlayer(entry),
                          twitters[getPlayer(entry)],
                          undefined,
                          truncateAddress(getPlayer(entry))
                        )}{' '}
                        <span style={{ color: dfstyles.colors.dfpurple }}>started</span> to race
                      </span>
                      <Link to={`/play/${entry.lobbyAddress}`} target='_blank'>
                        <Button>View</Button>
                      </Link>
                    </Content>
                  )}
                </PaddedRow>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Button = styled.button`
  text-transform: uppercase;
  font-family: ${theme.fonts.mono};
  letter-spacing: 0.06em;
  font-size: 0.8rem;
  border: 1px solid ${theme.colors.bg3};
  outline: none;
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing.sm};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${theme.colors.bg3};
    color: ${theme.colors.fgPrimary};
  }
`;
