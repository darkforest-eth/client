# Module: Backend/Utils/Animation

## Table of contents

### Functions

- [constantAnimation](backend_utils_animation.md#constantanimation)
- [easeInAnimation](backend_utils_animation.md#easeinanimation)
- [emojiEaseOutAnimation](backend_utils_animation.md#emojieaseoutanimation)
- [planetLevelToAnimationSpeed](backend_utils_animation.md#planetleveltoanimationspeed)
- [sinusoidalAnimation](backend_utils_animation.md#sinusoidalanimation)

## Functions

### constantAnimation

▸ **constantAnimation**(`constant`: _number_): DFAnimation

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `constant` | _number_ |

**Returns:** DFAnimation

---

### easeInAnimation

▸ **easeInAnimation**(`durationMs`: _number_, `delayMs?`: _number_): DFAnimation

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `durationMs` | _number_ |
| `delayMs?`   | _number_ |

**Returns:** DFAnimation

---

### emojiEaseOutAnimation

▸ **emojiEaseOutAnimation**(`durationMs`: _number_, `emoji`: _string_): _DFStatefulAnimation_<string\>

#### Parameters

| Name         | Type     |
| :----------- | :------- |
| `durationMs` | _number_ |
| `emoji`      | _string_ |

**Returns:** _DFStatefulAnimation_<string\>

---

### planetLevelToAnimationSpeed

▸ **planetLevelToAnimationSpeed**(`level`: PlanetLevel): _number_

#### Parameters

| Name    | Type        |
| :------ | :---------- |
| `level` | PlanetLevel |

**Returns:** _number_

---

### sinusoidalAnimation

▸ **sinusoidalAnimation**(`rps`: _number_): DFAnimation

#### Parameters

| Name  | Type     |
| :---- | :------- |
| `rps` | _number_ |

**Returns:** DFAnimation
