import { EthConnection } from '@darkforest_eth/network';
import { EthAddress } from '@darkforest_eth/types';
import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { ContractsAPI } from '../../Backend/GameLogic/ContractsAPI';
import { createAndInitArena } from '../../Backend/Utils/Arena';
import { LobbyAdminTools } from '../../Backend/Utils/LobbyAdminTools';
import { MinimapConfig } from '../Panes/Lobbies/MinimapUtils';
import {
  InvalidConfigError,
  lobbyConfigInit,
  lobbyConfigReducer,
  LobbyInitializers,
  toInitializers,
} from '../Panes/Lobbies/Reducer';
import { LobbyMapSelectPage } from './LobbyMapSelectPage';
import { LobbyWorldSettingsPage } from './LobbyWorldSettingsPage';
import { LobbyConfirmPage } from './LobbyConfirmPage';
import { LobbyMapEditor } from './LobbyMapEditor';
import { getAllTwitters } from '../../Backend/Network/UtilityServerAPI';
import { DEFAULT_PLANET } from '../Panes/Lobbies/LobbiesUtils';
import { Toast } from '../Components/Toast';
import _ from 'lodash';

type Status = 'waitingForCreate' | 'creating' | 'created' | 'errored' | undefined;

const BULK_CREATE_CHUNK_SIZE = 5;

