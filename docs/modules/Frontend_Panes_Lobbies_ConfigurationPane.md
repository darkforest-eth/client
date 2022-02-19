# Module: Frontend/Panes/Lobbies/ConfigurationPane

## Table of contents

### Functions

- [ConfigurationPane](Frontend_Panes_Lobbies_ConfigurationPane.md#configurationpane)

## Functions

### ConfigurationPane

▸ **ConfigurationPane**(`__namedParameters`): `Element`

#### Parameters

| Name                                                                   | Type                                                   |
| :--------------------------------------------------------------------- | :----------------------------------------------------- |
| `__namedParameters`                                                    | `Object`                                               |
| `__namedParameters.startingConfig`                                     | `Object`                                               |
| `__namedParameters.startingConfig.ABANDON_RANGE_CHANGE_PERCENT`        | `number`                                               |
| `__namedParameters.startingConfig.ABANDON_SPEED_CHANGE_PERCENT`        | `number`                                               |
| `__namedParameters.startingConfig.ADMIN_CAN_ADD_PLANETS`               | `boolean`                                              |
| `__namedParameters.startingConfig.ARTIFACT_POINT_VALUES`               | `Tuple6`<`number`\>                                    |
| `__namedParameters.startingConfig.BIOMEBASE_KEY`                       | `number`                                               |
| `__namedParameters.startingConfig.BIOME_THRESHOLD_1`                   | `number`                                               |
| `__namedParameters.startingConfig.BIOME_THRESHOLD_2`                   | `number`                                               |
| `__namedParameters.startingConfig.CAPTURE_ZONES_ENABLED`               | `boolean`                                              |
| `__namedParameters.startingConfig.CAPTURE_ZONES_PER_5000_WORLD_RADIUS` | `number`                                               |
| `__namedParameters.startingConfig.CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL`  | `number`                                               |
| `__namedParameters.startingConfig.CAPTURE_ZONE_COUNT`                  | `number`                                               |
| `__namedParameters.startingConfig.CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED`   | `number`                                               |
| `__namedParameters.startingConfig.CAPTURE_ZONE_PLANET_LEVEL_SCORE`     | `ExactArray10`<`number`\>                              |
| `__namedParameters.startingConfig.CAPTURE_ZONE_RADIUS`                 | `number`                                               |
| `__namedParameters.startingConfig.CLAIM_PLANET_COOLDOWN`               | `number`                                               |
| `__namedParameters.startingConfig.DISABLE_ZK_CHECKS`                   | `boolean`                                              |
| `__namedParameters.startingConfig.INIT_PERLIN_MAX`                     | `number`                                               |
| `__namedParameters.startingConfig.INIT_PERLIN_MIN`                     | `number`                                               |
| `__namedParameters.startingConfig.LOCATION_REVEAL_COOLDOWN`            | `number`                                               |
| `__namedParameters.startingConfig.MAX_NATURAL_PLANET_LEVEL`            | `number`                                               |
| `__namedParameters.startingConfig.PERLIN_LENGTH_SCALE`                 | `number`                                               |
| `__namedParameters.startingConfig.PERLIN_MIRROR_X`                     | `boolean`                                              |
| `__namedParameters.startingConfig.PERLIN_MIRROR_Y`                     | `boolean`                                              |
| `__namedParameters.startingConfig.PERLIN_THRESHOLD_1`                  | `number`                                               |
| `__namedParameters.startingConfig.PERLIN_THRESHOLD_2`                  | `number`                                               |
| `__namedParameters.startingConfig.PERLIN_THRESHOLD_3`                  | `number`                                               |
| `__namedParameters.startingConfig.PHOTOID_ACTIVATION_DELAY`            | `number`                                               |
| `__namedParameters.startingConfig.PLANETHASH_KEY`                      | `number`                                               |
| `__namedParameters.startingConfig.PLANET_LEVEL_JUNK`                   | `ExactArray10`<`number`\>                              |
| `__namedParameters.startingConfig.PLANET_LEVEL_THRESHOLDS`             | `ExactArray10`<`number`\>                              |
| `__namedParameters.startingConfig.PLANET_RARITY`                       | `number`                                               |
| `__namedParameters.startingConfig.PLANET_TRANSFER_ENABLED`             | `boolean`                                              |
| `__namedParameters.startingConfig.PLANET_TYPE_WEIGHTS`                 | `PlanetTypeWeights`                                    |
| `__namedParameters.startingConfig.SILVER_SCORE_VALUE`                  | `number`                                               |
| `__namedParameters.startingConfig.SPACETYPE_KEY`                       | `number`                                               |
| `__namedParameters.startingConfig.SPACE_JUNK_ENABLED`                  | `boolean`                                              |
| `__namedParameters.startingConfig.SPACE_JUNK_LIMIT`                    | `number`                                               |
| `__namedParameters.startingConfig.SPAWN_RIM_AREA`                      | `number`                                               |
| `__namedParameters.startingConfig.START_PAUSED`                        | `boolean`                                              |
| `__namedParameters.startingConfig.TIME_FACTOR_HUNDREDTHS`              | `number`                                               |
| `__namedParameters.startingConfig.TOKEN_MINT_END_TIMESTAMP`            | `number`                                               |
| `__namedParameters.startingConfig.WORLD_RADIUS_LOCKED`                 | `boolean`                                              |
| `__namedParameters.startingConfig.WORLD_RADIUS_MIN`                    | `number`                                               |
| `__namedParameters.onCreate`                                           | (`config`: `Partial`<`Object`\>) => `Promise`<`void`\> |

#### Returns

`Element`
