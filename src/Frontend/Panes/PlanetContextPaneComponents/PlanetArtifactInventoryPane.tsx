import React, { useCallback, useLayoutEffect, useState } from 'react';
import { useEffect } from 'react';
import { getArtifactDebugName } from '../../../Backend/GameLogic/ArtifactUtils';
import { Artifact, ArtifactId, Planet } from '@darkforest_eth/types';
import { RemoteModal } from '../../Components/RemoteModal';
import { useUIManager } from '../../Utils/AppHooks';
import { ModalHook } from '../../Views/ModalPane';
import styled from 'styled-components';
import { ArtifactImage } from '../../Components/ArtifactImage';

const StyledInventoryItem = styled.div`
  a {
    &:hover {
      text-decoration: underline;
      cursor: pointer;
    }
  }
`;

const StyledArtifactWrapper = styled.div`
  display: inline-block;
  &:hover {
    outline: 1px solid white;
    cursor: pointer;
  }
`;

function InventoryItem({
  artifact,
  setArtifactDetailsOpen,
  setSendArtifact,
}: {
  artifact: Artifact;
  setArtifactDetailsOpen: (open: boolean) => void;
  setSendArtifact: (a: Artifact) => void;
}) {
  const uiManager = useUIManager();

  const [flip, setFlip] = useState(false);

  const openArtifactDetails = useCallback(
    (artifactId: ArtifactId) => {
      uiManager.selectedArtifactId$.publish(artifactId);
      setArtifactDetailsOpen(false);
      setFlip(true);
    },
    [uiManager, setArtifactDetailsOpen]
  );

  // hack which lets us pop the artifact details modal to the top whenever an artifact is clicked
  useLayoutEffect(() => {
    if (flip) {
      setArtifactDetailsOpen(true);
      setFlip(false);
    }
  }, [flip, setArtifactDetailsOpen, setFlip]);

  return (
    <StyledInventoryItem>
      <StyledArtifactWrapper onClick={() => openArtifactDetails(artifact.id)}>
        <ArtifactImage artifact={artifact} size={35} />
      </StyledArtifactWrapper>
      <a onClick={() => setSendArtifact(artifact)}>{getArtifactDebugName(artifact)}</a>
    </StyledInventoryItem>
  );
}

export function PlanetArtifactInventoryPane({
  container,
  hook,
  selected,
  setSendArtifact,
  setArtifactDetailsOpen,
}: {
  container: Element;
  hook: ModalHook;
  selected: Planet | undefined;
  setSendArtifact: (a: Artifact) => void;
  setArtifactDetailsOpen: (open: boolean) => void;
}) {
  const uiManager = useUIManager();

  const [artifacts, setArtifacts] = useState<Artifact[]>([]);

  useEffect(() => {
    if (!selected) return;
    const art = uiManager.getArtifactsWithIds(selected.heldArtifactIds);
    console.log(art);
    setArtifacts(art);
  }, [selected, uiManager]);

  return (
    <RemoteModal hook={hook} title={'Send Artifact'} container={container}>
      <div>
        {artifacts.map((a, i) => (
          <InventoryItem
            key={i}
            artifact={a}
            setArtifactDetailsOpen={setArtifactDetailsOpen}
            setSendArtifact={setSendArtifact}
          />
        ))}
      </div>
    </RemoteModal>
  );
}
