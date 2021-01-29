import React, { useState, useRef } from 'react';
import { ContextMenu } from './GameWindowComponents/ContextMenu';
import ControllableCanvas from './board/ControllableCanvas';
import {
  Sidebar,
  CanvasContainer,
  CanvasWrapper,
  MainWindow,
  MenuBar,
  WindowWrapper,
  LHSWrapper,
  UpperLeft,
} from './GameWindowComponents/GameWindowComponents';
import {
  Tooltip,
  CoordsPane,
  PlanetDetailsPane,
  PlayerInfoPane,
  HelpPane,
  LeaderboardPane,
  PlanetDexPane,
  UpgradeDetailsPane,
  TwitterVerifyPane,
  TwitterBroadcastPane,
  ZoomPane,
} from './GameWindowPanes/GameWindowPanes';
import {
  ModalHelpIcon,
  ModalLeaderboardIcon,
  ModalPluginIcon,
  ModalSettingsIcon,
  ModalYourArtifactsIcon,
} from './GameWindowPanes/ModalPane';
import { ExploreContextPane } from './GameWindowPanes/ExploreContextPane';
import { PlanetContextPane } from './GameWindowPanes/PlanetContextPane';
import { TutorialPane } from './GameWindowPanes/TutorialPane';
import { HatPane } from './GameWindowPanes/HatPane';
import { NotificationsPane } from './Notifications';
import { SettingsPane } from './GameWindowPanes/SettingsPane';
import OnboardingPane from './GameWindowPanes/OnboardingPane';
import { useStoredUIState, UIDataKey } from '../api/UIStateStorageManager';
import GameUIManager from './board/GameUIManager';
import { PrivatePane } from './GameWindowPanes/PrivatePane';
import { Artifact, Hook } from '../_types/global/GlobalTypes';
import { PlayerArtifactsPane } from './GameWindowPanes/PlayerArtifactsPane';
import { FindArtifactPane } from './GameWindowPanes/FindArtifactPane';
import { PluginLibraryView } from '../plugins/PluginLibraryView';
import { ArtifactDetailsPane } from './GameWindowPanes/ArtifactDetailsPane';
import { DepositArtifactPane } from './GameWindowPanes/DepositArtifactPane';

export function GameWindowLayout({
  gameUIManager,
  hiPerfHook,
}: {
  gameUIManager: GameUIManager;
  hiPerfHook: Hook<boolean>;
}) {
  const planetDetHook = useState<boolean>(true);
  const helpHook = useState<boolean>(true);
  const leaderboardHook = useState<boolean>(false);
  const planetdexHook = useState<boolean>(false);
  const yourArtifactsHook = useState<boolean>(false);
  const upgradeDetHook = useState<boolean>(false);
  const twitterVerifyHook = useState<boolean>(false);
  const twitterBroadcastHook = useState<boolean>(false);
  const hatHook = useState<boolean>(false);
  const findArtifactHook = useState<boolean>(false);
  const settingsHook = useState<boolean>(false);
  const privateHook = useState<boolean>(false);
  const pluginsHook = useState<boolean>(false);
  const modalsContainerRef = useRef<HTMLDivElement>(null);

  const newPlayerHook = useStoredUIState<boolean>(
    UIDataKey.newPlayer,
    gameUIManager
  );

  /* artifact stuff */
  const selectedArtifactHook = useState<Artifact | null>(null);
  const artifactDetailsHook = useState<boolean>(false);
  const depositHook = useState<boolean>(false);

  return (
    <WindowWrapper>
      <Tooltip hiPerf={hiPerfHook[0]} />

      {/* all modals rendered into here */}
      <div ref={modalsContainerRef}>
        <PlanetDetailsPane
          hook={planetDetHook}
          broadcastHook={twitterBroadcastHook}
          upgradeDetHook={upgradeDetHook}
          hatHook={hatHook}
          findArtifactHook={findArtifactHook}
          depositHook={depositHook}
        />
        <HelpPane hook={helpHook} />
        <LeaderboardPane hook={leaderboardHook} />
        <PlanetDexPane hook={planetdexHook} />
        <UpgradeDetailsPane hook={upgradeDetHook} />
        <TwitterVerifyPane hook={twitterVerifyHook} />
        <TwitterBroadcastPane hook={twitterBroadcastHook} />
        <FindArtifactPane
          hook={findArtifactHook}
          artifactDetailsHook={artifactDetailsHook}
          selectedArtifactHook={selectedArtifactHook}
        />
        <HatPane hook={hatHook} />
        <SettingsPane
          ethConnection={gameUIManager.getEthConnection()}
          hook={settingsHook}
          privateHook={privateHook}
          hiPerfHook={hiPerfHook}
        />
        <PrivatePane hook={privateHook} />
        <PlayerArtifactsPane
          hook={yourArtifactsHook}
          artifactDetailsHook={artifactDetailsHook}
          selectedArtifactHook={selectedArtifactHook}
        />
        <ArtifactDetailsPane
          hook={artifactDetailsHook}
          artifactHook={selectedArtifactHook}
        />
        <DepositArtifactPane hook={depositHook} />

        {modalsContainerRef.current && (
          <PluginLibraryView
            modalsContainer={modalsContainerRef.current}
            gameUIManager={gameUIManager}
            hook={pluginsHook}
          />
        )}
      </div>

      <OnboardingPane newPlayerHook={newPlayerHook} />

      <MainWindow>
        {/* sidebar */}
        <Sidebar>
          <PlayerInfoPane hook={twitterVerifyHook} />
          <PlanetDexPane small hook={planetdexHook} />
        </Sidebar>

        {/* canvas and stuff */}
        <CanvasContainer>
          <UpperLeft>
            <MenuBar>
              <ModalHelpIcon hook={helpHook} />
              <ModalLeaderboardIcon hook={leaderboardHook} />
              <ModalPluginIcon hook={pluginsHook} />
              <ModalYourArtifactsIcon hook={yourArtifactsHook} />
              <ModalSettingsIcon hook={settingsHook} />
            </MenuBar>
            <ZoomPane />
          </UpperLeft>
          <TutorialPane newPlayerHook={newPlayerHook} />

          <NotificationsPane />

          <CanvasWrapper>
            <ControllableCanvas />
          </CanvasWrapper>

          <CoordsPane hiPerf={hiPerfHook[0]} />

          <LHSWrapper>
            <ContextMenu>
              <ExploreContextPane />
              <PlanetContextPane hook={planetDetHook} />
            </ContextMenu>
          </LHSWrapper>
        </CanvasContainer>
      </MainWindow>
    </WindowWrapper>
  );
}
