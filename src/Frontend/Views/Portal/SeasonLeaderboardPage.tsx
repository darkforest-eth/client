import { getConfigName } from '@darkforest_eth/procedural';
import { BadgeType } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  groupByPlayers,
  loadSeasonLeaderboard,
  loadSeasonPlayers,
  SeasonLeaderboardEntry,
  SeasonLeaderboardProps,
} from '../../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import dfstyles from '../../Styles/dfstyles';
import { useSeasonData, useSeasonPlayers } from '../../Utils/AppHooks';
import { getCurrentGrandPrix } from './PortalUtils';
import { theme } from './styleUtils';

export const Entry: React.FC<{
  entry: SeasonLeaderboardEntry;
  index: number;
}> = ({ entry, index }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <tr>
      <td style={{ display: 'flex', flexDirection: 'column' }}>
        <Row key={index} onClick={() => setExpanded(!expanded)} expanded={expanded}>
          <Group>
            <span
              style={{
                color: index % 2 === 0 ? dfstyles.colors.text : dfstyles.colors.textLight,
              }}
            >
              {index + 1}
            </span>
            <span>{entry.address}</span>
          </Group>
          <span>{entry.score}</span>
        </Row>
        {expanded && (
          <ExpandedGames style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {entry.games.map((game, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span>{getConfigName(game.configHash)}</span>
                  <span>{game.score}</span>
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
                  <button>View player</button>
                </Link>
                <span>{entry.badges} badges this season</span>
              </div>
            </div>
          </ExpandedGames>
        )}
      </td>
    </tr>
  );
};

const Leaderboard: React.FC<SeasonLeaderboardProps> = ({ seasonId, entries }) => {
  return (
    <Container>
      <Table>
        <Header>
          <tr>
            <HeaderColumn>Rank</HeaderColumn>
            <HeaderColumn>Address</HeaderColumn>
          </tr>
          <tr>
            <HeaderColumn>Score</HeaderColumn>
          </tr>
        </Header>
        <Body>
          {entries
            .sort((a, b) => b.score - a.score)
            .map((entry, index) => (
              <Entry key={index} entry={entry} index={index} />
            ))}
        </Body>
      </Table>
    </Container>
  );
};

export const SeasonLeaderboardPage: React.FC = () => {
  const { allPlayers } = useSeasonPlayers();
  const SEASON_GRAND_PRIXS = useSeasonData();
  const currentGrandPrix = getCurrentGrandPrix(SEASON_GRAND_PRIXS);
  if (!currentGrandPrix) return <div>No grand prix is currently active</div>;
  const leaderboard = loadSeasonLeaderboard(
    allPlayers,
    currentGrandPrix.seasonId,
    SEASON_GRAND_PRIXS
  );
  const seasonId = currentGrandPrix.seasonId;
  return (
    <div style={{ margin: '0 auto', textAlign: 'center' }}>
      <Title>Season {seasonId} Leaderboard</Title>
      <Leaderboard seasonId={seasonId} entries={leaderboard.entries} />;
    </div>
  );
};

const Container = styled.div`
  width: 66%;
  max-width: 640px;
  margin: 0 auto;
  padding: 3rem;
  text-align: center;
`;

const Title = styled.span`
  font-size: 1.5rem;
  text-transform: uppercase;
  margin-bottom: 1rem;
`;

const Header = styled.thead`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem;
`;

const HeaderColumn = styled.th`
  vertical-align: bottom;
  line-height: 1rem;
  text-transform: uppercase;
`;

const Group = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;

const Body = styled.tbody`
  width: 100%;
`;

const Table = styled.table`
  width: 100%;
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
`;

const Row = styled.div<{ expanded?: boolean }>`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  background: ${theme.colors.bg2};
  &:hover {
    background: ${dfstyles.colors.backgroundlighter};
  }
`;

const ExpandedGames = styled.div`
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  background: #000;
`;
