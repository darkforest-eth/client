import { LocationId } from '@darkforest_eth/types';
import React, { useCallback } from 'react';
import { BroadcastPane, BroadcastPaneHelpContent } from '../Panes/BroadcastPane';
import { ClaimPlanetPane } from '../Panes/ClaimPlanetPane';
import { HatPane } from '../Panes/HatPane';
import {
  ManagePlanetArtifactsHelpContent,
  ManagePlanetArtifactsPane,
} from '../Panes/ManagePlanetArtifacts/ManagePlanetArtifactsPane';
import { UpgradeDetailsPane, UpgradeDetailsPaneHelpContent } from '../Panes/UpgradeDetailsPane';
import { useOnUp } from '../Utils/KeyEmitters';
import {
  TOGGLE_BROADCAST_PANE,
  TOGGLE_CLAIM_PLANET_PANE,
  TOGGLE_HAT_PANE,
  TOGGLE_PLANET_ARTIFACTS_PANE,
  TOGGLE_UPGRADES_PANE,
} from '../Utils/ShortcutConstants';
import { ModalHandle } from '../Views/ModalPane';
import { AlignCenterHorizontally, CenteredText, ShortcutButton } from './CoreUI';

export function OpenPaneButton({
  modal,
  title,
  element,
  helpContent,
  shortcutKey,
  shortcutDisabled,
}: {
  modal: ModalHandle;
  title: string;
  element: () => React.ReactElement;
  helpContent?: React.ReactElement;
  shortcutKey?: string;
  shortcutDisabled?: boolean;
}) {
  const open = useCallback(() => {
    if (!shortcutDisabled) {
      modal.push({
        title,
        element,
        helpContent,
      });
    }
  }, [title, element, helpContent, modal, shortcutDisabled]);

  useOnUp(shortcutKey, open);

  return (
    <AlignCenterHorizontally style={{ width: '100%' }} key={shortcutKey}>
      <ShortcutButton
        style={{ flexGrow: 1 }}
        wide
        onClick={open}
        shortcutKey={shortcutKey}
        shortcutDisabled={shortcutDisabled}
      >
        <CenteredText>{title}</CenteredText>
      </ShortcutButton>
    </AlignCenterHorizontally>
  );
}

export function OpenClaimPlanetPane({
  modal,
  planetId,
  shortcutDisabled,
}: {
  modal: ModalHandle;
  planetId: LocationId | undefined;
  shortcutDisabled?: boolean;
}) {
  return (
    <OpenPaneButton
      modal={modal}
      title='Claim'
      shortcutKey={TOGGLE_CLAIM_PLANET_PANE}
      element={() => <ClaimPlanetPane modal={modal} initialPlanetId={planetId} />}
      shortcutDisabled={shortcutDisabled}
    />
  );
}

export function OpenHatPaneButton({
  modal,
  planetId,
  shortcutDisabled,
}: {
  modal: ModalHandle;
  planetId: LocationId | undefined;
  shortcutDisabled?: boolean;
}) {
  return (
    <OpenPaneButton
      modal={modal}
      title='Hat'
      shortcutKey={TOGGLE_HAT_PANE}
      element={() => <HatPane modal={modal} initialPlanetId={planetId} />}
      shortcutDisabled={shortcutDisabled}
    />
  );
}

export function OpenBroadcastPaneButton({
  modal,
  planetId,
  shortcutDisabled,
}: {
  modal: ModalHandle;
  planetId: LocationId | undefined;
  shortcutDisabled?: boolean;
}) {
  return (
    <OpenPaneButton
      modal={modal}
      title='Broadcast'
      shortcutKey={TOGGLE_BROADCAST_PANE}
      element={() => <BroadcastPane modal={modal} initialPlanetId={planetId} />}
      helpContent={BroadcastPaneHelpContent()}
      shortcutDisabled={shortcutDisabled}
    />
  );
}

export function OpenUpgradeDetailsPaneButton({
  modal,
  planetId,
  shortcutDisabled,
}: {
  modal: ModalHandle;
  planetId: LocationId | undefined;
  shortcutDisabled?: boolean;
}) {
  return (
    <OpenPaneButton
      modal={modal}
      title='Upgrade'
      shortcutKey={TOGGLE_UPGRADES_PANE}
      element={() => <UpgradeDetailsPane modal={modal} initialPlanetId={planetId} />}
      helpContent={UpgradeDetailsPaneHelpContent()}
      shortcutDisabled={shortcutDisabled}
    />
  );
}
export function OpenManagePlanetArtifactsButton({
  modal,
  planetId,
  shortcutDisabled,
}: {
  modal: ModalHandle;
  planetId: LocationId | undefined;
  shortcutDisabled?: boolean;
}) {
  return (
    <OpenPaneButton
      modal={modal}
      title='Artifacts'
      shortcutKey={TOGGLE_PLANET_ARTIFACTS_PANE}
      element={() => <ManagePlanetArtifactsPane modal={modal} initialPlanetId={planetId} />}
      helpContent={ManagePlanetArtifactsHelpContent()}
      shortcutDisabled={shortcutDisabled}
    />
  );
}
