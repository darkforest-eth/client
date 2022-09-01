import { getConfigName } from '@darkforest_eth/procedural';
import dfstyles from '@darkforest_eth/ui/dist/styles';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { SeasonLeaderboardEntry } from '../../../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import { MinimalButton } from '../PortalMainView';
import { theme } from '../styleUtils';

export const SeasonLeaderboardEntryComponent: React.FC<{
  entry: SeasonLeaderboardEntry;
  index: number;
}> = ({ entry, index }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  return (
    <div>
      <Row key={index} onClick={() => setExpanded(!expanded)} expanded={expanded}>
        <Group>
          <span>{index + 1}</span>
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
              <span>{entry.badges} badges this season</span>
              <Link to={`/portal/history/${entry.address}`}>
                <MinimalButton>View player</MinimalButton>
              </Link>
            </div>
          </div>
        </ExpandedGames>
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

const Group = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
