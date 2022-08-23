import { getConfigName } from '@darkforest_eth/procedural';
import { BadgeType, EthAddress, GrandPrixHistory, SeasonScore } from '@darkforest_eth/types';
import { IconType } from '@darkforest_eth/ui';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  loadPlayerSeasonHistoryView,
  loadSeasonLeaderboard,
} from '../../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import { Icon } from '../../Components/Icons';
import { Sub } from '../../Components/Text';
import { useAccount, useEthConnection, useSeasonData } from '../../Utils/AppHooks';
import { GrandPrixMetadata, SEASON_GRAND_PRIXS } from '../../Utils/constants';
import { TiledTable } from '../TiledTable';

export interface TimelineProps {
  configHashes: string[];
}

// For now, just for season one.
function seasonScoreToSeasonHistoryItem(account: EthAddress, seasonScores: SeasonScore[]) {
  // Sort descending
  let rank = 0;

  seasonScores
    .sort((a, b) => b.score - a.score)
    .map((s, index) => {
      if (account && s.player == account) rank = index;
    });
  const history: SeasonHistoryItem = {
    seasonId: 1,
    grandPrixHistoryItems: [],
    rank,
    players: seasonScores.length,
  };
  return history;
}

export interface SeasonHistoryItem {
  seasonId: number;
  grandPrixHistoryItems: GrandPrixHistoryItem[];
  rank: number;
  players: number;
}

export interface GrandPrixHistoryItem {
  configHash: string;
  startTime: number;
  endTime: number;
  players: number;
  rank: number;
  score: number;
  badges: BadgeType[];
}
/**
 * Derive Season Leaderboard from AllPlayerData
 * (Rank, Score, Id)
 *
 * Derive GrandPrixHistoryItem
 * Need to get Badge Type as well
 *
 */

const seasons: SeasonHistoryItem[] = [
  {
    seasonId: 1,
    rank: 5,
    players: 1000,
    grandPrixHistoryItems: [
      {
        configHash: '0xfe719a3cfccf2bcfa23f71f0af80a931eda4f4197331828d728b7505a6156930',
        startTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        endTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        players: 1000,
        rank: 5,
        score: 10000,
        badges: [BadgeType.Dfdao, BadgeType.Dfdao],
      },
      {
        configHash: '0xfe719a3cfccf2bcfa23f71f0af80a931eda4f4197331828d728b7505a6156930',
        startTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        endTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        players: 1000,
        rank: 5,
        score: 10000,
        badges: [BadgeType.Dfdao, BadgeType.Dfdao],
      },
    ],
  },
  {
    seasonId: 1,
    rank: 5,
    players: 1000,
    grandPrixHistoryItems: [
      {
        configHash: '0xfe719a3cfccf2bcfa23f71f0af80a931eda4f4197331828d728b7505a6156930',
        startTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        endTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        players: 1000,
        rank: 5,
        score: 10000,
        badges: [BadgeType.Dfdao, BadgeType.Dfdao],
      },
      {
        configHash: '0xfe719a3cfccf2bcfa23f71f0af80a931eda4f4197331828d728b7505a6156930',
        startTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        endTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        players: 1000,
        rank: 5,
        score: 10000,
        badges: [BadgeType.Dfdao, BadgeType.Dfdao],
      },
    ],
  },
];

const MapComponent: React.FC<{ round: GrandPrixHistory; index: number }> = ({ round, index }) => {
  const history = useHistory();
  return (
    <MapContainer onClick={() => history.push(`/portal/map/${round.configHash}`)}>
      <MapNameContainer>
        <div style={{ position: 'absolute', top: '0', left: '5px' }}>GP{index}</div>
        <WhiteFont>{getConfigName(round.configHash)}</WhiteFont>
      </MapNameContainer>
      <MapDetailsContainer>
        <Sub>score</Sub> <WhiteFont>{round.score}</WhiteFont>
        <Sub>rank</Sub>{' '}
        <WhiteFont>
          {round.rank} of {round.players}
        </WhiteFont>
        <Sub>badges</Sub> <WhiteFont>{round.badges.length}</WhiteFont>
      </MapDetailsContainer>
    </MapContainer>
  );
};

