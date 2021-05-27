import { Biome, BiomeNames } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { BiomeTextColors } from '../../Styles/Colors';
import { burnAnim, wiggle } from '../BiomeAnims';

const Wrap = styled.span`
  position: relative;
  top: -3px;
`;

const Static = styled.span`
  opacity: 0;
`;

const AnimDelay = styled.span<{ i: number }>`
  position: relative;
  animation: ${wiggle} ${({ i }) => 9.4 + ((i * 0.7) % 1.0)}s linear infinite;
  ${({ i }) => `animation-delay: ${-i * 5.9}s;`}
  color: ${BiomeTextColors[Biome.WASTELAND]};
`;

const Anim = styled.span`
  position: absolute;
  ${burnAnim};
  transition: color 0.2s;
  display: inline-flex;
  flex-direction: row;
  top: 0;
  left: 0;
`;

// TODO pull this logic out from here and SpaceTimeRipLabel into a component
export function WastelandLabelRaw() {
  return (
    <Wrap>
      <Static>{BiomeNames[Biome.WASTELAND]}</Static>
      <Anim>
        {BiomeNames[Biome.WASTELAND].split('').map((c, i) => (
          <AnimDelay i={i} key={i}>
            {c === ' ' ? <>&nbsp;</> : c}
          </AnimDelay>
        ))}
      </Anim>
    </Wrap>
  );
}

export const WastelandLabel = React.memo(WastelandLabelRaw);
