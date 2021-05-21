# Module: Frontend/Renderers/GameRenderer/TextureManager

## Table of contents

### Type aliases

- [SpriteRectangle](frontend_renderers_gamerenderer_texturemanager.md#spriterectangle)

### Variables

- [ARTIFACTS_THUMBS_URL](frontend_renderers_gamerenderer_texturemanager.md#artifacts_thumbs_url)
- [ARTIFACTS_URL](frontend_renderers_gamerenderer_texturemanager.md#artifacts_url)
- [EMPTY_SET](frontend_renderers_gamerenderer_texturemanager.md#empty_set)
- [EMPTY_SPRITE](frontend_renderers_gamerenderer_texturemanager.md#empty_sprite)
- [GLASS_URL](frontend_renderers_gamerenderer_texturemanager.md#glass_url)
- [SPRITESHEET_HEIGHT_PX](frontend_renderers_gamerenderer_texturemanager.md#spritesheet_height_px)
- [SPRITESHEET_WIDTH_PX](frontend_renderers_gamerenderer_texturemanager.md#spritesheet_width_px)
- [SPRITES_HORIZONTALLY](frontend_renderers_gamerenderer_texturemanager.md#sprites_horizontally)
- [SPRITES_VERTICALLY](frontend_renderers_gamerenderer_texturemanager.md#sprites_vertically)

### Functions

- [isShiny](frontend_renderers_gamerenderer_texturemanager.md#isshiny)
- [loadArtifactAtlas](frontend_renderers_gamerenderer_texturemanager.md#loadartifactatlas)
- [loadArtifactThumbAtlas](frontend_renderers_gamerenderer_texturemanager.md#loadartifactthumbatlas)
- [loadSprite](frontend_renderers_gamerenderer_texturemanager.md#loadsprite)
- [spriteFromArtifact](frontend_renderers_gamerenderer_texturemanager.md#spritefromartifact)

## Type aliases

### SpriteRectangle

Ƭ **SpriteRectangle**: _object_

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x1` | _number_ |
| `x2` | _number_ |
| `y1` | _number_ |
| `y2` | _number_ |

## Variables

### ARTIFACTS_THUMBS_URL

• `Const` **ARTIFACTS_THUMBS_URL**: `"public/sprites/artifactthumbs.png"`= 'public/sprites/artifactthumbs.png'

---

### ARTIFACTS_URL

• `Const` **ARTIFACTS_URL**: `"public/sprites/artifacts.png"`= 'public/sprites/artifacts.png'

---

### EMPTY_SET

• `Const` **EMPTY_SET**: SpriteSet

---

### EMPTY_SPRITE

• `Const` **EMPTY_SPRITE**: [_SpriteRectangle_](frontend_renderers_gamerenderer_texturemanager.md#spriterectangle)

Represents a sprite that doesn't exist.

---

### GLASS_URL

• `Const` **GLASS_URL**: `"public/sprites/glass.png"`= 'public/sprites/glass.png'

---

### SPRITESHEET_HEIGHT_PX

• `Const` **SPRITESHEET_HEIGHT_PX**: _number_

---

### SPRITESHEET_WIDTH_PX

• `Const` **SPRITESHEET_WIDTH_PX**: _number_

---

### SPRITES_HORIZONTALLY

• `Const` **SPRITES_HORIZONTALLY**: `16`= 16

---

### SPRITES_VERTICALLY

• `Const` **SPRITES_VERTICALLY**: `16`= 16

## Functions

### isShiny

▸ **isShiny**(`rarity`: ArtifactRarity): _boolean_

#### Parameters

| Name     | Type           |
| :------- | :------------- |
| `rarity` | ArtifactRarity |

**Returns:** _boolean_

---

### loadArtifactAtlas

▸ **loadArtifactAtlas**(): _Promise_<HTMLImageElement\>

**Returns:** _Promise_<HTMLImageElement\>

---

### loadArtifactThumbAtlas

▸ **loadArtifactThumbAtlas**(): _Promise_<HTMLImageElement\>

**Returns:** _Promise_<HTMLImageElement\>

---

### loadSprite

▸ **loadSprite**(`imageUrl`: _string_): _Promise_<HTMLImageElement\>

#### Parameters

| Name       | Type     |
| :--------- | :------- |
| `imageUrl` | _string_ |

**Returns:** _Promise_<HTMLImageElement\>

---

### spriteFromArtifact

▸ **spriteFromArtifact**(`artifact`: [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md)): [_SpriteRectangle_](frontend_renderers_gamerenderer_texturemanager.md#spriterectangle)

#### Parameters

| Name       | Type                                                                                    |
| :--------- | :-------------------------------------------------------------------------------------- |
| `artifact` | [_RenderedArtifact_](../interfaces/backend_gamelogic_artifactutils.renderedartifact.md) |

**Returns:** [_SpriteRectangle_](frontend_renderers_gamerenderer_texturemanager.md#spriterectangle)
