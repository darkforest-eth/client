import React, { useState, useRef } from 'react';
import { useStoredUIState, UIDataKey } from '../../Backend/Storage/UIStateStorageManager';
import { ContextMenu } from '../Components/ContextMenu';
import {
  WindowWrapper,
  MainWindow,
  CanvasContainer,
  UpperLeft,
  MenuBar,
  CanvasWrapper,
  LHSWrapper,
} from '../Components/GameWindowComponents';
import ControllableCanvas from '../Game/ControllableCanvas';
import { ArtifactDetailsPane } from '../Panes/ArtifactDetailsPane';
import { CoordsPane } from '../Panes/CoordsPane';
import { ExploreContextPane } from '../Panes/ExploreContextPane';
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
} from './ModalIcon';
import OnboardingPane from '../Panes/OnboardingPane';
import { PlanetContextPane } from '../Panes/PlanetContextPane';
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
import { useUIManager } from '../Utils/AppHooks';
import { NotificationsPane } from './Notifications';
import { useEffect } from 'react';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { keyUp$ } from '../Utils/KeyEmitters';
import { ArtifactId } from '@darkforest_eth/types';
import { PaidArtifactConversationPane } from '../Panes/PaidArtifactConversation/PaidArtifactConversationPane';
import { WithdrawSilverPane } from '../Panes/WithdrawSilverPane';
import {
  TOGGLE_ARTIFACTS_DEX_PANE,
  TOGGLE_BROADCAST_PANE,
  TOGGLE_HAT_PANE,
  TOGGLE_PLANET_ARTIFACTS_PANE,
  TOGGLE_PLANET_DETAILS_PANE,
  TOGGLE_PLANET_DEX_PANE,
  TOGGLE_UPGRADES_PANE,
} from '../Utils/ShortcutConstants';

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
  const newPlayerHook = useStoredUIState<boolean>(UIDataKey.newPlayer, uiManager);

  const withdrawSilverHook = useState<boolean>(false);

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
        <WithdrawSilverPane hook={withdrawSilverHook} />

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
            <MenuBar>
              <ModalSettingsIcon hook={settingsHook} />
              <ModalHelpIcon hook={helpHook} />
              <ModalPluginIcon hook={pluginsHook} />
              <ModalYourArtifactsIcon hook={yourArtifactsHook} />
              <ModalPlanetDexIcon hook={planetdexHook} />
              <ModalTwitterVerifyIcon hook={twitterVerifyHook} />
            </MenuBar>
            <ZoomPane />
          </UpperLeft>

          <CanvasWrapper>
            <ControllableCanvas />
          </CanvasWrapper>

          <NotificationsPane />
          <CoordsPane />
          <TutorialPane newPlayerHook={newPlayerHook} />

          <LHSWrapper>
            <ContextMenu>
              <ExploreContextPane />
              {modalsContainerRef.current && (
                <PlanetContextPane
                  hook={planetDetHook}
                  findArtifactHook={manageArtifactsHook}
                  broadcastHook={twitterBroadcastHook}
                  hatHook={hatHook}
                  upgradeDetHook={upgradeDetHook}
                  modalsContainer={modalsContainerRef.current}
                  setArtifactDetailsOpen={artifactDetailsHook[1]}
                  setWithdrawSilver={withdrawSilverHook[1]}
                />
              )}
            </ContextMenu>
          </LHSWrapper>
        </CanvasContainer>
      </MainWindow>
    </WindowWrapper>
  );
}
