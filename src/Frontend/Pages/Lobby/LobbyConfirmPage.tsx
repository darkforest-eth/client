import { BLOCK_EXPLORER_URL } from '@darkforest_eth/constants';
import { EthAddress } from '@darkforest_eth/types';
import _ from 'lodash';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { ArenaCreationManager } from '../../../Backend/GameLogic/ArenaCreationManager';
import { CopyableInput } from '../../Components/CopyableInput';
import { Link, Spacer } from '../../Components/CoreUI';
import { MythicLabelText } from '../../Components/Labels/MythicLabel';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Row } from '../../Components/Row';
import { Sidebar } from '../../Components/Sidebar';
import { MinimapPane } from '../../Panes/Lobby/MinimapPane';
import { MinimapConfig } from '../../Panes/Lobby/MinimapUtils';
import { PlanetListPane } from '../../Panes/Lobby/PlanetListPane';
import { LobbyConfigAction, LobbyConfigState } from '../../Panes/Lobby/Reducer';
import { useTwitters } from '../../Utils/AppHooks';

export function LobbyConfirmPage({
  arenaCreationManager,
  minimapConfig,
  config,
  onUpdate,
  createDisabled,
  root,
  lobbyTx,
  onError,
  created,
  creating,
  validateAndCreateLobby,
}: {
  config: LobbyConfigState;
  arenaCreationManager: ArenaCreationManager;
  createDisabled: boolean;
  root: string;
  minimapConfig: MinimapConfig | undefined;
  onUpdate: (action: LobbyConfigAction) => void;
  lobbyTx: string | undefined;
  onError: (msg: string) => void;
  created: boolean;
  creating: boolean;
  validateAndCreateLobby: () => void;
}) {
  const blockscoutURL = `${BLOCK_EXPLORER_URL}/${lobbyTx}`;
  const url = `${window.location.origin}/play/${arenaCreationManager.getArenaAddress()}`;
  const configHash = arenaCreationManager.getArenaConfigHash();
  const { twitters } = useTwitters();
  const handleEnterUniverse = () => {
    if (config.ADMIN_PLANETS.displayValue && config.ADMIN_PLANETS.displayValue.length > 0) {
      const confirmed = confirm(
        'Warning: Some planets are still staged for creation.\nDo you want to continue?'
      );
      if (!confirmed) return;
    }
    if (config.WHITELIST.displayValue && config.WHITELIST.displayValue.length > 0) {
      const confirmed = confirm(
        'Warning: Some addresses are still staged for allowlist\nDo you want to continue?'
      );
      if (!confirmed) return;
    }
    if (
      config.MANUAL_SPAWN.displayValue &&
      !arenaCreationManager?.planets.find((p) => p.isSpawnPlanet)
    ) {
      const confirmed = confirm(
        'Warning: Manual spawn is active but no spawn planets have been created. Nobody will be able to spawn into the game!\nDo you want to continue?'
      );
      if (!confirmed) return;
    }
    if (
      config.TARGET_PLANETS.displayValue &&
      !arenaCreationManager?.planets.find((p) => p.isTargetPlanet)
    ) {
      const confirmed = confirm(
        'Warning: Target planets are active but no target planets have been created.\nDo you want to continue?'
      );
      if (!confirmed) return;
    }
    window.open(url);
  };

  const numStagedSpawnPlanets =
    config.ADMIN_PLANETS.displayValue?.filter((p) => p?.isSpawnPlanet).length ?? 0;

  const numStagedTargetPlanets =
    config.ADMIN_PLANETS.displayValue?.filter((p) => p?.isTargetPlanet).length ?? 0;

  const totalStagedPlanets = config.ADMIN_PLANETS.displayValue?.length ?? 0;

  const numCreatedSpawnPlanets =
    arenaCreationManager?.planets.filter((p) => p.isSpawnPlanet).length ?? 0;
  const numCreatedTargetPlanets =
    arenaCreationManager?.planets.filter((p) => p.isTargetPlanet).length ?? 0;
  const history = useHistory();

  const { innerHeight: height } = window;
  let mapSize = '600px';
  if (innerHeight < 700) {
    mapSize = '400px';
  }
  return (
    <Container>
      <Sidebar previousPath={!created ? root : undefined} title={!created ? 'Choose Map' : ''}>
        <span>Confirm your map configuration before creating your DF Arena Universe.</span>
        <Spacer height={24} />
        <PlanetListPane
          config={config}
          onUpdate={onUpdate}
          onPlanetSelect={(planet) => {}}
          arenaCreationManager={arenaCreationManager}
        />
      </Sidebar>
      <MainContent>
        <MainContentInner>
          <Spacer height={64} />
          <MinimapPane
            minimapConfig={minimapConfig}
            onUpdate={onUpdate}
            created={!!arenaCreationManager}
            displayConfig={{
              size: {
                width: mapSize,
                height: mapSize,
              },
              keys: true,
            }}
          />
        </MainContentInner>
      </MainContent>
      <MapContainer>
        <Title>Confirm Map</Title>
        <Spacer height={32} />
        {created ? (
          <span style={{ fontSize: '16px' }}>
            You created a map for{' '}
            <span style={{ color: '#5CCDF0' }}>
              {numCreatedSpawnPlanets} player{numCreatedTargetPlanets == 1 ? '' : 's'}.
            </span>
            There {numCreatedTargetPlanets == 1 ? 'is ' : 'are '}
            <span style={{ color: '#FF44B7' }}>
              {numCreatedTargetPlanets} target planet{numCreatedTargetPlanets == 1 ? '' : 's'}.
            </span>{' '}
            and{' '}
            <span style={{ color: '#E8E228' }}>
              {numCreatedSpawnPlanets} spawn planet{numCreatedSpawnPlanets == 1 ? '' : 's'}.
            </span>
          </span>
        ) : (
          <span style={{ fontSize: '16px' }}>
            You're about to create a map for{' '}
            <span style={{ color: '#5CCDF0' }}>
              {numStagedSpawnPlanets} player{numStagedSpawnPlanets == 1 ? '' : 's'}
            </span>{' '}
            ({totalStagedPlanets} planet{totalStagedPlanets == 1 ? '' : 's'} total). There{' '}
            {numStagedTargetPlanets == 1 ? 'is ' : 'are '}
            <span style={{ color: '#FF44B7' }}>
              {numStagedTargetPlanets} target planet{numStagedTargetPlanets == 1 ? '' : 's'}
            </span>{' '}
            and{' '}
            <span style={{ color: '#E8E228' }}>
              {numStagedSpawnPlanets} spawn planet{numStagedSpawnPlanets == 1 ? '' : 's'}.
            </span>
            <br />
            <br />
            Once your world is created, your custom planets will automatically be created on-chain
            and you can enter the universe!
          </span>
        )}

        <Spacer height={24} />
        {!created ? (
          <Button primary onClick={validateAndCreateLobby}>
            {creating ? <LoadingSpinner initialText={'Creating...'} /> : 'Create World'}
          </Button>
        ) : (
          <>
            <Row>
              <Button primary onClick={handleEnterUniverse}>
                Enter Universe
              </Button>
            </Row>
            <Row>
              <CopyableInput
                label='Share with your friends'
                displayValue={url}
                copyText={`👋 ${
                  twitters[arenaCreationManager.account] || arenaCreationManager.account.slice(0, 6)
                } has challenged you to a Dark Forest Arena battle! ☄️😤\n\nClick the link to play:\n⚔️ ${url} ⚔️`}
                onCopyError={onError}
              />
            </Row>
            {configHash && (
              <Row>
                <CopyableInput
                  label="Your map's configuration hash"
                  displayValue={configHash}
                  copyText={configHash}
                  onCopyError={onError}
                />
              </Row>
            )}
          </>
        )}
        <Spacer height={16} />
        {!createDisabled && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button onClick={() => history.push(`${root}/settings/game`)}>Game Settings</Button>
            <Button onClick={() => history.push(`${root}/edit-map`)}>Add Planets</Button>
          </div>
        )}
      </MapContainer>
    </Container>
  );
}

