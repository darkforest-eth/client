# Class: default

[Backend/GameLogic/TutorialManager](../modules/backend_gamelogic_tutorialmanager.md).default

## Hierarchy

- _EventEmitter_

  ↳ **default**

## Table of contents

### Constructors

- [constructor](backend_gamelogic_tutorialmanager.default.md#constructor)

### Properties

- [tutorialState](backend_gamelogic_tutorialmanager.default.md#tutorialstate)
- [instance](backend_gamelogic_tutorialmanager.default.md#instance)

### Methods

- [acceptInput](backend_gamelogic_tutorialmanager.default.md#acceptinput)
- [advance](backend_gamelogic_tutorialmanager.default.md#advance)
- [complete](backend_gamelogic_tutorialmanager.default.md#complete)
- [reset](backend_gamelogic_tutorialmanager.default.md#reset)
- [setTutorialState](backend_gamelogic_tutorialmanager.default.md#settutorialstate)
- [getInstance](backend_gamelogic_tutorialmanager.default.md#getinstance)

## Constructors

### constructor

\+ `Private` **new default**(): [_default_](backend_gamelogic_tutorialmanager.default.md)

**Returns:** [_default_](backend_gamelogic_tutorialmanager.default.md)

Overrides: EventEmitter.constructor

## Properties

### tutorialState

• `Private` **tutorialState**: [_TutorialState_](../enums/backend_gamelogic_tutorialmanager.tutorialstate.md)

---

### instance

▪ `Static` **instance**: [_default_](backend_gamelogic_tutorialmanager.default.md)

## Methods

### acceptInput

▸ **acceptInput**(`state`: [_TutorialState_](../enums/backend_gamelogic_tutorialmanager.tutorialstate.md)): _void_

#### Parameters

| Name    | Type                                                                           |
| :------ | :----------------------------------------------------------------------------- |
| `state` | [_TutorialState_](../enums/backend_gamelogic_tutorialmanager.tutorialstate.md) |

**Returns:** _void_

---

### advance

▸ `Private` **advance**(): _void_

**Returns:** _void_

---

### complete

▸ **complete**(`gameUiManager`: [_default_](backend_gamelogic_gameuimanager.default.md)): _void_

#### Parameters

| Name            | Type                                                    |
| :-------------- | :------------------------------------------------------ |
| `gameUiManager` | [_default_](backend_gamelogic_gameuimanager.default.md) |

**Returns:** _void_

---

### reset

▸ **reset**(`account`: _undefined_ \| EthAddress): _void_

#### Parameters

| Name      | Type                      |
| :-------- | :------------------------ |
| `account` | _undefined_ \| EthAddress |

**Returns:** _void_

---

### setTutorialState

▸ `Private` **setTutorialState**(`newState`: [_TutorialState_](../enums/backend_gamelogic_tutorialmanager.tutorialstate.md)): _void_

#### Parameters

| Name       | Type                                                                           |
| :--------- | :----------------------------------------------------------------------------- |
| `newState` | [_TutorialState_](../enums/backend_gamelogic_tutorialmanager.tutorialstate.md) |

**Returns:** _void_

---

### getInstance

▸ `Static` **getInstance**(): [_default_](backend_gamelogic_tutorialmanager.default.md)

**Returns:** [_default_](backend_gamelogic_tutorialmanager.default.md)
