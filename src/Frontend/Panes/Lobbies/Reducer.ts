import { Initializers } from '@darkforest_eth/settings';

export const SAFE_UPPER_BOUNDS = Number.MAX_SAFE_INTEGER - 1;

export class InvalidConfigError extends Error {
  key: string;
  value: unknown | undefined;

  constructor(msg: string, key: string, value: unknown) {
    super(msg);

    this.key = key;
    // Handling number and strings - if we add an object value, this will assign it
    if (!Array.isArray(value)) {
      this.value = value;
    }
  }
}

// Throws an error if any warnings exist
export function toInitializers(obj: LobbyConfigState) {
  const filtered: Record<string, unknown> = {};
  for (const [key, { currentValue, displayValue, warning }] of Object.entries(obj)) {
    if (warning) {
      // displayValue is the invalid value, so we use that as the "value"
      throw new InvalidConfigError(warning, key, displayValue);
    }
    filtered[key] = currentValue;
  }
  return filtered as LobbyInitializers;
}

// Actions aren't 1-to-1 with Initializers because we sometimes need to update into arrays
export type LobbyConfigAction =
  | { type: 'START_PAUSED'; value: Initializers['START_PAUSED'] | undefined }
  | { type: 'ADMIN_CAN_ADD_PLANETS'; value: Initializers['ADMIN_CAN_ADD_PLANETS'] | undefined }
  | {
      type: 'TOKEN_MINT_END_TIMESTAMP';
      value: Initializers['TOKEN_MINT_END_TIMESTAMP'] | undefined;
    }
  | { type: 'WORLD_RADIUS_LOCKED'; value: Initializers['WORLD_RADIUS_LOCKED'] | undefined }
  | { type: 'WORLD_RADIUS_MIN'; value: Initializers['WORLD_RADIUS_MIN'] | undefined }
  | { type: 'DISABLE_ZK_CHECKS'; value: Initializers['DISABLE_ZK_CHECKS'] | undefined }
  | { type: 'PLANETHASH_KEY'; value: Initializers['PLANETHASH_KEY'] | undefined }
  | { type: 'SPACETYPE_KEY'; value: Initializers['SPACETYPE_KEY'] | undefined }
  | { type: 'BIOMEBASE_KEY'; value: Initializers['BIOMEBASE_KEY'] | undefined }
  | { type: 'PERLIN_MIRROR_X'; value: Initializers['PERLIN_MIRROR_X'] | undefined }
  | { type: 'PERLIN_MIRROR_Y'; value: Initializers['PERLIN_MIRROR_Y'] | undefined }
  | { type: 'PERLIN_LENGTH_SCALE'; value: Initializers['PERLIN_LENGTH_SCALE'] | undefined }
  | {
      type: 'MAX_NATURAL_PLANET_LEVEL';
      value: Initializers['MAX_NATURAL_PLANET_LEVEL'] | undefined;
    }
  | { type: 'TIME_FACTOR_HUNDREDTHS'; value: Initializers['TIME_FACTOR_HUNDREDTHS'] | undefined }
  | { type: 'PERLIN_THRESHOLD_1'; value: Initializers['PERLIN_THRESHOLD_1'] | undefined }
  | { type: 'PERLIN_THRESHOLD_2'; value: Initializers['PERLIN_THRESHOLD_2'] | undefined }
  | { type: 'PERLIN_THRESHOLD_3'; value: Initializers['PERLIN_THRESHOLD_3'] | undefined }
  | { type: 'INIT_PERLIN_MIN'; value: Initializers['INIT_PERLIN_MIN'] | undefined }
  | { type: 'INIT_PERLIN_MAX'; value: Initializers['INIT_PERLIN_MAX'] | undefined }
  | { type: 'BIOME_THRESHOLD_1'; value: Initializers['BIOME_THRESHOLD_1'] | undefined }
  | { type: 'BIOME_THRESHOLD_2'; value: Initializers['BIOME_THRESHOLD_2'] | undefined }
  | { type: 'PLANET_LEVEL_THRESHOLDS'; value: number | undefined; index: number }
  | { type: 'PLANET_RARITY'; value: Initializers['PLANET_RARITY'] | undefined }
  | { type: 'PLANET_TRANSFER_ENABLED'; value: Initializers['PLANET_TRANSFER_ENABLED'] | undefined }
  | {
      type: 'PHOTOID_ACTIVATION_DELAY';
      value: Initializers['PHOTOID_ACTIVATION_DELAY'] | undefined;
    }
  | { type: 'SPAWN_RIM_AREA'; value: Initializers['SPAWN_RIM_AREA'] | undefined }
  | {
      type: 'LOCATION_REVEAL_COOLDOWN';
      value: Initializers['LOCATION_REVEAL_COOLDOWN'] | undefined;
    }
  // TODO(#2134): Add to UI when this scoring functionality is re-enabled
  // | { type: 'CLAIM_PLANET_COOLDOWN'; value: Initializers['CLAIM_PLANET_COOLDOWN'] | undefined }
  | { type: 'PLANET_TYPE_WEIGHTS'; value: Initializers['PLANET_TYPE_WEIGHTS'] | undefined }
  | { type: 'SILVER_SCORE_VALUE'; value: Initializers['SILVER_SCORE_VALUE'] | undefined }
  | {
      type: 'ARTIFACT_POINT_VALUES';
      value: number | undefined;
      index: number;
    }
  | { type: 'SPACE_JUNK_ENABLED'; value: Initializers['SPACE_JUNK_ENABLED'] | undefined }
  | { type: 'SPACE_JUNK_LIMIT'; value: Initializers['SPACE_JUNK_LIMIT'] | undefined }
  | { type: 'PLANET_LEVEL_JUNK'; index: number; value: number | undefined }
  | {
      type: 'ABANDON_SPEED_CHANGE_PERCENT';
      value: Initializers['ABANDON_SPEED_CHANGE_PERCENT'] | undefined;
    }
  | {
      type: 'ABANDON_RANGE_CHANGE_PERCENT';
      value: Initializers['ABANDON_RANGE_CHANGE_PERCENT'] | undefined;
    }
  | { type: 'CAPTURE_ZONES_ENABLED'; value: Initializers['CAPTURE_ZONES_ENABLED'] | undefined }
  // TODO(#2299): Add to UI when this functionality is implemented
  // | { type: 'CAPTURE_ZONE_COUNT'; value: Initializers['CAPTURE_ZONE_COUNT'] | undefined }
  | {
      type: 'CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL';
      value: Initializers['CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL'] | undefined;
    }
  | { type: 'CAPTURE_ZONE_RADIUS'; value: Initializers['CAPTURE_ZONE_RADIUS'] | undefined }
  | {
      type: 'CAPTURE_ZONE_PLANET_LEVEL_SCORE';
      value: number | undefined;
      index: number;
    }
  | {
      type: 'CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED';
      value: Initializers['CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED'] | undefined;
    }
  | {
      type: 'CAPTURE_ZONES_PER_5000_WORLD_RADIUS';
      value: Initializers['CAPTURE_ZONES_PER_5000_WORLD_RADIUS'] | undefined;
    }
  | { type: 'WHITELIST_ENABLED'; value: boolean | undefined };

