# Module: Frontend/Renderers/GameRenderer/TextureManager

## Table of contents

### Type aliases

- [SpriteRectangle](Frontend_Renderers_GameRenderer_TextureManager.md#spriterectangle)

### Variables

- [ARTIFACTS_THUMBS_URL](Frontend_Renderers_GameRenderer_TextureManager.md#artifacts_thumbs_url)
- [ARTIFACTS_URL](Frontend_Renderers_GameRenderer_TextureManager.md#artifacts_url)
- [EMPTY_SET](Frontend_Renderers_GameRenderer_TextureManager.md#empty_set)
- [EMPTY_SPRITE](Frontend_Renderers_GameRenderer_TextureManager.md#empty_sprite)
- [GLASS_URL](Frontend_Renderers_GameRenderer_TextureManager.md#glass_url)
- [SPRITESHEET_HEIGHT_PX](Frontend_Renderers_GameRenderer_TextureManager.md#spritesheet_height_px)
- [SPRITESHEET_WIDTH_PX](Frontend_Renderers_GameRenderer_TextureManager.md#spritesheet_width_px)
- [SPRITES_HORIZONTALLY](Frontend_Renderers_GameRenderer_TextureManager.md#sprites_horizontally)
- [SPRITES_VERTICALLY](Frontend_Renderers_GameRenderer_TextureManager.md#sprites_vertically)

### Functions

- [isShiny](Frontend_Renderers_GameRenderer_TextureManager.md#isshiny)
- [loadArtifactAtlas](Frontend_Renderers_GameRenderer_TextureManager.md#loadartifactatlas)
- [loadArtifactThumbAtlas](Frontend_Renderers_GameRenderer_TextureManager.md#loadartifactthumbatlas)
- [loadSprite](Frontend_Renderers_GameRenderer_TextureManager.md#loadsprite)
- [spriteFromArtifact](Frontend_Renderers_GameRenderer_TextureManager.md#spritefromartifact)

## Type aliases

### SpriteRectangle

Ƭ **SpriteRectangle**: `Object`

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x1` | `number` |
| `x2` | `number` |
| `y1` | `number` |
| `y2` | `number` |

## Variables

### ARTIFACTS_THUMBS_URL

• `Const` **ARTIFACTS_THUMBS_URL**: `"public/sprites/artifactthumbs.png"`

---

### ARTIFACTS_URL

• `Const` **ARTIFACTS_URL**: `"public/sprites/artifacts.png"`

---

### EMPTY_SET

• `Const` **EMPTY_SET**: `SpriteSet`

---

### EMPTY_SPRITE

• `Const` **EMPTY_SPRITE**: [`SpriteRectangle`](Frontend_Renderers_GameRenderer_TextureManager.md#spriterectangle)

Represents a sprite that doesn't exist.

---

### GLASS_URL

• `Const` **GLASS_URL**: `"public/sprites/glass.png"`

---

### SPRITESHEET_HEIGHT_PX

• `Const` **SPRITESHEET_HEIGHT_PX**: `number`

---

### SPRITESHEET_WIDTH_PX

• `Const` **SPRITESHEET_WIDTH_PX**: `number`

---

### SPRITES_HORIZONTALLY

• `Const` **SPRITES_HORIZONTALLY**: `16`

---

### SPRITES_VERTICALLY

• `Const` **SPRITES_VERTICALLY**: `16`

## Functions

### isShiny

▸ **isShiny**(`rarity`): `boolean`

#### Parameters

| Name     | Type             |
| :------- | :--------------- |
| `rarity` | `ArtifactRarity` |

#### Returns

`boolean`

---

### loadArtifactAtlas

▸ **loadArtifactAtlas**(): `Promise`<`HTMLImageElement`\>

#### Returns

`Promise`<`HTMLImageElement`\>

---

### loadArtifactThumbAtlas

▸ **loadArtifactThumbAtlas**(): `Promise`<`HTMLImageElement`\>

#### Returns

`Promise`<`HTMLImageElement`\>

---

### loadSprite

▸ **loadSprite**(`imageUrl`): `Promise`<`HTMLImageElement`\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `imageUrl` | `string` |

#### Returns

`Promise`<`HTMLImageElement`\>

---

### spriteFromArtifact

▸ **spriteFromArtifact**(`artifact`): [`SpriteRectangle`](Frontend_Renderers_GameRenderer_TextureManager.md#spriterectangle)

#### Parameters

| Name       | Type                                                                                    |
| :--------- | :-------------------------------------------------------------------------------------- |
| `artifact` | [`RenderedArtifact`](../interfaces/Backend_GameLogic_ArtifactUtils.RenderedArtifact.md) |

#### Returns

[`SpriteRectangle`](Frontend_Renderers_GameRenderer_TextureManager.md#spriterectangle)
