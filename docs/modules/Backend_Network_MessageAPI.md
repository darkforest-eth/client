# Module: Backend/Network/MessageAPI

## Table of contents

### Functions

- [addMessage](Backend_Network_MessageAPI.md#addmessage)
- [deleteMessages](Backend_Network_MessageAPI.md#deletemessages)
- [getMessagesOnPlanets](Backend_Network_MessageAPI.md#getmessagesonplanets)

## Functions

### addMessage

▸ **addMessage**(`request`): `Promise`<`void`\>

#### Parameters

| Name      | Type                                               |
| :-------- | :------------------------------------------------- |
| `request` | `SignedMessage`<`PostMessageRequest`<`unknown`\>\> |

#### Returns

`Promise`<`void`\>

---

### deleteMessages

▸ **deleteMessages**(`request`): `Promise`<`void`\>

#### Parameters

| Name      | Type                                      |
| :-------- | :---------------------------------------- |
| `request` | `SignedMessage`<`DeleteMessagesRequest`\> |

#### Returns

`Promise`<`void`\>

---

### getMessagesOnPlanets

▸ **getMessagesOnPlanets**(`request`): `Promise`<`PlanetMessageResponse`\>

#### Parameters

| Name      | Type                   |
| :-------- | :--------------------- |
| `request` | `PlanetMessageRequest` |

#### Returns

`Promise`<`PlanetMessageResponse`\>
