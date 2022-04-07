# Module: Frontend/Panes/Lobbies/LobbiesUtils

## Table of contents

### Interfaces

- [LobbiesPaneProps](../interfaces/Frontend_Panes_Lobbies_LobbiesUtils.LobbiesPaneProps.md)

### Variables

- [ButtonRow](Frontend_Panes_Lobbies_LobbiesUtils.md#buttonrow)

### Functions

- [ConfigDownload](Frontend_Panes_Lobbies_LobbiesUtils.md#configdownload)
- [ConfigUpload](Frontend_Panes_Lobbies_LobbiesUtils.md#configupload)
- [LinkButton](Frontend_Panes_Lobbies_LobbiesUtils.md#linkbutton)
- [NavigationTitle](Frontend_Panes_Lobbies_LobbiesUtils.md#navigationtitle)
- [Warning](Frontend_Panes_Lobbies_LobbiesUtils.md#warning)

## Variables

### ButtonRow

• `Const` **ButtonRow**: `StyledComponent`<`ForwardRefExoticComponent`<`Partial`<`Omit`<`DarkForestRow`, `"children"`\>\> & `Events`<`unknown`\> & `HTMLAttributes`<`HTMLElement`\> & {} & `RefAttributes`<`unknown`\>\>, `any`, {}, `never`\>

## Functions

### ConfigDownload

▸ **ConfigDownload**(`__namedParameters`): `Element`

#### Parameters

| Name                        | Type                                                                     |
| :-------------------------- | :----------------------------------------------------------------------- |
| `__namedParameters`         | `Object`                                                                 |
| `__namedParameters.address` | `undefined` \| `EthAddress`                                              |
| `__namedParameters.config`  | [`LobbyConfigState`](Frontend_Panes_Lobbies_Reducer.md#lobbyconfigstate) |
| `__namedParameters.onError` | (`msg`: `string`) => `void`                                              |

#### Returns

`Element`

---

### ConfigUpload

▸ **ConfigUpload**(`__namedParameters`): `Element`

#### Parameters

| Name                         | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `__namedParameters`          | `Object`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `__namedParameters.onError`  | (`msg`: `string`) => `void`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `__namedParameters.onUpload` | (`initializers`: { `ABANDON_RANGE_CHANGE_PERCENT`: `number` ; `ABANDON_SPEED_CHANGE_PERCENT`: `number` ; `ADMIN_CAN_ADD_PLANETS`: `boolean` ; `ARTIFACT_POINT_VALUES`: `Tuple6`<`number`\> ; `BIOMEBASE_KEY`: `number` ; `BIOME_THRESHOLD_1`: `number` ; `BIOME_THRESHOLD_2`: `number` ; `CAPTURE_ZONES_ENABLED`: `boolean` ; `CAPTURE_ZONES_PER_5000_WORLD_RADIUS`: `number` ; `CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL`: `number` ; `CAPTURE_ZONE_COUNT`: `number` ; `CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED`: `number` ; `CAPTURE_ZONE_PLANET_LEVEL_SCORE`: `ExactArray10`<`number`\> ; `CAPTURE_ZONE_RADIUS`: `number` ; `CLAIM_PLANET_COOLDOWN`: `number` ; `DISABLE_ZK_CHECKS`: `boolean` ; `INIT_PERLIN_MAX`: `number` ; `INIT_PERLIN_MIN`: `number` ; `LOCATION_REVEAL_COOLDOWN`: `number` ; `MAX_NATURAL_PLANET_LEVEL`: `number` ; `PERLIN_LENGTH_SCALE`: `number` ; `PERLIN_MIRROR_X`: `boolean` ; `PERLIN_MIRROR_Y`: `boolean` ; `PERLIN_THRESHOLD_1`: `number` ; `PERLIN_THRESHOLD_2`: `number` ; `PERLIN_THRESHOLD_3`: `number` ; `PHOTOID_ACTIVATION_DELAY`: `number` ; `PLANETHASH_KEY`: `number` ; `PLANET_LEVEL_JUNK`: `ExactArray10`<`number`\> ; `PLANET_LEVEL_THRESHOLDS`: `ExactArray10`<`number`\> ; `PLANET_RARITY`: `number` ; `PLANET_TRANSFER_ENABLED`: `boolean` ; `PLANET_TYPE_WEIGHTS`: `PlanetTypeWeights` ; `SILVER_SCORE_VALUE`: `number` ; `SPACETYPE_KEY`: `number` ; `SPACE_JUNK_ENABLED`: `boolean` ; `SPACE_JUNK_LIMIT`: `number` ; `SPAWN_RIM_AREA`: `number` ; `START_PAUSED`: `boolean` ; `TIME_FACTOR_HUNDREDTHS`: `number` ; `TOKEN_MINT_END_TIMESTAMP`: `number` ; `WORLD_RADIUS_LOCKED`: `boolean` ; `WORLD_RADIUS_MIN`: `number` }) => `void` |

#### Returns

`Element`

---

### LinkButton

▸ **LinkButton**(`__namedParameters`): `Element`

#### Parameters

| Name                | Type                                                             |
| :------------------ | :--------------------------------------------------------------- |
| `__namedParameters` | `PropsWithChildren`<{ `shortcut?`: `string` ; `to`: `string` }\> |

#### Returns

`Element`

---

### NavigationTitle

▸ **NavigationTitle**(`__namedParameters`): `Element`

#### Parameters

| Name                | Type     |
| :------------------ | :------- |
| `__namedParameters` | `Object` |

#### Returns

`Element`

---

### Warning

▸ **Warning**(`__namedParameters`): `null` \| `Element`

#### Parameters

| Name                | Type     |
| :------------------ | :------- |
| `__namedParameters` | `Object` |

#### Returns

`null` \| `Element`
