import { CORE_CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { monomitter, Monomitter } from '@darkforest_eth/events';
import { AutoGasSetting, EthAddress } from '@darkforest_eth/types';
import React, { useState } from 'react';
import styled from 'styled-components';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { SelectFrom } from '../Components/CoreUI';
import { useEmitterSubscribe } from './EmitterHooks';

/**
 * Whenever a setting changes, we publish the setting's name to this event emitter.
 */
export const settingChanged$: Monomitter<Setting> = monomitter();

/**
 * Each setting has a unique identifier. Each account gets to store its own local storage setting,
 * per instance of the dark forest contract that it's connected to.
 */

export const enum Setting {
  OptOutMetrics = 'OptOutMetrics',
  AutoApproveNonPurchaseTransactions = 'AutoApproveNonPurchaseTransactions',
  DrawChunkBorders = 'DrawChunkBorders',
  HighPerformanceRendering = 'HighPerformanceRendering',
  MoveNotifications = 'MoveNotifications',
  GasFeeGwei = 'GasFeeGwei',
  TerminalVisible = 'TerminalVisible',
  HasAcceptedPluginRisk = 'HasAcceptedPluginRisk',

  FoundPirates = 'FoundPirates',
  TutorialCompleted = 'TutorialCompleted',
  FoundSilver = 'FoundSilver',
  FoundSilverBank = 'FoundSilverBank',
  FoundTradingPost = 'FoundTradingPost',
  FoundComet = 'FoundComet',
  FoundArtifact = 'FoundArtifact',
  FoundDeepSpace = 'FoundDeepSpace',
  FoundSpace = 'FoundSpace',
  NewPlayer = 'NewPlayer',
  MiningCores = 'MiningCores',
  TutorialOpen = 'TutorialOpen',
  IsMining = 'IsMining',
  DisableDefaultShortcuts = 'DisableDefaultShortcuts',
  ExperimentalFeatures = 'ExperimentalFeatures',
}

export const ALL_AUTO_GAS_SETTINGS = [
  AutoGasSetting.Slow,
  AutoGasSetting.Average,
  AutoGasSetting.Fast,
];

function onlyInProduction(): string {
  return process.env.NODE_ENV === 'production' ? 'true' : 'false';
}

function onlyInDevelopment(): string {
  return process.env.NODE_ENV !== 'production' ? 'true' : 'false';
}

const defaultSettings: Record<Setting, string> = {
  OptOutMetrics: onlyInDevelopment(),
  AutoApproveNonPurchaseTransactions: onlyInDevelopment(),
  DrawChunkBorders: 'false',
  HighPerformanceRendering: 'false',
  MoveNotifications: 'true',
  HasAcceptedPluginRisk: onlyInDevelopment(),
  GasFeeGwei: AutoGasSetting.Average,
  TerminalVisible: 'true',
  TutorialOpen: onlyInProduction(),

  FoundPirates: 'false',
  TutorialCompleted: 'false',
  FoundSilver: 'false',
  FoundSilverBank: 'false',
  FoundTradingPost: 'false',
  FoundComet: 'false',
  FoundArtifact: 'false',
  FoundDeepSpace: 'false',
  FoundSpace: 'false',
  // prevent the tutorial and help pane popping up in development mode.
  NewPlayer: onlyInProduction(),
  MiningCores: '1',
  IsMining: 'true',
  DisableDefaultShortcuts: 'false',
  ExperimentalFeatures: 'false',
};

/**
 * Each setting is stored in local storage. Each account has their own setting.
 */
export function getLocalStorageSettingKey(
  account: EthAddress | undefined,
  setting: Setting
): string {
  if (account === undefined) {
    return CORE_CONTRACT_ADDRESS + ':anonymous:' + setting;
  }

  return CORE_CONTRACT_ADDRESS + ':' + account + ':' + setting;
}

/**
 * Read the local storage setting from local storage.
 */
export function getSetting(account: EthAddress | undefined, setting: Setting): string {
  const key = getLocalStorageSettingKey(account, setting);

  let valueInStorage = localStorage.getItem(key);

  if (valueInStorage === null) {
    valueInStorage = defaultSettings[setting];
  }

  return valueInStorage;
}

/**
 * Save the given setting to local storage. Publish an event to {@link settingChanged$}.
 */
export function setSetting(account: EthAddress | undefined, setting: Setting, value: string): void {
  const keyInLocalStorage = account && getLocalStorageSettingKey(account, setting);
  if (keyInLocalStorage === undefined || account === undefined) {
    return;
  }

  localStorage.setItem(keyInLocalStorage, value);
  settingChanged$.publish(setting);
}

/**
 * Loads from local storage, and interprets as a boolean the setting with the given name.
 */
export function getBooleanSetting(account: EthAddress | undefined, setting: Setting): boolean {
  const value = getSetting(account, setting);
  return value === 'true';
}

/**
 * Save the given setting to local storage. Publish an event to {@link settingChanged$}.
 */
export function setBooleanSetting(
  account: EthAddress | undefined,
  setting: Setting,
  value: boolean
) {
  setSetting(account, setting, value + '');
}

/**
 * Loads from local storage, and interprets as a boolean the setting with the given name.
 */
export function getNumberSetting(account: EthAddress | undefined, setting: Setting): number {
  const value = getSetting(account, setting);
  const parsedValue = parseFloat(value);

  if (isNaN(parsedValue)) {
    return parseFloat(defaultSettings[setting]);
  }

  return parsedValue;
}

/**
 * Save the given setting to local storage. Publish an event to {@link settingChanged$}.
 */
export function setNumberSetting(account: EthAddress | undefined, setting: Setting, value: number) {
  setSetting(account, setting, value + '');
}

/**
 * Allows a react component to subscribe to changes to the give setting.
 */
export function useSetting(
  uiManager: GameUIManager | undefined,
  setting: Setting
): [string, (newValue: string | undefined) => void] {
  const account = uiManager?.getAccount();
  const [settingValue, setSettingValue] = useState(() => getSetting(account, setting));

  useEmitterSubscribe(settingChanged$, (changedSetting: Setting) => {
    if (changedSetting === setting) {
      setSettingValue(getSetting(account, changedSetting));
    }
  });

  return [
    settingValue,
    (newValue: string) => {
      setSetting(account, setting, newValue);
    },
  ];
}

/**
 * Allows a react component to subscribe to changes to the given setting, interpreting its value as
 * a boolean.
 */
export function useBooleanSetting(
  uiManager: GameUIManager | undefined,
  setting: Setting
): [boolean, (newValue: boolean) => void] {
  const [stringSetting, setStringSetting] = useSetting(uiManager, setting);
  const booleanValue = stringSetting === 'true';

  return [
    booleanValue,
    (newValue: boolean) => {
      setStringSetting(newValue + '');
    },
  ];
}

/**
 * React component that renders a checkbox representing the current value of this particular
 * setting, interpreting its value as a boolean. Allows the player to click on the checkbox to
 * toggle the setting. Toggling the setting both notifies the rest of the game that the given
 * setting was changed, and also saves it to local storage.
 */
export function BooleanSetting({
  uiManager,
  setting,
  settingDescription,
}: {
  uiManager: GameUIManager;
  setting: Setting;
  settingDescription?: string;
}) {
  const [settingValue, setSettingValue] = useBooleanSetting(uiManager, setting);

  return (
    <>
      <input
        type='checkbox'
        checked={settingValue}
        onChange={(e) => setSettingValue(e.target.checked)}
      />
      {settingDescription !== undefined && (
        <BooleanLabel onClick={() => setSettingValue(!settingValue)}>
          {' ' + settingDescription}
        </BooleanLabel>
      )}
    </>
  );
}

/**
 * UI that is kept in-sync with a particular setting which allows you to set that setting to one of
 * several options.
 */
export function MultiSelectSetting({
  uiManager,
  setting,
  values,
  labels,
  style,
  wide,
}: {
  uiManager: GameUIManager;
  setting: Setting;
  values: string[];
  labels: string[];
  style?: React.CSSProperties;
  wide?: boolean;
}) {
  const [settingValue, setSettingValue] = useSetting(uiManager, setting);

  return (
    <SelectFrom
      wide={wide}
      style={style}
      values={values}
      labels={labels}
      value={settingValue}
      setValue={setSettingValue}
    />
  );
}

/**
 * Clicking on the label also toggles a boolean setting. This is sometimes more convenient than
 * clicking on the tiny checkbox.
 */
const BooleanLabel = styled.span`
  cursor: pointer;
  user-select: none;
`;

/**
 * Some settings can be set from another window. In particular, the 'auto accept transaction'
 * setting is set from multiple windows. As a result, the local storage setting can get out of sync
 * with the in memory setting. To fix this, we can poll the given setting from local storage, and
 * notify the rest of the game that it changed if it changed.
 */
export function pollSetting(
  account: EthAddress | undefined,
  setting: Setting
): ReturnType<typeof setInterval> {
  const SETTING_POLL_INTERVAL = 1000;
  const value = getSetting(account, setting);

  return setInterval(() => {
    const newValue = getSetting(account, setting);

    if (value !== newValue) {
      settingChanged$.publish(setting);
    }
  }, SETTING_POLL_INTERVAL);
}
