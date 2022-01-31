# Class: ConversationManager

[Backend/GameLogic/ConversationManager](../modules/Backend_GameLogic_ConversationManager.md).ConversationManager

## Table of contents

### Constructors

- [constructor](Backend_GameLogic_ConversationManager.ConversationManager.md#constructor)

### Properties

- [artifact](Backend_GameLogic_ConversationManager.ConversationManager.md#artifact)
- [artifactId](Backend_GameLogic_ConversationManager.ConversationManager.md#artifactid)
- [conversation](Backend_GameLogic_ConversationManager.ConversationManager.md#conversation)
- [setConversation](Backend_GameLogic_ConversationManager.ConversationManager.md#setconversation)
- [setLoading](Backend_GameLogic_ConversationManager.ConversationManager.md#setloading)
- [terminal](Backend_GameLogic_ConversationManager.ConversationManager.md#terminal)
- [username](Backend_GameLogic_ConversationManager.ConversationManager.md#username)

### Methods

- [printClean](Backend_GameLogic_ConversationManager.ConversationManager.md#printclean)
- [printLastMessage](Backend_GameLogic_ConversationManager.ConversationManager.md#printlastmessage)
- [start](Backend_GameLogic_ConversationManager.ConversationManager.md#start)

## Constructors

### constructor

• **new ConversationManager**(`terminal`, `setConversation`, `setLoading`, `artifactType`, `artifactRarity`)

#### Parameters

| Name              | Type                                                                                                            |
| :---------------- | :-------------------------------------------------------------------------------------------------------------- |
| `terminal`        | `MutableRefObject`<`undefined` \| [`TerminalHandle`](../interfaces/Frontend_Views_Terminal.TerminalHandle.md)\> |
| `setConversation` | (`conversation`: `Conversation`) => `void`                                                                      |
| `setLoading`      | (`loading`: `boolean`) => `void`                                                                                |
| `artifactType`    | `ArtifactType`                                                                                                  |
| `artifactRarity`  | `ArtifactRarity`                                                                                                |

## Properties

### artifact

• `Private` **artifact**: `ConversationArtifact`

---

### artifactId

• `Private` **artifactId**: `string`

---

### conversation

• `Private` **conversation**: `Conversation`

---

### setConversation

• `Private` **setConversation**: (`conversation`: `Conversation`) => `void`

#### Type declaration

▸ (`conversation`): `void`

##### Parameters

| Name           | Type           |
| :------------- | :------------- |
| `conversation` | `Conversation` |

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

---

### username

• `Private` **username**: `string`

## Methods

### printClean

▸ `Private` **printClean**(`message`, `style?`): `void`

#### Parameters

| Name      | Type                                                                              |
| :-------- | :-------------------------------------------------------------------------------- |
| `message` | `string`                                                                          |
| `style?`  | [`TerminalTextStyle`](../enums/Frontend_Utils_TerminalTypes.TerminalTextStyle.md) |

#### Returns

`void`

---

### printLastMessage

▸ `Private` **printLastMessage**(`message`): `void`

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
