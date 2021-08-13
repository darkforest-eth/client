import { Planet } from '@darkforest_eth/types';
import React, { useCallback, useEffect, useMemo } from 'react';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Padded, Spacer, VerticalSplit } from '../Components/CoreUI';
import {
  OpenBroadcastPaneButton,
  OpenClaimPlanetPane,
  OpenHatPaneButton,
  OpenManagePlanetArtifactsButton,
  OpenUpgradeDetailsPaneButton,
} from '../Components/OpenPaneButtons';
import { SelectedPlanetHelpContent } from '../Copy/HelpContent';
import { useAccount, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { ModalHandle, ModalHook, ModalPane } from '../Views/ModalPane';
import { PlanetCard, PlanetCardTitle } from '../Views/PlanetCard';
import { getNotifsForPlanet, PlanetNotifications } from '../Views/PlanetNotifications';
import { SendResources } from '../Views/SendResources';

function PlanetContextPaneContent({
  modal,
  planet,
  uiManager,
}: {
  modal: ModalHandle;
  planet: Wrapper<Planet | undefined>;
  uiManager: GameUIManager;
}) {
  const account = useAccount(uiManager);
  const currentBlockNumber = useEmitterValue(uiManager.getEthConnection().blockNumber$, undefined);
  const notifs = useMemo(
    () => getNotifsForPlanet(planet.value, account, currentBlockNumber),
    [planet, account, currentBlockNumber]
  );
  const owned = planet.value?.owner === account;
  // const isPost = planet.value?.planetType === PlanetType.TRADING_POST;

  useEffect(() => {
    if (!planet.value) modal.popAll();
  }, [planet.value, modal]);

  return (
    <Padded style={{ width: '350px' }}>
      <PlanetCard planetWrapper={planet} />
      {owned && (
        <>
          <SendResources planetWrapper={planet} />
        </>
      )}
      {/* disabled in round 3 */}
      {/* {owned && isPost && (
        <>
          <Padded>
            <WithdrawSilver wrapper={planet} />
          </Padded>
        </>
      )} */}

      <VerticalSplit>
        {[
          <Padded right='4px' left='0' key={'left'}>
            {owned && (
              <>
                <OpenUpgradeDetailsPaneButton modal={modal} planetId={planet.value?.locationId} />
                <Spacer height={8} />
                <OpenClaimPlanetPane modal={modal} planetId={planet.value?.locationId} />
                <Spacer height={8} />
              </>
            )}
            <OpenBroadcastPaneButton modal={modal} planetId={planet.value?.locationId} />
          </Padded>,
          <Padded right='0' left='4px' key={'right'}>
            {owned && (
              <>
                <OpenManagePlanetArtifactsButton
                  modal={modal}
                  planetId={planet.value?.locationId}
                />
                <Spacer height={8} />
                <OpenHatPaneButton modal={modal} planetId={planet.value?.locationId} />
              </>
            )}
          </Padded>,
        ]}
      </VerticalSplit>
      {notifs.length > 0 && <PlanetNotifications planet={planet} notifs={notifs} />}
    </Padded>
  );
}

export function PlanetContextPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const planet = useSelectedPlanet(uiManager);

  const render = useCallback(
    (modal: ModalHandle) => (
      <PlanetContextPaneContent modal={modal} planet={planet} uiManager={uiManager} />
    ),
    [uiManager, planet]
  );

  return (
    <ModalPane
      hook={hook}
      title={(small: boolean) => <PlanetCardTitle small={small} planet={planet} />}
      hideClose
      noPadding
      helpContent={SelectedPlanetHelpContent}
    >
      {render}
    </ModalPane>
  );
}
