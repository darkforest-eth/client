# Module: Backend/Network/ConversationAPI

## Table of contents

### Functions

- [getConversation](Backend_Network_ConversationAPI.md#getconversation)
- [startConversation](Backend_Network_ConversationAPI.md#startconversation)
- [startConversationOpenAI](Backend_Network_ConversationAPI.md#startconversationopenai)
- [stepConversation](Backend_Network_ConversationAPI.md#stepconversation)
- [stepConversationOpenAI](Backend_Network_ConversationAPI.md#stepconversationopenai)

## Functions

### getConversation

▸ **getConversation**(`artifactId`): `Promise`<`Conversation` \| `undefined`\>

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `artifactId` | `ArtifactId` |

#### Returns

`Promise`<`Conversation` \| `undefined`\>

---

### startConversation

▸ **startConversation**(`timestamp`, `player`, `signature`, `artifactId`): `Promise`<`Conversation`\>

IN-GAME ROUTES

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `timestamp`  | `number`     |
| `player`     | `EthAddress` |
| `signature`  | `string`     |
| `artifactId` | `ArtifactId` |

#### Returns

`Promise`<`Conversation`\>

---

### startConversationOpenAI

▸ **startConversationOpenAI**(`artifact`, `artifactId`, `username`): `Promise`<`Conversation`\>

#### Parameters

| Name         | Type                   |
| :----------- | :--------------------- |
| `artifact`   | `ConversationArtifact` |
| `artifactId` | `string`               |
| `username`   | `string`               |

#### Returns

`Promise`<`Conversation`\>

---

### stepConversation

▸ **stepConversation**(`timestamp`, `player`, `signature`, `artifactId`, `message`): `Promise`<`Conversation`\>

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `timestamp`  | `number`     |
| `player`     | `EthAddress` |
| `signature`  | `string`     |
| `artifactId` | `ArtifactId` |
| `message`    | `string`     |

#### Returns

`Promise`<`Conversation`\>

---

### stepConversationOpenAI

▸ **stepConversationOpenAI**(`artifactId`, `message`): `Promise`<`Conversation`\>

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `artifactId` | `string` |
| `message`    | `string` |

#### Returns

`Promise`<`Conversation`\>
