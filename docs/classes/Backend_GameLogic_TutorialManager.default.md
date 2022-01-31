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
- [instance](Backend_GameLogic_TutorialManager.default.md#instance)

### Methods

- [acceptInput](Backend_GameLogic_TutorialManager.default.md#acceptinput)
- [advance](Backend_GameLogic_TutorialManager.default.md#advance)
- [complete](Backend_GameLogic_TutorialManager.default.md#complete)
- [reset](Backend_GameLogic_TutorialManager.default.md#reset)
- [setTutorialState](Backend_GameLogic_TutorialManager.default.md#settutorialstate)
- [getInstance](Backend_GameLogic_TutorialManager.default.md#getinstance)

## Constructors

### constructor

• `Private` **new default**()

#### Overrides

EventEmitter.constructor

## Properties

### tutorialState

• `Private` **tutorialState**: [`TutorialState`](../enums/Backend_GameLogic_TutorialManager.TutorialState.md)

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

▸ **complete**(`gameUiManager`): `void`

#### Parameters

| Name            | Type                                                    |
| :-------------- | :------------------------------------------------------ |
| `gameUiManager` | [`default`](Backend_GameLogic_GameUIManager.default.md) |

#### Returns

`void`

---

### reset

▸ **reset**(`account`): `void`

#### Parameters

| Name      | Type                        |
| :-------- | :-------------------------- |
| `account` | `undefined` \| `EthAddress` |

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

### getInstance

▸ `Static` **getInstance**(): [`default`](Backend_GameLogic_TutorialManager.default.md)

#### Returns

[`default`](Backend_GameLogic_TutorialManager.default.md)
