# Module: Backend/Network/MessageAPI

## Table of contents

### Functions

- [addMessage](backend_network_messageapi.md#addmessage)
- [deleteMessages](backend_network_messageapi.md#deletemessages)
- [getMessagesOnPlanets](backend_network_messageapi.md#getmessagesonplanets)

## Functions

### addMessage

▸ **addMessage**(`request`: _SignedMessage_<PostMessageRequest<unknown\>\>): _Promise_<void\>

#### Parameters

| Name      | Type                                           |
| :-------- | :--------------------------------------------- |
| `request` | _SignedMessage_<PostMessageRequest<unknown\>\> |

**Returns:** _Promise_<void\>

---

### deleteMessages

▸ **deleteMessages**(`request`: _SignedMessage_<DeleteMessagesRequest\>): _Promise_<void\>

#### Parameters

| Name      | Type                                    |
| :-------- | :-------------------------------------- |
| `request` | _SignedMessage_<DeleteMessagesRequest\> |

**Returns:** _Promise_<void\>

---

### getMessagesOnPlanets

▸ **getMessagesOnPlanets**(`request`: PlanetMessageRequest): _Promise_<PlanetMessageResponse\>

#### Parameters

| Name      | Type                 |
| :-------- | :------------------- |
| `request` | PlanetMessageRequest |

**Returns:** _Promise_<PlanetMessageResponse\>
