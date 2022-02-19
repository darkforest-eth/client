# Module: Frontend/Components/TimeUntil

## Table of contents

### Functions

- [TimeUntil](Frontend_Components_TimeUntil.md#timeuntil)
- [formatDuration](Frontend_Components_TimeUntil.md#formatduration)

## Functions

### TimeUntil

▸ **TimeUntil**(`__namedParameters`): `Element`

Given a timestamp, displays the amount of time until the timestamp from now in hh:mm:ss format.
If the timestamp is in the past, displays the given hardcoded value.

#### Parameters

| Name                          | Type     |
| :---------------------------- | :------- |
| `__namedParameters`           | `Object` |
| `__namedParameters.ifPassed`  | `string` |
| `__namedParameters.timestamp` | `number` |

#### Returns

`Element`

---

### formatDuration

▸ **formatDuration**(`msDuration`): `string`

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `msDuration` | `number` |

#### Returns

`string`
