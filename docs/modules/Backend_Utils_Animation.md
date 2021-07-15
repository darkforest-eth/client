# Module: Backend/Utils/Animation

## Table of contents

### Functions

- [constantAnimation](Backend_Utils_Animation.md#constantanimation)
- [easeInAnimation](Backend_Utils_Animation.md#easeinanimation)
- [emojiEaseOutAnimation](Backend_Utils_Animation.md#emojieaseoutanimation)
- [planetLevelToAnimationSpeed](Backend_Utils_Animation.md#planetleveltoanimationspeed)
- [sinusoidalAnimation](Backend_Utils_Animation.md#sinusoidalanimation)

## Functions

### constantAnimation

▸ **constantAnimation**(`constant`): `DFAnimation`

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `constant` | `number` |

#### Returns

`DFAnimation`

---

### easeInAnimation

▸ **easeInAnimation**(`durationMs`, `delayMs?`): `DFAnimation`

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `durationMs` | `number` |
| `delayMs?`   | `number` |

#### Returns

`DFAnimation`

---

### emojiEaseOutAnimation

▸ **emojiEaseOutAnimation**(`durationMs`, `emoji`): `DFStatefulAnimation`<`string`\>

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `durationMs` | `number` |
| `emoji`      | `string` |

#### Returns

`DFStatefulAnimation`<`string`\>

---

### planetLevelToAnimationSpeed

▸ **planetLevelToAnimationSpeed**(`level`): `number`

#### Parameters

| Name    | Type          |
| :------ | :------------ |
| `level` | `PlanetLevel` |

#### Returns

`number`

---

### sinusoidalAnimation

▸ **sinusoidalAnimation**(`rps`): `DFAnimation`

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `rps` | `number` |

#### Returns

`DFAnimation`
