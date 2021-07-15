import { ArtifactRarity, ArtifactRarityNames } from '@darkforest_eth/types';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { RarityColors } from '../../Styles/Colors';

const color = keyframes`
  0% {
    color: ${RarityColors[ArtifactRarity.Legendary]};
  }
  70% {
    color: ${RarityColors[ArtifactRarity.Legendary]};
  }
  100% {
    color: #ffffff;
  }
`;

const AnimDelay = styled.span<{ i: number }>`
  animation: ${color} 1s linear infinite alternate;
  ${({ i }) => `animation-delay: ${-i * 0.04}s;`}
`;

const Anim = styled.span`
  color: ${RarityColors[ArtifactRarity.Legendary]};
`;

function LegendaryLabelRaw() {
  return (
    <Anim>
      {ArtifactRarityNames[ArtifactRarity.Legendary].split('').map((c, i) => (
        <AnimDelay i={i} key={i}>
          {c === ' ' ? <>&nbsp;</> : c}
        </AnimDelay>
      ))}
    </Anim>
  );
}

export const LegendaryLabel = React.memo(LegendaryLabelRaw);
