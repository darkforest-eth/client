# Class: PaidConversationManager

[Backend/GameLogic/PaidConversationManager](../modules/Backend_GameLogic_PaidConversationManager.md).PaidConversationManager

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#constructor)

### Properties

- [artifact](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#artifact)
- [conversation](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#conversation)
- [gameUIManager](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#gameuimanager)
- [setConversation](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#setconversation)
- [setLoading](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#setloading)
- [terminal](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#terminal)

### Methods

- [getQuestionsRemaining](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#getquestionsremaining)
- [printAllMessages](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#printallmessages)
- [printClean](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#printclean)
- [printMessage](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#printmessage)
- [start](Backend_GameLogic_PaidConversationManager.PaidConversationManager.md#start)

## Constructors

### constructor

• **new PaidConversationManager**(`gameUIManager`, `terminal`, `setConversation`, `setLoading`, `artifact`)

#### Parameters

| Name              | Type                                                                                                            |
| :---------------- | :-------------------------------------------------------------------------------------------------------------- |
| `gameUIManager`   | [`default`](Backend_GameLogic_GameUIManager.default.md)                                                         |
| `terminal`        | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> |
| `setConversation` | (`conversation`: `Conversation`) => `void`                                                                      |
| `setLoading`      | (`loading`: `boolean`) => `void`                                                                                |
| `artifact`        | `Artifact`                                                                                                      |

## Properties

### artifact

• `Private` **artifact**: `Artifact`

---

### conversation

• `Private` **conversation**: `undefined` \| `Conversation`

---

### gameUIManager

• `Private` **gameUIManager**: [`default`](Backend_GameLogic_GameUIManager.default.md)

---

### setConversation

• `Private` **setConversation**: (`conversation`: `undefined` \| `Conversation`) => `void`

#### Type declaration

▸ (`conversation`): `void`

##### Parameters

| Name           | Type                          |
| :------------- | :---------------------------- |
| `conversation` | `undefined` \| `Conversation` |

##### Returns

`void`

---

### setLoading

• `Private` **setLoading**: (`loading`: `boolean`) => `void`

#### Type declaration

▸ (`loading`): `void`

##### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `loading` | `boolean` |

##### Returns

`void`

---

### terminal

• `Private` **terminal**: `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\>

## Methods

### getQuestionsRemaining

▸ **getQuestionsRemaining**(): `undefined` \| `number`

#### Returns

`undefined` \| `number`

---

### printAllMessages

▸ `Private` **printAllMessages**(): `void`

#### Returns

`void`

---

### printClean

▸ `Private` **printClean**(`message`, `style?`, `hoverContents?`): `void`

#### Parameters

| Name             | Type                                                                              |
| :--------------- | :-------------------------------------------------------------------------------- |
| `message`        | `string`                                                                          |
| `style?`         | [`TerminalTextStyle`](../enums/Frontend_Utils_TerminalTypes.TerminalTextStyle.md) |
| `hoverContents?` | () => `Element`                                                                   |

#### Returns

`void`

---

### printMessage

▸ `Private` **printMessage**(`message`): `void`

#### Parameters

| Name      | Type      |
| :-------- | :-------- |
| `message` | `Message` |

#### Returns

`void`

---

### start

▸ **start**(): `Promise`<`void`\>

#### Returns

`Promise`<`void`\>