const WhiteFont = styled.p`
  color: white;
  font-size: 1.15rem;
  margin-top: -12px;
  margin-bottom: -6px;
`;
const MapContainer = styled.div`
  background: #363639;
  display: flex;
  padding: 8px;
  border-radius: 5px;
  text-align: left;
  gap: 8px;
  margin: 8px;
  max-width: calc(33% - 13px);
  cursor: pointer;
`;

const MapNameContainer = styled.div`
  flex: 1;
  display: flex;
  background: #202020;
  align-items: flex-end;
  position: relative;
  border-radius: 5px;
  padding: 5px;
  text-align: left;
`;

const MapDetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 5px;
`;

export const PortalHistoryView: React.FC<{}> = ({}) => {
  const [current, setCurrent] = useState<number>(0);

  const account = useEthConnection().getAddress()!;
  const configPlayers = useSeasonData();
  const seasonHistories = loadPlayerSeasonHistoryView(account, configPlayers);
  console.log(seasonHistories);

  const rounds = seasonHistories[current].grandPrixs;
  const totalScore = useMemo(() => rounds.reduce((prev, curr) => curr.score + prev, 0), [rounds]);
  const mapComponents = useMemo(
    () => rounds.map((round, idx) => <MapComponent round={round} index={idx} />),
    [rounds]
  );

  const leftDisplay = current == 0 ? 'none' : 'flex';
  const rightDisplay = current == seasonHistories.length - 1 ? 'none' : 'flex';
  return (
    <Container>
      <HeaderContainer>
        <TitleContainer>
          <button
            onClick={() => setCurrent(current - 1)}
            style={{
              position: 'absolute',
              left: '-40px',
              margin: 'auto',
              display: leftDisplay,
              fontSize: '2rem',
              transform: 'rotate(180deg)',
            }}
          >
            <Icon type={IconType.RightArrow} />
          </button>
          <span>Season {current + 1}</span>
          <button
            onClick={() => setCurrent(current + 1)}
            style={{
              position: 'absolute',
              right: '-40px',
              margin: 'auto',
              display: rightDisplay,
              fontSize: '2rem',
            }}
          >
            <Icon type={IconType.RightArrow} />
          </button>
        </TitleContainer>

        <div style={{ fontSize: '1.5rem', textAlign: 'right' }}>
          <div>
            <Sub>rank</Sub>{' '}
            <span style={{ fontSize: '2rem' }}>{seasonHistories[current].rank}</span> of{' '}
            {seasonHistories[current].players}
          </div>
          <div>
            <Sub>score</Sub> <span style={{ fontSize: '2rem' }}>{totalScore}</span>
          </div>
        </div>
      </HeaderContainer>
      <BodyContainer>
        <TiledTable title={<span style={{ fontSize: '2em' }}>Maps</span>} items={mapComponents} />
      </BodyContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding: 16px 48px;
`;

const HeaderContainer = styled.div`
  background: rgb(42, 42, 42);
  background: linear-gradient(0deg, rgba(42, 42, 42, 1) 05%, rgba(20, 20, 20, 1) 100%);
  width: 100%;
  max-width: 1300px;
  min-height: 200px;
  border-radius: 48px 48px 0px 0px;
  display: flex;
  justify-content: center;
  gap: 20%;
  align-items: center;
`;

const TitleContainer = styled.div`
  position: relative;
  font-size: 5em;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BodyContainer = styled.div`
  width: 800px;
  height: 100%;
`;

const RightArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 2rem solid transparent;
  border-bottom: 2rem solid transparent;

  border-left: 2rem solid green;
`;

const LeftArrow = styled.div`
  width: 0;
  height: 0;
  border-top: 2rem solid transparent;
  border-bottom: 2rem solid transparent;

  border-right: 2rem solid blue;
`;
