import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { LobbyAdminTools } from '../../../Backend/Utils/LobbyAdminTools';
import { Btn } from '../../Components/Btn';
import { Link, Spacer, Title } from '../../Components/CoreUI';
import { MythicLabelText } from '../../Components/Labels/MythicLabel';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { Modal } from '../../Components/Modal';
import { Row } from '../../Components/Row';
import { TextPreview } from '../../Components/TextPreview';
import { AdminPermissionsPane } from './AdminPermissionsPane';
import { ArtifactSettingsPane } from './ArtifactSettingsPane';
import { CaptureZonesPane } from './CaptureZonesPane';
import { ExtrasNavPane } from './ExtrasNavPane';
import { GameSettingsPane } from './GameSettingsPane';
import {
  ButtonRow,
  ConfigDownload,
  ConfigUpload,
  LinkButton,
  LobbiesPaneProps,
  NavigationTitle,
  Warning
} from './LobbiesUtils';
import { MinimapConfig } from './MinimapUtils';
import { PlanetPane } from './PlanetPane';
import { PlayerSpawnPane } from './PlayerSpawnPane';
import {
  InvalidConfigError,
  LobbyAction,
  LobbyConfigAction,
  lobbyConfigInit,
  LobbyConfigState,
  LobbyInitializers,
  toInitializers
} from './Reducer';
import { SnarkPane } from './SnarkPane';
import { SpaceJunkPane } from './SpaceJunkPane';
import { SpaceshipsPane } from './SpaceshipsPane';
import { SpaceTypeBiomePane } from './SpaceTypeBiomePane';
import { TargetPlanetPane } from './TargetPlanetPane';
import { WorldSizePane } from './WorldSizePane';

const jcFlexEnd = { justifyContent: 'flex-end' } as CSSStyleDeclaration & React.CSSProperties;

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

type Status = 'creating' | 'created' | 'errored' | undefined;

export function ConfigurationPane({
  modalIndex,
  config,
  updateConfig,
  onMapChange,
  onCreate,
  lobbyAdminTools,
  onUpdate,
  lobbyTx,
}: {
  modalIndex: number;
  config: LobbyConfigState;
  updateConfig: React.Dispatch<LobbyAction>;
  onMapChange: (props: MinimapConfig) => void;
  onCreate: (config: LobbyInitializers) => Promise<void>;
  lobbyAdminTools: LobbyAdminTools | undefined;
  onUpdate: (action: LobbyConfigAction) => void;
  lobbyTx: string | undefined;
}) {
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>(undefined);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const createDisabled = status === 'creating' || status === 'created';
  const creating = status === 'creating' || (status === 'created' && !lobbyAdminTools?.address);
  const created = status === 'created' && lobbyAdminTools?.address;
  // Separated IO Errors from Download/Upload so they show on any pane of the modal
  const { path: root } = useRouteMatch();

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
      stagedPlanets: config.ADMIN_PLANETS.currentValue || [],
      createdPlanets: lobbyAdminTools?.planets || [],
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
    lobbyAdminTools
  ]);

  async function validateAndCreateLobby() {
    const confirmAlert = confirm(
      `Are you sure? After lobby creation, you cannot modify world settings, but you can create planets and add players to the whitelist.`
    );
    if (!confirmAlert) return;
    try {
      setStatus('creating');
      setStatusMessage('Creating...');

      const initializers = toInitializers(config);
      await onCreate(initializers);
      setStatus('created');
    } catch (err) {
      setStatus('errored');
      setStatusMessage('Error');
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

  const buttons = _.chunk(panes, 2).map(([fst, snd], idx) => {
    return (
      // Index key is fine here because the array is stable
      <ButtonRow key={idx}>
        {fst && (
          <LinkButton disabled={!!createDisabled} to={fst.path} shortcut={fst.shortcut}>
            {fst.title}
          </LinkButton>
        )}
        {snd && (
          <LinkButton disabled={!!createDisabled} to={snd.path} shortcut={snd.shortcut}>
            {snd.title}
          </LinkButton>
        )}
      </ButtonRow>
    );
  });

  const url = `${window.location.origin}/play/${lobbyAdminTools?.address}`;

  const blockscoutURL = `https://blockscout.com/poa/xdai/tx/${lobbyTx}`;

  let lobbyContent: JSX.Element | undefined;
  if (status === 'created' && lobbyAdminTools?.address) {
    lobbyContent = (
      <>
        <Row style = {{justifyContent: 'center'} as CSSStyleDeclaration & React.CSSProperties}>
          <div>
            <MythicLabelText
              style={{ margin: 'auto' }}
              text='Your universe has been created! '
            ></MythicLabelText>
            {lobbyTx && (
              <Link to={blockscoutURL} style={{ margin: 'auto' }}>
                <u>view tx</u>
              </Link>
            )}
          </div>
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

  const routes = panes.map(({ title, path, Pane }, idx) => {
    return (
      // Index key is fine here because the array is stable

      <Route key={idx} path={`${root}${path}`}>
        <NavigationTitle>{title}</NavigationTitle>
        <Pane config={config} onUpdate={onUpdate} />
      </Route>
    );
  });

  const content = () => {
    return (
      <>
        <Title slot='title'>Customize Lobby</Title>
        <div>
          Welcome Cadet! Here, you can configure and launch a custom Dark Forest universe. We call
          this a Lobby.
          <Spacer height={12} />
          First, customize the configuration of your world. Once you have created a lobby, add
          custom planets and allowlisted players on the next pane.
          <Spacer height={12} />
        </div>
        {buttons}
        <Spacer height={20} />
        <div>
          {!created && (
            <Btn size='stretch' disabled={createDisabled} onClick={validateAndCreateLobby}>
              {creating ? <LoadingSpinner initialText={statusMessage} /> : 'Create Lobby'}
            </Btn>
          )}
          <Row style={jcFlexEnd}>
            <LinkButton to={`/extras`}>Add players/planets →</LinkButton>
          </Row>
          <Row>
            <Warning>{error}</Warning>
          </Row>
          {lobbyContent}
        </div>
      </>
    );
  };

  return (
    <Modal width='500px' initialX={100} initialY={100} index={modalIndex}>
      <Switch>
        <Route path={root} exact={true}>
          {content}
        </Route>
        {routes}
        <Route path={`${root}/extras`}>
          <ExtrasNavPane
            lobbyAdminTools={lobbyAdminTools}
            status={status}
            config={config}
            onUpdate={onUpdate}
          />
        </Route>
      </Switch>

      {/* Button this in the title slot but at the end moves it to the end of the title bar */}
      <ConfigDownload onError={setError} address={lobbyAdminTools?.address} config={config} />
      <ConfigUpload onError={setError} onUpload={configUploadSuccess} />
    </Modal>
  );
}
