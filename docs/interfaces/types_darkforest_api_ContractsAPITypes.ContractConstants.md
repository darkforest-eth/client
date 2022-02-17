# Interface: ContractConstants

[\_types/darkforest/api/ContractsAPITypes](../modules/types_darkforest_api_ContractsAPITypes.md).ContractConstants

## Table of contents

### Properties

- [ARTIFACT_POINT_VALUES](types_darkforest_api_ContractsAPITypes.ContractConstants.md#artifact_point_values)
- [BIOMEBASE_KEY](types_darkforest_api_ContractsAPITypes.ContractConstants.md#biomebase_key)
- [BIOME_THRESHOLD_1](types_darkforest_api_ContractsAPITypes.ContractConstants.md#biome_threshold_1)
- [BIOME_THRESHOLD_2](types_darkforest_api_ContractsAPITypes.ContractConstants.md#biome_threshold_2)
- [CLAIM_PLANET_COOLDOWN](types_darkforest_api_ContractsAPITypes.ContractConstants.md#claim_planet_cooldown)
- [DISABLE_ZK_CHECKS](types_darkforest_api_ContractsAPITypes.ContractConstants.md#disable_zk_checks)
- [INIT_PERLIN_MAX](types_darkforest_api_ContractsAPITypes.ContractConstants.md#init_perlin_max)
- [INIT_PERLIN_MIN](types_darkforest_api_ContractsAPITypes.ContractConstants.md#init_perlin_min)
- [LOCATION_REVEAL_COOLDOWN](types_darkforest_api_ContractsAPITypes.ContractConstants.md#location_reveal_cooldown)
- [MAX_NATURAL_PLANET_LEVEL](types_darkforest_api_ContractsAPITypes.ContractConstants.md#max_natural_planet_level)
- [PERLIN_LENGTH_SCALE](types_darkforest_api_ContractsAPITypes.ContractConstants.md#perlin_length_scale)
- [PERLIN_MIRROR_X](types_darkforest_api_ContractsAPITypes.ContractConstants.md#perlin_mirror_x)
- [PERLIN_MIRROR_Y](types_darkforest_api_ContractsAPITypes.ContractConstants.md#perlin_mirror_y)
- [PERLIN_THRESHOLD_1](types_darkforest_api_ContractsAPITypes.ContractConstants.md#perlin_threshold_1)
- [PERLIN_THRESHOLD_2](types_darkforest_api_ContractsAPITypes.ContractConstants.md#perlin_threshold_2)
- [PERLIN_THRESHOLD_3](types_darkforest_api_ContractsAPITypes.ContractConstants.md#perlin_threshold_3)
- [PHOTOID_ACTIVATION_DELAY](types_darkforest_api_ContractsAPITypes.ContractConstants.md#photoid_activation_delay)
- [PLANETHASH_KEY](types_darkforest_api_ContractsAPITypes.ContractConstants.md#planethash_key)
- [PLANET_RARITY](types_darkforest_api_ContractsAPITypes.ContractConstants.md#planet_rarity)
- [PLANET_TYPE_WEIGHTS](types_darkforest_api_ContractsAPITypes.ContractConstants.md#planet_type_weights)
- [SPACETYPE_KEY](types_darkforest_api_ContractsAPITypes.ContractConstants.md#spacetype_key)
- [SPAWN_RIM_AREA](types_darkforest_api_ContractsAPITypes.ContractConstants.md#spawn_rim_area)
- [TIME_FACTOR_HUNDREDTHS](types_darkforest_api_ContractsAPITypes.ContractConstants.md#time_factor_hundredths)
- [TOKEN_MINT_END_SECONDS](types_darkforest_api_ContractsAPITypes.ContractConstants.md#token_mint_end_seconds)
- [defaultBarbarianPercentage](types_darkforest_api_ContractsAPITypes.ContractConstants.md#defaultbarbarianpercentage)
- [defaultDefense](types_darkforest_api_ContractsAPITypes.ContractConstants.md#defaultdefense)
- [defaultPopulationCap](types_darkforest_api_ContractsAPITypes.ContractConstants.md#defaultpopulationcap)
- [defaultPopulationGrowth](types_darkforest_api_ContractsAPITypes.ContractConstants.md#defaultpopulationgrowth)
- [defaultRange](types_darkforest_api_ContractsAPITypes.ContractConstants.md#defaultrange)
- [defaultSilverCap](types_darkforest_api_ContractsAPITypes.ContractConstants.md#defaultsilvercap)
- [defaultSilverGrowth](types_darkforest_api_ContractsAPITypes.ContractConstants.md#defaultsilvergrowth)
- [defaultSpeed](types_darkforest_api_ContractsAPITypes.ContractConstants.md#defaultspeed)
- [planetCumulativeRarities](types_darkforest_api_ContractsAPITypes.ContractConstants.md#planetcumulativerarities)
- [planetLevelThresholds](types_darkforest_api_ContractsAPITypes.ContractConstants.md#planetlevelthresholds)
- [upgrades](types_darkforest_api_ContractsAPITypes.ContractConstants.md#upgrades)

## Properties

### ARTIFACT_POINT_VALUES

• **ARTIFACT_POINT_VALUES**: `ArtifactPointValues`

---

### BIOMEBASE_KEY

• **BIOMEBASE_KEY**: `number`

---

### BIOME_THRESHOLD_1

• **BIOME_THRESHOLD_1**: `number`

---

### BIOME_THRESHOLD_2

• **BIOME_THRESHOLD_2**: `number`

---

### CLAIM_PLANET_COOLDOWN

• `Optional` **CLAIM_PLANET_COOLDOWN**: `number`

---

### DISABLE_ZK_CHECKS

• **DISABLE_ZK_CHECKS**: `boolean`

---

### INIT_PERLIN_MAX

• **INIT_PERLIN_MAX**: `number`

---

### INIT_PERLIN_MIN

• **INIT_PERLIN_MIN**: `number`

---

### LOCATION_REVEAL_COOLDOWN

• **LOCATION_REVEAL_COOLDOWN**: `number`

---

### MAX_NATURAL_PLANET_LEVEL

• **MAX_NATURAL_PLANET_LEVEL**: `number`

---

### PERLIN_LENGTH_SCALE

• **PERLIN_LENGTH_SCALE**: `number`

---

### PERLIN_MIRROR_X

• **PERLIN_MIRROR_X**: `boolean`

---

### PERLIN_MIRROR_Y

• **PERLIN_MIRROR_Y**: `boolean`

---

### PERLIN_THRESHOLD_1

• **PERLIN_THRESHOLD_1**: `number`

The perlin value at each coordinate determines the space type. There are four space
types, which means there are four ranges on the number line that correspond to
each space type. This function returns the boundary values between each of these
four ranges: `PERLIN_THRESHOLD_1`, `PERLIN_THRESHOLD_2`, `PERLIN_THRESHOLD_3`.

---

### PERLIN_THRESHOLD_2

• **PERLIN_THRESHOLD_2**: `number`

---

### PERLIN_THRESHOLD_3

• **PERLIN_THRESHOLD_3**: `number`

---

### PHOTOID_ACTIVATION_DELAY

• **PHOTOID_ACTIVATION_DELAY**: `number`

---

### PLANETHASH_KEY

• **PLANETHASH_KEY**: `number`

---

### PLANET_RARITY

• **PLANET_RARITY**: `number`

---

### PLANET_TYPE_WEIGHTS

• **PLANET_TYPE_WEIGHTS**: [`PlanetTypeWeightsBySpaceType`](../modules/types_darkforest_api_ContractsAPITypes.md#planettypeweightsbyspacetype)

---

### SPACETYPE_KEY

• **SPACETYPE_KEY**: `number`

---

### SPAWN_RIM_AREA

• **SPAWN_RIM_AREA**: `number`

---

### TIME_FACTOR_HUNDREDTHS

• **TIME_FACTOR_HUNDREDTHS**: `number`

---

### TOKEN_MINT_END_SECONDS

• **TOKEN_MINT_END_SECONDS**: `number`

---

### defaultBarbarianPercentage

• **defaultBarbarianPercentage**: `number`[]

---

### defaultDefense

• **defaultDefense**: `number`[]

---

### defaultPopulationCap

• **defaultPopulationCap**: `number`[]

---

### defaultPopulationGrowth

• **defaultPopulationGrowth**: `number`[]

---

### defaultRange

• **defaultRange**: `number`[]

---

### defaultSilverCap

• **defaultSilverCap**: `number`[]

---

### defaultSilverGrowth

• **defaultSilverGrowth**: `number`[]

---

### defaultSpeed

• **defaultSpeed**: `number`[]

---

### planetCumulativeRarities

• **planetCumulativeRarities**: `number`[]

---

### planetLevelThresholds

• **planetLevelThresholds**: `number`[]

---

### upgrades

• **upgrades**: `UpgradeBranches`
