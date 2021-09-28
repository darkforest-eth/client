import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { Artifact, ArtifactTypeNames } from '@darkforest_eth/types';
import React, { useCallback } from 'react';
import styled from 'styled-components';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { artifactName } from '../../Backend/Procedural/ArtifactProcgen';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { CenterBackgroundSubtext, Spacer } from '../Components/CoreUI';
import { ArtifactRarityLabelAnim } from '../Components/Labels/ArtifactLabels';
import { Sub } from '../Components/Text';
import { useMyArtifactsList, useUIManager } from '../Utils/AppHooks';
import { ArtifactLink } from '../Views/ArtifactLink';
import { ModalHandle, ModalHook, ModalName, ModalPane } from '../Views/ModalPane';
import { PlanetLink } from '../Views/PlanetLink';
import { SortableTable } from '../Views/SortableTable';

const ArtifactsBody = styled.div`
  max-height: 400px;
  overflow-y: scroll;
`;

const PlanetName = styled.span`
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100px;
`;

const planetArtifactName = (a: Artifact, uiManager: GameUIManager): string | undefined => {
  const onPlanet = uiManager?.getArtifactPlanet(a);
  if (!onPlanet) return undefined;
  return ProcgenUtils.getPlanetName(onPlanet);
};

function HelpContent() {
  return (
    <div>
      <p>These are all the artifacts you currently own.</p>
      <Spacer height={8} />
      <p>
        The table is interactive, and allows you to sort the artifacts by clicking each column's
        header. You can also view more information about a particular artifact by clicking on its
        name.
      </p>
    </div>
  );
}

function PlayerArtifactsPaneContent({ modal }: { modal: ModalHandle }) {
  const uiManager = useUIManager();
  const myArtifacts = useMyArtifactsList(uiManager);
  const headers = ['Name', 'Location', 'Type', 'Rarity'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r', 'r'];

  const columns = [
    (artifact: Artifact) => (
      <ArtifactLink modal={modal} artifact={artifact}>
        {artifactName(artifact)}
      </ArtifactLink>
    ),
    (artifact: Artifact) => {
      const planetOn = uiManager.getArtifactPlanet(artifact);
      const planetOnName = planetArtifactName(artifact, uiManager);

      return (
        <span>
          {planetOnName && planetOn ? (
            <PlanetLink planet={planetOn}>
              <PlanetName>{planetOnName}</PlanetName>
            </PlanetLink>
          ) : (
            <Sub>inventory</Sub>
          )}
        </span>
      );
    },
    (artifact: Artifact) => <Sub>{ArtifactTypeNames[artifact.artifactType]}</Sub>,
    (artifact: Artifact) => <ArtifactRarityLabelAnim rarity={artifact.rarity} />,
  ];

  const sortFunctions = [
    (left: Artifact, right: Artifact) => artifactName(left).localeCompare(artifactName(right)),
    (left: Artifact, right: Artifact) =>
      planetArtifactName(left, uiManager)?.localeCompare(
        planetArtifactName(right, uiManager) || ''
      ) || 0,
    (left: Artifact, right: Artifact) =>
      ArtifactTypeNames[left.artifactType]?.localeCompare(
        ArtifactTypeNames[right.artifactType] || ''
      ) || 0,
    (left: Artifact, right: Artifact) => left.rarity - right.rarity,
  ];

  if (myArtifacts.length === 0) {
    return (
      <CenterBackgroundSubtext width={RECOMMENDED_MODAL_WIDTH} height='100px'>
        You Don't Have <br /> Any Artifacts
      </CenterBackgroundSubtext>
    );
  }

  return (
    <ArtifactsBody>
      <SortableTable
        rows={myArtifacts}
        headers={headers}
        columns={columns}
        sortFunctions={sortFunctions}
        alignments={alignments}
      />
    </ArtifactsBody>
  );
}

export function PlayerArtifactsPane({ hook }: { hook: ModalHook }) {
  const render = useCallback((handle: ModalHandle) => {
    return <PlayerArtifactsPaneContent modal={handle} />;
  }, []);

  return (
    <ModalPane
      title={'Your Artifacts'}
      hook={hook}
      name={ModalName.YourArtifacts}
      helpContent={HelpContent}
    >
      {render}
    </ModalPane>
  );
}
