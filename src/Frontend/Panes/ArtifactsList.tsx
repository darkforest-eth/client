import { isSpaceShip } from '@darkforest_eth/gamelogic';
import { artifactName, getPlanetName } from '@darkforest_eth/procedural';
import { Artifact, ArtifactTypeNames, LocationId } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { CenterBackgroundSubtext, Truncate } from '../Components/CoreUI';
import { ArtifactRarityLabelAnim } from '../Components/Labels/ArtifactLabels';
import { Sub } from '../Components/Text';
import { useUIManager } from '../Utils/AppHooks';
import { ArtifactLink } from '../Views/ArtifactLink';
import { ModalHandle } from '../Views/ModalPane';
import { PlanetLink } from '../Views/PlanetLink';
import { SortableTable } from '../Views/SortableTable';
import { TabbedView } from '../Views/TabbedView';

const ArtifactsBody = styled.div`
  min-height: 200px;
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
  return getPlanetName(onPlanet);
};

export function ArtifactsList({
  modal,
  artifacts,
  depositOn,
  maxRarity,
  noArtifactsMessage,
}: {
  modal: ModalHandle;
  artifacts: Artifact[];
  depositOn?: LocationId;
  maxRarity?: number;
  noArtifactsMessage?: React.ReactElement;
}) {
  const uiManager = useUIManager();
  let nonShipArtifacts = artifacts.filter((a) => !isSpaceShip(a.artifactType));
  if (maxRarity !== undefined) {
    nonShipArtifacts = nonShipArtifacts.filter((a) => a.rarity <= maxRarity);
  }
  const headers = ['Name', 'Location', 'Type', 'Rarity'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r', 'r'];

  const columns = [
    (artifact: Artifact) => (
      <ArtifactLink depositOn={depositOn} modal={modal} artifact={artifact}>
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
            <Sub>wallet</Sub>
          )}
        </span>
      );
    },
    (artifact: Artifact) => (
      <Sub>
        <Truncate maxWidth='75px'>{ArtifactTypeNames[artifact.artifactType]}</Truncate>
      </Sub>
    ),
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

  if (nonShipArtifacts.length === 0) {
    return (
      <CenterBackgroundSubtext width={'100%'} height='100px'>
        {noArtifactsMessage ?? (
          <>
            You Don't Have <br /> Any Artifacts
          </>
        )}
      </CenterBackgroundSubtext>
    );
  }

  return (
    <SortableTable
      paginated={false}
      rows={nonShipArtifacts}
      headers={headers}
      columns={columns}
      sortFunctions={sortFunctions}
      alignments={alignments}
    />
  );
}

export function ShipList({
  modal,
  artifacts,
  depositOn,
  noShipsMessage,
}: {
  modal: ModalHandle;
  artifacts: Artifact[];
  depositOn?: LocationId;
  noShipsMessage?: React.ReactElement;
}) {
  const uiManager = useUIManager();
  const headers = ['Name', 'Location', 'Type'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r', 'r'];
  const shipArtifacts = artifacts.filter((a) => isSpaceShip(a.artifactType));

  const columns = [
    (artifact: Artifact) => (
      <ArtifactLink depositOn={depositOn} modal={modal} artifact={artifact}>
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
            <Sub>moving</Sub>
          )}
        </span>
      );
    },
    (artifact: Artifact) => (
      <Sub>
        <Truncate maxWidth='75px'>{ArtifactTypeNames[artifact.artifactType]}</Truncate>
      </Sub>
    ),
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
  ];

  if (shipArtifacts.length === 0) {
    return (
      <CenterBackgroundSubtext width={'100%'} height='100px'>
        {noShipsMessage ?? (
          <>
            You Don't Have <br /> Any Ships
          </>
        )}
      </CenterBackgroundSubtext>
    );
  }

  return (
    <SortableTable
      paginated={false}
      rows={shipArtifacts}
      headers={headers}
      columns={columns}
      sortFunctions={sortFunctions}
      alignments={alignments}
    />
  );
}

export function AllArtifacts({
  modal,
  artifacts,
  depositOn,
  maxRarity,
  noArtifactsMessage,
  noShipsMessage,
}: {
  modal: ModalHandle;
  artifacts: Artifact[];
  depositOn?: LocationId;
  maxRarity?: number;
  noArtifactsMessage?: React.ReactElement;
  noShipsMessage?: React.ReactElement;
}) {
  return (
    <ArtifactsBody>
      <TabbedView
        style={{ height: '100%' }}
        tabTitles={['artifacts', 'ships']}
        tabContents={(i) => {
          if (i === 0) {
            return (
              <ArtifactsList
                maxRarity={maxRarity}
                depositOn={depositOn}
                modal={modal}
                artifacts={artifacts}
                noArtifactsMessage={noArtifactsMessage}
              />
            );
          }

          return (
            <ShipList
              depositOn={depositOn}
              modal={modal}
              artifacts={artifacts}
              noShipsMessage={noShipsMessage}
            />
          );
        }}
      />
    </ArtifactsBody>
  );
}
