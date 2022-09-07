import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { formatDuration } from '../../Utils/TimeUtils';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Minimap } from '../../Components/Minimap';
import { generateMinimapConfig, MinimapConfig } from '../../Panes/Lobby/MinimapUtils';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { EthAddress, GrandPrixMetadata, RegistryResponse } from '@darkforest_eth/types';
import { getConfigName } from '@darkforest_eth/procedural';
import { PortalButton } from '../../Styles/dfstyles';
import { LobbyButton } from '../../Pages/Lobby/LobbyMapEditor';
import { theme } from './styleUtils';

type RoundStatus = 'not started' | 'started' | 'ended';

export const MapOverview: React.FC<{
  round: GrandPrixMetadata;
  config: LobbyInitializers;
  lobbyAddress?: EthAddress;
}> = ({ round, lobbyAddress, config }) => {
  const [status, setStatus] = useState<RoundStatus>('not started');
  const [countdown, setCountdown] = useState<number>();
  const [minimapConfig, setMinimapConfig] = useState<MinimapConfig | undefined>();
  const [mapName, setMapName] = useState<string>(
    round.configHash ? getConfigName(round.configHash) : 'No map found'
  );

  const onMapChange = useMemo(() => {
    return debounce((config: MinimapConfig) => round.configHash && setMinimapConfig(config), 500);
  }, [setMinimapConfig, round.configHash]);

  useEffect(() => {
    if (config) {
      const name = round.configHash ? getConfigName(round.configHash) : 'No map found';
      setMapName(name);
      onMapChange(generateMinimapConfig(config, 4));
    } else {
      setMinimapConfig(undefined);
      setMapName('No map found');
    }
  }, [config, onMapChange, setMapName, round.configHash]);

  useEffect(() => {
    const update = () => {
      const now = Math.floor(Date.now() / 1000);
      
      if (now > round.endTime) {
        setStatus('ended');
        setCountdown(1);
        return;
      }
      if (now < round.startTime) {
        setStatus('not started');
        const sWait = round.startTime - now;
        setCountdown(sWait * 1000);
        return;
      }

      const sWait = round.endTime - now;

      setStatus('started');
      setCountdown(sWait * 1000);
    };

    const interval = setInterval(() => {
      update();
    }, 1000);

    return () => clearInterval(interval);
  }, [status, countdown, round.endTime, round.startTime]);

  const { innerHeight } = window;
  let mapSize = '300px';
  if (innerHeight < 700) {
    mapSize = '300px';
  }

  return (
    <Container>
      <Content>
        {!minimapConfig ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minWidth: mapSize,
              minHeight: mapSize,
            }}
          >
            <LoadingSpinner initialText='Loading...' />
          </div>
        ) : (
          <MinimapContainer width={mapSize} height={mapSize}>
            <Minimap
              style={{ width: mapSize, height: mapSize }}
              minimapConfig={minimapConfig}
              setRefreshing={() => {
                // do nothing
              }}
            />
          </MinimapContainer>
        )}
        <TextContent>
          <div
            style={{
              border: `1px solid ${theme.colors.bg1}`,
              padding: theme.spacing.md,
              alignSelf: 'flex-start',
              borderRadius: '2px',
            }}
          >
            <SeasonName>{`Season ${round.seasonId}`}</SeasonName>
          </div>
          <Title>{mapName ?? 'Grand Prix Round'}</Title>
          <MapActions>
            <Link target='blank' to={`/play/${lobbyAddress}?create=true`}>
              <LobbyButton primary>
                Play round
              </LobbyButton>
            </Link>
            {countdown ? (
              <RoundCountdown>
                {status == 'ended'
                  ? 'Round over!'
                  : status == 'not started'
                  ? `Active round starts in ${formatDuration(countdown)} `
                  : `Active round ends in ${formatDuration(countdown)} `}
              </RoundCountdown>
            ) : (
              <div style={{ height: '21px', width: '240px' }}>
                <LoadingSpinner />
              </div>
            )}
          </MapActions>
        </TextContent>
      </Content>
    </Container>
  );
};

const Container = styled.div`
  padding: 24px;
  border-radius: 4px;
`;
const Content = styled.div`
  margin: 0 auto;
  display: flex;
  gap: 16px;
  align-items: center;
`;
const TextContent = styled.div`
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
`;
const SeasonName = styled.span`
  text-transform: uppercase;
  font-family: ${theme.fonts.mono};
  font-size: 0.75rem;
  letter-spacing: 0.06em;
`;
const Title = styled.span`
  font-size: 2.5rem;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  font-family: ${theme.fonts.mono};
  color: ${theme.colors.fgPrimary};
`;
const MapActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1 1 auto;
`;

const RoundCountdown = styled.span`
  justify-self: flex-start;
  font-family: ${theme.fonts.mono};
`;
const MinimapContainer = styled.div<{ width: string; height: string }>`
  display: grid;
  place-items: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: ${(props) => props.width};
  max-height: ${(props) => props.height};
`;
