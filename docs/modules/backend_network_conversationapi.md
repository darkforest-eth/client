# Module: Backend/Network/ConversationAPI

## Table of contents

### Functions

- [getConversation](backend_network_conversationapi.md#getconversation)
- [startConversation](backend_network_conversationapi.md#startconversation)
- [startConversationOpenAI](backend_network_conversationapi.md#startconversationopenai)
- [stepConversation](backend_network_conversationapi.md#stepconversation)
- [stepConversationOpenAI](backend_network_conversationapi.md#stepconversationopenai)

## Functions

### getConversation

▸ **getConversation**(`artifactId`: ArtifactId): _Promise_<Conversation \| undefined\>

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `artifactId` | ArtifactId |

**Returns:** _Promise_<Conversation \| undefined\>

---

### startConversation

▸ **startConversation**(`timestamp`: _number_, `player`: EthAddress, `signature`: _string_, `artifactId`: ArtifactId): _Promise_<Conversation\>

IN-GAME ROUTES

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `timestamp`  | _number_   |
| `player`     | EthAddress |
| `signature`  | _string_   |
| `artifactId` | ArtifactId |

**Returns:** _Promise_<Conversation\>

---

### startConversationOpenAI

▸ **startConversationOpenAI**(`artifact`: ConversationArtifact, `artifactId`: _string_, `username`: _string_): _Promise_<Conversation\>

#### Parameters

| Name         | Type                 |
| :----------- | :------------------- |
| `artifact`   | ConversationArtifact |
| `artifactId` | _string_             |
| `username`   | _string_             |

**Returns:** _Promise_<Conversation\>

---

### stepConversation

▸ **stepConversation**(`timestamp`: _number_, `player`: EthAddress, `signature`: _string_, `artifactId`: ArtifactId, `message`: _string_): _Promise_<Conversation\>

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `timestamp`  | _number_   |
| `player`     | EthAddress |
| `signature`  | _string_   |
| `artifactId` | ArtifactId |
| `message`    | _string_   |

**Returns:** _Promise_<Conversation\>

---

### stepConversationOpenAI

▸ **stepConversationOpenAI**(`artifactId`: _string_, `message`: _string_): _Promise_<Conversation\>

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `artifactId` | _string_ |
| `message`    | _string_ |

**Returns:** _Promise_<Conversation\>
