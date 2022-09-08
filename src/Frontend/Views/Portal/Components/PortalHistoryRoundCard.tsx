import { getConfigName } from '@darkforest_eth/procedural';
import { GrandPrixHistory } from '@darkforest_eth/types';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { LoadingSpinner } from '../../../Components/LoadingSpinner';
import { Minimap } from '../../../Components/Minimap';
import { LobbyButton } from '../../../Pages/Lobby/LobbyMapEditor';
import { generateMinimapConfig, MinimapConfig } from '../../../Panes/Lobby/MinimapUtils';
import { useConfigFromHash } from '../../../Utils/AppHooks';
import { formatDuration } from '../../../Utils/TimeUtils';
import { theme } from '../styleUtils';

/**
 * Derive Season Leaderboard from AllPlayerData
 * (Rank, Score, Id)
 *
 * Derive GrandPrixHistoryItem
 * Need to get Badge Type as well
 *
 */

export const PortalHistoryRoundCard: React.FC<{ round: GrandPrixHistory; index: number }> = ({
  round,
  index,
}) => {
  const [minimapConfig, setMinimapConfig] = useState<MinimapConfig | undefined>();
  const { config, lobbyAddress } = useConfigFromHash(round.configHash);

  const onMapChange = useMemo(() => {
    return debounce((config: MinimapConfig) => round.configHash && setMinimapConfig(config), 500);
  }, [setMinimapConfig, round.configHash]);

  useEffect(() => {
    if (config) {
      onMapChange(generateMinimapConfig(config, 4));
    } else {
      setMinimapConfig(undefined);
    }
  }, [config, onMapChange, round.configHash]);

  const { innerHeight } = window;
  let mapSize = '200px';
  if (innerHeight < 700) {
    mapSize = '200px';
  }

  return (
    <MapContainer>
      <MapNameContainer>
        {!minimapConfig ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: mapSize,
              height: mapSize,
            }}
          >
            <LoadingSpinner initialText='Loading...' />
          </div>
        ) : (
          <MinimapContainer>
            <Minimap
              style={{ width: mapSize, height: mapSize }}
              minimapConfig={minimapConfig}
              setRefreshing={() => {
                // do nothing
              }}
            />
          </MinimapContainer>
        )}
      </MapNameContainer>
      <MapDetailsContainer>
        <GameTitle>{getConfigName(round.configHash)}</GameTitle>
        <DetailRow>
          <DetailLabel>Score</DetailLabel>
          <DetailValue>{formatDuration(round.score * 1000)}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Rank</DetailLabel>
          <DetailValue>{round.score == 0 ? '-' : round.rank + ` of ` + round.players}</DetailValue>
        </DetailRow>
        <DetailRow>
          <DetailLabel>Badges</DetailLabel>
          <DetailValue>{round.badges.length}</DetailValue>
        </DetailRow>
        <Link style={{ minWidth: '250px' }} target='_blank' to={`/play/${lobbyAddress}?create=true`}>
          <LobbyButton primary>Play</LobbyButton>
        </Link>
        <Link style={{ minWidth: '250px' }} to={`/portal/map/${round.configHash}`}>
          <LobbyButton>Details</LobbyButton>
        </Link>
      </MapDetailsContainer>
    </MapContainer>
  );
};

const GameTitle = styled.span`
  font-family: ${theme.fonts.mono};
  text-transform: uppercase;
  font-size: 1.15rem;
  letter-spacing: 0.06em;
  color: ${theme.colors.fgPrimary};
  margin-bottom: ${theme.spacing.md};
`;

const MapContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid ${theme.colors.bg3};
  border-radius: ${theme.borderRadius};
`;

const MapNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.sm};
`;

const MapDetailsContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  background: ${theme.colors.bg1};
  padding: ${theme.spacing.xl};
`;

const MinimapContainer = styled.div`
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${theme.spacing.sm};
`;
const DetailLabel = styled.span`
  font-family: ${theme.fonts.mono};
  color: ${theme.colors.fgMuted2};
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const DetailValue = styled.span`
  font-family: ${theme.fonts.mono};
  color: ${theme.colors.fgPrimary};
`;
