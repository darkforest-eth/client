import { ArtifactRarity, ArtifactRarityNames } from '@darkforest_eth/types';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { RarityColors } from '../../Styles/Colors';

const color = keyframes`
  0% {
    filter: hue-rotate(0);
  }
  30% {
    filter: hue-rotate(0);
  }
  100% {
    filter: hue-rotate(360deg);
  }
`;

const AnimDelay = styled.span<{ i: number }>`
  animation: ${color} 1s ease-in-out infinite alternate;
  ${({ i }) => `animation-delay: ${-i * 0.04}s;`}
`;

const Anim = styled.span`
  color: ${RarityColors[ArtifactRarity.Mythic]};
`;

export function MythicLabelText({ text, style }: { text: string; style?: React.CSSProperties }) {
  return (
    <Anim style={style}>
      {text.split('').map((c, i) => (
        <AnimDelay i={i} key={i}>
          {c === ' ' ? <>&nbsp;</> : c}
        </AnimDelay>
      ))}
    </Anim>
  );
}

function MythicLabelRaw() {
  return <MythicLabelText text={ArtifactRarityNames[ArtifactRarity.Mythic]} />;
}

export const MythicLabel = React.memo(MythicLabelRaw);
