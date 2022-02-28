import { isLocatable } from '@darkforest_eth/gamelogic';
import { LocationId } from '@darkforest_eth/types';
import React from 'react';
import { CenterBackgroundSubtext, Underline } from '../../Components/CoreUI';
import { useAccount, useMyArtifactsList, usePlanet, useUIManager } from '../../Utils/AppHooks';
import { useEmitterValue } from '../../Utils/EmitterHooks';
import { ModalHandle } from '../../Views/ModalPane';
import { ManageArtifactsPane } from './ManageArtifacts';

export function PlanetInfoHelpContent() {
  return (
    <div>
      <p>Metadata related to this planet.</p>
    </div>
  );
}

export function ManagePlanetArtifactsHelpContent() {
  return (
    <div>
      <p>
        Using this pane, you can manage the artifacts that are on this planet specifically. You can
        activate a single artifact at a time. Some artifacts have a cooldown period after
        deactivating during which they can not be activated.
      </p>
      <br />
      <p>
        If your planet is a <Underline>Spacetime Rip</Underline>, you can also withdraw and deposit
        artifacts. When you withdraw an artifact, it is transferred to your address as an ERC 721
        token.
      </p>
    </div>
  );
}

/**
 * This is the place where a user can manage all of their artifacts on a
 * particular planet. This includes prospecting, withdrawing, depositing,
 * activating, and deactivating artifacts.
 */
export function ManagePlanetArtifactsPane({
  initialPlanetId,
  modal,
}: {
  initialPlanetId: LocationId | undefined;
  modal: ModalHandle;
}) {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);
  const planetId = useEmitterValue(uiManager.selectedPlanetId$, initialPlanetId);
  const planet = usePlanet(uiManager, planetId).value;
  const myArtifacts = useMyArtifactsList(uiManager);
  const onPlanet = uiManager.getArtifactsWithIds(planet?.heldArtifactIds || []);

  const artifactsInWallet = [];
  for (const a of myArtifacts) {
    if (!a.onPlanetId) {
      artifactsInWallet.push(a);
    }
  }

  if (planet && myArtifacts && isLocatable(planet) && account) {
    return (
      <ManageArtifactsPane
        artifactsInWallet={artifactsInWallet}
        artifactsOnPlanet={onPlanet}
        planet={planet}
        playerAddress={account}
        modal={modal}
      />
    );
  } else {
    return (
      <CenterBackgroundSubtext width='100%' height='75px'>
        Select a Planet
      </CenterBackgroundSubtext>
    );
  }
}
