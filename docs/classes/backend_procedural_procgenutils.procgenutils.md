# Class: ProcgenUtils

[Backend/Procedural/ProcgenUtils](../modules/backend_procedural_procgenutils.md).ProcgenUtils

## Table of contents

### Constructors

- [constructor](backend_procedural_procgenutils.procgenutils.md#constructor)

### Properties

- [baseByBiome](backend_procedural_procgenutils.procgenutils.md#basebybiome)
- [blurbs2ById](backend_procedural_procgenutils.procgenutils.md#blurbs2byid)
- [blurbsById](backend_procedural_procgenutils.procgenutils.md#blurbsbyid)
- [cosmeticByLocId](backend_procedural_procgenutils.procgenutils.md#cosmeticbylocid)
- [grayColors](backend_procedural_procgenutils.procgenutils.md#graycolors)
- [huesByHash](backend_procedural_procgenutils.procgenutils.md#huesbyhash)
- [namesById](backend_procedural_procgenutils.procgenutils.md#namesbyid)
- [oceanByBiome](backend_procedural_procgenutils.procgenutils.md#oceanbybiome)
- [rgbsByHash](backend_procedural_procgenutils.procgenutils.md#rgbsbyhash)
- [strByBiome](backend_procedural_procgenutils.procgenutils.md#strbybiome)
- [taglinesById](backend_procedural_procgenutils.procgenutils.md#taglinesbyid)

### Methods

- [artifactRandom](backend_procedural_procgenutils.procgenutils.md#artifactrandom)
- [artifactRandomInt](backend_procedural_procgenutils.procgenutils.md#artifactrandomint)
- [ellipsStrEnd](backend_procedural_procgenutils.procgenutils.md#ellipsstrend)
- [ellipsisStr](backend_procedural_procgenutils.procgenutils.md#ellipsisstr)
- [getBiomeRgbStr](backend_procedural_procgenutils.procgenutils.md#getbiomergbstr)
- [getHatSizeName](backend_procedural_procgenutils.procgenutils.md#gethatsizename)
- [getOwnerColor](backend_procedural_procgenutils.procgenutils.md#getownercolor)
- [getOwnerColorVec](backend_procedural_procgenutils.procgenutils.md#getownercolorvec)
- [getPlanetBlurb](backend_procedural_procgenutils.procgenutils.md#getplanetblurb)
- [getPlanetBlurb2](backend_procedural_procgenutils.procgenutils.md#getplanetblurb2)
- [getPlanetClass](backend_procedural_procgenutils.procgenutils.md#getplanetclass)
- [getPlanetCosmetic](backend_procedural_procgenutils.procgenutils.md#getplanetcosmetic)
- [getPlanetName](backend_procedural_procgenutils.procgenutils.md#getplanetname)
- [getPlanetNameHash](backend_procedural_procgenutils.procgenutils.md#getplanetnamehash)
- [getPlanetTagline](backend_procedural_procgenutils.procgenutils.md#getplanettagline)
- [getPlanetTitle](backend_procedural_procgenutils.procgenutils.md#getplanettitle)
- [getPlayerColor](backend_procedural_procgenutils.procgenutils.md#getplayercolor)
- [getPlayerColorVec](backend_procedural_procgenutils.procgenutils.md#getplayercolorvec)
- [getRuinsInfo](backend_procedural_procgenutils.procgenutils.md#getruinsinfo)
- [hashToHue](backend_procedural_procgenutils.procgenutils.md#hashtohue)
- [hashToInt](backend_procedural_procgenutils.procgenutils.md#hashtoint)
- [hslStr](backend_procedural_procgenutils.procgenutils.md#hslstr)
- [hslToRgb](backend_procedural_procgenutils.procgenutils.md#hsltorgb)
- [planetPerlin](backend_procedural_procgenutils.procgenutils.md#planetperlin)
- [planetRandom](backend_procedural_procgenutils.procgenutils.md#planetrandom)
- [planetRandomInt](backend_procedural_procgenutils.procgenutils.md#planetrandomint)
- [rgbStr](backend_procedural_procgenutils.procgenutils.md#rgbstr)

## Constructors

### constructor

\+ **new ProcgenUtils**(): [_ProcgenUtils_](backend_procedural_procgenutils.procgenutils.md)

**Returns:** [_ProcgenUtils_](backend_procedural_procgenutils.procgenutils.md)

## Properties

### baseByBiome

▪ `Static` `Private` **baseByBiome**: _Record_<Biome, [_HSLVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#hslvec)\>

---

### blurbs2ById

▪ `Static` `Private` **blurbs2ById**: _Map_<LocationId, string\>

---

### blurbsById

▪ `Static` `Private` **blurbsById**: _Map_<LocationId, string\>

---

### cosmeticByLocId

▪ `Static` `Private` **cosmeticByLocId**: _Map_<LocationId, [_PlanetCosmeticInfo_](../interfaces/backend_utils_utilstypes.planetcosmeticinfo.md)\>

---

### grayColors

▪ `Static` **grayColors**: [_PlanetCosmeticInfo_](../interfaces/backend_utils_utilstypes.planetcosmeticinfo.md)

---

### huesByHash

▪ `Static` `Private` **huesByHash**: _Map_<string, number\>

---

### namesById

▪ `Static` `Private` **namesById**: _Map_<LocationId, string\>

---

### oceanByBiome

▪ `Static` `Private` **oceanByBiome**: _Record_<Biome, [_HSLVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#hslvec)\>

---

### rgbsByHash

▪ `Static` `Private` **rgbsByHash**: _Map_<string, [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)\>

---

### strByBiome

▪ `Static` `Private` **strByBiome**: _Map_<Biome, string\>

---

### taglinesById

▪ `Static` `Private` **taglinesById**: _Map_<LocationId, string\>

## Methods

### artifactRandom

▸ `Static` **artifactRandom**(`loc`: ArtifactId): _function_

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `loc` | ArtifactId |

**Returns:** () => _number_

---

### artifactRandomInt

▸ `Static` **artifactRandomInt**(`loc`: ArtifactId): _function_

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `loc` | ArtifactId |

**Returns:** () => _number_

---

### ellipsStrEnd

▸ `Static` **ellipsStrEnd**(`str`: _string_, `maxLen`: _number_): _string_

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `str`    | _string_ |
| `maxLen` | _number_ |

**Returns:** _string_

---

### ellipsisStr

▸ `Static` **ellipsisStr**(`str`: _string_, `maxLen`: _number_): _string_

#### Parameters

| Name     | Type     |
| :------- | :------- |
| `str`    | _string_ |
| `maxLen` | _number_ |

**Returns:** _string_

---

### getBiomeRgbStr

▸ `Static` **getBiomeRgbStr**(`biome`: Biome): _string_

#### Parameters

| Name    | Type  |
| :------ | :---- |
| `biome` | Biome |

**Returns:** _string_

---

### getHatSizeName

▸ `Static` **getHatSizeName**(`planet`: Planet): _string_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _string_

---

### getOwnerColor

▸ `Static` **getOwnerColor**(`planet`: Planet): _string_

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** _string_

---

### getOwnerColorVec

▸ `Static` **getOwnerColorVec**(`planet`: Planet): [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)

---

### getPlanetBlurb

▸ `Static` **getPlanetBlurb**(`planet`: _undefined_ \| Planet): _string_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _string_

---

### getPlanetBlurb2

▸ `Static` **getPlanetBlurb2**(`planet`: _undefined_ \| Planet): _string_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _string_

---

### getPlanetClass

▸ `Static` **getPlanetClass**(`planet`: Planet): UpgradeBranchName

#### Parameters

| Name     | Type   |
| :------- | :----- |
| `planet` | Planet |

**Returns:** UpgradeBranchName

---

### getPlanetCosmetic

▸ `Static` **getPlanetCosmetic**(`planet`: _undefined_ \| Planet): [_PlanetCosmeticInfo_](../interfaces/backend_utils_utilstypes.planetcosmeticinfo.md)

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** [_PlanetCosmeticInfo_](../interfaces/backend_utils_utilstypes.planetcosmeticinfo.md)

---

### getPlanetName

▸ `Static` **getPlanetName**(`planet`: _undefined_ \| Planet): _string_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _string_

---

### getPlanetNameHash

▸ `Static` **getPlanetNameHash**(`locId`: LocationId): _string_

#### Parameters

| Name    | Type       |
| :------ | :--------- |
| `locId` | LocationId |

**Returns:** _string_

---

### getPlanetTagline

▸ `Static` **getPlanetTagline**(`planet`: _undefined_ \| Planet): _string_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _string_

---

### getPlanetTitle

▸ `Static` **getPlanetTitle**(`planet`: _undefined_ \| Planet): _string_

#### Parameters

| Name     | Type                  |
| :------- | :-------------------- |
| `planet` | _undefined_ \| Planet |

**Returns:** _string_

---

### getPlayerColor

▸ `Static` **getPlayerColor**(`player`: EthAddress): _string_

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `player` | EthAddress |

**Returns:** _string_

---

### getPlayerColorVec

▸ `Static` **getPlayerColorVec**(`player`: EthAddress): [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)

#### Parameters

| Name     | Type       |
| :------- | :--------- |
| `player` | EthAddress |

**Returns:** [_RGBAVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbavec)

---

### getRuinsInfo

▸ `Static` **getRuinsInfo**(`loc`: LocationId): _Record_<PlanetLevel, { `props`: [*number*, *number*, *number*, *number*] ; `weights`: [*number*, *number*, *number*, *number*] }\>

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `loc` | LocationId |

**Returns:** _Record_<PlanetLevel, { `props`: [*number*, *number*, *number*, *number*] ; `weights`: [*number*, *number*, *number*, *number*] }\>

---

### hashToHue

▸ `Static` **hashToHue**(`hash`: _string_): _number_

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `hash` | _string_ |

**Returns:** _number_

---

### hashToInt

▸ `Static` **hashToInt**(`hash`: _string_): _number_

#### Parameters

| Name   | Type     |
| :----- | :------- |
| `hash` | _string_ |

**Returns:** _number_

---

### hslStr

▸ `Static` **hslStr**(`h`: _number_, `s`: _number_, `l`: _number_): _string_

#### Parameters

| Name | Type     |
| :--- | :------- |
| `h`  | _number_ |
| `s`  | _number_ |
| `l`  | _number_ |

**Returns:** _string_

---

### hslToRgb

▸ `Static` **hslToRgb**(`__namedParameters`: [_HSLVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#hslvec)): [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)

#### Parameters

| Name                | Type                                                                         |
| :------------------ | :--------------------------------------------------------------------------- |
| `__namedParameters` | [_HSLVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#hslvec) |

**Returns:** [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)

---

### planetPerlin

▸ `Static` **planetPerlin**(`loc`: LocationId): _function_

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `loc` | LocationId |

**Returns:** (`coords`: [_PixelCoords_](../modules/backend_procedural_procgenutils.md#pixelcoords)) => _number_

---

### planetRandom

▸ `Static` **planetRandom**(`loc`: LocationId): _function_

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `loc` | LocationId |

**Returns:** () => _number_

---

### planetRandomInt

▸ `Static` **planetRandomInt**(`loc`: LocationId): _function_

#### Parameters

| Name  | Type       |
| :---- | :--------- |
| `loc` | LocationId |

**Returns:** () => _number_

---

### rgbStr

▸ `Static` **rgbStr**(`rgb`: [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec)): _string_

#### Parameters

| Name  | Type                                                                         |
| :---- | :--------------------------------------------------------------------------- |
| `rgb` | [_RGBVec_](../modules/frontend_renderers_gamerenderer_enginetypes.md#rgbvec) |

**Returns:** _string_
