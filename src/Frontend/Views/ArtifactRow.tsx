import { isSpaceShip } from '@darkforest_eth/gamelogic';
import { Artifact } from '@darkforest_eth/types';
import React, { useCallback, useEffect, useMemo } from 'react';
import styled, { css } from 'styled-components';
import { ArtifactImage } from '../Components/ArtifactImage';
import { Spacer } from '../Components/CoreUI';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';

const RowWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: 'space-around';
  align-items: center;
  overflow-x: scroll;
`;

const thumbActive = css`
  border: 1px solid ${dfstyles.colors.border};
  background-color: ${dfstyles.colors.border};
`;

const StyledArtifactThumb = styled.div<{ active: boolean; enemy: boolean }>`
  min-width: 2.5em;
  min-height: 2.5em;
  width: 2.5em;
  height: 2.5em;

  border: 1px solid ${({ enemy }) => (enemy ? dfstyles.colors.dfred : dfstyles.colors.borderDark)};
  border-radius: 4px;

  &:last-child {
    margin-right: none;
  }

  display: inline-flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  background: ${dfstyles.colors.artifactBackground};

  &:hover {
    ${thumbActive}
    cursor: pointer;

    & > div {
      filter: brightness(1.2);
    }
  }

  ${({ active }) => active && thumbActive}
`;

export function ArtifactThumb({
  artifact,
  selectedArtifact,
  onArtifactChange,
}: {
  selectedArtifact?: Artifact | undefined;
  onArtifactChange?: (artifact: Artifact | undefined) => void;
  artifact: Artifact;
}) {
  const uiManager = useUIManager();
  const enemy = useMemo(() => {
    const account = uiManager.getAccount();
    if (isSpaceShip(artifact.artifactType)) {
      return artifact?.controller !== account;
    }

    return false;
  }, [artifact, uiManager]);
  const click = useCallback(() => {
    if (!onArtifactChange || enemy) return;

    if (artifact.id === selectedArtifact?.id) onArtifactChange(undefined);
    else onArtifactChange(artifact);
  }, [onArtifactChange, artifact, selectedArtifact, enemy]);

  useEffect(() => {
    // this is called when the component is unrendered
    return () => uiManager?.setHoveringOverArtifact(undefined);
  }, [uiManager]);

  return (
    <StyledArtifactThumb
      active={selectedArtifact?.id === artifact.id}
      enemy={enemy}
      onClick={click}
      onMouseEnter={() => {
        uiManager?.setHoveringOverArtifact(artifact.id);
      }}
      onMouseLeave={() => {
        uiManager?.setHoveringOverArtifact(undefined);
      }}
    >
      <ArtifactImage artifact={artifact} thumb size={32} />
    </StyledArtifactThumb>
  );
}

export function SelectArtifactRow({
  selectedArtifact,
  onArtifactChange,
  artifacts,
}: {
  selectedArtifact?: Artifact | undefined;
  onArtifactChange?: (artifact: Artifact | undefined) => void;
  artifacts: Artifact[];
}) {
  return (
    <RowWrapper>
      {artifacts.length > 0 &&
        artifacts.map((a) => (
          <span key={a.id}>
            <ArtifactThumb
              artifact={a}
              selectedArtifact={selectedArtifact}
              onArtifactChange={onArtifactChange}
            />
            <Spacer width={4} />
          </span>
        ))}
    </RowWrapper>
  );
}