// TODO(#2328): WHITELIST_ENABLED should just be on Initializers
export type LobbyInitializers = Initializers & { WHITELIST_ENABLED: boolean | undefined };

export type LobbyConfigState = {
  [key in keyof LobbyInitializers]: {
    currentValue: LobbyInitializers[key];
    displayValue: Partial<LobbyInitializers[key]> | undefined;
    defaultValue: LobbyInitializers[key];
    warning: string | undefined;
  };
};

export type LobbyAction = { type: 'RESET'; value: LobbyConfigState } | LobbyConfigAction;

export function lobbyConfigReducer(state: LobbyConfigState, action: LobbyAction) {
  let update;
  switch (action.type) {
    case 'START_PAUSED': {
      update = ofBoolean(action, state);
      break;
    }
    case 'ADMIN_CAN_ADD_PLANETS': {
      update = ofBoolean(action, state);
      break;
    }
    case 'TOKEN_MINT_END_TIMESTAMP': {
      // TODO: Date
      update = ofAny(action, state);
      break;
    }
    case 'WORLD_RADIUS_LOCKED': {
      update = ofBoolean(action, state);
      break;
    }
    case 'WORLD_RADIUS_MIN': {
      update = ofWorldRadiusMin(action, state);
      break;
    }
    case 'DISABLE_ZK_CHECKS': {
      update = ofBoolean(action, state);
      break;
    }
    case 'PLANETHASH_KEY': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'SPACETYPE_KEY': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'BIOMEBASE_KEY': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'PERLIN_MIRROR_X': {
      update = ofBoolean(action, state);
      break;
    }
    case 'PERLIN_MIRROR_Y': {
      update = ofBoolean(action, state);
      break;
    }
    case 'PERLIN_LENGTH_SCALE': {
      update = ofPerlinLengthScale(action, state);
      break;
    }
    case 'MAX_NATURAL_PLANET_LEVEL': {
      update = ofMaxNaturalPlanetLevel(action, state);
      break;
    }
    case 'TIME_FACTOR_HUNDREDTHS': {
      update = ofTimeFactorHundredths(action, state);
      break;
    }
    case 'PERLIN_THRESHOLD_1': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'PERLIN_THRESHOLD_2': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'PERLIN_THRESHOLD_3': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'INIT_PERLIN_MIN': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'INIT_PERLIN_MAX': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'BIOME_THRESHOLD_1': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'BIOME_THRESHOLD_2': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'PLANET_LEVEL_THRESHOLDS': {
      update = ofPlanetLevelThresholds(action, state);
      break;
    }
    case 'PLANET_RARITY': {
      update = ofPlanetRarity(action, state);
      break;
    }
    case 'PLANET_TRANSFER_ENABLED': {
      update = ofBoolean(action, state);
      break;
    }
    case 'PHOTOID_ACTIVATION_DELAY': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'SPAWN_RIM_AREA': {
      update = ofSpawnRimArea(action, state);
      break;
    }
    case 'LOCATION_REVEAL_COOLDOWN': {
      update = ofPositiveInteger(action, state);
      break;
    }
    // TODO(#2134): Add to UI when this scoring functionality is re-enabled
    // case 'CLAIM_PLANET_COOLDOWN': {
    //   update = ofPositiveInteger(action, state);
    //   break;
    // }
    case 'PLANET_TYPE_WEIGHTS': {
      // TODO: Add this
      update = ofNoop(action, state);
      break;
    }
    case 'SILVER_SCORE_VALUE': {
      update = ofPositivePercent(action, state);
      break;
    }
    case 'ARTIFACT_POINT_VALUES': {
      update = ofArtifactPointValues(action, state);
      break;
    }
    case 'SPACE_JUNK_ENABLED': {
      update = ofBoolean(action, state);
      break;
    }
    case 'SPACE_JUNK_LIMIT': {
      update = ofSpaceJunkLimit(action, state);
      break;
    }
    case 'PLANET_LEVEL_JUNK': {
      update = ofPlanetLevelJunk(action, state);
      break;
    }
    case 'ABANDON_SPEED_CHANGE_PERCENT': {
      update = ofPositivePercent(action, state);
      break;
    }
    case 'ABANDON_RANGE_CHANGE_PERCENT': {
      update = ofPositivePercent(action, state);
      break;
    }
    case 'CAPTURE_ZONES_ENABLED': {
      update = ofBoolean(action, state);
      break;
    }
    // TODO(#2299): Add to UI when this functionality is implemented
    // case 'CAPTURE_ZONE_COUNT': {
    //   update = ofPositiveInteger(action, state);
    //   break;
    // }
    case 'CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL': {
      update = ofCaptureZoneChangeBlockInterval(action, state);
      break;
    }
    case 'CAPTURE_ZONE_RADIUS': {
      update = ofCaptureZoneRadius(action, state);
      break;
    }
    case 'CAPTURE_ZONE_PLANET_LEVEL_SCORE': {
      update = ofCaptureZonePlanetLevelScore(action, state);
      break;
    }
    case 'CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED': {
      update = ofPositiveInteger(action, state);
      break;
    }
    case 'CAPTURE_ZONES_PER_5000_WORLD_RADIUS': {
      update = ofCaptureZonesPer5000WorldRadius(action, state);
      break;
    }
    case 'WHITELIST_ENABLED': {
      update = ofBoolean(action, state);
      break;
    }
    case 'RESET': {
      // Hard reset all values that were available in the JSON
      return {
        ...state,
        ...action.value,
      };
    }
    default: {
      // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
      const _exhaustive: never = action;
      // Return the state if somehow we hit this
      return state;
    }
  }
  return {
    ...state,
    [action.type]: update,
  };
}

