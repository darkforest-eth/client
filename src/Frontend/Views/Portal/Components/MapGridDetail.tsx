import React, { useState, useMemo, useEffect } from 'react';
import { EthAddress } from '@darkforest_eth/types';
import { generateMinimapConfig, MinimapConfig } from '../../../Panes/Lobbies/MinimapUtils';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { LobbyInitializers } from '../../../Panes/Lobbies/Reducer';
import { LoadingSpinner } from '../../../Components/LoadingSpinner';
import { Minimap } from '../../../Components/Minimap';
import { getConfigName } from '@darkforest_eth/procedural';
import { loadConfigFromHash } from '../../../../Backend/Network/ConfigApi';
import { truncateAddress } from '../PortalUtils';
import { Spacer } from '../../../Components/CoreUI';

export const MapGridDetail: React.FC<{
  configHash: string;
  creator: EthAddress;
  lobbyAddress?: EthAddress;
}> = ({ configHash, creator, lobbyAddress }) => {
  const [error, setError] = useState<boolean>(false);
  const [config, setConfig] = useState<LobbyInitializers | undefined>();
  const [minimapConfig, setMinimapConfig] = useState<MinimapConfig | undefined>();

  const onMapChange = useMemo(() => {
    return debounce((config: MinimapConfig) => configHash && setMinimapConfig(config), 500);
  }, [setMinimapConfig]);

  useEffect(() => {
    if (config) {
      onMapChange(generateMinimapConfig(config, 18));
    } else {
      setMinimapConfig(undefined);
    }
  }, [config, onMapChange]);

  const history = useHistory();

  useEffect(() => {
    loadConfigFromHash(configHash)
      .then((c) => {
        if (!c) {
          setConfig(undefined);
          return;
        }
        setConfig(c.config);
      })
      .catch((e) => {
        setError(true);
        console.log(e);
      });
  }, [configHash]);

  return (
    <DetailContainer onClick={() => history.push(`/portal/map/${configHash}`)}>
      {!minimapConfig ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '300px',
            height: '300px',
          }}
        >
          <LoadingSpinner initialText='Loading...' />
        </div>
      ) : (
        <Minimap
          style={{ width: '100px', height: '100px' }}
          minimapConfig={minimapConfig}
          setRefreshing={() => {}}
        />
      )}
      <Spacer height={16} />
      <ConfigTitle>{getConfigName(configHash)}</ConfigTitle>
      {lobbyAddress && (
        <>
          <span>By {truncateAddress(creator)}</span>
          <span>Lobby: {truncateAddress(lobbyAddress)}</span>
          <Link
            style={{ minWidth: '250px' }}
            target='blank'
            to={`/play/${lobbyAddress}?create=true`}
          ></Link>
        </>
      )}
    </DetailContainer>
  );
};

const DetailContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipses;
  border-radius: 3px;
  background: #161616;
  border: 1px solid #5f5f5f;
  color: #fff;
  padding: 8px;
  cursor: pointer;
`;

const ConfigTitle = styled.span`
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;
