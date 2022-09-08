import { Leaderboard, RegistryResponse } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  loadGrandPrixLeaderboard,
  loadUniquePlayerBadges,
  loadSeasonLeaderboard,
} from '../../../Backend/Network/GraphApi/SeasonLeaderboardApi';
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
import { SeasonLeaderboardEntryComponent } from './Components/SeasonLeaderboardEntryComponent';
import { GPFeed } from './GPFeed';
import { MapOverview } from './MapOverview';
import { getCurrentGrandPrix } from './PortalUtils';
import { theme } from './styleUtils';

export const PortalHomeView: React.FC<{}> = () => {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | undefined>();
  const SEASON_GRAND_PRIXS = useSeasonData();
  const grandPrix = getCurrentGrandPrix(SEASON_GRAND_PRIXS);
  if (!grandPrix) return <div>No active round</div>;
  const twitters = useTwitters();
  const allPlayers = useSeasonPlayers();
  const connection = useEthConnection();
  const address = connection.getAddress();
  if (!address) return <></>;
  const leaders = loadGrandPrixLeaderboard(allPlayers, grandPrix.configHash, twitters);
  const { config, lobbyAddress, error } = useConfigFromHash(grandPrix.configHash);
  const uniqueBadges = loadUniquePlayerBadges(allPlayers, grandPrix.seasonId, SEASON_GRAND_PRIXS);

  useEffect(() => {
    setLeaderboard(leaders);
  }, []);

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
            <GPFeed configHash={grandPrix.configHash} />
          </LabeledPanel>
        </div>
      </div>
      <div className='row w-100' style={{ gap: theme.spacing.xl }}>
        <div className='col w-100'>
          <LabeledPanel label='Active Round'>
            <ArenaLeaderboardDisplay leaderboard={leaderboard} error={undefined} />
          </LabeledPanel>
        </div>
        <div className='col w-100'>
          <LabeledPanel label='Season leaderboard'>
            <div className='col' style={{ gap: theme.spacing.md }}>
              {loadSeasonLeaderboard(allPlayers, grandPrix.seasonId, SEASON_GRAND_PRIXS)
                .entries.sort((a, b) => b.score - a.score)
                .filter((e) => e.score > 0)
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
