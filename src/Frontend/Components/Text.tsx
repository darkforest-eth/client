import { BLOCK_EXPLORER_URL } from '@darkforest_eth/constants';
import { Artifact, ArtifactId, Planet, SubmittedTx, WorldCoords } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { artifactName } from '../../Backend/Procedural/ArtifactProcgen';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { Chunk, isLocatable } from '../../_types/global/GlobalTypes';
import Viewport from '../Game/Viewport';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';
import { Link } from './CoreUI';

export function BlinkCursor() {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible((v) => {
        return !v;
      });
    }, 500);
    return () => clearInterval(id);
  }, []);

  return <span>{visible ? '|' : ''} </span>;
}

export const Green = styled.span`
  color: ${dfstyles.colors.dfgreen};
`;
export const Sub = styled.span`
  color: ${dfstyles.colors.subtext};
`;
export const Subber = styled.span`
  color: ${dfstyles.colors.subbertext};
`;
export const Text = styled.span`
  color: ${dfstyles.colors.text};
`;
export const White = styled.span`
  color: ${dfstyles.colors.dfwhite};
`;
export const Red = styled.span`
  color: ${dfstyles.colors.dfred};
`;
export const Gold = styled.span`
  color: ${dfstyles.colors.dfyellow};
`;

export const Colored = styled.span<{ color: string }>`
  color: ${({ color }) => color};
`;

export const Blue = styled.span`
  color: ${dfstyles.colors.dfblue};
`;
export const Invisible = styled.span`
  color: rgba(0, 0, 0, 0);
`;

export const Smaller = styled.span`
  font-size: 80%;
`;

export const HideSmall = styled.span`
  @media (max-width: ${dfstyles.screenSizeS}) {
    display: none;
  }
`;

export function TxLink({ tx }: { tx: SubmittedTx }) {
  return (
    <>
      <u>
        <a onClick={() => window.open(`${BLOCK_EXPLORER_URL}/${tx.txHash}`)}>
          View {tx.txHash.substring(0, 7)} on block explorer
        </a>
      </u>
      .
    </>
  );
}

export function CenterPlanetLink({
  planet,
  children,
}: {
  planet: Planet;
  children: React.ReactNode;
}) {
  const uiManager = useUIManager();
  return (
    <a>
      <u
        onClick={() => {
          if (isLocatable(planet)) {
            uiManager.centerPlanet(planet);
          }
        }}
      >
        {children}
      </u>
    </a>
  );
}

export function ArtifactNameLink({ id }: { id: ArtifactId }) {
  const uiManager = useUIManager();
  const artifact: Artifact | undefined = uiManager && uiManager.getArtifactWithId(id);

  const click = () => {
    UIEmitter.getInstance().emit(UIEmitterEvent.ShowArtifact, artifact);
  };

  return <Link onClick={click}>{artifactName(artifact)}</Link>;
}

export function PlanetNameLink({ planet }: { planet: Planet }) {
  return <CenterPlanetLink planet={planet}>{ProcgenUtils.getPlanetName(planet)}</CenterPlanetLink>;
}

export function CenterChunkLink({ chunk, children }: { chunk: Chunk; children: React.ReactNode }) {
  return <Link onClick={() => Viewport.getInstance().centerChunk(chunk)}>{children}</Link>;
}

export function FAQ04Link({ children }: { children: React.ReactNode }) {
  return <Link to={'https://blog.zkga.me/df-04-faq'}>{children} </Link>;
}

export const LongDash = () => (
  <span style={{ transform: 'scale(1.5, 1)', display: 'inline-block' }}>-</span>
);

export const Coords = ({ coords: { x, y } }: { coords: WorldCoords }) => (
  <Sub>
    (<Text>{x}</Text>, <Text>{y}</Text>)
  </Sub>
);