export function lobbyConfigInit(startingConfig: LobbyInitializers) {
  const state: Partial<LobbyConfigState> = {};
  for (const key of Object.keys(startingConfig) as [keyof LobbyInitializers]) {
    switch (key) {
      case 'START_PAUSED': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'ADMIN_CAN_ADD_PLANETS': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'TOKEN_MINT_END_TIMESTAMP': {
        // TODO: Handle dates
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'WORLD_RADIUS_LOCKED': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'WORLD_RADIUS_MIN': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'DISABLE_ZK_CHECKS': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PLANETHASH_KEY': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'SPACETYPE_KEY': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'BIOMEBASE_KEY': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PERLIN_MIRROR_X': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PERLIN_MIRROR_Y': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PERLIN_LENGTH_SCALE': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: Math.log2(defaultValue),
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'MAX_NATURAL_PLANET_LEVEL': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'TIME_FACTOR_HUNDREDTHS': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: Math.floor(defaultValue / 100),
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PERLIN_THRESHOLD_1': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PERLIN_THRESHOLD_2': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PERLIN_THRESHOLD_3': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'INIT_PERLIN_MIN': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'INIT_PERLIN_MAX': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'BIOME_THRESHOLD_1': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'BIOME_THRESHOLD_2': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PLANET_LEVEL_THRESHOLDS': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PLANET_RARITY': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PLANET_TRANSFER_ENABLED': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PHOTOID_ACTIVATION_DELAY': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'SPAWN_RIM_AREA': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: Math.sqrt(defaultValue / Math.PI),
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'LOCATION_REVEAL_COOLDOWN': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'CLAIM_PLANET_COOLDOWN': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PLANET_TYPE_WEIGHTS': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'SILVER_SCORE_VALUE': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue / 100,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'ARTIFACT_POINT_VALUES': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'SPACE_JUNK_ENABLED': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'SPACE_JUNK_LIMIT': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'PLANET_LEVEL_JUNK': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'ABANDON_SPEED_CHANGE_PERCENT': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue / 100,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'ABANDON_RANGE_CHANGE_PERCENT': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue / 100,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'CAPTURE_ZONES_ENABLED': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'CAPTURE_ZONE_COUNT': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'CAPTURE_ZONE_RADIUS': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'CAPTURE_ZONE_PLANET_LEVEL_SCORE': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'CAPTURE_ZONES_PER_5000_WORLD_RADIUS': {
        const defaultValue = startingConfig[key];
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      case 'WHITELIST_ENABLED': {
        // Default this to false if we don't have it
        const defaultValue = startingConfig[key] || false;
        state[key] = {
          currentValue: defaultValue,
          displayValue: defaultValue,
          defaultValue,
          warning: undefined,
        };
        break;
      }
      default: {
        // https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
        const _exhaustive: never = key;
        // Just ignore any values that we don't know about
        break;
      }
    }
  }

  return state as LobbyConfigState;
}

export function ofNoop({ type }: LobbyConfigAction, state: LobbyConfigState) {
  return {
    ...state[type],
  };
}

export function ofAny({ type, value }: LobbyConfigAction, state: LobbyConfigState) {
  return {
    ...state[type],
    currentValue: value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofBoolean(
  { type, value }: Extract<LobbyConfigAction, { value: boolean | undefined }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  } else {
    return {
      ...state[type],
      currentValue: value,
      displayValue: value,
      warning: undefined,
    };
  }
}

export function ofPositiveInteger(
  { type, value }: Extract<LobbyConfigAction, { value: number | undefined }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a number`,
    };
  }

  if (value < 0) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a positive integer`,
    };
  }

  if (value > SAFE_UPPER_BOUNDS) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value is too large`,
    };
  }

  if (Math.floor(value) !== value) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be an integer`,
    };
  }

  return {
    ...state[type],
    currentValue: value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofPositiveFloat(
  { type, value }: Extract<LobbyConfigAction, { value: number | undefined }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a number`,
    };
  }

  if (value < 0) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a positive number`,
    };
  }

  if (value > SAFE_UPPER_BOUNDS) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value is too large`,
    };
  }

  return {
    ...state[type],
    currentValue: value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofPositivePercent(
  { type, value }: Extract<LobbyConfigAction, { value: number | undefined }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: 'Value must be a number',
    };
  }

  if (value < 0) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a positive number`,
    };
  }

  if (value !== 0 && value < 0.01) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value is too small`,
    };
  }

  if (value > SAFE_UPPER_BOUNDS) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value is too large`,
    };
  }

  return {
    currentValue: Math.floor(100 * value),
    displayValue: value,
    warning: undefined,
  };
}

