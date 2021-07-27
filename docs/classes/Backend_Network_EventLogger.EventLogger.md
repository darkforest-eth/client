# Class: EventLogger

[Backend/Network/EventLogger](../modules/Backend_Network_EventLogger.md).EventLogger

## Table of contents

### Constructors

- [constructor](Backend_Network_EventLogger.EventLogger.md#constructor)

### Methods

- [logEvent](Backend_Network_EventLogger.EventLogger.md#logevent)
- [augmentEvent](Backend_Network_EventLogger.EventLogger.md#augmentevent)

## Constructors

### constructor

• **new EventLogger**()

## Methods

### logEvent

▸ **logEvent**(`eventType`, `event`): `void`

#### Parameters

| Name        | Type                                                             |
| :---------- | :--------------------------------------------------------------- |
| `eventType` | [`EventType`](../enums/Backend_Network_EventLogger.EventType.md) |
| `event`     | `unknown`                                                        |

#### Returns

`void`

---

### augmentEvent

▸ `Static` `Private` **augmentEvent**(`event`, `eventType`): `Object`

#### Parameters

| Name        | Type                                                             |
| :---------- | :--------------------------------------------------------------- |
| `event`     | `unknown`                                                        |
| `eventType` | [`EventType`](../enums/Backend_Network_EventLogger.EventType.md) |

#### Returns

`Object`

| Name            | Type                                                             |
| :-------------- | :--------------------------------------------------------------- |
| `df_event_type` | [`EventType`](../enums/Backend_Network_EventLogger.EventType.md) |
