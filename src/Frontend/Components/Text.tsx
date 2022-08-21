import { BLOCK_EXPLORER_URL } from '@darkforest_eth/constants';
import { isLocatable } from '@darkforest_eth/gamelogic';
import { artifactName, getPlanetName } from '@darkforest_eth/procedural';
import {
  Artifact,
  ArtifactId,
  Chunk,
  Planet,
  Transaction,
  WorldCoords,
} from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
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
export const ALPurple = styled.span`
  color: ${dfstyles.colors.alpurple};
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

export const Larger = styled.span`
  font-size: 115%;
`;

export const Txt90pc = styled.span`
  font-size: 90%;
`;

export const Smaller = styled.span`
  font-size: 80%;
`;

export const Smaller_2 = styled.span`
  font-size: 70%;
`;

export const HideSmall = styled.span`
  @media (max-width: ${dfstyles.screenSizeS}) {
    display: none;
  }
`;

export function TxLink({ tx }: { tx: Transaction }) {
  if (tx.hash) {
    return (
      <>
        <u>
          <Link onClick={() => window.open(`${BLOCK_EXPLORER_URL}/${tx.hash}`)}>
            {tx.hash.substring(0, 7)}
          </Link>
        </u>
      </>
    );
  }

  return <Sub>-</Sub>;
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
  return <CenterPlanetLink planet={planet}>{getPlanetName(planet)}</CenterPlanetLink>;
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
