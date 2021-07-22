# Class: ProcgenUtils

[Backend/Procedural/ProcgenUtils](../modules/Backend_Procedural_ProcgenUtils.md).ProcgenUtils

## Table of contents

### Constructors

- [constructor](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#constructor)

### Properties

- [baseByBiome](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#basebybiome)
- [blurbs2ById](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#blurbs2byid)
- [blurbsById](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#blurbsbyid)
- [cosmeticByLocId](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#cosmeticbylocid)
- [grayColors](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#graycolors)
- [huesByHash](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#huesbyhash)
- [namesById](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#namesbyid)
- [oceanByBiome](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#oceanbybiome)
- [rgbsByHash](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#rgbsbyhash)
- [strByBiome](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#strbybiome)
- [taglinesById](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#taglinesbyid)

### Methods

- [artifactRandom](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#artifactrandom)
- [artifactRandomInt](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#artifactrandomint)
- [ellipsStrEnd](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#ellipsstrend)
- [ellipsisStr](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#ellipsisstr)
- [getBiomeRgbStr](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getbiomergbstr)
- [getHatSizeName](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#gethatsizename)
- [getOwnerColor](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getownercolor)
- [getOwnerColorVec](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getownercolorvec)
- [getPlanetBlurb](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getplanetblurb)
- [getPlanetBlurb2](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getplanetblurb2)
- [getPlanetClass](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getplanetclass)
- [getPlanetCosmetic](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getplanetcosmetic)
- [getPlanetName](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getplanetname)
- [getPlanetNameHash](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getplanetnamehash)
- [getPlanetTagline](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getplanettagline)
- [getPlanetTitle](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getplanettitle)
- [getPlayerColor](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getplayercolor)
- [getPlayerColorVec](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getplayercolorvec)
- [getRuinsInfo](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#getruinsinfo)
- [hashToHue](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#hashtohue)
- [hashToInt](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#hashtoint)
- [hslStr](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#hslstr)
- [hslToRgb](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#hsltorgb)
- [planetPerlin](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#planetperlin)
- [planetRandom](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#planetrandom)
- [planetRandomInt](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#planetrandomint)
- [rgbStr](Backend_Procedural_ProcgenUtils.ProcgenUtils.md#rgbstr)

## Constructors

### constructor

• **new ProcgenUtils**()

## Properties

### baseByBiome

▪ `Static` `Private` **baseByBiome**: `Object`

#### Index signature

▪ [Biome: `number`]: [`HSLVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#hslvec)

---

### blurbs2ById

▪ `Static` `Private` **blurbs2ById**: `Map`<`LocationId`, `string`\>

---

### blurbsById

▪ `Static` `Private` **blurbsById**: `Map`<`LocationId`, `string`\>

---

### cosmeticByLocId

▪ `Static` `Private` **cosmeticByLocId**: `Map`<`LocationId`, [`PlanetCosmeticInfo`](../interfaces/Backend_Utils_UtilsTypes.PlanetCosmeticInfo.md)\>

---

### grayColors

▪ `Static` **grayColors**: [`PlanetCosmeticInfo`](../interfaces/Backend_Utils_UtilsTypes.PlanetCosmeticInfo.md)

---

### huesByHash

▪ `Static` `Private` **huesByHash**: `Map`<`string`, `number`\>

---

### namesById

▪ `Static` `Private` **namesById**: `Map`<`LocationId`, `string`\>

---

### oceanByBiome

▪ `Static` `Private` **oceanByBiome**: `Object`

#### Index signature

▪ [Biome: `number`]: [`HSLVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#hslvec)

---

### rgbsByHash

▪ `Static` `Private` **rgbsByHash**: `Map`<`string`, [`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec)\>

---

### strByBiome

▪ `Static` `Private` **strByBiome**: `Map`<`Biome`, `string`\>

---

### taglinesById

▪ `Static` `Private` **taglinesById**: `Map`<`LocationId`, `string`\>

## Methods

### artifactRandom

▸ `Static` **artifactRandom**(`loc`): () => `number`

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `loc` | `ArtifactId` |

#### Returns

`fn`

▸ (): `number`

##### Returns

`number`

---

### artifactRandomInt

▸ `Static` **artifactRandomInt**(`loc`): () => `number`

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `loc` | `ArtifactId` |

#### Returns

`fn`

▸ (): `number`

##### Returns

`number`

---

### ellipsStrEnd

▸ `Static` **ellipsStrEnd**(`str`, `maxLen`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `str`    | `string` |
| `maxLen` | `number` |

#### Returns

`string`

---

### ellipsisStr

▸ `Static` **ellipsisStr**(`str`, `maxLen`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `str`    | `string` |
| `maxLen` | `number` |

#### Returns

`string`

---

### getBiomeRgbStr

▸ `Static` **getBiomeRgbStr**(`biome`): `string`

#### Parameters

| Name    | Type    |
| :------ | :------ |
| `biome` | `Biome` |

#### Returns

`string`

---

### getHatSizeName

▸ `Static` **getHatSizeName**(`planet`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`string`

---

### getOwnerColor

▸ `Static` **getOwnerColor**(`planet`): `string`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`string`

---

### getOwnerColorVec

▸ `Static` **getOwnerColorVec**(`planet`): [`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec)

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

[`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec)

---

### getPlanetBlurb

▸ `Static` **getPlanetBlurb**(`planet`): `string`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`string`

---

### getPlanetBlurb2

▸ `Static` **getPlanetBlurb2**(`planet`): `string`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`string`

---

### getPlanetClass

▸ `Static` **getPlanetClass**(`planet`): `UpgradeBranchName`

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `planet` | `Planet` |

#### Returns

`UpgradeBranchName`

---

### getPlanetCosmetic

▸ `Static` **getPlanetCosmetic**(`planet`): [`PlanetCosmeticInfo`](../interfaces/Backend_Utils_UtilsTypes.PlanetCosmeticInfo.md)

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

[`PlanetCosmeticInfo`](../interfaces/Backend_Utils_UtilsTypes.PlanetCosmeticInfo.md)

---

### getPlanetName

▸ `Static` **getPlanetName**(`planet`): `string`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`string`

---

### getPlanetNameHash

▸ `Static` **getPlanetNameHash**(`locId`): `string`

#### Parameters

| Name    | Type         |
| :------ | :----------- |
| `locId` | `LocationId` |

#### Returns

`string`

---

### getPlanetTagline

▸ `Static` **getPlanetTagline**(`planet`): `string`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`string`

---

### getPlanetTitle

▸ `Static` **getPlanetTitle**(`planet`): `string`

#### Parameters

| Name     | Type                    |
| :------- | :---------------------- |
| `planet` | `undefined` \| `Planet` |

#### Returns

`string`

---

### getPlayerColor

▸ `Static` **getPlayerColor**(`player`): `string`

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `player` | `EthAddress` |

#### Returns

`string`

---

### getPlayerColorVec

▸ `Static` **getPlayerColorVec**(`player`): [`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec)

#### Parameters

| Name     | Type         |
| :------- | :----------- |
| `player` | `EthAddress` |

#### Returns

[`RGBAVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbavec)

---

### getRuinsInfo

▸ `Static` **getRuinsInfo**(`loc`): [`RuinsInfo`](../modules/Backend_Utils_UtilsTypes.md#ruinsinfo)

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `loc` | `LocationId` |

#### Returns

[`RuinsInfo`](../modules/Backend_Utils_UtilsTypes.md#ruinsinfo)

---

### hashToHue

▸ `Static` **hashToHue**(`hash`): `number`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `hash` | `string` |

#### Returns

`number`

---

### hashToInt

▸ `Static` **hashToInt**(`hash`): `number`

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `hash` | `string` |

#### Returns

`number`

---

### hslStr

▸ `Static` **hslStr**(`h`, `s`, `l`): `string`

#### Parameters

| Name | Type     |
| :--- | :------- |
| `h`  | `number` |
| `s`  | `number` |
| `l`  | `number` |

#### Returns

`string`

---

### hslToRgb

▸ `Static` **hslToRgb**(`__namedParameters`): [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec)

#### Parameters

| Name                | Type                                                                         |
| :------------------ | :--------------------------------------------------------------------------- |
| `__namedParameters` | [`HSLVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#hslvec) |

#### Returns

[`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec)

---

### planetPerlin

▸ `Static` **planetPerlin**(`loc`): (`coords`: [`PixelCoords`](../modules/Backend_Procedural_ProcgenUtils.md#pixelcoords)) => `number`

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `loc` | `LocationId` |

#### Returns

`fn`

▸ (`coords`): `number`

##### Parameters

| Name     | Type                                                                       |
| :------- | :------------------------------------------------------------------------- |
| `coords` | [`PixelCoords`](../modules/Backend_Procedural_ProcgenUtils.md#pixelcoords) |

##### Returns

`number`

---

### planetRandom

▸ `Static` **planetRandom**(`loc`): () => `number`

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `loc` | `LocationId` |

#### Returns

`fn`

▸ (): `number`

##### Returns

`number`

---

### planetRandomInt

▸ `Static` **planetRandomInt**(`loc`): () => `number`

#### Parameters

| Name  | Type         |
| :---- | :----------- |
| `loc` | `LocationId` |

#### Returns

`fn`

▸ (): `number`

##### Returns

`number`

---

### rgbStr

▸ `Static` **rgbStr**(`rgb`): `string`

#### Parameters

| Name  | Type                                                                         |
| :---- | :--------------------------------------------------------------------------- |
| `rgb` | [`RGBVec`](../modules/Frontend_Renderers_GameRenderer_EngineTypes.md#rgbvec) |

#### Returns

`string`
