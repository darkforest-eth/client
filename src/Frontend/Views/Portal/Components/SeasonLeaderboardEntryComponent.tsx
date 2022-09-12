import { getConfigName } from '@darkforest_eth/procedural';
import { address } from '@darkforest_eth/serde';
import { BadgeType, ConfigBadge, TooltipName } from '@darkforest_eth/types';
import dfstyles from '@darkforest_eth/ui/dist/styles';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { SeasonLeaderboardEntry } from '../../../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import { PortalTooltipTrigger } from '../../../Panes/Tooltip';
import { useSeasonData, useTwitters } from '../../../Utils/AppHooks';
import { BADGE_BONUSES } from '../../../Utils/constants';
import { formatDuration } from '../../../Utils/TimeUtils';
import { goldStar } from '../../Leaderboards/ArenaLeaderboard';
import { MinimalButton } from '../PortalMainView';
import { isPastOrCurrentRound, truncateAddress } from '../PortalUtils';
import { theme } from '../styleUtils';

function splitPascalCase(word: string) {
  var wordRe = /($[a-z])|[A-Z][^A-Z]+/g;
  //@ts-expect-error
  return word.match(wordRe).join(' ');
}

function getRankColor(gamesPlayed: number, totalGames: number): string {
  const baseHsl = 127;
  const gamePercentage = 1 - gamesPlayed / totalGames;
  const subtract = Math.floor(baseHsl * gamePercentage);
  return `hsl(${baseHsl - subtract}, 95%, 62%)`;
}

export const SeasonLeaderboardEntryComponent: React.FC<{
  entry: SeasonLeaderboardEntry;
  uniqueBadges: { [player: string]: ConfigBadge[] };
  index: number;
}> = ({ entry, uniqueBadges, index }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const SEASON_GRAND_PRIXS = useSeasonData();
  const { twitters } = useTwitters();
  const hasTwitter = twitters[entry.address];
  const numPastOrCurrent = SEASON_GRAND_PRIXS.filter((sgp) =>
    isPastOrCurrentRound(sgp.configHash, SEASON_GRAND_PRIXS)
  ).length;
  const gamesFinished = entry.games.length;
  return (
    <div key={index}>
      <Row key={index} onClick={() => setExpanded(!expanded)} expanded={expanded}>
        <Group>
          <span>{index + 1}.</span>
          <span>{twitters[entry.address] ?? truncateAddress(address(entry.address))}</span>
        </Group>
        <Group>
          <span style={{ color: getRankColor(gamesFinished, numPastOrCurrent) }}>
            {gamesFinished}/{numPastOrCurrent}{' '}
          </span>
          <span style={{ color: getRankColor(gamesFinished, numPastOrCurrent) }}>
            {formatDuration(entry.totalDuration * 1000)}
          </span>
        </Group>
      </Row>
      {expanded && (
        <>
          <ExpandedGames style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {entry.games
                .filter((game) => isPastOrCurrentRound(game.configHash, SEASON_GRAND_PRIXS))
                .map((game, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: theme.spacing.lg,
                        width: '100%',
                      }}
                    >
                      <span>
                        <Link
                          style={{ color: dfstyles.colors.dfblue }}
                          to={`/portal/map/${game.configHash}`}
                        >
                          {getConfigName(game.configHash)}
                        </Link>
                      </span>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: theme.spacing.md,
                          flex: '1',
                        }}
                      >
                        {uniqueBadges[entry.address]
                          .filter((cb) => cb.configHash == game.configHash)
                          .sort((a, b) => {
                            if (a.type == BadgeType.Wallbreaker) {
                              return -1;
                            } else if (b.type == BadgeType.Wallbreaker) {
                              return 1;
                            } else {
                              return 0;
                            }
                          })
                          .map((badge, i) => {
                            if (badge.type == BadgeType.Wallbreaker) {
                              return (
                                <PortalTooltipTrigger
                                  key={i}
                                  name={TooltipName.Empty}
                                  extraContent={`Wallbreaker`}
                                >
                                  {goldStar(i)}
                                </PortalTooltipTrigger>
                              );
                            } else {
                              return (
                                <PortalTooltipTrigger
                                  key={i}
                                  name={TooltipName.Empty}
                                  extraContent={`-${BADGE_BONUSES[badge.type].bonus} seconds!`}
                                >
                                  <span
                                    style={{
                                      color: BADGE_BONUSES[badge.type].color,
                                      fontSize: '0.6rem',
                                    }}
                                    key={i}
                                  >
                                    {`[${splitPascalCase(badge.type.toString())}]`}
                                  </span>
                                </PortalTooltipTrigger>
                              );
                            }
                          })}
                      </div>
                    </div>
                    <span>{formatDuration(game.duration * 1000)}</span>
                  </div>
                ))}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: '8px',
                  padding: '8px',
                  borderTop: `1px solid ${dfstyles.colors.borderDarker}`,
                }}
              >
                <Link to={`/portal/history/${entry.address}`}>
                  <MinimalButton>View player</MinimalButton>
                </Link>
                <span>{entry.badges} badges this season</span>
              </div>
            </div>
          </ExpandedGames>
        </>
      )}
    </div>
  );
};

const Row = styled.div<{ expanded?: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  background: ${theme.colors.bg2};
  border-radius: ${theme.borderRadius};
	font-family: ${theme.fonts.mono};
  &:hover {
		background ${theme.colors.bg3};
		color: ${theme.colors.fgPrimary};
  }
`;

const ExpandedGames = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  background: ${theme.colors.bg};
  font-family: ${theme.fonts.mono};
`;

export const Group = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

export const Group1 = styled.div`
  display: flex;
  gap: 42px;
  align-items: center;
`;
