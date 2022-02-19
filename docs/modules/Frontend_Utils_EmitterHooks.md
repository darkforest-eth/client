# Module: Frontend/Utils/EmitterHooks

## Table of contents

### Functions

- [useEmitterSubscribe](Frontend_Utils_EmitterHooks.md#useemittersubscribe)
- [useEmitterValue](Frontend_Utils_EmitterHooks.md#useemittervalue)
- [useWrappedEmitter](Frontend_Utils_EmitterHooks.md#usewrappedemitter)

## Functions

### useEmitterSubscribe

▸ **useEmitterSubscribe**<`T`\>(`emitter`, `callback`, `deps`): `void`

Execute something on emitter callback

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name       | Type               | Description                  |
| :--------- | :----------------- | :--------------------------- |
| `emitter`  | `Monomitter`<`T`\> | `Monomitter` to subscribe to |
| `callback` | `Callback`<`T`\>   | callback to subscribe        |
| `deps`     | `DependencyList`   | -                            |

#### Returns

`void`

---

### useEmitterValue

▸ **useEmitterValue**<`T`\>(`emitter`, `initialVal`): `T`

Use returned value from an emitter

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type               | Description                  |
| :----------- | :----------------- | :--------------------------- |
| `emitter`    | `Monomitter`<`T`\> | `Monomitter` to subscribe to |
| `initialVal` | `T`                | initial state value          |

#### Returns

`T`

---

### useWrappedEmitter

▸ **useWrappedEmitter**<`T`\>(`emitter`, `initialVal`): [`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`T` \| `undefined`\>

Use returned value from an emitter, and clone the reference - used to force an update to the UI

#### Type parameters

| Name |
| :--- |
| `T`  |

#### Parameters

| Name         | Type                              | Description                  |
| :----------- | :-------------------------------- | :--------------------------- |
| `emitter`    | `Monomitter`<`undefined` \| `T`\> | `Monomitter` to subscribe to |
| `initialVal` | `undefined` \| `T`                | initial state value          |

#### Returns

[`Wrapper`](../classes/Backend_Utils_Wrapper.Wrapper.md)<`T` \| `undefined`\>
