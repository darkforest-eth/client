import { Leaderboard } from '@darkforest_eth/types';
import { BigNumber } from 'ethers';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadArenaLeaderboard } from '../../../Backend/Network/GraphApi/GrandPrixApi';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { useConfigFromHash, useEthConnection } from '../../Utils/AppHooks';
import { ArenaLeaderboardDisplay } from '../Leaderboards/ArenaLeaderboard';
import { LabeledPanel } from './Components/LabeledPanel';
import { PaddedRow } from './Components/PaddedRow';
import { SeasonLeaderboardEntryComponent } from './Components/SeasonLeaderboardEntryComponent';
import { GPFeed } from './GPFeed';
import { MapOverview } from './MapOverview';
import { createDummySeasonLeaderboardData } from './PortalUtils';
import { theme } from './styleUtils';

export interface RoundResponse {
  configHash: string;
  startTime: BigNumber;
  endTime: BigNumber;
  parentAddress: string;
  seasonId: BigNumber;
}

const DUMMY = {
  configHash: '0xd08bbeb0785370a68369f0a042e33ef2688da6da5e79acbb5688ddbb8ca4a862',
  startTime: BigNumber.from('1661435558381'),
  endTime: BigNumber.from('1761435658381'),
  parentAddress: '0xcee9abadf221ca7db9fb8c3a2d402d9cab9bb38d',
  seasonId: BigNumber.from('1'),
} as RoundResponse;

export const PortalHomeView: React.FC<{}> = () => {
  const [leaderboard, setLeaderboard] = useState<Leaderboard | undefined>();
  const { config, lobbyAddress, error } = useConfigFromHash(DUMMY.configHash);

  useEffect(() => {
    setLeaderboard(undefined);
    async function loadLeaderboard() {
      if (DUMMY.configHash) {
        const leaderboard = await loadArenaLeaderboard(DUMMY.configHash, true);
        setLeaderboard(leaderboard);
      }
    }
    loadLeaderboard();
  }, [DUMMY.configHash]);

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
          <MapOverview round={DUMMY} config={config} lobbyAddress={lobbyAddress} />
        </div>
        <div className='col w-100'>
          <Label>Live Feed</Label>
          <GPFeed leaderboard={leaderboard} />
        </div>
      </div>
      <div className='row w-100' style={{ gap: theme.spacing.xl }}>
        <div className='col w-100'>
          <LabeledPanel label='Active game leaderboard'>
            <ArenaLeaderboardDisplay leaderboard={leaderboard} error={undefined} />
            {leaderboard?.entries.length === 0 ||
              (leaderboard && leaderboard.length <= 3 && (
                <PaddedRow>
                  <span>Play the current round to get your score on the leaderboard</span>
                </PaddedRow>
              ))}
          </LabeledPanel>
        </div>
        <div className='col w-100'>
          <LabeledPanel label='Season leaderboard'>
            <div className='col' style={{ gap: theme.spacing.md }}>
              {createDummySeasonLeaderboardData(15)
                .sort((a, b) => b.score - a.score)
                .map((entry, index) => (
                  <SeasonLeaderboardEntryComponent key={index} entry={entry} index={index} />
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

const Label = styled.span`
  font-size: 1rem;
  color: ${theme.colors.fgPrimary};
  font-family: ${theme.fonts.mono};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding-bottom: 1rem;
`;
