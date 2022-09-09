import { getConfigName } from '@darkforest_eth/procedural';
import { address } from '@darkforest_eth/serde';
import {
  BadgeType,
  EthAddress,
  GrandPrixHistory,
  GrandPrixMetadata,
  SeasonScore,
} from '@darkforest_eth/types';
import { IconType } from '@darkforest_eth/ui';
import { isAddress } from 'ethers/lib/utils';
import React, { useEffect, useMemo, useState } from 'react';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { calcBadgeTypeScore, loadPlayerSeasonHistoryView } from '../../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import { BadgeDetailsRow } from '../../Components/Badges';
import { Icon } from '../../Components/Icons';
import { Sub } from '../../Components/Text';
import {
  useAccount,
  useEthConnection,
  useSeasonData,
  useSeasonPlayers,
  useTwitters,
} from '../../Utils/AppHooks';
import { SEASON_GRAND_PRIXS } from '../../Utils/constants';
import { formatDuration } from '../../Utils/TimeUtils';
import { TiledTable } from '../TiledTable';
import { PortalHistoryRoundCard } from './Components/PortalHistoryRoundCard';
import { Label } from './PortalHomeView';
import { isPastOrCurrentRound } from './PortalUtils';
import { theme } from './styleUtils';

export interface TimelineProps {
  configHashes: string[];
}


// if Player not found, create dummy history

export function PortalHistoryView({ match }: RouteComponentProps<{ account: string }>) {
  const [current, setCurrent] = useState<number>(0);
  const account = match.params.account as EthAddress;
  const ethConnection = useEthConnection();
  const { twitters } = useTwitters();
  const currentPlayerAddress = ethConnection.getAddress();
  if (!account) return <div>Loading...</div>;

  const configPlayers = useSeasonPlayers();
  const SEASON_GRAND_PRIXS = useSeasonData();

  const seasonHistories = loadPlayerSeasonHistoryView(account, configPlayers, SEASON_GRAND_PRIXS);

  const rounds = seasonHistories[current].grandPrixs.filter((gp) =>
    isPastOrCurrentRound(gp.configHash, SEASON_GRAND_PRIXS)
  );

  const grandPrixBadges = rounds.map((round) => round.badges).flat(); //mockBadges;

  const seasonScorePreBadge = useMemo(() => rounds.reduce((prev, curr) => curr.score + prev, 0), [rounds]);
  const seasonScore = seasonScorePreBadge - calcBadgeTypeScore(grandPrixBadges.map(b => b.type));
  const mapComponents = useMemo(
    () =>
      rounds.map((round: GrandPrixHistory, idx: number) => (
        <PortalHistoryRoundCard round={round} index={idx} key={idx} />
      )),
    [rounds]
  );

  const badgeElements = useMemo(() => {
    if (grandPrixBadges.length == 0) return <Subtitle>Race to earn badges!</Subtitle>;

    const countedBadges: { count: number; badge: BadgeType }[] = [];
    grandPrixBadges.forEach((cb) => {
      const found = countedBadges.find((b) => b.badge == cb.type);
      if (!found) return countedBadges.push({ count: 1, badge: cb.type });
      return found.count++;
    });
    return countedBadges.map((badge, i) => (
      <BadgeDetailsRow key={i} type={badge.badge} count={badge.count} />
    ));
  }, [grandPrixBadges]);

  const leftDisplay = current == 0 ? 'none' : 'flex';
  const rightDisplay = current == seasonHistories.length - 1 ? 'none' : 'flex';
  return (
    <Container>
      <HeaderContainer>
        <div className='col'>
          <Title>Season {current + 1}</Title>
          <Subtitle>
            {rounds.length} {rounds.length == 1 ? 'round' : 'rounds'} in this season so far
          </Subtitle>
        </div>
      </HeaderContainer>
      <PlayerInfoContainer>
        <div
          style={{
            width: '66%',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span style={{ fontSize: '1.2rem' }}>
            Player {twitters[account] ?? account} {account === currentPlayerAddress && '(you)'}
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: theme.spacing.xl,
            }}
          >
            <div className='col'>
              <Subtitle style={{ textTransform: 'uppercase' }}>Season Rank</Subtitle>
              <Title>
                {seasonScore == 0
                  ? '-'
                  : seasonHistories[current].rank + ` of ` + seasonHistories[current].players}
              </Title>
            </div>
            <div className='col'>
              <Subtitle style={{ textTransform: 'uppercase' }}>Season Score</Subtitle>
              <Title>{formatDuration(seasonScore * 1000)}</Title>
            </div>
          </div>
        </div>
      </PlayerInfoContainer>

      <Label>Season badges</Label>
      <BodyContainer>{badgeElements}</BodyContainer>

      <Label>Season rounds</Label>
      <BodyContainer>{mapComponents}</BodyContainer>
    </Container>
  );
}

const Title = styled.span`
  font-family: ${theme.fonts.mono};
  color: ${theme.colors.fgPrimary};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  font-size: 1.8em;
`;

const Subtitle = styled.span`
  color: ${theme.colors.fgMuted2};
  opacity: 0.8;
  font-family: ${theme.fonts.mono};
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xl};
  // align-items: center;
  // justify-content: space-between;
  // height: 100%;
  // width: 100%;
  margin: 0 3rem;
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;

const BodyContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, 300px);
  align-items: center;
  gap: ${theme.spacing.xl};
`;

const PlayerInfoContainer = styled.div`
  border-radius: ${theme.borderRadius};
  background: ${theme.colors.bg1};
  font-family: ${theme.fonts.mono};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${theme.spacing.xl};
`;
