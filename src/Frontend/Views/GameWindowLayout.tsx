import React, { useState, useRef } from 'react';
import {
  WindowWrapper,
  MainWindow,
  CanvasContainer,
  UpperLeft,
  CanvasWrapper,
} from '../Components/GameWindowComponents';
import ControllableCanvas from '../Game/ControllableCanvas';
import { ArtifactDetailsPane } from '../Panes/ArtifactDetailsPane';
import { CoordsPane } from '../Panes/CoordsPane';
import { ExplorePane } from '../Panes/ExplorePane';
import { HatPane } from '../Panes/HatPane';
import { HelpPane } from '../Panes/HelpPane';
import { ManagePlanetArtifactsPane } from '../Panes/ManagePlanetArtifacts/ManagePlanetArtifactsPane';
import {
  ModalHelpIcon,
  ModalPluginIcon,
  ModalYourArtifactsIcon,
  ModalSettingsIcon,
  ModalPlanetDexIcon,
  ModalTwitterVerifyIcon,
  ModalArtifactIcon,
  ModalHatIcon,
  ModalPlanetDetailsIcon,
  ModalTwitterBroadcastIcon,
  ModalUpgradeDetailsIcon,
} from './ModalIcon';
import OnboardingPane from '../Panes/OnboardingPane';
import { PlanetDetailsPane } from '../Panes/PlanetDetailsPane';
import { PlanetDexPane } from '../Panes/PlanetDexPane';
import { PlayerArtifactsPane } from '../Panes/PlayerArtifactsPane';
import { PluginLibraryPane } from '../Panes/PluginLibraryPane';
import { PrivatePane } from '../Panes/PrivatePane';
import { SettingsPane } from '../Panes/SettingsPane';
import { Tooltip } from '../Panes/Tooltip';
import { TutorialPane } from '../Panes/TutorialPane';
import { BroadcastPane } from '../Panes/BroadcastPane';
import { TwitterVerifyPane } from '../Panes/TwitterVerifyPane';
import { UpgradeDetailsPane } from '../Panes/UpgradeDetailsPane';
import { ZoomPane } from '../Panes/ZoomPane';
import { useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { NotificationsPane } from './Notifications';
import { useEffect } from 'react';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { keyUp$ } from '../Utils/KeyEmitters';
import { ArtifactId } from '@darkforest_eth/types';
import { PaidArtifactConversationPane } from '../Panes/PaidArtifactConversation/PaidArtifactConversationPane';
import {
  TOGGLE_ARTIFACTS_DEX_PANE,
  TOGGLE_BROADCAST_PANE,
  TOGGLE_DIAGNOSTICS_PANE,
  TOGGLE_HAT_PANE,
  TOGGLE_PLANET_ARTIFACTS_PANE,
  TOGGLE_PLANET_DETAILS_PANE,
  TOGGLE_PLANET_DEX_PANE,
  TOGGLE_UPGRADES_PANE,
} from '../Utils/ShortcutConstants';
import { MenuBar, MenuBarSection } from './MenuBar';
import { PlanetContextPane } from '../Panes/PlanetContextPane';
import { HoverPlanetPane } from '../Panes/HoverPlanetPane';
import { TopBar } from './TopBar';
import { DiagnosticsPane } from '../Panes/DiagnosticsPane';
import { Setting, useBooleanSetting } from '../Utils/SettingsHooks';

export function GameWindowLayout() {
  const planetDetHook = useState<boolean>(false);

  const helpHook = useState<boolean>(false);
  const planetdexHook = useState<boolean>(false);
  const yourArtifactsHook = useState<boolean>(false);
  const upgradeDetHook = useState<boolean>(false);
  const twitterVerifyHook = useState<boolean>(false);
  const twitterBroadcastHook = useState<boolean>(false);
  const hatHook = useState<boolean>(false);
  const manageArtifactsHook = useState<boolean>(false);
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

  useEffect(() => setSelectedPlanetVisible(!!selected), [selected, setSelectedPlanetVisible]);

  /* artifact stuff */
  const artifactDetailsHook = useState<boolean>(false);
  const artifactConversationHook = useState<boolean>(false);
  const [convoArtifactId, setConvoArtifactId] = useState<ArtifactId | undefined>();

  const keyUp = useEmitterValue(keyUp$, undefined);
  const lastKeyUp = useRef(keyUp);

  useEffect(() => {
    if (!keyUp) return;
    if (lastKeyUp.current === keyUp) return;
    lastKeyUp.current = keyUp;

    let paneHook;

    if (keyUp.value === TOGGLE_PLANET_DETAILS_PANE) {
      paneHook = planetDetHook;
    } else if (keyUp.value === TOGGLE_PLANET_ARTIFACTS_PANE) {
      paneHook = manageArtifactsHook;
    } else if (keyUp.value === TOGGLE_HAT_PANE) {
      paneHook = hatHook;
    } else if (keyUp.value === TOGGLE_BROADCAST_PANE) {
      paneHook = twitterBroadcastHook;
    } else if (keyUp.value === TOGGLE_UPGRADES_PANE) {
      paneHook = upgradeDetHook;
    } else if (keyUp.value === TOGGLE_PLANET_DEX_PANE) {
      paneHook = planetdexHook;
    } else if (keyUp.value === TOGGLE_ARTIFACTS_DEX_PANE) {
      paneHook = yourArtifactsHook;
    } else if (keyUp.value === TOGGLE_DIAGNOSTICS_PANE) {
      paneHook = diagnosticsHook;
    }

    if (paneHook) {
      paneHook[1]((value) => !value);
    }
  }, [
    keyUp,
    hatHook,
    manageArtifactsHook,
    planetDetHook,
    twitterBroadcastHook,
    upgradeDetHook,
    planetdexHook,
    yourArtifactsHook,
    diagnosticsHook,
  ]);

  const openConversationForArtifact = (id: ArtifactId) => {
    if (id) {
      artifactConversationHook[1](true);
      setConvoArtifactId(id);
    } else {
      artifactConversationHook[1](false);
    }
  };

  const convoArtifact = convoArtifactId && uiManager.getArtifactMap().get(convoArtifactId);

  return (
    <WindowWrapper>
      <Tooltip />

      {/* all modals rendered into here */}
      <div ref={modalsContainerRef}>
        <PlanetDetailsPane hook={planetDetHook} hatHook={hatHook} />
        <HelpPane hook={helpHook} />
        <PlanetDexPane hook={planetdexHook} />
        <UpgradeDetailsPane hook={upgradeDetHook} />
        <TwitterVerifyPane hook={twitterVerifyHook} />
        <BroadcastPane hook={twitterBroadcastHook} />
        <ManagePlanetArtifactsPane
          hook={manageArtifactsHook}
          setArtifactDetailsOpen={artifactDetailsHook[1]}
        />
        <HatPane hook={hatHook} />
        <SettingsPane
          ethConnection={uiManager.getEthConnection()}
          hook={settingsHook}
          privateHook={privateHook}
        />
        <PrivatePane hook={privateHook} />
        <PlayerArtifactsPane hook={yourArtifactsHook} artifactDetailsHook={artifactDetailsHook} />
        <ArtifactDetailsPane
          hook={artifactDetailsHook}
          openConversationForArtifact={openConversationForArtifact}
        />
        <PaidArtifactConversationPane hook={artifactConversationHook} artifact={convoArtifact} />
        <PlanetContextPane hook={selectedPlanetHook} upgradeDetHook={upgradeDetHook} />
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
          <TopBar />
          <UpperLeft>
            <MenuBar>
              <MenuBarSection>
                <ModalSettingsIcon hook={settingsHook} />
                <ModalHelpIcon hook={helpHook} />
                <ModalPluginIcon hook={pluginsHook} />
                <ModalYourArtifactsIcon hook={yourArtifactsHook} />
                <ModalPlanetDexIcon hook={planetdexHook} />
                <ModalTwitterVerifyIcon hook={twitterVerifyHook} />
              </MenuBarSection>
              <MenuBarSection collapsible>
                <ModalPlanetDetailsIcon hook={planetDetHook} />
                <ModalArtifactIcon hook={manageArtifactsHook} />
                <ModalHatIcon hook={hatHook} />
                <ModalTwitterBroadcastIcon hook={twitterBroadcastHook} />
                <ModalUpgradeDetailsIcon hook={upgradeDetHook} />
              </MenuBarSection>
            </MenuBar>
            <ZoomPane />
          </UpperLeft>

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
