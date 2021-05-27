import { Biome, BiomeNames } from '@darkforest_eth/types';
import React from 'react';
import styled, { keyframes } from 'styled-components';
import { BiomeTextColors } from '../../Styles/Colors';

const Wrap = styled.span`
  position: relative;
  top: -3px;
`;

const Static = styled.span`
  opacity: 0;
`;

const bounce = keyframes`
  0% { top: 0px; filter: none; }
  20% { top: -3px; filter: brightness(1.75); }
  40% { top: -3px; filter: brightness(1.75); }
  60% { top: 0px; filter: none; }
  100% { top: 0px; filter: none;}
`;

const AnimDelay = styled.span<{ i: number }>`
  position: relative;
  animation: ${bounce} 1s ease-in-out infinite alternate;
  ${({ i }) => `animation-delay: ${-i * 0.1}s;`}
`;

const Anim = styled.span`
  position: absolute;
  color: ${BiomeTextColors[Biome.LAVA]};
  transition: color 0.2s;
  display: inline-flex;
  flex-direction: row;
  top: 0;
  left: 0;
`;

// TODO pull this logic out from here and SpaceTimeRipLabel into a component
export function LavaLabelRaw() {
  return (
    <Wrap>
      <Static>{BiomeNames[Biome.LAVA]}</Static>
      <Anim>
        {BiomeNames[Biome.LAVA].split('').map((c, i) => (
          <AnimDelay i={i} key={i}>
            {c === ' ' ? <>&nbsp;</> : c}
          </AnimDelay>
        ))}
      </Anim>
    </Wrap>
  );
}

export const LavaLabel = React.memo(LavaLabelRaw);
