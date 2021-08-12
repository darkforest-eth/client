# Module: Frontend/Utils/SettingsHooks

## Table of contents

### Enumerations

- [Setting](../enums/Frontend_Utils_SettingsHooks.Setting.md)

### Variables

- [ALL_AUTO_GAS_SETTINGS](Frontend_Utils_SettingsHooks.md#all_auto_gas_settings)
- [settingChanged$](Frontend_Utils_SettingsHooks.md#settingchanged$)

### Functions

- [BooleanSetting](Frontend_Utils_SettingsHooks.md#booleansetting)
- [MultiSelectSetting](Frontend_Utils_SettingsHooks.md#multiselectsetting)
- [getBooleanSetting](Frontend_Utils_SettingsHooks.md#getbooleansetting)
- [getLocalStorageSettingKey](Frontend_Utils_SettingsHooks.md#getlocalstoragesettingkey)
- [getNumberSetting](Frontend_Utils_SettingsHooks.md#getnumbersetting)
- [getSetting](Frontend_Utils_SettingsHooks.md#getsetting)
- [pollSetting](Frontend_Utils_SettingsHooks.md#pollsetting)
- [setBooleanSetting](Frontend_Utils_SettingsHooks.md#setbooleansetting)
- [setNumberSetting](Frontend_Utils_SettingsHooks.md#setnumbersetting)
- [setSetting](Frontend_Utils_SettingsHooks.md#setsetting)
- [useBooleanSetting](Frontend_Utils_SettingsHooks.md#usebooleansetting)
- [useSetting](Frontend_Utils_SettingsHooks.md#usesetting)

## Variables

### ALL_AUTO_GAS_SETTINGS

• `Const` **ALL_AUTO_GAS_SETTINGS**: `AutoGasSetting`[]

---

### settingChanged$

• `Const` **settingChanged$**: `Monomitter`<[`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md)\>

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
| `__namedParameters.setting`             | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md)      |
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
| `__namedParameters.setting`   | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md)      |
| `__namedParameters.style?`    | `React.CSSProperties`                                              |
| `__namedParameters.uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) |
| `__namedParameters.values`    | `string`[]                                                         |
| `__namedParameters.wide?`     | `boolean`                                                          |

#### Returns

`Element`

---

### getBooleanSetting

▸ **getBooleanSetting**(`account`, `setting`): `boolean`

Loads from local storage, and interprets as a boolean the setting with the given name.

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | `EthAddress` \| `undefined`                                   |
| `setting` | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md) |

#### Returns

`boolean`

---

### getLocalStorageSettingKey

▸ **getLocalStorageSettingKey**(`account`, `setting`): `string`

Each setting is stored in local storage. Each account has their own setting.

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | `EthAddress` \| `undefined`                                   |
| `setting` | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md) |

#### Returns

`string`

---

### getNumberSetting

▸ **getNumberSetting**(`account`, `setting`): `number`

Loads from local storage, and interprets as a boolean the setting with the given name.

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | `EthAddress` \| `undefined`                                   |
| `setting` | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md) |

#### Returns

`number`

---

### getSetting

▸ **getSetting**(`account`, `setting`): `string`

Read the local storage setting from local storage.

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | `EthAddress` \| `undefined`                                   |
| `setting` | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md) |

#### Returns

`string`

---

### pollSetting

▸ **pollSetting**(`account`, `setting`): `ReturnType`<typeof `setInterval`\>

Some settings can be set from another window. In particular, the 'auto accept transaction'
setting is set from multiple windows. As a result, the local storage setting can get out of sync
with the in memory setting. To fix this, we can poll the given setting from local storage, and
notify the rest of the game that it changed if it changed.

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | `EthAddress` \| `undefined`                                   |
| `setting` | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md) |

#### Returns

`ReturnType`<typeof `setInterval`\>

---

### setBooleanSetting

▸ **setBooleanSetting**(`account`, `setting`, `value`): `void`

Save the given setting to local storage. Publish an event to [settingChanged$](Frontend_Utils_SettingsHooks.md#settingchanged$).

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | `EthAddress` \| `undefined`                                   |
| `setting` | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md) |
| `value`   | `boolean`                                                     |

#### Returns

`void`

---

### setNumberSetting

▸ **setNumberSetting**(`account`, `setting`, `value`): `void`

Save the given setting to local storage. Publish an event to [settingChanged$](Frontend_Utils_SettingsHooks.md#settingchanged$).

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | `EthAddress` \| `undefined`                                   |
| `setting` | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md) |
| `value`   | `number`                                                      |

#### Returns

`void`

---

### setSetting

▸ **setSetting**(`account`, `setting`, `value`): `void`

Save the given setting to local storage. Publish an event to [settingChanged$](Frontend_Utils_SettingsHooks.md#settingchanged$).

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | `EthAddress` \| `undefined`                                   |
| `setting` | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md) |
| `value`   | `string`                                                      |

#### Returns

`void`

---

### useBooleanSetting

▸ **useBooleanSetting**(`uiManager`, `setting`): [`boolean`, (`newValue`: `boolean`) => `void`]

Allows a react component to subscribe to changes to the given setting, interpreting its value as
a boolean.

#### Parameters

| Name        | Type                                                                              |
| :---------- | :-------------------------------------------------------------------------------- |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) \| `undefined` |
| `setting`   | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md)                     |

#### Returns

[`boolean`, (`newValue`: `boolean`) => `void`]

---

### useSetting

▸ **useSetting**(`uiManager`, `setting`): [`string`, (`newValue`: `string` \| `undefined`) => `void`]

Allows a react component to subscribe to changes to the give setting.

#### Parameters

| Name        | Type                                                                              |
| :---------- | :-------------------------------------------------------------------------------- |
| `uiManager` | [`default`](../classes/Backend_GameLogic_GameUIManager.default.md) \| `undefined` |
| `setting`   | [`Setting`](../enums/Frontend_Utils_SettingsHooks.Setting.md)                     |

#### Returns

[`string`, (`newValue`: `string` \| `undefined`) => `void`]
