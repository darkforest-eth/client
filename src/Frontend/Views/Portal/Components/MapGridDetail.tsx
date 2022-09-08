import React, { useState, useMemo, useEffect } from 'react';
import { EthAddress } from '@darkforest_eth/types';
import { generateMinimapConfig, MinimapConfig } from '../../../Panes/Lobby/MinimapUtils';
import { debounce } from 'lodash';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import { LoadingSpinner } from '../../../Components/LoadingSpinner';
import { Minimap } from '../../../Components/Minimap';
import { getConfigName } from '@darkforest_eth/procedural';
import { truncateAddress } from '../PortalUtils';
import { Spacer } from '../../../Components/CoreUI';
import { useConfigFromHash } from '../../../Utils/AppHooks';
import dfstyles from '@darkforest_eth/ui/dist/styles';
import { useTwitters } from '../../../Utils/AppHooks';

export const MapGridDetail: React.FC<{
  configHash: string;
  creator: EthAddress;
  lobbyAddress?: EthAddress;
  nGames?: number;
}> = ({ configHash, creator, lobbyAddress, nGames }) => {
  const { config } = useConfigFromHash(configHash);
  const [minimapConfig, setMinimapConfig] = useState<MinimapConfig | undefined>();
  const twitters = useTwitters();

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

  return (
    <DetailContainer onClick={() => history.push(`/portal/map/${configHash}`)}>
      {!minimapConfig ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100px',
            height: '100px',
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
          <span>By {twitters[creator] ? `@${twitters[creator]}` : truncateAddress(creator)}</span>
          <span>Lobby: {truncateAddress(lobbyAddress)}</span>
          {nGames && nGames > 0 && (
            <span>
              {nGames} game{nGames > 1 && 's'}
            </span>
          )}
          <Link
            style={{ minWidth: '250px' }}
            target='_blank'
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
  text-align: center;
  border-radius: 3px;
  background: #161616;
  border: 1px solid #5f5f5f;
  color: #fff;
  padding: 16px 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  &:hover {
    background: ${dfstyles.colors.backgrounddark};
  }
`;

const ConfigTitle = styled.span`
  font-size: 1rem;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;
