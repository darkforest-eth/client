import { PlanetType, PlanetTypeNames } from '@darkforest_eth/types';
import React from 'react';
import styled, { keyframes } from 'styled-components';

const Wrap = styled.span`
  position: relative;
  top: -5px;
`;

const Static = styled.span`
  opacity: 0;
`;

const bounce = keyframes`
  from {
    top: 3px;
    filter: hue-rotate(0);
  }
  to {
    top: -3px;
    filter: hue-rotate(360deg);
  }
`;

const AnimDelay = styled.span<{ i: number }>`
  position: relative;
  animation: ${bounce} 0.5s ease-in-out infinite alternate;
  ${({ i }) => `animation-delay: ${-i * 0.04}s;`}
`;

const Anim = styled.span`
  position: absolute;
  color: hsl(0, 100%, 75%);
  transition: color 0.2s;
  display: inline-flex;
  flex-direction: row;
  top: 0;
  left: 0;
`;

function SpacetimeRipLabelRaw() {
  return (
    <Wrap>
      <Static>{PlanetTypeNames[PlanetType.TRADING_POST]}</Static>
      <Anim>
        {PlanetTypeNames[PlanetType.TRADING_POST].split('').map((c, i) => (
          <AnimDelay i={i} key={i}>
            {c === ' ' ? <>&nbsp;</> : c}
          </AnimDelay>
        ))}
      </Anim>
    </Wrap>
  );
}

export const SpacetimeRipLabel = React.memo(SpacetimeRipLabelRaw);
