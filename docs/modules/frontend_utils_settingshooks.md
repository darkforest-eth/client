# Module: Frontend/Utils/SettingsHooks

## Table of contents

### Enumerations

- [Setting](../enums/frontend_utils_settingshooks.setting.md)

### Variables

- [settingChanged$](frontend_utils_settingshooks.md#settingchanged$)

### Functions

- [BooleanSetting](frontend_utils_settingshooks.md#booleansetting)
- [MultiSelectSetting](frontend_utils_settingshooks.md#multiselectsetting)
- [getBooleanSetting](frontend_utils_settingshooks.md#getbooleansetting)
- [getLocalStorageSettingKey](frontend_utils_settingshooks.md#getlocalstoragesettingkey)
- [getNumberSetting](frontend_utils_settingshooks.md#getnumbersetting)
- [getSetting](frontend_utils_settingshooks.md#getsetting)
- [pollSetting](frontend_utils_settingshooks.md#pollsetting)
- [setBooleanSetting](frontend_utils_settingshooks.md#setbooleansetting)
- [setNumberSetting](frontend_utils_settingshooks.md#setnumbersetting)
- [setSetting](frontend_utils_settingshooks.md#setsetting)
- [useBooleanSetting](frontend_utils_settingshooks.md#usebooleansetting)
- [useSetting](frontend_utils_settingshooks.md#usesetting)

## Variables

### settingChanged$

• `Const` **settingChanged$**: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<[_Setting_](../enums/frontend_utils_settingshooks.setting.md)\>

Whenever a setting changes, we publish the setting's name to this event emitter.

## Functions

### BooleanSetting

▸ **BooleanSetting**(`__namedParameters`: { `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md) ; `settingDescription?`: _string_ ; `uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md) }): _Element_

React component that renders a checkbox representing the current value of this particular
setting, interpreting its value as a boolean. Allows the player to click on the checkbox to
toggle the setting. Toggling the setting both notifies the rest of the game that the given
setting was changed, and also saves it to local storage.

#### Parameters

| Name                                    | Type                                                               |
| :-------------------------------------- | :----------------------------------------------------------------- |
| `__namedParameters`                     | _object_                                                           |
| `__namedParameters.setting`             | [_Setting_](../enums/frontend_utils_settingshooks.setting.md)      |
| `__namedParameters.settingDescription?` | _string_                                                           |
| `__namedParameters.uiManager`           | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) |

**Returns:** _Element_

---

### MultiSelectSetting

▸ **MultiSelectSetting**(`__namedParameters`: { `labels`: _string_[] ; `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md) ; `style?`: React.CSSProperties ; `uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md) ; `values`: _string_[] }): _Element_

UI that is kept in-sync with a particular setting which allows you to set that setting to one of
several options.

#### Parameters

| Name                          | Type                                                               |
| :---------------------------- | :----------------------------------------------------------------- |
| `__namedParameters`           | _object_                                                           |
| `__namedParameters.labels`    | _string_[]                                                         |
| `__namedParameters.setting`   | [_Setting_](../enums/frontend_utils_settingshooks.setting.md)      |
| `__namedParameters.style?`    | React.CSSProperties                                                |
| `__namedParameters.uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) |
| `__namedParameters.values`    | _string_[]                                                         |

**Returns:** _Element_

---

### getBooleanSetting

▸ **getBooleanSetting**(`account`: EthAddress \| _undefined_, `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md)): _boolean_

Loads from local storage, and interprets as a boolean the setting with the given name.

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | EthAddress \| _undefined_                                     |
| `setting` | [_Setting_](../enums/frontend_utils_settingshooks.setting.md) |

**Returns:** _boolean_

---

### getLocalStorageSettingKey

▸ **getLocalStorageSettingKey**(`account`: EthAddress \| _undefined_, `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md)): _string_

Each setting is stored in local storage. Each account has their own setting.

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | EthAddress \| _undefined_                                     |
| `setting` | [_Setting_](../enums/frontend_utils_settingshooks.setting.md) |

**Returns:** _string_

---

### getNumberSetting

▸ **getNumberSetting**(`account`: EthAddress \| _undefined_, `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md)): _number_

Loads from local storage, and interprets as a boolean the setting with the given name.

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | EthAddress \| _undefined_                                     |
| `setting` | [_Setting_](../enums/frontend_utils_settingshooks.setting.md) |

**Returns:** _number_

---

### getSetting

▸ **getSetting**(`account`: EthAddress \| _undefined_, `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md)): _string_

Read the local storage setting from local storage.

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | EthAddress \| _undefined_                                     |
| `setting` | [_Setting_](../enums/frontend_utils_settingshooks.setting.md) |

**Returns:** _string_

---

### pollSetting

▸ **pollSetting**(`account`: EthAddress \| _undefined_, `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md)): _ReturnType_<_typeof_ setInterval\>

Some settings can be set from another window. In particular, the 'auto accept transaction'
setting is set from multiple windows. As a result, the local storage setting can get out of sync
with the in memory setting. To fix this, we can poll the given setting from local storage, and
notify the rest of the game that it changed if it changed.

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | EthAddress \| _undefined_                                     |
| `setting` | [_Setting_](../enums/frontend_utils_settingshooks.setting.md) |

**Returns:** _ReturnType_<_typeof_ setInterval\>

---

### setBooleanSetting

▸ **setBooleanSetting**(`account`: EthAddress \| _undefined_, `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md), `value`: _boolean_): _void_

Save the given setting to local storage. Publish an event to [settingChanged$](frontend_utils_settingshooks.md#settingchanged$).

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | EthAddress \| _undefined_                                     |
| `setting` | [_Setting_](../enums/frontend_utils_settingshooks.setting.md) |
| `value`   | _boolean_                                                     |

**Returns:** _void_

---

### setNumberSetting

▸ **setNumberSetting**(`account`: EthAddress \| _undefined_, `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md), `value`: _number_): _void_

Save the given setting to local storage. Publish an event to [settingChanged$](frontend_utils_settingshooks.md#settingchanged$).

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | EthAddress \| _undefined_                                     |
| `setting` | [_Setting_](../enums/frontend_utils_settingshooks.setting.md) |
| `value`   | _number_                                                      |

**Returns:** _void_

---

### setSetting

▸ **setSetting**(`account`: EthAddress \| _undefined_, `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md), `value`: _string_): _void_

Save the given setting to local storage. Publish an event to [settingChanged$](frontend_utils_settingshooks.md#settingchanged$).

#### Parameters

| Name      | Type                                                          |
| :-------- | :------------------------------------------------------------ |
| `account` | EthAddress \| _undefined_                                     |
| `setting` | [_Setting_](../enums/frontend_utils_settingshooks.setting.md) |
| `value`   | _string_                                                      |

**Returns:** _void_

---

### useBooleanSetting

▸ **useBooleanSetting**(`uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md) \| _undefined_, `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md)): [*boolean*, (`newValue`: *boolean*) => *void*]

Allows a react component to subscribe to changes to the given setting, interpreting its value as
a boolean.

#### Parameters

| Name        | Type                                                                              |
| :---------- | :-------------------------------------------------------------------------------- |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) \| _undefined_ |
| `setting`   | [_Setting_](../enums/frontend_utils_settingshooks.setting.md)                     |

**Returns:** [*boolean*, (`newValue`: *boolean*) => *void*]

---

### useSetting

▸ **useSetting**(`uiManager`: [_default_](../classes/backend_gamelogic_gameuimanager.default.md) \| _undefined_, `setting`: [_Setting_](../enums/frontend_utils_settingshooks.setting.md)): [*string*, (`newValue`: *string* \| *undefined*) => *void*]

Allows a react component to subscribe to changes to the give setting.

#### Parameters

| Name        | Type                                                                              |
| :---------- | :-------------------------------------------------------------------------------- |
| `uiManager` | [_default_](../classes/backend_gamelogic_gameuimanager.default.md) \| _undefined_ |
| `setting`   | [_Setting_](../enums/frontend_utils_settingshooks.setting.md)                     |

**Returns:** [*string*, (`newValue`: *string* \| *undefined*) => *void*]
