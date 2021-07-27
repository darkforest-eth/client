# Class: default

[Frontend/Renderers/GameRenderer/Entities/VoyageRenderer](../modules/Frontend_Renderers_GameRenderer_Entities_VoyageRenderer.md).default

## Table of contents

### Constructors

- [constructor](Frontend_Renderers_GameRenderer_Entities_VoyageRenderer.default.md#constructor)

### Properties

- [renderer](Frontend_Renderers_GameRenderer_Entities_VoyageRenderer.default.md#renderer)

### Methods

- [drawFleet](Frontend_Renderers_GameRenderer_Entities_VoyageRenderer.default.md#drawfleet)
- [drawVoyagePath](Frontend_Renderers_GameRenderer_Entities_VoyageRenderer.default.md#drawvoyagepath)
- [queueVoyages](Frontend_Renderers_GameRenderer_Entities_VoyageRenderer.default.md#queuevoyages)

## Constructors

### constructor

• **new default**(`renderer`)

#### Parameters

| Name       | Type                                                             |
| :--------- | :--------------------------------------------------------------- |
| `renderer` | [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md) |

## Properties

### renderer

• **renderer**: [`default`](Frontend_Renderers_GameRenderer_Renderer.default.md)

## Methods

### drawFleet

▸ **drawFleet**(`voyage`, `_player`): `void`

#### Parameters

| Name      | Type                    |
| :-------- | :---------------------- |
| `voyage`  | `QueuedArrival`         |
| `_player` | `undefined` \| `Player` |

#### Returns

`void`

---

### drawVoyagePath

▸ `Private` **drawVoyagePath**(`from`, `to`, `confirmed`, `isMyVoyage`): `void`

#### Parameters

| Name         | Type         |
| :----------- | :----------- |
| `from`       | `LocationId` |
| `to`         | `LocationId` |
| `confirmed`  | `boolean`    |
| `isMyVoyage` | `boolean`    |

#### Returns

`void`

---

### queueVoyages

▸ **queueVoyages**(): `void`

#### Returns

`void`
