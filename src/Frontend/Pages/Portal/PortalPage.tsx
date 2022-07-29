import React from 'react';
import styled from 'styled-components';
import { HideSmall } from '../../Components/Text';
import { useAccount } from '../../Utils/AppHooks';
import { PortalMainView } from '../../Views/Portal/PortalMainView';
import { PortalSidebarView } from '../../Views/Portal/PortalSidebarView';
import { BackgroundImage } from '../LandingPage';

export function PortalPage() {
  return (
    <PortalContainer>
      <HideSmall>
        <PortalSidebarView />
      </HideSmall>
      <PortalMainView />
    </PortalContainer>
  );
}

const PortalContainer = styled.div`
  vertical-align: baseline;
  display: flex;
  margin: 0 auto;
  min-height: 100vh;
  justify-content: center;
`;

const Background = styled(BackgroundImage)`
  background: #111;
`;