export function ofWorldRadiusMin(
  { type, value }: Extract<LobbyConfigAction, { type: 'WORLD_RADIUS_MIN' }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a number`,
    };
  }

  if (value < 0) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be positive`,
    };
  }

  if (Math.floor(value) !== value) {
    return {
      ...state[type],
      displayValue: value,
      warning: 'Value must be an integer',
    };
  }

  if (value < 1000) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Worlds smaller than 1000 are unlikely to have spawnable area`,
    };
  }

  if (value > SAFE_UPPER_BOUNDS) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Worlds can't be initialized with that large of a minimum radius`,
    };
  }

  return {
    ...state[type],
    currentValue: value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofPerlinLengthScale(
  { type, value }: Extract<LobbyConfigAction, { type: 'PERLIN_LENGTH_SCALE' }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: 'Value must be a number',
    };
  }

  return {
    ...state[type],
    currentValue: 2 ** value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofMaxNaturalPlanetLevel(
  { type, value }: Extract<LobbyConfigAction, { type: 'MAX_NATURAL_PLANET_LEVEL' }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a number`,
    };
  }

  if (value < 0) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a positive integer`,
    };
  }

  if (value > 9) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Planets can't naturally be larger than Level 9`,
    };
  }

  if (Math.floor(value) !== value) {
    return {
      ...state[type],
      displayValue: value,
      warning: 'Value must be an integer',
    };
  }

  return {
    ...state[type],
    currentValue: value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofTimeFactorHundredths(
  { type, value }: Extract<LobbyConfigAction, { type: 'TIME_FACTOR_HUNDREDTHS' }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: 'Value must be a number',
    };
  }

  if (value < 1) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be greater than 0`,
    };
  }

  if (Math.floor(value) !== value) {
    return {
      ...state[type],
      displayValue: value,
      warning: 'Value must be an integer',
    };
  }

  return {
    ...state[type],
    currentValue: Math.floor(100 * value),
    displayValue: value,
    warning: undefined,
  };
}

export function ofPlanetRarity(
  { type, value }: Extract<LobbyConfigAction, { type: 'PLANET_RARITY' }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a number`,
    };
  }

  if (value < 1) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be greater than 0`,
    };
  }

  if (value > SAFE_UPPER_BOUNDS) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value is too large`,
    };
  }

  if (Math.floor(value) !== value) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be an integer`,
    };
  }

  return {
    ...state[type],
    currentValue: value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofSpawnRimArea(
  { type, value }: Extract<LobbyConfigAction, { type: 'SPAWN_RIM_AREA' }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: 'Value must be a number',
    };
  }

  // The `0` value disables this feature
  if (value === 0) {
    return {
      ...state[type],
      currentValue: value,
      displayValue: value,
      warning: undefined,
    };
  }

  const currentValue = Math.floor(Math.PI * value ** 2);

  if (currentValue < 1000) {
    return {
      ...state[type],
      displayValue: value,
      warning: 'Spawnable area must be larger',
    };
  }

  // Using 1 billion instead of SAFE_UPPER_BOUNDS because math is done against this and don't want to lose precision
  if (currentValue > 1_000_000_000) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Spawnable area is too large, instead use 0 to disable`,
    };
  }

  return {
    ...state[type],
    currentValue,
    displayValue: value,
    warning: undefined,
  };
}

