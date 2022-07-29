import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { address } from '@darkforest_eth/serde';
import { EthAddress } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { loadConfigFromAddress } from '../../../Backend/Network/GraphApi/ConfigApi';
import { LobbyInitializers } from '../../Panes/Lobby/Reducer';
import { useEthConnection } from '../../Utils/AppHooks';
import { stockConfig } from '../../Utils/StockConfigs';
import { CadetWormhole } from '../../Views/CadetWormhole';
import LoadingPage from '../LoadingPage';
import { LobbyConfigPage } from './LobbyConfigPage';
import { ArenaCreationManager } from '../../../Backend/GameLogic/ArenaCreationManager';

type ErrorState =
  | { type: 'invalidAddress' }
  | { type: 'contractLoad' }
  | { type: 'invalidContract' };

export function CreateLobby({ match }: RouteComponentProps<{ contract: string }>) {
  const [arenaCreationManager, setArenaCreationManager] = useState<
    ArenaCreationManager | undefined
  >();
  const [startingConfig, setStartingConfig] = useState<LobbyInitializers | undefined>();
  const contractAddress: EthAddress = address(CONTRACT_ADDRESS);
  const configContractAddress = address(match.params.contract) || contractAddress;
  const [errorState, setErrorState] = useState<ErrorState | undefined>(
    contractAddress ? undefined : { type: 'invalidAddress' }
  );

  const connection = useEthConnection();

  // when connected
  useEffect(() => {
    if (contractAddress && !arenaCreationManager) {
      ArenaCreationManager.create(connection, contractAddress)
        .then((creationManager) => setArenaCreationManager(creationManager))
        .catch((e) => {
          console.log(e);
          setErrorState({ type: 'contractLoad' });
        });
    }
    if (configContractAddress && !startingConfig) {
      loadConfigFromAddress(configContractAddress)
        .then((config) => setStartingConfig(config.config))
        .catch((e) => {
          console.log(e);
          setStartingConfig(stockConfig.vanilla);
        });
    }
  }, [contractAddress, startingConfig]);

  if (errorState) {
    switch (errorState.type) {
      case 'contractLoad':
        return <CadetWormhole imgUrl='/public/img/wrong-text.png' />;
      case 'invalidAddress':
      case 'invalidContract':
        return <CadetWormhole imgUrl='/public/img/no-contract-text.png' />;
      default:
        // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
        const _exhaustive: never = errorState;
        return _exhaustive;
    }
  }

  if (startingConfig && arenaCreationManager) {
    return (
      <LobbyConfigPage
        arenaCreationManager={arenaCreationManager}
        startingConfig={startingConfig}
        root={`/arena/${configContractAddress}`}
      />
    );
  } else {
    return <LoadingPage />;
  }
}
