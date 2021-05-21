import { PlanetType } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { CenterBackgroundSubtext } from '../Components/CoreUI';
import { SelectedPlanetHelpContent } from '../Copy/HelpContent';
import dfstyles from '../Styles/dfstyles';
import { useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { ModalHook, ModalPane } from '../Views/ModalPane';
import { PlanetCard } from '../Views/PlanetCard';
import { SendResources } from '../Views/SendResources';

const StyledSelectedPlanetPane = styled.div`
  width: 22em;
  min-width: 20em;
  height: fit-content;
`;

const Header = styled.div`
  font-size: ${dfstyles.fontSizeXS};
  text-align: center;
  background: ${dfstyles.colors.backgroundlight};
  padding: 0.15em;
  border-top: 1px solid ${dfstyles.colors.subtext};
  border-bottom: 1px solid ${dfstyles.colors.subtext};
`;

export function PlanetContextPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const selectedWrapper = useSelectedPlanet(uiManager);
  const selected = selectedWrapper.value;

  let content;

  if (selected) {
    content = (
      <StyledSelectedPlanetPane>
        <PlanetCard planetWrapper={selectedWrapper} />
        <Header>Send Resources</Header>
        <SendResources planetWrapper={selectedWrapper} />
        {selected.planetType === PlanetType.TRADING_POST && (
          <>
            <Header>Spacetime Rip</Header>
            <p>This is a Spacetime Rip, meaning you can withdraw silver for score!</p>
          </>
        )}
      </StyledSelectedPlanetPane>
    );
  } else {
    content = (
      <CenterBackgroundSubtext width='20em' height='75px'>
        Select a Planet
      </CenterBackgroundSubtext>
    );
  }

  return (
    <ModalPane
      hook={hook}
      title={'Selected Planet'}
      hideClose
      noPadding
      helpContent={SelectedPlanetHelpContent}
      fixToSelectedPlanet
    >
      {content}
    </ModalPane>
  );
}
