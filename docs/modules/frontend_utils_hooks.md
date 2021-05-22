# Module: Frontend/Utils/Hooks

## Table of contents

### Functions

- [usePoll](frontend_utils_hooks.md#usepoll)

## Functions

### usePoll

▸ **usePoll**(`cb`: () => _void_, `poll?`: _number_ \| _undefined_, `execFirst?`: _boolean_ \| _undefined_): _void_

Executes the callback `cb` every `poll` ms

#### Parameters

| Name        | Type                     | Description                                        |
| :---------- | :----------------------- | :------------------------------------------------- |
| `cb`        | () => _void_             | callback to execute                                |
| `poll`      | _number_ \| _undefined_  | ms to poll                                         |
| `execFirst` | _boolean_ \| _undefined_ | if we want to execute the callback on first render |

**Returns:** _void_
