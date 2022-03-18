import { monomitter, Monomitter } from '@darkforest_eth/events';
import { AutoGasSetting, EthAddress, Setting } from '@darkforest_eth/types';
import React, { useCallback, useState } from 'react';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { SelectFrom } from '../Components/CoreUI';
import {
  Checkbox,
  ColorInput,
  DarkForestCheckbox,
  DarkForestColorInput,
  DarkForestNumberInput,
  DarkForestTextInput,
  NumberInput,
  TextInput,
} from '../Components/Input';
import { useEmitterSubscribe } from './EmitterHooks';

/**
 * Whenever a setting changes, we publish the setting's name to this event emitter.
 */
export const settingChanged$: Monomitter<Setting> = monomitter();

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
  [Setting.OptOutMetrics]: onlyInDevelopment(),
  [Setting.AutoApproveNonPurchaseTransactions]: onlyInDevelopment(),
  [Setting.DrawChunkBorders]: 'false',
  [Setting.HighPerformanceRendering]: 'false',
  [Setting.MoveNotifications]: 'true',
  [Setting.HasAcceptedPluginRisk]: onlyInDevelopment(),
  [Setting.GasFeeGwei]: AutoGasSetting.Average,
  [Setting.TerminalVisible]: 'true',
  [Setting.TutorialOpen]: onlyInProduction(),

  [Setting.FoundPirates]: 'false',
  [Setting.TutorialCompleted]: 'false',
  [Setting.FoundSilver]: 'false',
  [Setting.FoundSilverBank]: 'false',
  [Setting.FoundTradingPost]: 'false',
  [Setting.FoundComet]: 'false',
  [Setting.FoundArtifact]: 'false',
  [Setting.FoundDeepSpace]: 'false',
  [Setting.FoundSpace]: 'false',
  // prevent the tutorial and help pane popping up in development mode.
  [Setting.NewPlayer]: onlyInProduction(),
  [Setting.MiningCores]: '1',
  [Setting.IsMining]: 'true',
  [Setting.DisableDefaultShortcuts]: 'false',
  [Setting.ExperimentalFeatures]: 'false',
  [Setting.DisableEmojiRendering]: 'false',
  [Setting.DisableHatRendering]: 'false',
  [Setting.AutoClearConfirmedTransactionsAfterSeconds]: '-1',
  [Setting.AutoClearRejectedTransactionsAfterSeconds]: '-1',
  [Setting.DisableFancySpaceEffect]: 'false',
  [Setting.RendererColorInnerNebula]: '#186469',
  [Setting.RendererColorNebula]: '#0B2B5B',
  [Setting.RendererColorSpace]: '#0B0F34',
  [Setting.RendererColorDeepSpace]: '#0B061F',
  [Setting.RendererColorDeadSpace]: '#11291b',
  [Setting.ForceReloadEmbeddedPlugins]: 'false',
};

interface SettingStorageConfig {
  contractAddress: EthAddress;
  account: EthAddress | undefined;
}

/**
 * Each setting is stored in local storage. Each account has their own setting.
 */
export function getLocalStorageSettingKey(
  { contractAddress, account }: SettingStorageConfig,
  setting: Setting
): string {
  if (account === undefined) {
    return contractAddress + ':anonymous:' + setting;
  }

  return contractAddress + ':' + account + ':' + setting;
}

/**
 * Read the local storage setting from local storage.
 */
export function getSetting(config: SettingStorageConfig, setting: Setting): string {
  const key = getLocalStorageSettingKey(config, setting);

  let valueInStorage = localStorage.getItem(key);

  if (valueInStorage === null) {
    valueInStorage = defaultSettings[setting];
  }

  return valueInStorage;
}

/**
 * Save the given setting to local storage. Publish an event to {@link settingChanged$}.
 */
export function setSetting(
  { contractAddress, account }: SettingStorageConfig,
  setting: Setting,
  value: string
): void {
  const keyInLocalStorage =
    account && getLocalStorageSettingKey({ contractAddress, account }, setting);
  if (keyInLocalStorage === undefined || account === undefined) {
    return;
  }

  localStorage.setItem(keyInLocalStorage, value);
  settingChanged$.publish(setting);
}

/**
 * Loads from local storage, and interprets as a boolean the setting with the given name.
 */
export function getBooleanSetting(config: SettingStorageConfig, setting: Setting): boolean {
  const value = getSetting(config, setting);
  return value === 'true';
}

/**
 * Save the given setting to local storage. Publish an event to {@link settingChanged$}.
 */
export function setBooleanSetting(config: SettingStorageConfig, setting: Setting, value: boolean) {
  setSetting(config, setting, value + '');
}

/**
 * Loads from local storage, and interprets as a boolean the setting with the given name.
 */