export function ofSpaceJunkLimit(
  { type, value }: Extract<LobbyConfigAction, { type: 'SPACE_JUNK_LIMIT' }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: 'Value must be a number',
    };
  }

  if (value < 1) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be greated than 0`,
    };
  }

  if (value > SAFE_UPPER_BOUNDS) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value is too large`,
    };
  }

  if (state.PLANET_LEVEL_JUNK.currentValue) {
    let warning;

    // Validate that every planet can be captured within SPACE_JUNK_LIMIT
    state.PLANET_LEVEL_JUNK.currentValue.forEach((junkAmount, planetLevel) => {
      if (value < junkAmount) {
        warning = `You'd be unable to capture Level ${planetLevel} planets with that Space Junk Limit`;
      }
    });

    if (warning) {
      return {
        ...state[type],
        displayValue: value,
        warning,
      };
    }
  }

  if (Math.floor(value) !== value) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be an integer`,
    };
  }

  return {
    ...state[type],
    currentValue: value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofPlanetLevelJunk(
  { type, index, value }: Extract<LobbyConfigAction, { type: 'PLANET_LEVEL_JUNK' }>,
  state: LobbyConfigState
) {
  const prevCurrentValue = state[type].currentValue;
  const prevDisplayValue = state[type].displayValue;
  const spaceJunk = state.SPACE_JUNK_LIMIT.currentValue;

  if (!prevDisplayValue) {
    return {
      ...state[type],
      warning: `Failed to update ${type}`,
    };
  }

  if (value === undefined) {
    return {
      ...state[type],
      warning: undefined,
    };
  }

  const currentValue = [...prevCurrentValue];
  const displayValue = [...prevDisplayValue];

  displayValue[index] = value;

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue,
      warning: `Value must be a number`,
    };
  }

  if (value < 0) {
    return {
      ...state[type],
      displayValue,
      warning: `Value must be positive`,
    };
  }

  if (value > SAFE_UPPER_BOUNDS) {
    return {
      ...state[type],
      displayValue,
      warning: `Value is too large`,
    };
  }

  if (spaceJunk < value) {
    return {
      currentValue,
      displayValue,
      warning: `Space junk on Level ${index} planets would exceed the Space Junk Limit`,
    };
  }

  currentValue[index] = value;

  return {
    ...state[type],
    currentValue,
    displayValue,
    warning: undefined,
  };
}

export function ofArtifactPointValues(
  { type, index, value }: Extract<LobbyConfigAction, { type: 'ARTIFACT_POINT_VALUES' }>,
  state: LobbyConfigState
) {
  const prevCurrentValue = state[type].currentValue;
  const prevDisplayValue = state[type].displayValue;

  if (!prevDisplayValue) {
    return {
      ...state[type],
      warning: `Failed to update ${type}`,
    };
  }

  if (value === undefined) {
    return {
      ...state[type],
      warning: undefined,
    };
  }

  const currentValue = [...prevCurrentValue];
  const displayValue = [...prevDisplayValue];

  displayValue[index] = value;

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue,
      warning: `Value must be a number`,
    };
  }

  if (value < 0) {
    return {
      ...state[type],
      displayValue,
      warning: `Value must be positive`,
    };
  }

  if (value > SAFE_UPPER_BOUNDS) {
    return {
      ...state[type],
      displayValue,
      warning: `Value is too large`,
    };
  }

  currentValue[index] = value;

  return {
    ...state[type],
    currentValue,
    displayValue,
    warning: undefined,
  };
}

export function ofCaptureZoneRadius(
  { type, value }: Extract<LobbyConfigAction, { type: 'CAPTURE_ZONE_RADIUS' }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a number`,
    };
  }

  if (value < 1) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a greater than 0`,
    };
  }

  if (value > SAFE_UPPER_BOUNDS) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value is too large`,
    };
  }

  if (Math.floor(value) !== value) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be an integer`,
    };
  }

  return {
    ...state[type],
    currentValue: value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofCaptureZonesPer5000WorldRadius(
  { type, value }: Extract<LobbyConfigAction, { type: 'CAPTURE_ZONES_PER_5000_WORLD_RADIUS' }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a number`,
    };
  }

  if (value < 1) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a greater than 0`,
    };
  }

  if (value > 10) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value is too large`,
    };
  }

  if (Math.floor(value) !== value) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be an integer`,
    };
  }

  return {
    ...state[type],
    currentValue: value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofCaptureZoneChangeBlockInterval(
  { type, value }: Extract<LobbyConfigAction, { type: 'CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL' }>,
  state: LobbyConfigState
) {
  if (value === undefined) {
    return {
      ...state[type],
      displayValue: value,
      warning: undefined,
    };
  }

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a number`,
    };
  }

  if (value < 1) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be a greater than 0`,
    };
  }

  if (value > 255) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value is too large`,
    };
  }

  if (Math.floor(value) !== value) {
    return {
      ...state[type],
      displayValue: value,
      warning: `Value must be an integer`,
    };
  }

  return {
    ...state[type],
    currentValue: value,
    displayValue: value,
    warning: undefined,
  };
}

