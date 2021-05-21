# Class: default

[Frontend/Renderers/GameRenderer/Entities/VoyageRenderer](../modules/frontend_renderers_gamerenderer_entities_voyagerenderer.md).default

## Table of contents

### Constructors

- [constructor](frontend_renderers_gamerenderer_entities_voyagerenderer.default.md#constructor)

### Properties

- [renderer](frontend_renderers_gamerenderer_entities_voyagerenderer.default.md#renderer)

### Methods

- [drawFleet](frontend_renderers_gamerenderer_entities_voyagerenderer.default.md#drawfleet)
- [drawVoyagePath](frontend_renderers_gamerenderer_entities_voyagerenderer.default.md#drawvoyagepath)
- [queueVoyages](frontend_renderers_gamerenderer_entities_voyagerenderer.default.md#queuevoyages)

## Constructors

### constructor

\+ **new default**(`renderer`: [_default_](frontend_renderers_gamerenderer_renderer.default.md)): [_default_](frontend_renderers_gamerenderer_entities_voyagerenderer.default.md)

#### Parameters

| Name       | Type                                                             |
| :--------- | :--------------------------------------------------------------- |
| `renderer` | [_default_](frontend_renderers_gamerenderer_renderer.default.md) |

**Returns:** [_default_](frontend_renderers_gamerenderer_entities_voyagerenderer.default.md)

## Properties

### renderer

• **renderer**: [_default_](frontend_renderers_gamerenderer_renderer.default.md)

## Methods

### drawFleet

▸ **drawFleet**(`voyage`: QueuedArrival): _void_

#### Parameters

| Name     | Type          |
| :------- | :------------ |
| `voyage` | QueuedArrival |

**Returns:** _void_

---

### drawVoyagePath

▸ `Private` **drawVoyagePath**(`from`: LocationId, `to`: LocationId, `confirmed`: _boolean_, `isMyVoyage`: _boolean_): _void_

#### Parameters

| Name         | Type       |
| :----------- | :--------- |
| `from`       | LocationId |
| `to`         | LocationId |
| `confirmed`  | _boolean_  |
| `isMyVoyage` | _boolean_  |

**Returns:** _void_

---

### queueVoyages

▸ **queueVoyages**(): _void_

**Returns:** _void_