export function getNumberSetting(config: SettingStorageConfig, setting: Setting): number {
  const value = getSetting(config, setting);
  const parsedValue = parseFloat(value);

  if (isNaN(parsedValue)) {
    return parseFloat(defaultSettings[setting]);
  }

  return parsedValue;
}

/**
 * Save the given setting to local storage. Publish an event to {@link settingChanged$}.
 */
export function setNumberSetting(config: SettingStorageConfig, setting: Setting, value: number) {
  setSetting(config, setting, value + '');
}

/**
 * Allows a react component to subscribe to changes and set the given setting.
 */
export function useSetting(
  uiManager: GameUIManager,
  setting: Setting
): [string, (newValue: string | undefined) => void] {
  const contractAddress = uiManager.getContractAddress();
  const account = uiManager.getAccount();
  const config = { contractAddress, account };
  const [settingValue, setSettingValue] = useState(() => getSetting(config, setting));

  useEmitterSubscribe(
    settingChanged$,
    (changedSetting: Setting) => {
      if (changedSetting === setting) {
        setSettingValue(getSetting(config, changedSetting));
      }
    },
    [setting, setSettingValue, getSetting]
  );

  return [
    settingValue,
    (newValue: string) => {
      setSetting(config, setting, newValue);
    },
  ];
}

export function StringSetting({
  uiManager,
  setting,
  settingDescription,
}: {
  uiManager: GameUIManager;
  setting: Setting;
  settingDescription?: string;
}) {
  const [settingValue, setSettingValue] = useSetting(uiManager, setting);
  const onChange = useCallback(
    (e: Event & React.ChangeEvent<DarkForestTextInput>) => {
      setSettingValue(e.target.value);
    },
    [setSettingValue]
  );
  return (
    <>
      {settingDescription}
      <br />
      <TextInput value={settingValue} onChange={onChange} />
    </>
  );
}

export function ColorSetting({
  uiManager,
  setting,
  settingDescription,
}: {
  uiManager: GameUIManager;
  setting: Setting;
  settingDescription?: string;
}) {
  const [settingValue, setSettingValue] = useSetting(uiManager, setting);
  const onChange = useCallback(
    (e: Event & React.ChangeEvent<DarkForestColorInput>) => {
      setSettingValue(e.target.value);
    },
    [setSettingValue]
  );
  return (
    <>
      {settingDescription}
      <br />
      <ColorInput value={settingValue} onChange={onChange} />
    </>
  );
}

/**
 * Allows a react component to subscribe to changes and set the given setting as a number. Doesn't
 * allow you to set the value of this setting to anything but a valid number.
 */
export function useNumberSetting(
  uiManager: GameUIManager,
  setting: Setting
): [number, (newValue: number) => void] {
  const [stringSetting, setStringSetting] = useSetting(uiManager, setting);
  let parsedNumber = parseInt(stringSetting, 10);

  if (isNaN(parsedNumber)) {
    parsedNumber = 0;
  }

  return [
    parsedNumber,
    (newValue: number) => {
      setStringSetting(newValue + '');
    },
  ];
}

/**
 * Allows a react component to subscribe to changes to the given setting, interpreting its value as
 * a boolean.
 */
export function useBooleanSetting(
  uiManager: GameUIManager,
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
    <Checkbox
      label={settingDescription}
      checked={settingValue}
      onChange={(e: Event & React.ChangeEvent<DarkForestCheckbox>) =>
        setSettingValue(e.target.checked)
      }
    />
  );
}

export function NumberSetting({
  uiManager,
  setting,
}: {
  uiManager: GameUIManager;
  setting: Setting;
}) {
  const [settingValue, setSettingValue] = useNumberSetting(uiManager, setting);

  return (
    <NumberInput
      format='float'
      value={settingValue}
      onChange={(e: Event & React.ChangeEvent<DarkForestNumberInput>) => {
        if (e.target.value) {
          setSettingValue(e.target.value);
        }
      }}
    />
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
 * Some settings can be set from another browser window. In particular, the 'auto accept
 * transaction' setting is set from multiple browser windows. As a result, the local storage setting
 * can get out of sync with the in memory setting. To fix this, we can poll the given setting from
 * local storage, and notify the rest of the game that it changed if it changed.
 */
export function pollSetting(
  config: SettingStorageConfig,
  setting: Setting
): ReturnType<typeof setInterval> {
  const SETTING_POLL_INTERVAL = 1000;
  const value = getSetting(config, setting);

  return setInterval(() => {
    const newValue = getSetting(config, setting);

    if (value !== newValue) {
      settingChanged$.publish(setting);
    }
  }, SETTING_POLL_INTERVAL);
}
