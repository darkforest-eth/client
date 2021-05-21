# Module: Frontend/Utils/EmitterHooks

## Table of contents

### Functions

- [useEmitterSubscribe](frontend_utils_emitterhooks.md#useemittersubscribe)
- [useEmitterValue](frontend_utils_emitterhooks.md#useemittervalue)
- [useKeyPressed](frontend_utils_emitterhooks.md#usekeypressed)
- [useWrappedEmitter](frontend_utils_emitterhooks.md#usewrappedemitter)

## Functions

### useEmitterSubscribe

▸ **useEmitterSubscribe**<T\>(`emitter`: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<T\>, `callback`: [_Callback_](frontend_utils_monomitter.md#callback)<T\>): _void_

Execute something on emitter callback

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type                                                        | Description                  |
| :--------- | :---------------------------------------------------------- | :--------------------------- |
| `emitter`  | [_Monomitter_](frontend_utils_monomitter.md#monomitter)<T\> | `Monomitter` to subscribe to |
| `callback` | [_Callback_](frontend_utils_monomitter.md#callback)<T\>     | callback to subscribe        |

**Returns:** _void_

---

### useEmitterValue

▸ **useEmitterValue**<T\>(`emitter`: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<T\>, `initialVal`: T): T

Use returned value from an emitter

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                        | Description                  |
| :----------- | :---------------------------------------------------------- | :--------------------------- |
| `emitter`    | [_Monomitter_](frontend_utils_monomitter.md#monomitter)<T\> | `Monomitter` to subscribe to |
| `initialVal` | T                                                           | initial state value          |

**Returns:** T

---

### useKeyPressed

▸ **useKeyPressed**(`keydown$`: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<KeyboardEvent\>, `keyup$`: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<KeyboardEvent\>): _boolean_

Return a bool indicating if a key is pressed

#### Parameters

| Name       | Type                                                                    | Description        |
| :--------- | :---------------------------------------------------------------------- | :----------------- |
| `keydown$` | [_Monomitter_](frontend_utils_monomitter.md#monomitter)<KeyboardEvent\> | keydown monomitter |
| `keyup$`   | [_Monomitter_](frontend_utils_monomitter.md#monomitter)<KeyboardEvent\> | keyup monomitter   |

**Returns:** _boolean_

---

### useWrappedEmitter

▸ **useWrappedEmitter**<T\>(`emitter`: [_Monomitter_](frontend_utils_monomitter.md#monomitter)<T \| undefined\>, `initialVal`: T \| _undefined_): [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<T \| undefined\>

Use returned value from an emitter, and clone the reference - used to force an update to the UI

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                                                                     | Description                  |
| :----------- | :----------------------------------------------------------------------- | :--------------------------- |
| `emitter`    | [_Monomitter_](frontend_utils_monomitter.md#monomitter)<T \| undefined\> | `Monomitter` to subscribe to |
| `initialVal` | T \| _undefined_                                                         | initial state value          |

**Returns:** [_Wrapper_](../classes/backend_utils_wrapper.wrapper.md)<T \| undefined\>
