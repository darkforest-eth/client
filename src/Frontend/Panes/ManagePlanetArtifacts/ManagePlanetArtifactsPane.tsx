import { Artifact, ArtifactType, LocationId } from '@darkforest_eth/types';
import React, { useCallback } from 'react';
import { isLocatable } from '../../../_types/global/GlobalTypes';
import {
  CenterBackgroundSubtext,
  PaddedRecommendedModalWidth,
  Underline,
} from '../../Components/CoreUI';
import {
  useAccount,
  useMyArtifacts,
  usePlanet,
  usePopAllOnSelectedPlanetChanged,
  useUIManager,
} from '../../Utils/AppHooks';
import { useEmitterValue } from '../../Utils/EmitterHooks';
import { ModalHandle } from '../../Views/ModalPane';
import { ManageArtifactsPane } from './ManageArtifacts';

export function ManagePlanetArtifactsHelpContent() {
  return (
    <div>
      <p>
        Using this pane, you can manage the artifacts that are on this planet specifically. You can
        activate a single artifact at a time. Most artifacts have a cooldown period after
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
  planetId,
  modal,
}: {
  planetId: LocationId | undefined;
  modal: ModalHandle;
}) {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);
  const planet = usePlanet(uiManager, planetId);

  const currentBlockNumber = useEmitterValue(uiManager.getEthConnection().blockNumber$, undefined);
  const myArtifacts = useMyArtifacts(uiManager);
  const onPlanet = uiManager.getArtifactsWithIds(planet.value?.heldArtifactIds || []);
  const roundOver = uiManager.isRoundOver();

  usePopAllOnSelectedPlanetChanged(modal, planetId);

  const find = useCallback(() => {
    planet.value && uiManager.findArtifact(planet.value.locationId);
  }, [planet, uiManager]);

  const prospect = useCallback(() => {
    planet.value && uiManager.prospectPlanet(planet.value.locationId);
  }, [planet, uiManager]);

  const withdraw = useCallback(
    (artifact: Artifact) => {
      planet.value && uiManager.withdrawArtifact(planet.value.locationId, artifact?.id);
    },
    [planet, uiManager]
  );

  const deposit = useCallback(
    (artifact: Artifact) => {
      artifact && planet.value && uiManager.depositArtifact(planet.value.locationId, artifact?.id);
    },
    [planet, uiManager]
  );

  const activate = useCallback(
    async (artifact: Artifact) => {
      if (planet.value && isLocatable(planet.value)) {
        let targetPlanetId = undefined;

        if (artifact.artifactType === ArtifactType.Wormhole) {
          const targetPlanet = await uiManager.startWormholeFrom(planet.value);
          targetPlanetId = targetPlanet?.locationId;
        }

        uiManager.activateArtifact(planet.value.locationId, artifact.id, targetPlanetId);
      }
    },
    [planet, uiManager]
  );

  const deactivate = useCallback(
    (artifact: Artifact) => {
      planet.value && uiManager.deactivateArtifact(planet.value.locationId, artifact.id);
    },
    [planet, uiManager]
  );

  let content;

  if (planet.value && myArtifacts.value && isLocatable(planet.value) && account) {
    content = (
      <ManageArtifactsPane
        artifactsInInventory={Array.from(myArtifacts.value.values())}
        artifactsOnPlanet={onPlanet}
        planet={planet.value}
        currentBlockNumber={currentBlockNumber}
        playerAddress={account}
        roundOver={roundOver}
        activate={activate}
        deactivate={deactivate}
        deposit={deposit}
        withdraw={withdraw}
        find={find}
        prospect={prospect}
        modal={modal}
      />
    );
  } else {
    content = (
      <CenterBackgroundSubtext width='100%' height='75px'>
        Select a Planet
      </CenterBackgroundSubtext>
    );
  }

  return <PaddedRecommendedModalWidth>{content}</PaddedRecommendedModalWidth>;
}
