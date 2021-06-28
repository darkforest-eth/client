# Module: Frontend/Renderers/GameRenderer/Entities/PerlinUtils

## Table of contents

### Enumerations

- [PerlinOctave](../enums/frontend_renderers_gamerenderer_entities_perlinutils.perlinoctave.md)

### Type aliases

- [GridPoint](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint)
- [PerlinRand](frontend_renderers_gamerenderer_entities_perlinutils.md#perlinrand)

### Functions

- [getCachedGradient](frontend_renderers_gamerenderer_entities_perlinutils.md#getcachedgradient)
- [getGridPoint](frontend_renderers_gamerenderer_entities_perlinutils.md#getgridpoint)
- [getPerlinChunks](frontend_renderers_gamerenderer_entities_perlinutils.md#getperlinchunks)
- [isGridPoint](frontend_renderers_gamerenderer_entities_perlinutils.md#isgridpoint)
- [right](frontend_renderers_gamerenderer_entities_perlinutils.md#right)
- [up](frontend_renderers_gamerenderer_entities_perlinutils.md#up)
- [valueOf](frontend_renderers_gamerenderer_entities_perlinutils.md#valueof)

## Type aliases

### GridPoint

Ƭ **GridPoint**: WorldCoords & { `__value`: _never_ }

---

### PerlinRand

Ƭ **PerlinRand**: _ReturnType_<_typeof_ rand\>

## Functions

### getCachedGradient

▸ **getCachedGradient**(`coords`: [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint), `config`: PerlinConfig, `pow`: [_PerlinOctave_](../enums/frontend_renderers_gamerenderer_entities_perlinutils.perlinoctave.md)): Vector

#### Parameters

| Name     | Type                                                                                            |
| :------- | :---------------------------------------------------------------------------------------------- |
| `coords` | [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint)                |
| `config` | PerlinConfig                                                                                    |
| `pow`    | [_PerlinOctave_](../enums/frontend_renderers_gamerenderer_entities_perlinutils.perlinoctave.md) |

**Returns:** Vector

---

### getGridPoint

▸ **getGridPoint**(`bottomLeft`: WorldCoords, `scale`: _number_): [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint)

#### Parameters

| Name         | Type        |
| :----------- | :---------- |
| `bottomLeft` | WorldCoords |
| `scale`      | _number_    |

**Returns:** [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint)

---

### getPerlinChunks

▸ **getPerlinChunks**(`footprint`: [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md), `lengthScale`: _number_): _Iterable_<[_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)\>

#### Parameters

| Name          | Type                                                                |
| :------------ | :------------------------------------------------------------------ |
| `footprint`   | [_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md) |
| `lengthScale` | _number_                                                            |

**Returns:** _Iterable_<[_Rectangle_](../interfaces/_types_global_globaltypes.rectangle.md)\>

---

### isGridPoint

▸ **isGridPoint**(`coords`: WorldCoords, `scale`: _number_): coords is GridPoint

#### Parameters

| Name     | Type        |
| :------- | :---------- |
| `coords` | WorldCoords |
| `scale`  | _number_    |

**Returns:** coords is GridPoint

---

### right

▸ **right**(`topLeft`: [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint), `scale`: _number_): [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint)

#### Parameters

| Name      | Type                                                                             |
| :-------- | :------------------------------------------------------------------------------- |
| `topLeft` | [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint) |
| `scale`   | _number_                                                                         |

**Returns:** [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint)

---

### up

▸ **up**(`topLeft`: [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint), `scale`: _number_): [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint)

#### Parameters

| Name      | Type                                                                             |
| :-------- | :------------------------------------------------------------------------------- |
| `topLeft` | [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint) |
| `scale`   | _number_                                                                         |

**Returns:** [_GridPoint_](frontend_renderers_gamerenderer_entities_perlinutils.md#gridpoint)

---

### valueOf

▸ `Const` **valueOf**(`v`: Vector): [*number*, *number*]

#### Parameters

| Name | Type   |
| :--- | :----- |
| `v`  | Vector |

**Returns:** [*number*, *number*]
