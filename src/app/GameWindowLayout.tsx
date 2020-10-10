import React, { useContext, useState } from 'react';

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
  ModalSettingsIcon,
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
import GameUIManagerContext from './board/GameUIManagerContext';
import { PrivatePane } from './GameWindowPanes/PrivatePane';
import { Hook } from '../_types/global/GlobalTypes';

export function GameWindowLayout({
  hiPerfHook,
}: {
  hiPerfHook: Hook<boolean>;
}) {
  const planetDetHook = useState<boolean>(true);
  const helpHook = useState<boolean>(true);
  const leaderboardHook = useState<boolean>(false);
  const planetdexHook = useState<boolean>(false);
  const upgradeDetHook = useState<boolean>(false);
  const twitterVerifyHook = useState<boolean>(false);
  const twitterBroadcastHook = useState<boolean>(false);
  const hatHook = useState<boolean>(false);
  const settingsHook = useState<boolean>(false);

  const privateHook = useState<boolean>(false);

  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  const newPlayerHook = useStoredUIState<boolean>(
    UIDataKey.newPlayer,
    uiManager
  );

  return (
    <WindowWrapper>
      <Tooltip hiPerf={hiPerfHook[0]} />

      {/* modals (fragment is purely semantic) */}
      <>
        <PlanetDetailsPane
          hook={planetDetHook}
          broadcastHook={twitterBroadcastHook}
          upgradeDetHook={upgradeDetHook}
          hatHook={hatHook}
        />
        <HelpPane hook={helpHook} />
        <LeaderboardPane hook={leaderboardHook} />
        <PlanetDexPane hook={planetdexHook} />
        <UpgradeDetailsPane hook={upgradeDetHook} />
        <TwitterVerifyPane hook={twitterVerifyHook} />
        <TwitterBroadcastPane hook={twitterBroadcastHook} />
        <HatPane hook={hatHook} />
        <SettingsPane
          hook={settingsHook}
          privateHook={privateHook}
          hiPerfHook={hiPerfHook}
        />
        <PrivatePane hook={privateHook} />
      </>

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
