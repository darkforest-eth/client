import { getConfigName } from '@darkforest_eth/procedural';
import { address } from '@darkforest_eth/serde';
import { EthAddress } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { useEffect, useState, useMemo } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import styled from 'styled-components';
import { loadConfigFromHash } from '../../../Backend/Network/ConfigApi';
import { MythicLabel, MythicLabelText } from '../../Components/Labels/MythicLabel';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Minimap } from '../../Components/Minimap';
import { TextPreview } from '../../Components/TextPreview';
import { generateMinimapConfig, MinimapConfig } from '../../Panes/Lobby/MinimapUtils';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { competitiveConfig } from '../../Utils/constants';

import { MapDetails } from './MapDetails';
import { ArenaPortalButton } from './PortalHomeView';

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
        {configHash == competitiveConfig &&  <MythicLabelText text={`Galactic League Official Map`} />}
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
      <div style = {{display: 'flex', gap: '16px', justifyContent: 'center', width: '100%'}}>
        <Link style={{ minWidth: '250px' }} target='blank' to={`/arena/${lobbyAddress}/settings`}>
          <ArenaPortalButton secondary>Remix Map</ArenaPortalButton>
        </Link>
        <Link style={{ minWidth: '250px' }} target='blank' to={`/play/${lobbyAddress}?create=true`}>
          <ArenaPortalButton>Create Match</ArenaPortalButton>
        </Link>
      </div>
    </OverviewContainer>
  );
}

export function MapInfoView({ match }: RouteComponentProps<{ configHash: string }>) {
  const configHash = match.params.configHash || undefined;
  const [config, setConfig] = useState<LobbyInitializers | undefined>();
  const [lobbyAddress, setLobbyAddress] = useState<EthAddress | undefined>();
  const [error, setError] = useState<boolean>(false);
  useEffect(() => {
    if (configHash) {
      loadConfigFromHash(configHash)
        .then((c) => {
          if (!c) {
            setConfig(undefined);
            return;
          }
          setConfig(c.config);
          setLobbyAddress(address(c.address));
        })
        .catch((e) => {
          setError(true);
          console.log(e);
        });
    }
  }, [configHash]);

  return (
    <MapInfoContainer>
      {error ? (
        <div>Map Not Found</div>
      ) : (
        config && (
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
