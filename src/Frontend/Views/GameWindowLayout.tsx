import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { BorderlessPane } from '../Components/CoreUI';
import {
  CanvasContainer,
  CanvasWrapper,
  MainWindow,
  UpperLeft,
  WindowWrapper,
} from '../Components/GameWindowComponents';
import ControllableCanvas from '../Game/ControllableCanvas';
import { CoordsPane } from '../Panes/CoordsPane';
import { DiagnosticsPane } from '../Panes/DiagnosticsPane';
import { ExplorePane } from '../Panes/ExplorePane';
import { HelpPane } from '../Panes/HelpPane';
import { HoverPlanetPane } from '../Panes/HoverPlanetPane';
import OnboardingPane from '../Panes/OnboardingPane';
import { PlanetContextPane } from '../Panes/PlanetContextPane';
import { PlanetDexPane } from '../Panes/PlanetDexPane';
import { PlayerArtifactsPane } from '../Panes/PlayerArtifactsPane';
import { PluginLibraryPane } from '../Panes/PluginLibraryPane';
import { PrivatePane } from '../Panes/PrivatePane';
import { SettingsPane } from '../Panes/SettingsPane';
import { TutorialPane } from '../Panes/TutorialPane';
import { TwitterVerifyPane } from '../Panes/TwitterVerifyPane';
import { ZoomPane } from '../Panes/ZoomPane';
import { useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { useOnUp } from '../Utils/KeyEmitters';
import { Setting, useBooleanSetting } from '../Utils/SettingsHooks';
import {
  TOGGLE_DIAGNOSTICS_PANE,
  TOGGLE_EXPLORE,
  TOGGLE_HELP_PANE,
  TOGGLE_PLUGINS_PANE,
  TOGGLE_SETTINGS_PANE,
  TOGGLE_TARGETTING,
  TOGGLE_YOUR_ARTIFACTS_PANE,
  TOGGLE_YOUR_PLANETS_DEX_PANE,
} from '../Utils/ShortcutConstants';
import { NotificationsPane } from './Notifications';
import { SidebarPane } from './SidebarPane';
import { TopBar } from './TopBar';

export function GameWindowLayout({
  terminalVisible,
  setTerminalVisible,
}: {
  terminalVisible: boolean;
  setTerminalVisible: (visible: boolean) => void;
}) {
  const helpHook = useState<boolean>(false);
  const planetdexHook = useState<boolean>(false);
  const yourArtifactsHook = useState<boolean>(false);
  const twitterVerifyHook = useState<boolean>(false);
  const settingsHook = useState<boolean>(false);
  const privateHook = useState<boolean>(false);
  const pluginsHook = useState<boolean>(false);
  const modalsContainerRef = useRef<HTMLDivElement | null>(null);
  const uiManager = useUIManager();
  const newPlayerHook = useBooleanSetting(uiManager, Setting.NewPlayer);
  const tutorialHook = useBooleanSetting(uiManager, Setting.TutorialOpen);
  const selected = useSelectedPlanet(uiManager).value;
  const selectedPlanetHook = useState<boolean>(!!selected);
  const diagnosticsHook = useState<boolean>(false);
  const [, setSelectedPlanetVisible] = selectedPlanetHook;

  const [userTerminalVisibleSetting, setTerminalVisibleSetting] = useBooleanSetting(
    uiManager,
    Setting.TerminalVisible
  );

  useEffect(() => {
    uiManager.setOverlayContainer(modalsContainerRef);
  }, [uiManager, modalsContainerRef]);

  const account = uiManager.getAccount();
  useEffect(() => {
    if (uiManager.getAccount()) {
      setTerminalVisible(uiManager.getBooleanSetting(Setting.TerminalVisible));
    }
  }, [account, uiManager, setTerminalVisible]);

  useEffect(() => {
    if (userTerminalVisibleSetting !== terminalVisible) {
      setTerminalVisibleSetting(terminalVisible);
    }
  }, [userTerminalVisibleSetting, setTerminalVisibleSetting, terminalVisible]);

  useEffect(() => setSelectedPlanetVisible(!!selected), [selected, setSelectedPlanetVisible]);

  const setSettingsHookOpen = settingsHook[1];
  useOnUp(
    TOGGLE_SETTINGS_PANE,
    useCallback(() => {
      setSettingsHookOpen((value) => !value);
    }, [setSettingsHookOpen])
  );

  const setHelpHookOpen = helpHook[1];
  useOnUp(
    TOGGLE_HELP_PANE,
    useCallback(() => {
      setHelpHookOpen((value) => !value);
    }, [setHelpHookOpen])
  );

  const setPluginsHookOpen = pluginsHook[1];
  useOnUp(
    TOGGLE_PLUGINS_PANE,
    useCallback(() => {
      setPluginsHookOpen((value) => !value);
    }, [setPluginsHookOpen])
  );

  const setPlanetDexOpen = planetdexHook[1];
  useOnUp(
    TOGGLE_YOUR_PLANETS_DEX_PANE,
    useCallback(() => {
      setPlanetDexOpen((value) => !value);
    }, [setPlanetDexOpen])
  );

  const setYourArtifactsOpen = yourArtifactsHook[1];
  useOnUp(
    TOGGLE_YOUR_ARTIFACTS_PANE,
    useCallback(() => {
      setYourArtifactsOpen((value) => !value);
    }, [setYourArtifactsOpen])
  );

  const setDiagnosticsHookOpen = diagnosticsHook[1];
  useOnUp(
    TOGGLE_DIAGNOSTICS_PANE,
    useCallback(() => {
      setDiagnosticsHookOpen((value) => !value);
    }, [setDiagnosticsHookOpen])
  );

  useOnUp(TOGGLE_EXPLORE, uiManager.toggleExplore.bind(uiManager));
  useOnUp(TOGGLE_TARGETTING, uiManager.toggleTargettingExplorer.bind(uiManager));

  return (
    <WindowWrapper>
      <TopBarPaneContainer>
        <BorderlessPane>
          <TopBar twitterVerifyHook={twitterVerifyHook} />
        </BorderlessPane>
      </TopBarPaneContainer>

      {/* all modals rendered into here */}
      <div ref={modalsContainerRef}>
        <HelpPane hook={helpHook} />
        <PlanetDexPane hook={planetdexHook} />
        <TwitterVerifyPane hook={twitterVerifyHook} />
        <SettingsPane
          ethConnection={uiManager.getEthConnection()}
          hook={settingsHook}
          privateHook={privateHook}
        />
        <PrivatePane hook={privateHook} />
        <PlayerArtifactsPane hook={yourArtifactsHook} />
        <PlanetContextPane hook={selectedPlanetHook} />
        <DiagnosticsPane hook={diagnosticsHook} />
        {modalsContainerRef.current && (
          <PluginLibraryPane
            modalsContainer={modalsContainerRef.current}
            gameUIManager={uiManager}
            hook={pluginsHook}
          />
        )}
      </div>

      <OnboardingPane newPlayerHook={newPlayerHook} />

      <MainWindow>
        <CanvasContainer>
          <UpperLeft>
            <ZoomPane />
          </UpperLeft>
          <SidebarPane
            settingsHook={settingsHook}
            helpHook={helpHook}
            pluginsHook={pluginsHook}
            yourArtifactsHook={yourArtifactsHook}
            planetdexHook={planetdexHook}
          />
          <CanvasWrapper>
            <ControllableCanvas />
          </CanvasWrapper>

          <NotificationsPane />
          <CoordsPane />
          <ExplorePane />

          <HoverPlanetPane />

          <TutorialPane tutorialHook={tutorialHook} />
        </CanvasContainer>
      </MainWindow>
    </WindowWrapper>
  );
}

const TopBarPaneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
`;
