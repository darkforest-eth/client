# Class: default

[Backend/GameLogic/TutorialManager](../modules/Backend_GameLogic_TutorialManager.md).default

## Hierarchy

- `EventEmitter`

  ↳ **`default`**

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_TutorialManager.default.md#constructor)

### Properties

- [tutorialState](Backend_GameLogic_TutorialManager.default.md#tutorialstate)
- [uiManager](Backend_GameLogic_TutorialManager.default.md#uimanager)
- [instance](Backend_GameLogic_TutorialManager.default.md#instance)

### Methods

- [acceptInput](Backend_GameLogic_TutorialManager.default.md#acceptinput)
- [advance](Backend_GameLogic_TutorialManager.default.md#advance)
- [complete](Backend_GameLogic_TutorialManager.default.md#complete)
- [reset](Backend_GameLogic_TutorialManager.default.md#reset)
- [setTutorialState](Backend_GameLogic_TutorialManager.default.md#settutorialstate)
- [shouldSkipState](Backend_GameLogic_TutorialManager.default.md#shouldskipstate)
- [getInstance](Backend_GameLogic_TutorialManager.default.md#getinstance)

## Constructors

### constructor

• `Private` **new default**(`uiManager`)

#### Parameters

| Name        | Type                                                    |
| :---------- | :------------------------------------------------------ |
| `uiManager` | [`default`](Backend_GameLogic_GameUIManager.default.md) |

#### Overrides

EventEmitter.constructor

## Properties

### tutorialState

• `Private` **tutorialState**: [`TutorialState`](../enums/Backend_GameLogic_TutorialManager.TutorialState.md) = `TutorialState.None`

---

### uiManager

• `Private` **uiManager**: [`default`](Backend_GameLogic_GameUIManager.default.md)

---

### instance

▪ `Static` **instance**: [`default`](Backend_GameLogic_TutorialManager.default.md)

## Methods

### acceptInput

▸ **acceptInput**(`state`): `void`

#### Parameters

| Name    | Type                                                                           |
| :------ | :----------------------------------------------------------------------------- |
| `state` | [`TutorialState`](../enums/Backend_GameLogic_TutorialManager.TutorialState.md) |

#### Returns

`void`

---

### advance

▸ `Private` **advance**(): `void`

#### Returns

`void`

---

### complete

▸ **complete**(): `void`

#### Returns

`void`

---

### reset

▸ **reset**(): `void`

#### Returns

`void`

---

### setTutorialState

▸ `Private` **setTutorialState**(`newState`): `void`

#### Parameters

| Name       | Type                                                                           |
| :--------- | :----------------------------------------------------------------------------- |
| `newState` | [`TutorialState`](../enums/Backend_GameLogic_TutorialManager.TutorialState.md) |

#### Returns

`void`

---

### shouldSkipState

▸ `Private` **shouldSkipState**(`state`): `boolean`

#### Parameters

| Name    | Type                                                                           |
| :------ | :----------------------------------------------------------------------------- |
| `state` | [`TutorialState`](../enums/Backend_GameLogic_TutorialManager.TutorialState.md) |

#### Returns

`boolean`

---

### getInstance

▸ `Static` **getInstance**(`uiManager`): [`default`](Backend_GameLogic_TutorialManager.default.md)

#### Parameters

| Name        | Type                                                    |
| :---------- | :------------------------------------------------------ |
| `uiManager` | [`default`](Backend_GameLogic_GameUIManager.default.md) |

#### Returns

[`default`](Backend_GameLogic_TutorialManager.default.md)
