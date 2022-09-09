import { ModalId, ModalName, Setting } from '@darkforest_eth/types';
import React, { useCallback, useEffect, useState } from 'react';
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
import { ArtifactHoverPane } from '../Panes/Game/ArtifactHoverPane';
import { CoordsPane } from '../Panes/Game/CoordsPane';
import { DiagnosticsPane } from '../Panes/Game/DiagnosticsPane';
import { ExplorePane } from '../Panes/Game/ExplorePane';
import { HelpPane } from '../Panes/Game/HelpPane';
import { HoverPlanetPane } from '../Panes/Game/HoverPlanetPane';
import { WaitingRoomPane } from '../Panes/Game/WaitingRoomPane';
import { PlanetContextPane } from '../Panes/Game/PlanetContextPane';
import { PlanetDexPane } from '../Panes/Game/PlanetDexPane';
import { PlayerArtifactsPane } from '../Panes/Game/PlayerArtifactsPane';
import { PluginLibraryPane } from '../Panes/Game/PluginLibraryPane';
import { PrivatePane } from '../Panes/Game/PrivatePane';
import { SettingsPane } from '../Panes/Game/SettingsPane';
import { SpectatorInfoPane } from '../Panes/Game/SpectatorInfoPane';
import { SurveyPane } from '../Panes/Game/SurveyPane';
import { TransactionLogPane } from '../Panes/Game/TransactionLogPane';
import { TutorialPane } from '../Panes/Game/TutorialPane';
import { TwitterVerifyPane } from '../Panes/Game/TwitterVerifyPane';
import { ZoomPane } from '../Panes/ZoomPane';
import { useGameover, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { useOnUp } from '../Utils/KeyEmitters';
import { useBooleanSetting } from '../Utils/SettingsHooks';
import { TOGGLE_DIAGNOSTICS_PANE } from '../Utils/ShortcutConstants';
import { NotificationsPane } from './Game/Notifications';
import { SidebarPane } from '../Panes/Game/SidebarPane';
import { TopBar } from './Game/TopBar';
import { tutorialConfig } from '../Utils/constants';
import { ArenaBriefingPane } from '../Panes/Game/ArenaBriefingPane';
import { useHistory } from 'react-router-dom';

export function GameWindowLayout({
  terminalVisible,
  setTerminalVisible,
}: {
  terminalVisible: boolean;
  setTerminalVisible: (visible: boolean) => void;
}) {
  const uiManager = useUIManager();
  const history = useHistory();
  const modalManager = uiManager.getModalManager();
  const modalPositions = modalManager.getModalPositions();

  /**
   * We use the existence of a window position for a given modal as an indicator
   * that it should be opened on page load. This is to satisfy the feature of
   * peristent modal positions across browser sessions for a given account.
   */
  const isModalOpen = useCallback(
    (modalId: ModalId) => {
      const pos = modalPositions.get(modalId);
      if (pos) {
        return pos.state !== 'closed';
      } else {
        return false;
      }
    },
    [modalPositions]
  );
  const exitGame = () => {
    const confirmation = confirm('are you sure you want to quit this game?');
    if (confirmation) {
      history.push('/portal/home');
    }
  };
  const [helpVisible, setHelpVisible] = useState<boolean>(isModalOpen(ModalName.Help));
  const [transactionLogVisible, setTransactionLogVisible] = useState<boolean>(
    isModalOpen(ModalName.TransactionLog)
  );
  const [planetdexVisible, setPlanetdexVisible] = useState<boolean>(
    isModalOpen(ModalName.PlanetDex)
  );
  const [playerArtifactsVisible, setPlayerArtifactsVisible] = useState<boolean>(
    isModalOpen(ModalName.YourArtifacts)
  );
  const [twitterVerifyVisible, setTwitterVerifyVisible] = useState<boolean>(
    isModalOpen(ModalName.TwitterVerify)
  );
  const [settingsVisible, setSettingsVisible] = useState<boolean>(isModalOpen(ModalName.Settings));
  const [privateVisible, setPrivateVisible] = useState<boolean>(isModalOpen(ModalName.Private));
  const [pluginsVisible, setPluginsVisible] = useState<boolean>(isModalOpen(ModalName.Plugins));
  const [diagnosticsVisible, setDiagnosticsVisible] = useState<boolean>(
    isModalOpen(ModalName.Diagnostics)
  );

  const [modalsContainer, setModalsContainer] = useState<HTMLDivElement | undefined>();
  const modalsContainerCB = useCallback((node) => {
    setModalsContainer(node);
  }, []);

  const [waitingRoomVisible, setWaitingRoomVisible] = useState(
    !uiManager.gameStarted &&
      uiManager.contractConstants.MANUAL_SPAWN &&
      uiManager.getSpawnPlanets().length !== 1
  );

  const isTutorialWorld = uiManager.contractConstants.CONFIG_HASH === tutorialConfig;
  const showTutorial = isTutorialWorld;
  const [showSpectatorInfo] = useBooleanSetting(uiManager, Setting.ShowSpectatorInfo);
  const [showArenaBriefing] = useBooleanSetting(uiManager, Setting.ShowArenaBriefing);
  const selected = useSelectedPlanet(uiManager).value;
  const [selectedPlanetVisible, setSelectedPlanetVisible] = useState<boolean>(!!selected);

  const [userTerminalVisibleSetting, setTerminalVisibleSetting] = useBooleanSetting(
    uiManager,
    Setting.TerminalVisible
  );

  useEffect(() => {
    uiManager.setOverlayContainer(modalsContainer);
  }, [uiManager, modalsContainer]);

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

  // useEffect(() => setWaitingRoomVisible(!uiManager.getGameStarted())), [uiManager.getGameStarted()];

  useOnUp(
    TOGGLE_DIAGNOSTICS_PANE,
    useCallback(() => {
      setDiagnosticsVisible((value) => !value);
    }, [setDiagnosticsVisible])
  );

  return (
    <WindowWrapper>
      <TopBarPaneContainer>
        <BorderlessPane>
          <TopBar twitterVerifyHook={[twitterVerifyVisible, setTwitterVerifyVisible]} />
        </BorderlessPane>
      </TopBarPaneContainer>

      {/* all modals rendered into here */}
      <div ref={modalsContainerCB}>
        <HelpPane visible={helpVisible} onClose={() => setHelpVisible(false)} />
        <TransactionLogPane
          visible={transactionLogVisible}
          onClose={() => setTransactionLogVisible(false)}
        />
        <PlanetDexPane visible={planetdexVisible} onClose={() => setPlanetdexVisible(false)} />
        <TwitterVerifyPane
          visible={twitterVerifyVisible}
          onClose={() => setTwitterVerifyVisible(false)}
        />
        <SettingsPane
          ethConnection={uiManager.getEthConnection()}
          visible={settingsVisible}
          onClose={() => setSettingsVisible(false)}
          onOpenPrivate={() => setPrivateVisible(true)}
        />
        <PrivatePane visible={privateVisible} onClose={() => setPrivateVisible(false)} />
        <PlayerArtifactsPane
          visible={playerArtifactsVisible}
          onClose={() => setPlayerArtifactsVisible(false)}
        />
        <PlanetContextPane
          visible={selectedPlanetVisible}
          onClose={() => setSelectedPlanetVisible(false)}
        />
        <DiagnosticsPane
          visible={diagnosticsVisible}
          onClose={() => setDiagnosticsVisible(false)}
        />
        <SurveyPane visible={useGameover()} onClose={() => {}} />

        {modalsContainer && (
          <PluginLibraryPane
            modalsContainer={modalsContainer}
            gameUIManager={uiManager}
            visible={pluginsVisible}
            onClose={() => setPluginsVisible(false)}
          />
        )}
      </div>

      <WaitingRoomPane visible={waitingRoomVisible} onClose={() => setWaitingRoomVisible(false)} />

      <MainWindow>
        <CanvasContainer>
          <UpperLeft>
            <ZoomPane />
          </UpperLeft>
          <SidebarPane
            exitHook={exitGame}
            settingsHook={[settingsVisible, setSettingsVisible]}
            helpHook={[helpVisible, setHelpVisible]}
            pluginsHook={[pluginsVisible, setPluginsVisible]}
            yourArtifactsHook={[playerArtifactsVisible, setPlayerArtifactsVisible]}
            planetdexHook={[planetdexVisible, setPlanetdexVisible]}
          />
          <CanvasWrapper>
            <ControllableCanvas />
          </CanvasWrapper>

          <NotificationsPane />
          <CoordsPane />
          <ExplorePane />

          <HoverPlanetPane />
          <ArtifactHoverPane />

          {showTutorial && <TutorialPane />}
          {showSpectatorInfo && <SpectatorInfoPane />}
          {showArenaBriefing && !showTutorial && <ArenaBriefingPane />}
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
