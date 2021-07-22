# Module: Frontend/Renderers/GameRenderer/Entities/PerlinUtils

## Table of contents

### Enumerations

- [PerlinOctave](../enums/Frontend_Renderers_GameRenderer_Entities_PerlinUtils.PerlinOctave.md)

### Type aliases

- [GridPoint](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#gridpoint)
- [PerlinRand](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#perlinrand)

### Functions

- [getCachedGradient](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#getcachedgradient)
- [getGridPoint](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#getgridpoint)
- [getPerlinChunks](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#getperlinchunks)
- [isGridPoint](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#isgridpoint)
- [right](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#right)
- [up](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#up)
- [valueOf](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#valueof)

## Type aliases

### GridPoint

Ƭ **GridPoint**: `WorldCoords` & { `__value`: `never` }

---

### PerlinRand

Ƭ **PerlinRand**: `ReturnType`<typeof `rand`\>

## Functions

### getCachedGradient

▸ **getCachedGradient**(`coords`, `config`, `pow`): `Vector`

#### Parameters

| Name     | Type                                                                                            |
| :------- | :---------------------------------------------------------------------------------------------- |
| `coords` | [`GridPoint`](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#gridpoint)                |
| `config` | `PerlinConfig`                                                                                  |
| `pow`    | [`PerlinOctave`](../enums/Frontend_Renderers_GameRenderer_Entities_PerlinUtils.PerlinOctave.md) |

#### Returns

`Vector`

---

### getGridPoint

▸ **getGridPoint**(`bottomLeft`, `scale`): [`GridPoint`](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#gridpoint)

#### Parameters

| Name         | Type          |
| :----------- | :------------ |
| `bottomLeft` | `WorldCoords` |
| `scale`      | `number`      |

#### Returns

[`GridPoint`](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#gridpoint)

---

### getPerlinChunks

▸ **getPerlinChunks**(`footprint`, `lengthScale`): `Iterable`<[`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)\>

#### Parameters

| Name          | Type                                                                |
| :------------ | :------------------------------------------------------------------ |
| `footprint`   | [`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md) |
| `lengthScale` | `number`                                                            |

#### Returns

`Iterable`<[`Rectangle`](../interfaces/_types_global_GlobalTypes.Rectangle.md)\>

---

### isGridPoint

▸ **isGridPoint**(`coords`, `scale`): coords is GridPoint

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `coords` | `WorldCoords` |
| `scale`  | `number`      |

#### Returns

coords is GridPoint

---

### right

▸ **right**(`topLeft`, `scale`): [`GridPoint`](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#gridpoint)

#### Parameters

| Name      | Type                                                                             |
| :-------- | :------------------------------------------------------------------------------- |
| `topLeft` | [`GridPoint`](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#gridpoint) |
| `scale`   | `number`                                                                         |

#### Returns

[`GridPoint`](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#gridpoint)

---

### up

▸ **up**(`topLeft`, `scale`): [`GridPoint`](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#gridpoint)

#### Parameters

| Name      | Type                                                                             |
| :-------- | :------------------------------------------------------------------------------- |
| `topLeft` | [`GridPoint`](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#gridpoint) |
| `scale`   | `number`                                                                         |

#### Returns

[`GridPoint`](Frontend_Renderers_GameRenderer_Entities_PerlinUtils.md#gridpoint)

---

### valueOf

▸ `Const` **valueOf**(`v`): [`number`, `number`]

#### Parameters

| Name | Type     |
| :--- | :------- |
| `v`  | `Vector` |

#### Returns

[`number`, `number`]
