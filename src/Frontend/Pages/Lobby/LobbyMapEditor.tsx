import { EthAddress, WorldCoords } from '@darkforest_eth/types';
import React, { useMemo, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { Spacer } from '../../Components/CoreUI';
import { LoadingSpinner } from '../../Components/LoadingSpinner';
import { LobbyCreationPlanetInspector } from '../../Components/LobbyCreationPlanetInspector';
import { Minimap } from '../../Components/Minimap';
import { MinimapEditor } from '../../Components/MinimapEditor';
import { InputRow, LabeledInput, PlanetPropEditor } from '../../Components/LobbyPlanetPropEditor';
import { Sidebar } from '../../Components/Sidebar';
import { ConfigDownload, DEFAULT_PLANET, LobbyPlanet } from '../../Panes/Lobby/LobbiesUtils';
import { KEY_ITEMS, MinimapKeys } from '../../Panes/Lobby/MinimapPane';
import { MinimapConfig } from '../../Panes/Lobby/MinimapUtils';
import { PlanetListPane } from '../../Panes/Lobby/PlanetListPane';
import {
  LobbyAction,
  lobbyConfigInit,
  LobbyConfigState,
  LobbyInitializers,
} from '../../Panes/Lobby/Reducer';
import { useIsDown } from '../../Utils/KeyEmitters';
import { Checkbox } from '../../Components/Input';
import { Toast } from '../../Components/Toast';
import dfstyles from '../../Styles/dfstyles';
import { ArenaCreationManager } from '../../../Backend/GameLogic/ArenaCreationManager';

export const LobbyMapEditor: React.FC<{
  updateConfig: React.Dispatch<LobbyAction>;
  config: LobbyConfigState;
  arenaCreationManager: ArenaCreationManager;
  createDisabled: boolean;
  root: string;
  minimapConfig: MinimapConfig | undefined;
  onError: (msg: string) => void;
}> = ({
  updateConfig,
  config,
  arenaCreationManager,
  createDisabled,
  root,
  minimapConfig,
  onError,
}) => {
  const [refreshing, setRefreshing] = useState(false);
  const [selectedPlanetIndex, setSelectedPlanetIndex] = useState<number | undefined>();
  const [mutablePlanet, setMutablePlanet] = useState<LobbyPlanet>(DEFAULT_PLANET);
  const [hoverCoords, setHoverCoords] = useState<WorldCoords | undefined>();
  const [mirrorAxes, setMirrorAxes] = useState<{ x: boolean; y: boolean }>({ x: false, y: false });
  const [isPlacementMode, setIsPlacementMode] = useState<boolean>(false);
  const history = useHistory();
  const placementModeShortcut = useIsDown('s');

  useEffect(() => setIsPlacementMode(placementModeShortcut), [placementModeShortcut]);

  const selectedPlanet = useMemo(() => {
    if (selectedPlanetIndex !== undefined && config.ADMIN_PLANETS.displayValue) {
      return config.ADMIN_PLANETS.displayValue[selectedPlanetIndex];
    }
    return undefined;
  }, [selectedPlanetIndex, config.ADMIN_PLANETS]);

  const randomizeMap = () => {
    // console.log('randomizing!!!');
    const seed = Math.floor(Math.random() * 10000);
    updateConfig({ type: 'PLANETHASH_KEY', value: seed });
    updateConfig({ type: 'SPACETYPE_KEY', value: seed + 1 });
    updateConfig({ type: 'BIOMEBASE_KEY', value: seed + 2 });
  };

  function stagePlanet(planetCoord: WorldCoords) {
    // if (createdPlanets?.find((p) => planet.x == p.x && planet.y == p.y)) {
    //   setError('planet with identical coords created');
    //   return;
    // }
    if (
      config.ADMIN_PLANETS.displayValue?.find((p) => planetCoord.x == p?.x && planetCoord.y == p?.y)
    ) {
      onError('Planet with identical coords staged');
      return;
    }
    const newPlanetToStage: LobbyPlanet = {
      ...mutablePlanet,
      x: planetCoord.x,
      y: planetCoord.y,
    };
    const index = config.ADMIN_PLANETS.displayValue?.length ?? 0;
    updateConfig({
      type: 'ADMIN_PLANETS',
      value: newPlanetToStage,
      index: config.ADMIN_PLANETS.displayValue?.length ?? 0,
    });
    mutablePlanet.blockedPlanetLocs = [];
    setSelectedPlanetIndex(0);
  }

  return (
    <Container>
      <Toast
        open={isPlacementMode}
        title='Click on map to place planet'
        description={`Coordinates (${hoverCoords ? hoverCoords.x : '¯\\_(ツ)_/¯'}, ${
          hoverCoords ? hoverCoords.y : '¯\\_(ツ)_/¯'
        })`}
        flash
        onClose={() => {}}
      />
      <Sidebar previousPath={`${root}/confirm`} title={'← Confirm map'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span>Add a planet</span>
          <PlanetPropEditor
            selectedPlanet={mutablePlanet}
            canAddPlanets={config.ADMIN_CAN_ADD_PLANETS.displayValue ?? false}
            spawnPlanetsEnabled={config.MANUAL_SPAWN.displayValue ?? false}
            targetPlanetsEnabled={config.TARGET_PLANETS.displayValue ?? false}
            blockEnabled={
              (config.BLOCK_CAPTURE.displayValue ?? false) ||
              (config.BLOCK_MOVES.displayValue ?? false)
            }
            stagedPlanets={config.ADMIN_PLANETS.currentValue ?? []}
            excludePlanetTypes={['x', 'y']}
            onChange={(planet) => setMutablePlanet(planet)}
            root={root}
          />
          {/* <InputRow>
            <LabeledInput>Mirror X</LabeledInput>
            <Checkbox
              checked={mirrorAxes.x}
              onChange={() => {
                setMirrorAxes({ ...mirrorAxes, x: !mirrorAxes.x });
              }}
            />
          </InputRow>
          <InputRow>
            <LabeledInput>Mirror Y</LabeledInput>
            <Checkbox
              checked={mirrorAxes.y}
              onChange={() => {
                setMirrorAxes({ ...mirrorAxes, y: !mirrorAxes.y });
              }}
            />
          </InputRow> */}
          <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <EditorButton
              cancel={isPlacementMode}
              onClick={() => setIsPlacementMode(!isPlacementMode)}
            >
              {isPlacementMode ? 'Cancel' : 'Set coordinates on map'}
            </EditorButton>
            <Key active={placementModeShortcut}>S</Key>
          </div>
        </div>
        <Spacer height={32} />
        <PlanetListPane
          config={config}
          onUpdate={updateConfig}
          arenaCreationManager={arenaCreationManager}
          onPlanetSelect={(index: number) => {
            setSelectedPlanetIndex(index);
          }}
          selectedIndex={selectedPlanetIndex}
        />
      </Sidebar>
      <MainContent>
        <MainContentInner>
          <Spacer height={64} />
          <MinimapEditorWrapper>
            <MinimapEditor
              style={{ width: '600px', height: '600px' }}
              onClick={(coords: WorldCoords) => {
                stagePlanet(coords);
                if (!placementModeShortcut) {
                  setIsPlacementMode(false);
                }
              }}
              onHover={(coords: WorldCoords) => {
                setHoverCoords(coords);
              }}
              minimapConfig={minimapConfig}
              disabled={!isPlacementMode}
              mirrorAxes={mirrorAxes}
            />
            <Minimap
              style={{ width: '600px', height: '600px' }}
              minimapConfig={minimapConfig}
              setRefreshing={setRefreshing}
            />
          </MinimapEditorWrapper>
          <MinimapKeys keyItems={KEY_ITEMS} />
          <div style={{ textAlign: 'center', height: '24px' }}>
            {refreshing ? <LoadingSpinner initialText='Refreshing...' /> : null}
          </div>
          <LobbyButton
            onClick={() => {
              randomizeMap();
            }}
          >
            Randomize Map
          </LobbyButton>
          {/* <Spacer height={24} /> */}
          {/* <LobbyButton primary onClick={() => history.push(`${root}/confirm`)}>
            Save Changes
          </LobbyButton> */}
          <Spacer height={16} />
          <ConfigDownload
            renderer={() =>
              !createDisabled ? (
                <span style={{ cursor: 'pointer', fontSize: '16px' }}>Download map (JSON)</span>
              ) : (
                <></>
              )
            }
            disabled={createDisabled}
            address={arenaCreationManager.getParentAddress()}
            onError={onError}
            config={config}
          />
        </MainContentInner>
      </MainContent>
      <LobbyCreationPlanetInspector
        selectedPlanet={selectedPlanet}
        selectedIndex={selectedPlanetIndex}
        config={config}
        updateConfig={updateConfig}
        onDelete={() => setSelectedPlanetIndex(undefined)}
        onClose={() => {
          setSelectedPlanetIndex(undefined);
        }}
        root={root}
      />
    </Container>
  );
};

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
  max-width: 1280px;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
`;

export const LobbyButton = styled.button<{ primary?: boolean }>`
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
  &:hover:not([disabled]) {
    background: ${({ primary }) => (primary ? '#0E5141' : '#3D3D3D')};
    border-color: ${({ primary }) => (primary ? '#30FFCD' : '#797979')};
  }
  &:disabled {
    cursor: not-allowed;
    background: #0e5141;
    border-color: transparent;
  }
`;

const MinimapEditorWrapper = styled.div`
  display: grid;
  grid-template: 1fr / 1fr;
  place-items: center;
  margin: 0 auto;
`;

const EditorButton = styled.button<{ cancel: boolean }>`
  background: ${({ cancel }) => (cancel ? '#5B1522' : '#525252')};
  border: ${({ cancel }) => (cancel ? '1px solid #FF4163' : '1px solid #7a7d88')};
  color: ${({ cancel }) => (cancel ? '#FF4163' : '#fff')};
  padding: 4px 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

// styles copied from { DarkForestShortcutButton } from '@darkforest_eth/ui';
const Key = styled.kbd<{ active: boolean }>`
  font-size: 0.7rem;
  line-height: 1.4;
  padding: 0.1rem 0.45rem;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  border: 1px solid ${dfstyles.colors.border};
  border-radius: 0.25rem;
  display: inline-block;
  font-weight: 400;
  text-align: left;
  transform: translateZ(5px);
  transform-style: preserve-3d;
  transition: all 0.25s cubic-bezier(0.2, 1, 0.2, 1);
  box-shadow: 0 0 #6b6b6b, 0 0 #6b6b6b, 0 1px #6d6d6d, 0 2px #6d6d6d, 2px 1px 4px #adb5bd,
    0 -1px 1px #adb5bd;
  background-color: #343a40;
  color: ${dfstyles.colors.text};
  flex: 0;
  height: fit-content;
  margin: 1px 5px 5px;
  &:after {
    border-radius: 0.375rem;
    border-width: 0.0625rem;
    bottom: -6px;
    left: -0.25rem;
    right: -0.25rem;
    top: -2px;
    transform: translateZ(-2px);
    border-style: solid;
    box-sizing: content-box;
    content: '';
    display: block;
    position: absolute;
    transform-style: preserve-3d;
    transition: all 0.25s cubic-bezier(0.2, 1, 0.2, 1);
    border-color: ${dfstyles.colors.borderDarker};
    background: ${dfstyles.colors.background};
  }
  ${({ active }) =>
    active &&
    css`
      transform: translate3d(0, 2px, 0);
      box-shadow: 0 0 1px 1px #929292;
      background-color: ${dfstyles.colors.text};
      color: ${dfstyles.colors.background};
      &:after {
        transform: translate3d(0, -2px, 0);
        background: transparent;
      }
    `}
`;