export function LobbyConfigPage({
  contractsAPI,
  connection,
  ownerAddress,
  startingConfig,
  root,
}: {
  contractsAPI: ContractsAPI;
  connection: EthConnection;
  ownerAddress: EthAddress;
  startingConfig: LobbyInitializers;
  root: string;
}) {
  const [config, updateConfig] = useReducer(lobbyConfigReducer, startingConfig, lobbyConfigInit);
  const [minimapConfig, setMinimapConfig] = useState<MinimapConfig | undefined>();
  const [lobbyAdminTools, setLobbyAdminTools] = useState<LobbyAdminTools>();
  const [lobbyTx, setLobbyTx] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);
  const [playerTwitter, setPlayerTwitter] = useState<string | undefined>();

  const createDisabled = status === 'creating' || status === 'created';
  const creating = status === 'creating' || (status === 'created' && !lobbyAdminTools?.address);
  const created = status === 'created' && lobbyAdminTools?.address;

  useEffect(() => {
    async function doCreateReveal() {
      await bulkCreateAndRevealPlanets();
      setStatus('created');
    }
    if (lobbyAdminTools && !created) {
      doCreateReveal();
    }
  }, [lobbyAdminTools]);

  useEffect(() => {
    async function fetchTwitters() {
      const allTwitters = await getAllTwitters();
      setPlayerTwitter(allTwitters[ownerAddress]);
    }
    fetchTwitters();
  }, []);

  useEffect(() => {
    if (config.ADMIN_PLANETS.warning) {
      setError(config.ADMIN_PLANETS.warning);
    }
  }, [config.ADMIN_PLANETS.warning]);

  async function bulkCreateAndRevealPlanets() {
    if (!lobbyAdminTools) {
      setError("You haven't created a lobby.");
      throw new Error('No lobby');
    }
    if (!config.ADMIN_PLANETS.currentValue) {
      setError('no planets staged');
      throw new Error('No planets staged');
    }
    let planets = config.ADMIN_PLANETS.currentValue;

    let i = 0;
    while (i < planets.length) {
      try {
        const chunk = planets.slice(i, i + BULK_CREATE_CHUNK_SIZE);
        await lobbyAdminTools.bulkCreateAndReveal(chunk, toInitializers(config));
        updateConfig({
          type: 'ADMIN_PLANETS',
          value: undefined,
          index: i,
          number: BULK_CREATE_CHUNK_SIZE,
        });
        planets.splice(i, BULK_CREATE_CHUNK_SIZE);
      } catch (err) {
        i += BULK_CREATE_CHUNK_SIZE;
        console.error('Error creating and revealing planets:', err);
        if (err instanceof InvalidConfigError) {
          setError(`Invalid ${err.key} value ${err.value ?? ''} - ${err.message}`);
          throw new Error(`Invalid ${err.key} value ${err.value ?? ''} - ${err.message}`)
        } else {
          setError(err?.message || 'Something went wrong. Check your dev console.');
          throw new Error(err?.message || 'Something went wrong. Check your dev console.');

        }
      }
    }
    setStatus('created');
  }

  async function validateAndCreateLobby() {
    try {
      setStatus('creating');
      const initializers = toInitializers(config);
      await createLobby(initializers);
    } catch (err) {
      setStatus('errored');
      console.error(err);
      if (err instanceof InvalidConfigError) {
        setError(`Invalid ${err.key} value ${err.value ?? ''} - ${err.message}`);
      } else {
        setError(err?.message || 'Something went wrong. Check your dev console.');
      }
    }
  }

  async function createLobby(config: LobbyInitializers) {
    try {
      const { owner, lobby, startTx } = await createAndInitArena({
        config,
        contractsAPI,
        ethConnection: connection,
      });

      setLobbyTx(startTx?.hash);

      if (owner === ownerAddress) {
        if (!connection) {
          throw 'error: no connection';
        }
        const lobbyAdminTools = await LobbyAdminTools.create(lobby, connection);
        setLobbyAdminTools(lobbyAdminTools);
      }
    } catch (e) {
      console.log(e);
      throw new Error(e?.message || `Failed to create lobby.`);
    }
  }

  const onMapChange = useMemo(() => {
    return _.debounce((config: MinimapConfig) => setMinimapConfig(config), 500);
  }, [setMinimapConfig]);

  useEffect(() => {
    onMapChange({
      worldRadius: config.WORLD_RADIUS_MIN.currentValue,
      key: config.SPACETYPE_KEY.currentValue,
      scale: config.PERLIN_LENGTH_SCALE.currentValue,
      mirrorX: config.PERLIN_MIRROR_X.currentValue,
      mirrorY: config.PERLIN_MIRROR_Y.currentValue,
      perlinThreshold1: config.PERLIN_THRESHOLD_1.currentValue,
      perlinThreshold2: config.PERLIN_THRESHOLD_2.currentValue,
      perlinThreshold3: config.PERLIN_THRESHOLD_3.currentValue,
      stagedPlanets: config.ADMIN_PLANETS.currentValue || [],
      createdPlanets: lobbyAdminTools?.planets || [],
      dot: 4,
    });
  }, [
    onMapChange,
    config.WORLD_RADIUS_MIN.currentValue,
    config.SPACETYPE_KEY.currentValue,
    config.PERLIN_LENGTH_SCALE.currentValue,
    config.PERLIN_MIRROR_X.currentValue,
    config.PERLIN_MIRROR_Y.currentValue,
    config.PERLIN_THRESHOLD_1.currentValue,
    config.PERLIN_THRESHOLD_2.currentValue,
    config.PERLIN_THRESHOLD_3.currentValue,
    config.ADMIN_PLANETS.currentValue,
    lobbyAdminTools,
  ]);

  return (
    <>
      <Toast
        open={!!error}
        title='Error'
        description={error}
        onClose={() => {
          setError(undefined);
        }}
      />
      <Switch>
        <Route path={root} exact={true}>
          <LobbyMapSelectPage
            address={ownerAddress}
            startingConfig={startingConfig}
            updateConfig={updateConfig}
            lobbyAdminTools={lobbyAdminTools}
            createDisabled={createDisabled}
            root={root}
            setError={setError}
          />
        </Route>
        <Route path={`${root}/confirm`}>
          <LobbyConfirmPage
            lobbyAdminTools={lobbyAdminTools}
            minimapConfig={minimapConfig}
            config={config}
            onUpdate={updateConfig}
            createDisabled={createDisabled}
            root={root}
            ownerAddress={ownerAddress}
            lobbyTx={lobbyTx}
            onError={setError}
            created={created}
            creating={creating}
            playerTwitter={playerTwitter}
            validateAndCreateLobby={validateAndCreateLobby}
          />
        </Route>
        <Route path={`${root}/settings`}>
          <LobbyWorldSettingsPage
            config={config}
            onUpdate={updateConfig}
            createDisabled={createDisabled}
            root={root}
            minimapConfig={minimapConfig}
            lobbyAdminTools={lobbyAdminTools}
          />
        </Route>
        <Route path={`${root}/edit-map`}>
          <LobbyMapEditor
            config={config}
            updateConfig={updateConfig}
            createDisabled={createDisabled}
            root={root}
            minimapConfig={minimapConfig}
            lobbyAdminTools={lobbyAdminTools}
            onError={setError}
            ownerAddress={ownerAddress}
          />
        </Route>
      </Switch>
    </>
  );
}