const Button = styled.button<{ primary?: boolean }>`
  text-transform: uppercase;
  letter-spacing: 0.06em;
  border: ${({ primary }) => (primary ? '2px solid #2EE7BA' : '1px solid #5F5F5F')};
  color: ${({ primary }) => (primary ? '#2EE7BA' : '#fff')};
  background: ${({ primary }) => (primary ? '#09352B' : '#252525')};
  padding: 16px;
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: background 80ms ease 0s, border-color;
  &:hover {
    background: ${({ primary }) => (primary ? '#0E5141' : '#3D3D3D')};
    border-color: ${({ primary }) => (primary ? '#30FFCD' : '#797979')};
  }
`;

const Title = styled.h1`
  font-size: 24px;
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-align: left;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
  align-items: stretch;
`;

const MainContent = styled.div`
  position: relative;
  overflow: auto;
  place-items: stretch;
  display: flex;
  flex-shrink: initial;
  flex-basis: initial;
  flex-direction: column;
  flex-grow: 1;
  width: 100%;
`;

const MainContentInner = styled.div`
  display: flex;
  flex: 1 0 auto;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 640px;
  padding: 0 24px;
  margin: 0 auto;
`;

const MapContainer = styled.div`
  display: flex;
  margin: 0 32px;
  flex-direction: column;
  padding-top: 64px;
`;
