import { Planet, PlanetType } from '@darkforest_eth/types';
import React, { useCallback, useEffect, useMemo } from 'react';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { Padded, Spacer, VerticalSplit } from '../Components/CoreUI';
import {
  OpenBroadcastPaneButton,
  OpenHatPaneButton,
  OpenManagePlanetArtifactsButton,
  OpenUpgradeDetailsPaneButton,
} from '../Components/OpenPaneButtons';
import { useAccount, useSelectedPlanet, useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { ModalHandle, ModalHook, ModalPane } from '../Views/ModalPane';
import { PlanetCard, PlanetCardTitle } from '../Views/PlanetCard';
import { getNotifsForPlanet, PlanetNotifications } from '../Views/PlanetNotifications';
import { SendResources } from '../Views/SendResources';
import { WithdrawSilver } from '../Views/WithdrawSilver';

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

  useEffect(() => {
    if (!planet.value) modal.popAll();
  }, [planet.value, modal]);

  return (
    <Padded>
      <PlanetCard planetWrapper={planet} />
      {owned && <SendResources planetWrapper={planet} />}

      <VerticalSplit>
        {[
          <Padded right='4px' left='0' key={'left'}>
            {owned && (
              <>
                <OpenUpgradeDetailsPaneButton
                  modal={modal}
                  planetId={planet.value?.locationId}
                  shortcutDisabled={!modal.isActive}
                />
                <Spacer height={8} />
              </>
            )}
            <OpenBroadcastPaneButton
              modal={modal}
              planetId={planet.value?.locationId}
              shortcutDisabled={!modal.isActive}
            />
          </Padded>,
          <Padded right='0' left='4px' key={'right'}>
            <OpenManagePlanetArtifactsButton
              modal={modal}
              planetId={planet.value?.locationId}
              shortcutDisabled={!modal.isActive}
            />
            {owned && (
              <>
                <Spacer height={8} />
                <OpenHatPaneButton
                  modal={modal}
                  planetId={planet.value?.locationId}
                  shortcutDisabled={!modal.isActive}
                />
              </>
            )}
          </Padded>,
        ]}
      </VerticalSplit>
      {owned && planet.value?.planetType === PlanetType.TRADING_POST && (
        <WithdrawSilver wrapper={planet} />
      )}
      {notifs.length > 0 && <PlanetNotifications planet={planet} notifs={notifs} />}
    </Padded>
  );
}

export function SelectedPlanetHelpContent() {
  return (
    <div>
      <p>
        This pane allows you to interact with the currently selected planet. Pressing the ESCAPE key
        allows you to deselect the current planet.
      </p>
    </div>
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
      width={'350px'}
    >
      {render}
    </ModalPane>
  );
}
