import { getConfigName } from '@darkforest_eth/procedural';
import { EthAddress } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { MythicLabelText } from '../../Components/Labels/MythicLabel';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Minimap } from '../../Components/Minimap';
import { TextPreview } from '../../Components/TextPreview';
import { generateMinimapConfig, MinimapConfig } from '../../Panes/Lobby/MinimapUtils';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { useConfigFromHash } from '../../Utils/AppHooks';
import { competitiveConfig } from '../../Utils/constants';

import { MapDetails } from './MapDetails';
import { LobbyButton } from '../../Pages/Lobby/LobbyMapEditor';

const NONE = 'No map found';
function MapOverview({
  configHash,
  config,
  lobbyAddress,
}: {
  configHash: string | undefined;
  config: LobbyInitializers | undefined;
  lobbyAddress: EthAddress | undefined;
}) {
  const [minimapConfig, setMinimapConfig] = useState<MinimapConfig | undefined>();
  const [mapName, setMapName] = useState<string>(configHash ? getConfigName(configHash) : NONE);

  const onMapChange = useMemo(() => {
    return _.debounce((config: MinimapConfig) => configHash && setMinimapConfig(config), 500);
  }, [setMinimapConfig]);

  useEffect(() => {
    if (config) {
      const name = configHash ? getConfigName(configHash) : NONE;
      setMapName(name);
      onMapChange(generateMinimapConfig(config, 4));
    } else {
      setMinimapConfig(undefined);
      setMapName(NONE);
    }
  }, [config, onMapChange, setMapName]);

  const { innerHeight: height } = window;
  let mapSize = '500px';
  if (innerHeight < 700) {
    mapSize = '300px';
  }

  return (
    <OverviewContainer>
      <div style={{ textAlign: 'center' }}>
        {configHash == competitiveConfig && (
          <MythicLabelText text={`Galactic League Official Map`} />
        )}
        <MapTitle>{mapName}</MapTitle>
        <TextPreview text={configHash} focusedWidth={'200px'} unFocusedWidth={'200px'} />
      </div>

      {!minimapConfig ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '500px',
            height: '500px',
          }}
        >
          <LoadingSpinner initialText='Loading...' />
        </div>
      ) : (
        <Minimap
          style={{ width: mapSize, height: mapSize }}
          minimapConfig={minimapConfig}
          setRefreshing={() => {}}
        />
      )}
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', width: '100%' }}>
        {/* <Link style={{ minWidth: '250px' }} target='blank' to={`/arena/${lobbyAddress}/settings`}>
          <LobbyButton>Remix Map</LobbyButton>
        </Link> */}
        <Link style={{ minWidth: '250px' }} target='blank' to={`/play/${lobbyAddress}?create=true`}>
          <LobbyButton primary>Create Match</LobbyButton>
        </Link>
      </div>
    </OverviewContainer>
  );
}

export function MapInfoView({ match }: RouteComponentProps<{ configHash: string }>) {
  const configHash = match.params.configHash || undefined;
  const { config, lobbyAddress, error } = useConfigFromHash(configHash);

  return (
    <MapInfoContainer>
      {error ? (
        <div>Map Not Found</div>
      ) : (
        config && configHash && (
          <>
            <MapOverview configHash={configHash} config={config} lobbyAddress={lobbyAddress} />
            <MapDetails configHash={configHash} config={config} />
          </>
        )
      )}
    </MapInfoContainer>
  );
}

const MapInfoContainer = styled.div`
  display: flex;
  flex: 1 1;
  flex-direction: row;
  height: 100%;
  width: 100%;
  justify-content: space-evenly;
  padding: 10px;
  overflow: hidden;
`;

const OverviewContainer = styled.div`
  flex: 1 1 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.div`
  display: flex;
  text-align: center;
  font-size: 3em;
  white-space: nowrap;
  justify-content: center;
`;

const MapTitle = styled(Title)`
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;
