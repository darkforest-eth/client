# Module: Frontend/Utils/Hooks

## Table of contents

### Functions

- [usePoll](Frontend_Utils_Hooks.md#usepoll)

## Functions

### usePoll

▸ **usePoll**(`cb`, `poll?`, `execFirst?`): `void`

Executes the callback `cb` every `poll` ms

#### Parameters

| Name        | Type                     | Default value | Description                                        |
| :---------- | :----------------------- | :------------ | :------------------------------------------------- |
| `cb`        | () => `void`             | `undefined`   | callback to execute                                |
| `poll`      | `undefined` \| `number`  | `undefined`   | ms to poll                                         |
| `execFirst` | `undefined` \| `boolean` | `undefined`   | if we want to execute the callback on first render |

#### Returns

`void`
