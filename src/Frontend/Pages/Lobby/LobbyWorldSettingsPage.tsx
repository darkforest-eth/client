import _ from 'lodash';
import React, { useState } from 'react';
import { Redirect, Route, Switch, useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { ArenaCreationManager } from '../../../Backend/GameLogic/ArenaCreationManager';
import { Spacer } from '../../Components/CoreUI';
import { Sidebar } from '../../Components/Sidebar';
import { AdminPermissionsPane } from '../../Panes/Lobby/AdminPermissionsPane';
import { ArtifactSettingsPane } from '../../Panes/Lobby/ArtifactSettingsPane';
import { CaptureZonesPane } from '../../Panes/Lobby/CaptureZonesPane';
import { GameSettingsPane } from '../../Panes/Lobby/GameSettingsPane';
import { LobbiesPaneProps } from '../../Panes/Lobby/LobbiesUtils';
import { MinimapPane } from '../../Panes/Lobby/MinimapPane';
import { MinimapConfig } from '../../Panes/Lobby/MinimapUtils';
import { PlanetPane } from '../../Panes/Lobby/PlanetPane';
import { PlayerSpawnPane } from '../../Panes/Lobby/PlayerSpawnPane';
import { LobbyConfigAction, LobbyConfigState } from '../../Panes/Lobby/Reducer';
import { SnarkPane } from '../../Panes/Lobby/SnarkPane';
import { SpaceJunkPane } from '../../Panes/Lobby/SpaceJunkPane';
import { SpaceshipsPane } from '../../Panes/Lobby/SpaceshipsPane';
import { SpaceTypeBiomePane } from '../../Panes/Lobby/SpaceTypeBiomePane';
import { TargetPlanetPane } from '../../Panes/Lobby/TargetPlanetPane';
import { WorldSizePane } from '../../Panes/Lobby/WorldSizePane';

interface PaneConfig {
  title: string;
  shortcut: string;
  path: string;
  disabled?: boolean;
  Pane: (props: LobbiesPaneProps) => JSX.Element;
}

const panes: ReadonlyArray<PaneConfig> = [
  {
    title: 'Game settings',
    shortcut: `1`,
    path: '/game',
    Pane: (props: LobbiesPaneProps) => <GameSettingsPane {...props} />,
  },
  {
    title: 'World size',
    shortcut: `2`,
    path: '/world',
    Pane: (props: LobbiesPaneProps) => <WorldSizePane {...props} />,
  },
  {
    title: 'Space type & Biome',
    shortcut: `3`,
    path: '/space',
    Pane: (props: LobbiesPaneProps) => <SpaceTypeBiomePane {...props} />,
  },
  {
    title: 'Planet rarity',
    shortcut: `4`,
    path: '/planet',
    Pane: (props: LobbiesPaneProps) => <PlanetPane {...props} />,
  },
  {
    title: 'Player spawn',
    shortcut: `5`,
    path: '/spawn',
    Pane: (props: LobbiesPaneProps) => <PlayerSpawnPane {...props} />,
  },
  {
    title: 'Space junk',
    shortcut: `6`,
    path: '/junk',
    Pane: (props: LobbiesPaneProps) => <SpaceJunkPane {...props} />,
  },
  {
    title: 'Capture zones',
    shortcut: `7`,
    path: '/zones',
    disabled: true,
    Pane: (props: LobbiesPaneProps) => <CaptureZonesPane {...props} />,
  },
  {
    title: 'Artifacts',
    shortcut: `8`,
    path: '/artifact',
    Pane: (props: LobbiesPaneProps) => <ArtifactSettingsPane {...props} />,
  },
  {
    title: 'Admin permissions',
    shortcut: `9`,
    path: '/admin',
    Pane: (props: LobbiesPaneProps) => <AdminPermissionsPane {...props} />,
  },
  {
    title: 'Advanced: Snarks',
    shortcut: `0`,
    path: '/snark',
    Pane: (props: LobbiesPaneProps) => <SnarkPane {...props} />,
  },
  {
    title: 'Target planets',
    shortcut: `-`,
    path: '/arena',
    Pane: (props: LobbiesPaneProps) => <TargetPlanetPane {...props} />,
  },
  {
    title: 'Spaceships',
    shortcut: `+`,
    path: '/spaceships',
    Pane: (props: LobbiesPaneProps) => <SpaceshipsPane {...props} />,
  },
] as const;

export function LobbyWorldSettingsPage({
  config,
  onUpdate,
  createDisabled,
  root,
  minimapConfig,
  arenaCreationManager,
}: {
  config: LobbyConfigState;
  onUpdate: (action: LobbyConfigAction) => void;
  createDisabled: boolean;
  root: string;
  minimapConfig: MinimapConfig | undefined;
  arenaCreationManager: ArenaCreationManager;
}) {
  const history = useHistory();
  const location = useLocation();

  const settings = panes
    .filter((pane, idx) => !pane.disabled)
    .map((pane, idx) => {
      return (
        <SidebarButton
          key={idx}
          active={`${root}/settings${pane.path}` === location.pathname}
          onClick={() => history.push(`${root}/settings${pane.path}`)}
          disabled={createDisabled}
        >
          <span>{pane.title}</span>
        </SidebarButton>
      );
    });

  const routes = panes.map(({ title, path, Pane }, idx) => {
    return (
      // Index key is fine here because the array is stable
      <Route key={idx} path={`${root}/settings${path}`}>
        <Container>
          <Sidebar previousPath={`${root}/confirm`} title={'← Confirm Map'}>
            <div>
              <span>
                Here you can customize the configuration of your world. Once you have created your
                world, add custom planets on the next pane.
              </span>
              <Spacer height={24} />
              {settings}
            </div>
          </Sidebar>
          <MainContent>
            <MainContentInner>
              <Spacer height={64} />
              <div style={{ maxWidth: '800px' }}>
                <PaneTitle>{title}</PaneTitle>
                <Pane config={config} onUpdate={onUpdate} />
              </div>
            </MainContentInner>
          </MainContent>
        </Container>
      </Route>
    );
  });

  return (
    <>
    <Switch>
      <Route path={`${root}/settings`} exact>
        {/* Just in case */}
        <Redirect to={`${root}/settings/game`} />
      </Route>
      {routes}
    </Switch>
     <MapContainer>
     <MinimapPane
       minimapConfig={minimapConfig}
       onUpdate={onUpdate}
       created={!!arenaCreationManager}
       displayConfig={{
         keys: true,
       }}
     />
   </MapContainer>
   </>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  min-height: 100%;
  overflow: hidden;
  align-items: stretch;
`;

const SidebarButton = styled.div<{ active: boolean; disabled: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border-radius: 3px;
  color: ${({ disabled }) => (disabled ? '#ccc' : '#fff')};
  background: ${(props) => (props.active ? '#3e3e3e' : 'transparent')};
  &:hover {
    background: #3e3e3e;
  }
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
  padding: 0 24px;
`;

const PaneTitle = styled.span`
  font-weight: 600;
  font-size: 24px;
  color: #ffffff;
  align-self: flex-start;
  margin-bottom: 24px;
`;

const MapContainer = styled.div`
  display: flex;
  margin: 0 32px;
  flex-direction: column;
  padding-top: 64px;
`;
