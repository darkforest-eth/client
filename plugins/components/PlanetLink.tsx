import { Planet } from '@darkforest_eth/types';
import { h, Component } from 'preact'
import styled from 'styled-components';
import dfstyles from '../../src/Frontend/Styles/dfstyles';
// import { useUIManager } from '../../src/Frontend/Utils/AppHooks';
import UIEmitter, { UIEmitterEvent } from '../../src/Frontend/Utils/UIEmitter';

export function PlanetLink({ planet, children }: { planet: Planet; children: React.ReactNode }) {
  // const uiManager = useUIManager();
  const uiEmitter = UIEmitter.getInstance();

  return (
    <LinkContainer
      onClick={() => {
        // uiManager?.setSelectedPlanet(planet);
        ui.centerPlanet(planet)
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
