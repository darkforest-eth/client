import { Artifact, ArtifactNames } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { artifactName } from '../../Backend/Procedural/ArtifactProcgen';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { CenterBackgroundSubtext, Spacer } from '../Components/CoreUI';
import { ArtifactRarityLabelAnim } from '../Components/Labels/ArtifactLabels';
import { Sub } from '../Components/Text';
import { useUIManager } from '../Utils/AppHooks';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { ArtifactLink } from '../Views/ArtifactLink';
import { ModalHook, ModalName, ModalPane } from '../Views/ModalPane';
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
        header. You can also view more information about a particular planet by clicking on its
        name.
      </p>
    </div>
  );
}

export function PlayerArtifactsPane({
  hook,
  artifactDetailsHook,
}: {
  hook: ModalHook;
  artifactDetailsHook: ModalHook;
}) {
  const uiManager = useUIManager();
  const [visible, setVisible] = hook;
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [_detailsOpen, setDetailsOpen] = artifactDetailsHook;

  // sync artifacts
  useEffect(() => {
    const updateArtifacts = () => {
      if (!visible) return;
      if (!uiManager) return;
      const myAddr = uiManager.getAccount();
      if (!myAddr) return;
      const newArtifacts = uiManager.getMyArtifacts();
      setArtifacts(newArtifacts);
    };

    const intervalId = setInterval(updateArtifacts, 2000);
    updateArtifacts();

    return () => clearInterval(intervalId);
  }, [uiManager, visible]);

  useEffect(() => {
    const uiEmitter = UIEmitter.getInstance();
    const onSelect = () => {
      setVisible(true);
    };
    uiEmitter.addListener(UIEmitterEvent.SelectArtifact, onSelect);
    return () => {
      uiEmitter.removeAllListeners(UIEmitterEvent.SelectArtifact);
    };
  }, [setVisible]);

  const headers = ['Name', 'Location', 'Type', 'Rarity'];
  const alignments: Array<'r' | 'c' | 'l'> = ['l', 'r', 'r', 'r'];
  const columns = [
    (artifact: Artifact) => (
      <ArtifactLink artifact={artifact} setDetailsOpen={setDetailsOpen}>
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
    (artifact: Artifact) => <Sub>{ArtifactNames[artifact.artifactType]}</Sub>,
    (artifact: Artifact) => <ArtifactRarityLabelAnim artifact={artifact} />,
  ];

  const sortFunctions = [
    (left: Artifact, right: Artifact) => artifactName(left).localeCompare(artifactName(right)),
    (left: Artifact, right: Artifact) =>
      planetArtifactName(left, uiManager)?.localeCompare(
        planetArtifactName(right, uiManager) || ''
      ) || 0,
    (left: Artifact, right: Artifact) =>
      ArtifactNames[left.artifactType]?.localeCompare(ArtifactNames[right.artifactType] || '') || 0,
    (left: Artifact, right: Artifact) => left.rarity - right.rarity,
  ];

  let content = undefined;

  if (artifacts.length === 0) {
    content = (
      <CenterBackgroundSubtext width='300px' height='100px'>
        You Don't Have <br /> Any Artifacts
      </CenterBackgroundSubtext>
    );
  } else {
    content = (
      <ArtifactsBody>
        <SortableTable
          rows={artifacts}
          headers={headers}
          columns={columns}
          sortFunctions={sortFunctions}
          alignments={alignments}
        />
      </ArtifactsBody>
    );
  }

  return (
    <ModalPane
      title={'Your Artifacts'}
      hook={hook}
      name={ModalName.YourArtifacts}
      width='unset'
      helpContent={HelpContent}
    >
      {content}
    </ModalPane>
  );
}
