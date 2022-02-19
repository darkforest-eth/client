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
import { ArtifactHoverPane } from '../Panes/ArtifactHoverPane';
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
import { TransactionLogPane } from '../Panes/TransactionLogPane';
import { TutorialPane } from '../Panes/TutorialPane';
import { TwitterVerifyPane } from '../Panes/TwitterVerifyPane';
import { ZoomPane } from '../Panes/ZoomPane';
import { useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { useOnUp } from '../Utils/KeyEmitters';
import { useBooleanSetting } from '../Utils/SettingsHooks';
import { TOGGLE_DIAGNOSTICS_PANE } from '../Utils/ShortcutConstants';
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
  const uiManager = useUIManager();
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
  const [onboardingVisible, setOnboardingVisible] = useBooleanSetting(uiManager, Setting.NewPlayer);
  const tutorialHook = useBooleanSetting(uiManager, Setting.TutorialOpen);
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
        {modalsContainer && (
          <PluginLibraryPane
            modalsContainer={modalsContainer}
            gameUIManager={uiManager}
            visible={pluginsVisible}
            onClose={() => setPluginsVisible(false)}
          />
        )}
      </div>

      <OnboardingPane visible={onboardingVisible} onClose={() => setOnboardingVisible(false)} />

      <MainWindow>
        <CanvasContainer>
          <UpperLeft>
            <ZoomPane />
          </UpperLeft>
          <SidebarPane
            transactionLogHook={[transactionLogVisible, setTransactionLogVisible]}
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
