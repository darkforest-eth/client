import { CleanConfigPlayer, Leaderboard, RegistryResponse } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  loadGrandPrixLeaderboard,
  loadUniquePlayerBadges,
  loadSeasonLeaderboard,
  loadAllPlayerData,
} from '../../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import Button from '../../Components/Button';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import {
  useConfigFromHash,
  useEthConnection,
  useSeasonData,
  useSeasonPlayers,
  useTwitters,
} from '../../Utils/AppHooks';
import { ArenaLeaderboardDisplay } from '../Leaderboards/ArenaLeaderboard';
import { LabeledPanel } from './Components/LabeledPanel';
import { PaddedRow } from './Components/PaddedRow';
import {
  Group,
  Group1,
  SeasonLeaderboardEntryComponent,
} from './Components/SeasonLeaderboardEntryComponent';
import { GPFeed } from './GPFeed';
import { MapOverview } from './MapOverview';
import { isPastOrCurrentRound } from './PortalUtils';
import { getCurrentGrandPrix } from './PortalUtils';
import { theme } from './styleUtils';

export const PortalHomeView: React.FC<{}> = () => {
  console.log(`yolo`);
  const [leaderboard, setLeaderboard] = useState<Leaderboard | undefined>();
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const SEASON_GRAND_PRIXS = useSeasonData();
  const grandPrix = getCurrentGrandPrix(SEASON_GRAND_PRIXS);

  const numPastOrCurrent = SEASON_GRAND_PRIXS.filter((sgp) =>
    isPastOrCurrentRound(sgp.configHash, SEASON_GRAND_PRIXS)
  ).length;

  console.log(`weeee`);
  if (!grandPrix) return <div>No active round</div>;
  
  const { twitters } = useTwitters();
  const { allPlayers, setPlayers } = useSeasonPlayers();
  const seasonData = useSeasonData();

  const leaders = loadGrandPrixLeaderboard(allPlayers, grandPrix.configHash, twitters);

  const connection = useEthConnection();
  const address = connection.getAddress();
  if (!address) return <></>;
  const { config, lobbyAddress, error } = useConfigFromHash(grandPrix.configHash);
  const uniqueBadges = loadUniquePlayerBadges(allPlayers, grandPrix.seasonId, SEASON_GRAND_PRIXS);

  useEffect(() => {
    setLeaderboard(leaders);
  }, [allPlayers]);

  if (error) {
    return (
      <Container>
        <Content>Couldn't load map.</Content>
        <span>{error}</span>
      </Container>
    );
  }

  if (!config) {
    return (
      <Container>
        <Content>
          <LoadingSpinner />
        </Content>
      </Container>
    );
  }

  return (
    <Container>
      <div className='row w-100' style={{ gap: theme.spacing.xl }}>
        <div className='col w-100'>
          <MapOverview round={grandPrix} config={config} lobbyAddress={lobbyAddress} />
        </div>
        <div className='col w-100'>
          <LabeledPanel label='Recent Activity'>
          <div
              style={{
                overflowY: 'auto',
                maxHeight: '500px',
              }}
            >
            <GPFeed configHash={grandPrix.configHash} />
          </div>
          </LabeledPanel>
        </div>
      </div>
      <div className='row w-100' style={{ gap: theme.spacing.xl }}>
        <div className='col w-100'>
          <LabeledPanel label='Active Round'>
            <div
              style={{
                overflowY: 'auto',
                maxHeight: '500px',
              }}
            >
              <ArenaLeaderboardDisplay leaderboard={leaderboard} error={undefined} />
            </div>
          </LabeledPanel>
        </div>
        <div className='col w-100'>
          <LabeledPanel
            label='Season leaderboard'
            headerRight={() => (
              <RefreshBtn
                onClick={async () => {
                  try {
                    setRefreshing(true);
                    const players = await loadAllPlayerData(seasonData);
                    const leaders = await loadGrandPrixLeaderboard(allPlayers, grandPrix.configHash, twitters);
                    setPlayers(players);
                    setLeaderboard(leaders)
                  } catch (e) {
                    console.error(e);
                  } finally {
                    setRefreshing(false);
                  }
                }}
              >
                <RefreshIcon />
                <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
              </RefreshBtn>
            )}
          >
            <div className='col' style={{ gap: theme.spacing.md, overflowY: 'auto', maxHeight: '500px' }}>
              <SeasonLeaderboardHeader>
                <Group>
                  <span>Rank</span>
                  <span>Player</span>
                </Group>
                <Group1>
                  <span>Rounds</span>
                  <span>Time</span>
                </Group1>
              </SeasonLeaderboardHeader>
              {loadSeasonLeaderboard(allPlayers, grandPrix.seasonId, SEASON_GRAND_PRIXS)
                .entries.filter((e) => e.score > 0)
                .sort((a, b) => {
                  if (a.games > b.games) return -1;
                  else if (b.games > a.games) return 1;
                  else {
                    return a.totalDuration - b.totalDuration;
                  }
                })
                .map((entry, index) => (
                  <SeasonLeaderboardEntryComponent
                    key={index}
                    entry={entry}
                    index={index}
                    uniqueBadges={uniqueBadges}
                  />
                ))}
            </div>
          </LabeledPanel>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 3rem;
  padding-top: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
  width: 100%;
  gap: 24px;
  margin-bottom: 24px;
`;

export const Label = styled.span`
  font-size: 1rem;
  color: ${theme.colors.fgPrimary};
  font-family: ${theme.fonts.mono};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding-bottom: 1rem;
`;

const SeasonLeaderboardHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  font-family: ${theme.fonts.mono};
`;

const RefreshBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${theme.spacing.sm};
  padding: ${theme.spacing.sm};
  border-radius: 4px;
  background-color: ${theme.colors.bg2};
  cursor: pointer;
  font-family: ${theme.fonts.mono};
  transition: all 0.2s ease-in-out;
  &:hover {
    background-color: ${theme.colors.bg3};
    color: ${theme.colors.fgPrimary};
  }
`;

const RefreshIcon = () => (
  <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M1.90321 7.29677C1.90321 10.341 4.11041 12.4147 6.58893 12.8439C6.87255 12.893 7.06266 13.1627 7.01355 13.4464C6.96444 13.73 6.69471 13.9201 6.41109 13.871C3.49942 13.3668 0.86084 10.9127 0.86084 7.29677C0.860839 5.76009 1.55996 4.55245 2.37639 3.63377C2.96124 2.97568 3.63034 2.44135 4.16846 2.03202L2.53205 2.03202C2.25591 2.03202 2.03205 1.80816 2.03205 1.53202C2.03205 1.25588 2.25591 1.03202 2.53205 1.03202L5.53205 1.03202C5.80819 1.03202 6.03205 1.25588 6.03205 1.53202L6.03205 4.53202C6.03205 4.80816 5.80819 5.03202 5.53205 5.03202C5.25591 5.03202 5.03205 4.80816 5.03205 4.53202L5.03205 2.68645L5.03054 2.68759L5.03045 2.68766L5.03044 2.68767L5.03043 2.68767C4.45896 3.11868 3.76059 3.64538 3.15554 4.3262C2.44102 5.13021 1.90321 6.10154 1.90321 7.29677ZM13.0109 7.70321C13.0109 4.69115 10.8505 2.6296 8.40384 2.17029C8.12093 2.11718 7.93465 1.84479 7.98776 1.56188C8.04087 1.27898 8.31326 1.0927 8.59616 1.14581C11.4704 1.68541 14.0532 4.12605 14.0532 7.70321C14.0532 9.23988 13.3541 10.4475 12.5377 11.3662C11.9528 12.0243 11.2837 12.5586 10.7456 12.968L12.3821 12.968C12.6582 12.968 12.8821 13.1918 12.8821 13.468C12.8821 13.7441 12.6582 13.968 12.3821 13.968L9.38205 13.968C9.10591 13.968 8.88205 13.7441 8.88205 13.468L8.88205 10.468C8.88205 10.1918 9.10591 9.96796 9.38205 9.96796C9.65819 9.96796 9.88205 10.1918 9.88205 10.468L9.88205 12.3135L9.88362 12.3123C10.4551 11.8813 11.1535 11.3546 11.7585 10.6738C12.4731 9.86976 13.0109 8.89844 13.0109 7.70321Z'
      fill='currentColor'
      fillRule='evenodd'
      clipRule='evenodd'
    ></path>
  </svg>
);
