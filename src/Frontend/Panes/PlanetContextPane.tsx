import { PlanetType } from '@darkforest_eth/types';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { SelectedPlanetHelpContent } from '../Copy/HelpContent';
import dfstyles from '../Styles/dfstyles';
import { useAccount, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { ModalHook, ModalPane } from '../Views/ModalPane';
import { PlanetCard } from '../Views/PlanetCard';
import {
  getNotifsForPlanet,
  PlanetNotifications,
  PlanetNotifHooks,
} from '../Views/PlanetNotifications';
import { SendResources } from '../Views/SendResources';
import { WithdrawSilver } from '../Views/WithdrawSilver';

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

const ContextSection = styled.div`
  padding: 0.5em;
`;

export function PlanetContextPane({
  hook,
  upgradeDetHook,
}: {
  hook: ModalHook;
} & PlanetNotifHooks) {
  const uiManager = useUIManager();
  const s = useSelectedPlanet(uiManager);

  const account = useAccount(uiManager);

  const currentBlockNumber = useEmitterValue(uiManager.getEthConnection().blockNumber$, undefined);
  const notifs = useMemo(
    () => getNotifsForPlanet(s.value, currentBlockNumber),
    [s, currentBlockNumber]
  );

  const notifProps = { upgradeDetHook };

  const owned = s.value?.owner === account;
  const isPost = s.value?.planetType === PlanetType.TRADING_POST;

  return (
    <ModalPane
      hook={hook}
      title={'Selected Planet'}
      hideClose
      noPadding
      helpContent={SelectedPlanetHelpContent}
    >
      <StyledSelectedPlanetPane>
        <PlanetCard planetWrapper={s} />
        {owned && (
          <>
            <Header>Send Resources</Header>
            <SendResources planetWrapper={s} />
          </>
        )}
        {owned && isPost && (
          <>
            <Header>Spacetime Rip</Header>
            <ContextSection>
              <WithdrawSilver wrapper={s} />
            </ContextSection>
          </>
        )}
        {owned && notifs.length > 0 && (
          <>
            <Header>Planet Notifications</Header>
            <ContextSection>
              <PlanetNotifications wrapper={s} notifs={notifs} {...notifProps} />
            </ContextSection>
          </>
        )}
      </StyledSelectedPlanetPane>
    </ModalPane>
  );
}
