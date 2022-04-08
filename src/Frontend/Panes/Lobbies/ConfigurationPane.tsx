import { EthAddress } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { useEffect, useReducer, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Btn } from '../../Components/Btn';
import { Spacer, Title } from '../../Components/CoreUI';
import { MythicLabelText } from '../../Components/Labels/MythicLabel';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Modal } from '../../Components/Modal';
import { Row } from '../../Components/Row';
import { TextPreview } from '../../Components/TextPreview';
import { AdminPermissionsPane } from './AdminPermissionsPane';
import { ArtifactSettingsPane } from './ArtifactSettingsPane';
import { CaptureZonesPane } from './CaptureZonesPane';
import { GameSettingsPane } from './GameSettingsPane';
import {
  ButtonRow,
  ConfigDownload,
  ConfigUpload,
  LinkButton,
  LobbiesPaneProps,
  NavigationTitle,
  Warning,
} from './LobbiesUtils';
import { MinimapConfig } from './MinimapUtils';
import { PlanetPane } from './PlanetPane';
import { PlayerSpawnPane } from './PlayerSpawnPane';
import {
  InvalidConfigError,
  LobbyConfigAction,
  lobbyConfigInit,
  lobbyConfigReducer,
  LobbyInitializers,
  toInitializers,
} from './Reducer';
import { SnarkPane } from './SnarkPane';
import { SpaceJunkPane } from './SpaceJunkPane';
import { SpaceTypeBiomePane } from './SpaceTypeBiomePane';
import { WorldSizePane } from './WorldSizePane';

interface PaneConfig {
  title: string;
  shortcut: string;
  path: string;
  Pane: (props: LobbiesPaneProps) => JSX.Element;
}

const panes: ReadonlyArray<PaneConfig> = [
  {
    title: 'Game settings',
    shortcut: `1`,
    path: '/settings/game',
    Pane: (props: LobbiesPaneProps) => <GameSettingsPane {...props} />,
  },
  {
    title: 'World size',
    shortcut: `2`,
    path: '/settings/world',
    Pane: (props: LobbiesPaneProps) => <WorldSizePane {...props} />,
  },
  {
    title: 'Space type & Biome',
    shortcut: `3`,
    path: '/settings/space',
    Pane: (props: LobbiesPaneProps) => <SpaceTypeBiomePane {...props} />,
  },
  {
    title: 'Planets',
    shortcut: `4`,
    path: '/settings/planet',
    Pane: (props: LobbiesPaneProps) => <PlanetPane {...props} />,
  },
  {
    title: 'Player spawn',
    shortcut: `5`,
    path: '/settings/spawn',
    Pane: (props: LobbiesPaneProps) => <PlayerSpawnPane {...props} />,
  },
  {
    title: 'Space junk',
    shortcut: `6`,
    path: '/settings/junk',
    Pane: (props: LobbiesPaneProps) => <SpaceJunkPane {...props} />,
  },
  {
    title: 'Capture zones',
    shortcut: `7`,
    path: '/settings/zones',
    Pane: (props: LobbiesPaneProps) => <CaptureZonesPane {...props} />,
  },
  {
    title: 'Artifacts',
    shortcut: `8`,
    path: '/settings/artifact',
    Pane: (props: LobbiesPaneProps) => <ArtifactSettingsPane {...props} />,
  },
  {
    title: 'Admin permissions',
    shortcut: `9`,
    path: '/settings/admin',
    Pane: (props: LobbiesPaneProps) => <AdminPermissionsPane {...props} />,
  },
  {
    title: 'Advanced: Snarks',
    shortcut: `0`,
    path: '/settings/snark',
    Pane: (props: LobbiesPaneProps) => <SnarkPane {...props} />,
  },
] as const;

type Status = 'creating' | 'created' | 'errored' | undefined;