export function ofCaptureZonePlanetLevelScore(
  { type, index, value }: Extract<LobbyConfigAction, { type: 'CAPTURE_ZONE_PLANET_LEVEL_SCORE' }>,
  state: LobbyConfigState
) {
  const prevCurrentValue = state[type].currentValue;
  const prevDisplayValue = state[type].displayValue;

  if (!prevDisplayValue) {
    return {
      ...state[type],
      warning: `Failed to update ${type}`,
    };
  }

  if (value === undefined) {
    return {
      ...state[type],
      warning: undefined,
    };
  }

  const currentValue = [...prevCurrentValue];
  const displayValue = [...prevDisplayValue];

  displayValue[index] = value;

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue,
      warning: `Value must be a number`,
    };
  }

  if (value < 0) {
    return {
      ...state[type],
      displayValue,
      warning: `Value must be positive`,
    };
  }

  if (value > SAFE_UPPER_BOUNDS) {
    return {
      ...state[type],
      displayValue,
      warning: `Value is too large`,
    };
  }

  currentValue[index] = value;

  return {
    ...state[type],
    currentValue,
    displayValue,
    warning: undefined,
  };
}

export function ofPlanetLevelThresholds(
  { type, index, value }: Extract<LobbyConfigAction, { type: 'PLANET_LEVEL_THRESHOLDS' }>,
  state: LobbyConfigState
) {
  const prevCurrentValue = state[type].currentValue;
  const prevDisplayValue = state[type].displayValue;
  const thresholds = state.PLANET_LEVEL_THRESHOLDS.currentValue;
  const prevIndex = index - 1;
  const prevThreshold = thresholds[prevIndex];

  if (!prevDisplayValue) {
    return {
      ...state[type],
      warning: `Failed to update ${type}`,
    };
  }

  if (value === undefined) {
    return {
      ...state[type],
      warning: undefined,
    };
  }

  const currentValue = [...prevCurrentValue];
  const displayValue = [...prevDisplayValue];

  if (index === 0) {
    // Level 0 boundary always has to be this number
    displayValue[index] = 16777216;
    currentValue[index] = 16777216;

    return {
      ...state[type],
      displayValue,
      currentValue,
      warning: undefined,
    };
  }

  displayValue[index] = value;

  if (typeof value !== 'number') {
    return {
      ...state[type],
      displayValue,
      warning: `Value must be a number`,
    };
  }

  if (value < 1) {
    return {
      ...state[type],
      displayValue,
      warning: `Value must be greater than 0`,
    };
  }

  if (value > 16777215) {
    return {
      ...state[type],
      displayValue,
      warning: `Value is too large`,
    };
  }

  if (prevThreshold <= value) {
    return {
      currentValue,
      displayValue,
      warning: `Level ${index} planet threshold matches or exceeds previous threshold`,
    };
  }

  currentValue[index] = value;

  return {
    ...state[type],
    currentValue,
    displayValue,
    warning: undefined,
  };
}
