import { Planet } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import UIEmitter, { UIEmitterEvent } from '../Utils/UIEmitter';

export function PlanetLink({ planet, children }: { planet: Planet; children: React.ReactNode }) {
  const uiManager = useUIManager();
  const uiEmitter = UIEmitter.getInstance();

  return (
    <LinkContainer
      onClick={() => {
        uiManager?.setSelectedPlanet(planet);
        uiEmitter.emit(UIEmitterEvent.CenterPlanet, planet);
      }}
    >
      {children}
    </LinkContainer>
  );
}

const LinkContainer = styled.span`
  color: ${dfstyles.colors.subtext};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
    color: white;
  }
`;
