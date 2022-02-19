import { AutoGasSetting, TooltipName } from '@darkforest_eth/types';
import React from 'react';
import { Spread } from '../Components/CoreUI';
import { Sub, Text } from '../Components/Text';
import { TooltipTrigger } from '../Panes/Tooltip';
import { useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';

export function NetworkHealth() {
  const uiManager = useUIManager();
  const networkHealth = useEmitterValue(uiManager.getGameManager().networkHealth$, undefined);

  if (!networkHealth || networkHealth.length === 0) {
    return <></>;
  }

  return (
    <>
      <br />
      <TooltipTrigger name={TooltipName.NetworkHealth}>
        <Spread style={{ width: '100%' }}>
          {networkHealth &&
            Object.values(AutoGasSetting)
              .map((setting) => networkHealth.find((entry) => entry[0] === setting))
              .map(
                (entry) =>
                  entry && (
                    <NetworkHealthForGasSetting
                      key={entry[0]}
                      setting={entry[0]}
                      confirmationWaitTime={entry[1]}
                    />
                  )
              )}
        </Spread>
      </TooltipTrigger>
    </>
  );
}

const SettingNames = {
  [AutoGasSetting.Average]: 'avg',
  [AutoGasSetting.Slow]: 'slo',
  [AutoGasSetting.Fast]: 'fst',
};

function NetworkHealthForGasSetting({
  setting,
  confirmationWaitTime,
}: {
  setting: AutoGasSetting;
  confirmationWaitTime: number;
}) {
  return (
    <Sub>
      {SettingNames[setting]}: <Text>{(confirmationWaitTime / 1000).toFixed(2)}s</Text>
    </Sub>
  );
}
