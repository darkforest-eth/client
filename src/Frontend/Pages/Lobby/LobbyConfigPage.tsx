import React, { useEffect, useMemo, useReducer, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import { MinimapConfig } from '../../Panes/Lobby/MinimapUtils';
import {
  InvalidConfigError,
  lobbyConfigInit,
  lobbyConfigReducer,
  LobbyInitializers,
  toInitializers,
} from '../../Panes/Lobby/Reducer';
import { LobbyMapSelectPage } from './LobbyMapSelectPage';
import { LobbyWorldSettingsPage } from './LobbyWorldSettingsPage';
import { LobbyConfirmPage } from './LobbyConfirmPage';
import { LobbyMapEditor } from './LobbyMapEditor';
import _ from 'lodash';
import { ArenaCreationManager } from '../../../Backend/GameLogic/ArenaCreationManager';
import { Toast } from '../../Components/Toast';

type Status = 'waitingForCreate' | 'creating' | 'created' | 'errored' | undefined;

const BULK_CREATE_CHUNK_SIZE = 24;

export function LobbyConfigPage({
  arenaCreationManager,
  startingConfig,
  root,
}: {
  arenaCreationManager: ArenaCreationManager;
  startingConfig: LobbyInitializers;
  root: string;
}) {
  const [config, updateConfig] = useReducer(lobbyConfigReducer, startingConfig, lobbyConfigInit);
  const [minimapConfig, setMinimapConfig] = useState<MinimapConfig | undefined>();
  const [lobbyTx, setLobbyTx] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const createDisabled = status === 'creating' || status === 'created';
  const creating =
    status === 'creating' || (status === 'created' && !arenaCreationManager.arenaCreated);
  const created = status === 'created' && arenaCreationManager.arenaCreated;

  // once admin tools are created, create and reveal
  useEffect(() => {   
    async function doCreateReveal() {
      await bulkCreateAndRevealPlanets();
      setStatus('created');
    }
    if (arenaCreationManager.arenaCreated && !created) {
      doCreateReveal();
    }
  }, [arenaCreationManager.arenaCreated]);

  // set error when theres an admin planets warning
  useEffect(() => {
    if (config.ADMIN_PLANETS.warning) {
      setError(config.ADMIN_PLANETS.warning);
    }
  }, [config.ADMIN_PLANETS.warning]);

  const onMapChange = useMemo(() => {
    return _.debounce((config: MinimapConfig) => setMinimapConfig(config), 500);
  }, [setMinimapConfig]);

  // update entire map if something in map changes
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
      createdPlanets: arenaCreationManager?.planets || [],
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
    arenaCreationManager,
  ]);

  async function bulkCreateAndRevealPlanets() {
    if (!config.ADMIN_PLANETS.currentValue) {
      setError('no planets staged');
      throw new Error('No planets staged');
    }
    let planets = config.ADMIN_PLANETS.currentValue;
    const initializers = toInitializers(config);
    let i = 0;
    while (i < planets.length) {
      try {
        const chunk = planets.slice(i, i + BULK_CREATE_CHUNK_SIZE);
        await arenaCreationManager.bulkCreateLobbyPlanets({config: initializers, planets: chunk});
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
          throw new Error(`Invalid ${err.key} value ${err.value ?? ''} - ${err.message}`);
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
      const { owner, lobby, startTx } = await arenaCreationManager.createAndInitArena(initializers);
      setLobbyTx(startTx.hash);
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
            address={arenaCreationManager.getParentAddress()}
            startingConfig={startingConfig}
            updateConfig={updateConfig}
            createDisabled={createDisabled}
            root={root}
            setError={setError}
          />
        </Route>
        <Route path={`${root}/confirm`}>
          <LobbyConfirmPage
            arenaCreationManager={arenaCreationManager}
            minimapConfig={minimapConfig}
            config={config}
            onUpdate={updateConfig}
            createDisabled={createDisabled}
            root={root}
            lobbyTx={lobbyTx}
            onError={setError}
            created={created}
            creating={creating}
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
            arenaCreationManager={arenaCreationManager}
          />
        </Route>
        <Route path={`${root}/edit-map`}>
          <LobbyMapEditor
            config={config}
            updateConfig={updateConfig}
            createDisabled={createDisabled}
            root={root}
            minimapConfig={minimapConfig}
            arenaCreationManager={arenaCreationManager}
            onError={setError}
          />
        </Route>
      </Switch>
    </>
  );
}
