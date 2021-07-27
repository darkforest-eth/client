import { LocationId } from '@darkforest_eth/types';
import React, { useCallback } from 'react';
import { BroadcastPane, BroadcastPaneHelpContent } from '../Panes/BroadcastPane';
import { HatPane } from '../Panes/HatPane';
import {
  ManagePlanetArtifactsHelpContent,
  ManagePlanetArtifactsPane,
} from '../Panes/ManagePlanetArtifacts/ManagePlanetArtifactsPane';
import { UpgradeDetailsPane, UpgradeDetailsPaneHelpContent } from '../Panes/UpgradeDetailsPane';
import { useIsDown } from '../Utils/KeyEmitters';
import {
  TOGGLE_BROADCAST_PANE,
  TOGGLE_HAT_PANE,
  TOGGLE_PLANET_ARTIFACTS_PANE,
  TOGGLE_UPGRADES_PANE,
  useSubscribeToShortcut,
} from '../Utils/ShortcutConstants';
import { ModalHandle } from '../Views/ModalPane';
import { Btn } from './Btn';

export function OpenPaneButton({
  modal,
  title,
  element,
  helpContent,
  shortcutKey,
}: {
  modal: ModalHandle;
  title: string;
  element: React.ReactElement;
  helpContent?: React.ReactElement;
  shortcutKey?: string;
}) {
  const open = useCallback(() => {
    modal.push({
      title,
      element,
      helpContent,
    });
  }, [title, element, helpContent, modal]);

  useSubscribeToShortcut(shortcutKey, open);
  const isDown = useIsDown(shortcutKey);

  return (
    <Btn wide onClick={open} forceActive={isDown}>
      {title}
    </Btn>
  );
}

export function OpenHatPaneButton({
  modal,
  planetId,
}: {
  modal: ModalHandle;
  planetId: LocationId | undefined;
}) {
  return (
    <OpenPaneButton
      modal={modal}
      title='(H)at'
      shortcutKey={TOGGLE_HAT_PANE}
      element={<HatPane modal={modal} planetId={planetId} />}
    />
  );
}

export function OpenBroadcastPaneButton({
  modal,
  planetId,
}: {
  modal: ModalHandle;
  planetId: LocationId | undefined;
}) {
  return (
    <OpenPaneButton
      modal={modal}
      title='(B)roadcast'
      shortcutKey={TOGGLE_BROADCAST_PANE}
      element={<BroadcastPane modal={modal} planetId={planetId} />}
      helpContent={BroadcastPaneHelpContent()}
    />
  );
}

export function OpenUpgradeDetailsPaneButton({
  modal,
  planetId,
}: {
  modal: ModalHandle;
  planetId: LocationId | undefined;
}) {
  return (
    <OpenPaneButton
      modal={modal}
      title='(U)pgrade'
      shortcutKey={TOGGLE_UPGRADES_PANE}
      element={<UpgradeDetailsPane modal={modal} planetId={planetId} />}
      helpContent={UpgradeDetailsPaneHelpContent()}
    />
  );
}
export function OpenManagePlanetArtifactsButton({
  modal,
  planetId,
}: {
  modal: ModalHandle;
  planetId: LocationId | undefined;
}) {
  return (
    <OpenPaneButton
      modal={modal}
      title='(A)rtifacts'
      shortcutKey={TOGGLE_PLANET_ARTIFACTS_PANE}
      element={<ManagePlanetArtifactsPane modal={modal} planetId={planetId} />}
      helpContent={ManagePlanetArtifactsHelpContent()}
    />
  );
}
