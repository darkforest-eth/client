import { ModalName, Planet, PlanetType } from '@darkforest_eth/types';
import React, { useCallback, useEffect, useMemo } from 'react';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { CapturePlanetButton } from '../Components/CapturePlanetButton';
import { VerticalSplit } from '../Components/CoreUI';
import { MineArtifactButton } from '../Components/MineArtifactButton';
import {
  OpenBroadcastPaneButton,
  OpenHatPaneButton,
  OpenManagePlanetArtifactsButton,
  OpenPlanetInfoButton,
  OpenUpgradeDetailsPaneButton,
} from '../Components/OpenPaneButtons';
import { snips } from '../Styles/dfstyles';
import { useAccount, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { useEmitterSubscribe } from '../Utils/EmitterHooks';
import { useOnUp } from '../Utils/KeyEmitters';
import { EXIT_PANE, TOGGLE_ABANDON, TOGGLE_SEND } from '../Utils/ShortcutConstants';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { ModalHandle, ModalPane } from '../Views/ModalPane';
import { PlanetCard, PlanetCardTitle } from '../Views/PlanetCard';
import { getNotifsForPlanet, PlanetNotifications } from '../Views/PlanetNotifications';
import { SendResources } from '../Views/SendResources';
import { WithdrawSilver } from '../Views/WithdrawSilver';

function PlanetContextPaneContent({
  modal,
  planet,
  uiManager,
  onToggleSendForces,
  onToggleAbandon,
}: {
  modal: ModalHandle;
  planet: Wrapper<Planet | undefined>;
  uiManager: GameUIManager;
  onToggleSendForces: () => void;
  onToggleAbandon: () => void;
}) {
  const account = useAccount(uiManager);
  const notifs = useMemo(() => getNotifsForPlanet(planet.value, account), [planet, account]);
  const owned = planet.value?.owner === account;

  useEffect(() => {
    if (!planet.value) modal.popAll();
  }, [planet.value, modal]);

  const p = planet.value;

  let captureRow = null;
  if (!p?.destroyed && uiManager.captureZonesEnabled) {
    captureRow = <CapturePlanetButton planetWrapper={planet} />;
  }

  let upgradeRow = null;
  if (!p?.destroyed && owned) {
    upgradeRow = <OpenUpgradeDetailsPaneButton modal={modal} planetId={p?.locationId} />;
  }

  let hatRow = null;
  if (!p?.destroyed && owned) {
    hatRow = <OpenHatPaneButton modal={modal} planetId={p?.locationId} />;
  }

  let withdrawRow = null;
  if (!p?.destroyed && owned && p?.planetType === PlanetType.TRADING_POST) {
    withdrawRow = <WithdrawSilver wrapper={planet} />;
  }

  let notifRow = null;
  if (!p?.destroyed && notifs.length > 0) {
    notifRow = <PlanetNotifications planet={planet} notifs={notifs} />;
  }

  return (
    <>
      <PlanetCard planetWrapper={planet} />
      <SendResources
        planetWrapper={planet}
        onToggleSendForces={onToggleSendForces}
        onToggleAbandon={onToggleAbandon}
      />
      <MineArtifactButton planetWrapper={planet} />
      {captureRow}

      <VerticalSplit>
        <>
          {upgradeRow}
          <OpenBroadcastPaneButton modal={modal} planetId={p?.locationId} />
          <OpenPlanetInfoButton modal={modal} planetId={p?.locationId} />
        </>
        <>
          <OpenManagePlanetArtifactsButton modal={modal} planetId={p?.locationId} />
          {hatRow}
        </>
      </VerticalSplit>
      {withdrawRow}
      {notifRow}
    </>
  );
}

export function SelectedPlanetHelpContent() {
  return (
    <div>
      <p>
        This pane allows you to interact with the currently selected planet. Pressing the ESCAPE key
        allows you to deselect the current planet.
      </p>
    </div>
  );
}

export function PlanetContextPane({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const uiManager = useUIManager();
  const planet = useSelectedPlanet(uiManager);

  /* All of this is done to support using the key commands on subpanes of the PlanetContextPane */
  const doSend = useCallback(() => {
    if (!uiManager) return;
    const uiEmitter = UIEmitter.getInstance();
    if (uiManager.isSendingForces() || uiManager.isSendingShip() || uiManager.isAbandoning()) {
      uiEmitter.emit(UIEmitterEvent.SendInitiated, planet.value);
    } else {
      uiEmitter.emit(UIEmitterEvent.SendCancelled);
    }
  }, [planet, uiManager]);

  const toggleSendingForces = useCallback(() => {
    if (planet.value?.destroyed && !uiManager.isSendingShip(planet.value?.locationId)) return;
    const isAbandoning = uiManager.isAbandoning();
    if (isAbandoning) return;
    const isSending = uiManager.isSendingForces();
    uiManager.setSending(!isSending);
    doSend();
  }, [uiManager, doSend, planet]);

  const toggleAbandoning = useCallback(() => {
    if (planet.value?.destroyed) return;
    const isAbandoning = uiManager.isAbandoning();
    uiManager.setAbandoning(!isAbandoning);
    doSend();
  }, [uiManager, doSend, planet]);

  useOnUp(
    TOGGLE_SEND,
    () => {
      toggleSendingForces();
    },
    [toggleSendingForces]
  );

  useOnUp(
    TOGGLE_ABANDON,
    () => {
      toggleAbandoning();
    },
    [toggleAbandoning]
  );

  useOnUp(
    EXIT_PANE,
    () => {
      // If we clear the selectedPlanetId, the below hook will cancel and cleanup the sending
      uiManager.setSelectedPlanet(undefined);
    },
    [uiManager]
  );

  // If the locationId changes, cancel any sending
  useEmitterSubscribe(
    uiManager.selectedPlanetId$,
    () => {
      const uiEmitter = UIEmitter.getInstance();
      uiEmitter.emit(UIEmitterEvent.SendCancelled);

      // Get the previous planet and clear it's artifact
      // so it doesn't have a ship selected the next time the planet is selected
      const previousPlanet = uiManager.getPreviousSelectedPlanet();
      if (previousPlanet) {
        uiManager.setArtifactSending(previousPlanet.locationId, undefined);
      }
    },
    [uiManager]
  );

  const render = useCallback(
    (modal: ModalHandle) => (
      <PlanetContextPaneContent
        modal={modal}
        planet={planet}
        uiManager={uiManager}
        onToggleSendForces={toggleSendingForces}
        onToggleAbandon={toggleAbandoning}
      />
    ),
    [uiManager, planet, toggleSendingForces, toggleAbandoning]
  );

  return (
    <ModalPane
      style={planet?.value?.destroyed ? snips.destroyedBackground : undefined}
      visible={visible}
      onClose={onClose}
      id={ModalName.PlanetContextPane}
      title={(small: boolean) => <PlanetCardTitle small={small} planet={planet} />}
      hideClose
      helpContent={SelectedPlanetHelpContent}
      width='350px'
    >
      {render}
    </ModalPane>
  );
}
