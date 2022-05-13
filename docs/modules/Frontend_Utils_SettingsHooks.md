# Module: Frontend/Utils/SettingsHooks

## Table of contents

### Variables

- [ALL_AUTO_GAS_SETTINGS](Frontend_Utils_SettingsHooks.md#all_auto_gas_settings)
- [settingChanged$](Frontend_Utils_SettingsHooks.md#settingchanged$)

### Functions

- [BooleanSetting](Frontend_Utils_SettingsHooks.md#booleansetting)
- [ColorSetting](Frontend_Utils_SettingsHooks.md#colorsetting)
- [MultiSelectSetting](Frontend_Utils_SettingsHooks.md#multiselectsetting)
- [NumberSetting](Frontend_Utils_SettingsHooks.md#numbersetting)
- [StringSetting](Frontend_Utils_SettingsHooks.md#stringsetting)
- [getBooleanSetting](Frontend_Utils_SettingsHooks.md#getbooleansetting)
- [getLocalStorageSettingKey](Frontend_Utils_SettingsHooks.md#getlocalstoragesettingkey)
- [getNumberSetting](Frontend_Utils_SettingsHooks.md#getnumbersetting)
- [getSetting](Frontend_Utils_SettingsHooks.md#getsetting)
- [pollSetting](Frontend_Utils_SettingsHooks.md#pollsetting)
- [setBooleanSetting](Frontend_Utils_SettingsHooks.md#setbooleansetting)
- [setNumberSetting](Frontend_Utils_SettingsHooks.md#setnumbersetting)
- [setSetting](Frontend_Utils_SettingsHooks.md#setsetting)
- [useBooleanSetting](Frontend_Utils_SettingsHooks.md#usebooleansetting)
- [useNumberSetting](Frontend_Utils_SettingsHooks.md#usenumbersetting)
- [useSetting](Frontend_Utils_SettingsHooks.md#usesetting)

## Variables

### ALL_AUTO_GAS_SETTINGS

• `Const` **ALL_AUTO_GAS_SETTINGS**: `AutoGasSetting`[]

---

### settingChanged$

• `Const` **settingChanged$**: `Monomitter`<`Setting`\>

Whenever a setting changes, we publish the setting's name to this event emitter.

## Functions

### BooleanSetting

▸ **BooleanSetting**(`__namedParameters`): `Element`

React component that renders a checkbox representing the current value of this particular
setting, interpreting its value as a boolean. Allows the player to click on the checkbox to
toggle the setting. Toggling the setting both notifies the rest of the game that the given
setting was changed, and also saves it to local storage.

#### Parameters

| Name                                    | Type                                                               |
| :-------------------------------------- | :----------------------------------------------------------------- |
| `__namedParameters`                     | `Object`                                                           |
| `__namedParameters.setting`             | `Setting`                                                          |
| `__namedParameters.settingDescription?` | `string`                                                           |
| `__namedParameters.uiManager`           | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |

#### Returns

`Element`

---

### ColorSetting

▸ **ColorSetting**(`__namedParameters`): `Element`

#### Parameters

| Name                                    | Type                                                               |
| :-------------------------------------- | :----------------------------------------------------------------- |
| `__namedParameters`                     | `Object`                                                           |
| `__namedParameters.setting`             | `Setting`                                                          |
| `__namedParameters.settingDescription?` | `string`                                                           |
| `__namedParameters.uiManager`           | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |

#### Returns

`Element`

---

### MultiSelectSetting

▸ **MultiSelectSetting**(`__namedParameters`): `Element`

UI that is kept in-sync with a particular setting which allows you to set that setting to one of
several options.

#### Parameters

| Name                          | Type                                                               |
| :---------------------------- | :----------------------------------------------------------------- |
| `__namedParameters`           | `Object`                                                           |
| `__namedParameters.labels`    | `string`[]                                                         |
| `__namedParameters.setting`   | `Setting`                                                          |
| `__namedParameters.style?`    | `CSSProperties`                                                    |
| `__namedParameters.uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |
| `__namedParameters.values`    | `string`[]                                                         |
| `__namedParameters.wide?`     | `boolean`                                                          |

#### Returns

`Element`

---

### NumberSetting

▸ **NumberSetting**(`__namedParameters`): `Element`

#### Parameters

| Name                          | Type                                                               |
| :---------------------------- | :----------------------------------------------------------------- |
| `__namedParameters`           | `Object`                                                           |
| `__namedParameters.setting`   | `Setting`                                                          |
| `__namedParameters.uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |

#### Returns

`Element`

---

### StringSetting

▸ **StringSetting**(`__namedParameters`): `Element`

#### Parameters

| Name                                    | Type                                                               |
| :-------------------------------------- | :----------------------------------------------------------------- |
| `__namedParameters`                     | `Object`                                                           |
| `__namedParameters.setting`             | `Setting`                                                          |
| `__namedParameters.settingDescription?` | `string`                                                           |
| `__namedParameters.uiManager`           | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |

#### Returns

`Element`

---

### getBooleanSetting

▸ **getBooleanSetting**(`config`, `setting`): `boolean`

Loads from local storage, and interprets as a boolean the setting with the given name.

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `config`  | `SettingStorageConfig` |
| `setting` | `Setting`              |

#### Returns

`boolean`

---

### getLocalStorageSettingKey

▸ **getLocalStorageSettingKey**(`__namedParameters`, `setting`): `string`

Each setting is stored in local storage. Each account has their own setting.

#### Parameters

| Name                | Type                   |
| :------------------ | :--------------------- |
| `__namedParameters` | `SettingStorageConfig` |
| `setting`           | `Setting`              |

#### Returns

`string`

---

### getNumberSetting

▸ **getNumberSetting**(`config`, `setting`): `number`

Loads from local storage, and interprets as a boolean the setting with the given name.

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `config`  | `SettingStorageConfig` |
| `setting` | `Setting`              |

#### Returns

`number`

---

### getSetting

▸ **getSetting**(`config`, `setting`): `string`

Read the local storage setting from local storage.

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `config`  | `SettingStorageConfig` |
| `setting` | `Setting`              |

#### Returns

`string`

---

### pollSetting

▸ **pollSetting**(`config`, `setting`): `ReturnType`<typeof `setInterval`\>

Some settings can be set from another browser window. In particular, the 'auto accept
transaction' setting is set from multiple browser windows. As a result, the local storage setting
can get out of sync with the in memory setting. To fix this, we can poll the given setting from
local storage, and notify the rest of the game that it changed if it changed.

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `config`  | `SettingStorageConfig` |
| `setting` | `Setting`              |

#### Returns

`ReturnType`<typeof `setInterval`\>

---

### setBooleanSetting

▸ **setBooleanSetting**(`config`, `setting`, `value`): `void`

Save the given setting to local storage. Publish an event to [settingChanged$](Frontend_Utils_SettingsHooks.md#settingchanged$).

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `config`  | `SettingStorageConfig` |
| `setting` | `Setting`              |
| `value`   | `boolean`              |

#### Returns

`void`

---

### setNumberSetting

▸ **setNumberSetting**(`config`, `setting`, `value`): `void`

Save the given setting to local storage. Publish an event to [settingChanged$](Frontend_Utils_SettingsHooks.md#settingchanged$).

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `config`  | `SettingStorageConfig` |
| `setting` | `Setting`              |
| `value`   | `number`               |

#### Returns

`void`

---

### setSetting

▸ **setSetting**(`__namedParameters`, `setting`, `value`): `void`

Save the given setting to local storage. Publish an event to [settingChanged$](Frontend_Utils_SettingsHooks.md#settingchanged$).

#### Parameters

| Name                | Type                   |
| :------------------ | :--------------------- |
| `__namedParameters` | `SettingStorageConfig` |
| `setting`           | `Setting`              |
| `value`             | `string`               |

#### Returns

`void`

---

### useBooleanSetting

▸ **useBooleanSetting**(`uiManager`, `setting`): [`boolean`, (`newValue`: `boolean`) => `void`]

Allows a react component to subscribe to changes to the given setting, interpreting its value as
a boolean.

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |
| `setting`   | `Setting`                                                          |

#### Returns

[`boolean`, (`newValue`: `boolean`) => `void`]

---

### useNumberSetting

▸ **useNumberSetting**(`uiManager`, `setting`): [`number`, (`newValue`: `number`) => `void`]

Allows a react component to subscribe to changes and set the given setting as a number. Doesn't
allow you to set the value of this setting to anything but a valid number.

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |
| `setting`   | `Setting`                                                          |

#### Returns

[`number`, (`newValue`: `number`) => `void`]

---

### useSetting

▸ **useSetting**(`uiManager`, `setting`): [`string`, (`newValue`: `string` \| `undefined`) => `void`]

Allows a react component to subscribe to changes and set the given setting.

#### Parameters

| Name        | Type                                                               |
| :---------- | :----------------------------------------------------------------- |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |
| `setting`   | `Setting`                                                          |

#### Returns

[`string`, (`newValue`: `string` \| `undefined`) => `void`]
