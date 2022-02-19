import { Initializers } from '@darkforest_eth/settings';
import _ from 'lodash';
import React, { useReducer } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Btn } from '../../Components/Btn';
import { Spacer, Title } from '../../Components/CoreUI';
import { Modal } from '../../Components/Modal';
import { AdminPermissionsPane } from './AdminPermissionsPane';
import { ArtifactSettingsPane } from './ArtifactSettingsPane';
import { GameSettingsPane } from './GameSettingsPane';
import { ButtonRow, LinkButton, LobbiesPaneProps, NavigationTitle } from './LobbiesUtils';
import { PlanetPane } from './PlanetPane';
import { PlayerSpawnPane } from './PlayerSpawnPane';
import { SnarkPane } from './SnarkPane';
import { SpaceJunkPane } from './SpaceJunkPane';
import { SpaceTypeBiomePane } from './SpaceTypeBiomePane';
import { WorldSizePane } from './WorldSizePane';

/* Super simple reducer that just spread anything we give it into the tracked initializers */
function configReducer(state: Initializers, action: Partial<Initializers>) {
  // TODO: Handle the nested arrays
  return { ...state, ...action };
}

interface PaneConfig {
  title: string;
  path: string;
  Pane: (props: LobbiesPaneProps) => JSX.Element;
}

const panes: ReadonlyArray<PaneConfig> = [
  {
    title: 'Game settings',
    path: '/settings/game',
    Pane: (props: LobbiesPaneProps) => <GameSettingsPane {...props} />,
  },
  {
    title: 'World size',
    path: '/settings/world',
    Pane: (props: LobbiesPaneProps) => <WorldSizePane {...props} />,
  },
  {
    title: 'Space type & Biome',
    path: '/settings/space',
    Pane: (props: LobbiesPaneProps) => <SpaceTypeBiomePane {...props} />,
  },
  {
    title: 'Planets',
    path: '/settings/planet',
    Pane: (props: LobbiesPaneProps) => <PlanetPane {...props} />,
  },
  {
    title: 'Player spawn',
    path: '/settings/spawn',
    Pane: (props: LobbiesPaneProps) => <PlayerSpawnPane {...props} />,
  },
  {
    title: 'Space junk',
    path: '/settings/junk',
    Pane: (props: LobbiesPaneProps) => <SpaceJunkPane {...props} />,
  },
  {
    title: 'Artifacts',
    path: '/settings/artifact',
    Pane: (props: LobbiesPaneProps) => <ArtifactSettingsPane {...props} />,
  },
  {
    title: 'Admin permissions',
    path: '/settings/admin',
    Pane: (props: LobbiesPaneProps) => <AdminPermissionsPane {...props} />,
  },
  {
    title: 'Advanced: Snarks',
    path: '/settings/snark',
    Pane: (props: LobbiesPaneProps) => <SnarkPane {...props} />,
  },
] as const;

function ConfigurationNavigation({ onCreate }: { onCreate: () => void }) {
  const buttons = _.chunk(panes, 2).map(([fst, snd], idx) => {
    return (
      // Index key is fine here because the array is stable
      <ButtonRow key={idx}>
        {fst && (
          <LinkButton to={fst.path} shortcut={`${idx + idx + 1}`}>
            {fst.title}
          </LinkButton>
        )}
        {snd && (
          <LinkButton to={snd.path} shortcut={`${idx + idx + 2}`}>
            {snd.title}
          </LinkButton>
        )}
      </ButtonRow>
    );
  });

  return (
    <>
      <Title slot='title'>Customize Lobby</Title>
      <div>
        Welcome Cadet! You can launch a copy of Dark Forest from this UI. We call this a Lobby.
        <Spacer height={12} />
        All settings will be defaulted to the same configuration of the main contract you are
        copying. However, you can change any of those settings through the buttons below!
        <Spacer height={12} />
      </div>
      {buttons}
      <Spacer height={20} />
      <Btn size='stretch' onClick={onCreate}>
        Create Lobby
      </Btn>
    </>
  );
}

export function ConfigurationPane({
  startingConfig,
  onCreate,
}: {
  startingConfig: Initializers;
  onCreate: (config: Partial<Initializers>) => Promise<void>;
}) {
  const { path: root } = useRouteMatch();

  const [config, updateConfig] = useReducer(configReducer, {
    ...startingConfig, // Shallow clone
  });

  const routes = panes.map(({ title, path, Pane }, idx) => {
    return (
      // Index key is fine here because the array is stable
      <Route key={idx} path={`${root}${path}`}>
        <NavigationTitle>{title}</NavigationTitle>
        <Pane config={config} onUpdate={updateConfig} />
      </Route>
    );
  });

  return (
    <Modal width='500px'>
      <Switch>
        <Route path={root} exact={true}>
          <ConfigurationNavigation onCreate={() => onCreate(config)} />
        </Route>
        {routes}
      </Switch>
    </Modal>
  );
}