function ConfigurationNavigation({
  error,
  lobbyAddress,
  status,
  onCreate,
}: {
  error: string | undefined;
  lobbyAddress: EthAddress | undefined;
  status: Status;
  onCreate: () => Promise<void>;
}) {
  const buttons = _.chunk(panes, 2).map(([fst, snd], idx) => {
    return (
      // Index key is fine here because the array is stable
      <ButtonRow key={idx}>
        {fst && (
          <LinkButton to={fst.path} shortcut={fst.shortcut}>
            {fst.title}
          </LinkButton>
        )}
        {snd && (
          <LinkButton to={snd.path} shortcut={snd.shortcut}>
            {snd.title}
          </LinkButton>
        )}
      </ButtonRow>
    );
  });

  const url =
    process.env.NODE_ENV === 'production'
      ? `${window.DEPLOY_URL}/play/${lobbyAddress}`
      : `${window.location.origin}/play/${lobbyAddress}`;

  let lobbyContent;
  if (status === 'created' && lobbyAddress) {
    lobbyContent = (
      <>
        <Btn size='stretch' onClick={() => window.open(url)}>
          Launch Lobby
        </Btn>
        <Row>
          {/* Stealing MythicLabelText because it accepts variable text input */}
          <MythicLabelText style={{ margin: 'auto' }} text='Your lobby is ready!' />
        </Row>
        <Row>
          <span style={{ margin: 'auto' }}>
            You can also share the direct url with your friends:
          </span>
        </Row>
        {/* Didn't like the TextPreview jumping, so I'm setting the height */}
        <Row style={{ height: '30px' } as CSSStyleDeclaration & React.CSSProperties}>
          <TextPreview
            style={{ margin: 'auto' }}
            text={url}
            unFocusedWidth='50%'
            focusedWidth='100%'
          />
        </Row>
      </>
    );
  }

  const createDisabled = status === 'creating' || status === 'created';
  const creating = status === 'creating' || (status === 'created' && !lobbyAddress);

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
      <Btn size='stretch' onClick={onCreate} disabled={createDisabled}>
        {creating ? <LoadingSpinner initialText='Creating...' /> : 'Create Lobby'}
      </Btn>
      <Row>
        <Warning>{error}</Warning>
      </Row>
      {lobbyContent}
    </>
  );
}

export function ConfigurationPane({
  modalIndex,
  lobbyAddress,
  startingConfig,
  onMapChange,
  onCreate,
}: {
  modalIndex: number;
  lobbyAddress: EthAddress | undefined;
  startingConfig: LobbyInitializers;
  onMapChange: (props: MinimapConfig) => void;
  onCreate: (config: LobbyInitializers) => Promise<void>;
}) {
  const { path: root } = useRouteMatch();
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>(undefined);
  // Separated IO Errors from Download/Upload so they show on any pane of the modal
  const [ioErr, setIoErr] = useState<string | undefined>();

  const [config, updateConfig] = useReducer(lobbyConfigReducer, startingConfig, lobbyConfigInit);

  function onUpdate(action: LobbyConfigAction) {
    setError(undefined);
    setIoErr(undefined);
    updateConfig(action);
  }

  // Minimap only changes on a subset of properties, so we only trigger when one of them changes value (and still debounce it)
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
  ]);

  const routes = panes.map(({ title, path, Pane }, idx) => {
    return (
      // Index key is fine here because the array is stable
      <Route key={idx} path={`${root}${path}`}>
        <NavigationTitle>{title}</NavigationTitle>
        <Pane config={config} onUpdate={onUpdate} />
      </Route>
    );
  });

  async function validateAndCreateLobby() {
    try {
      setStatus('creating');
      const initializers = toInitializers(config);
      await onCreate(initializers);
      setStatus('created');
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

  function configUploadSuccess(initializers: LobbyInitializers) {
    updateConfig({ type: 'RESET', value: lobbyConfigInit(initializers) });
  }

  return (
    <Modal width='500px' initialX={100} initialY={100} index={modalIndex}>
      <Switch>
        <Route path={root} exact={true}>
          <ConfigurationNavigation
            error={error}
            lobbyAddress={lobbyAddress}
            status={status}
            onCreate={validateAndCreateLobby}
          />
        </Route>
        {routes}
      </Switch>
      {/* Button this in the title slot but at the end moves it to the end of the title bar */}
      <ConfigDownload onError={setIoErr} address={lobbyAddress} config={config} />
      <ConfigUpload onError={setIoErr} onUpload={configUploadSuccess} />
      <Warning>{ioErr}</Warning>
    </Modal>
  );
}
