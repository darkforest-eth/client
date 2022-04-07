import { ArtifactPointValues, EthAddress, UpgradeBranches } from '@darkforest_eth/types';
import { BigNumber as EthersBN } from 'ethers';

export const enum ZKArgIdx {
  PROOF_A,
  PROOF_B,
  PROOF_C,
  DATA,
}

export const enum InitArgIdxs {
  LOCATION_ID,
  PERLIN,
  RADIUS,
  PLANETHASH_KEY,
  SPACETYPE_KEY,
  PERLIN_LENGTH_SCALE,
  PERLIN_MIRROR_X,
  PERLIN_MIRROR_Y,
}

export const enum MoveArgIdxs {
  FROM_ID,
  TO_ID,
  TO_PERLIN,
  TO_RADIUS,
  DIST_MAX,
  PLANETHASH_KEY,
  SPACETYPE_KEY,
  PERLIN_LENGTH_SCALE,
  PERLIN_MIRROR_X,
  PERLIN_MIRROR_Y,
  SHIPS_SENT,
  SILVER_SENT,
  ARTIFACT_SENT,
}

export const enum UpgradeArgIdxs {
  LOCATION_ID,
  UPGRADE_BRANCH,
}

export const enum ContractEvent {
  PlayerInitialized = 'PlayerInitialized',
  ArrivalQueued = 'ArrivalQueued',
  PlanetUpgraded = 'PlanetUpgraded',
  PlanetHatBought = 'PlanetHatBought',
  PlanetTransferred = 'PlanetTransferred',
  PlanetInvaded = 'PlanetInvaded',
  PlanetCaptured = 'PlanetCaptured',
  LocationRevealed = 'LocationRevealed',
  ArtifactFound = 'ArtifactFound',
  ArtifactDeposited = 'ArtifactDeposited',
  ArtifactWithdrawn = 'ArtifactWithdrawn',
  ArtifactActivated = 'ArtifactActivated',
  ArtifactDeactivated = 'ArtifactDeactivated',
  PlanetSilverWithdrawn = 'PlanetSilverWithdrawn',
  AdminOwnershipChanged = 'AdminOwnershipChanged',
  AdminGiveSpaceship = 'AdminGiveSpaceship',
  PauseStateChanged = 'PauseStateChanged',
  LobbyCreated = 'LobbyCreated',
}

export const enum ContractsAPIEvent {
  PlayerUpdate = 'PlayerUpdate',
  PlanetUpdate = 'PlanetUpdate',
  PauseStateChanged = 'PauseStateChanged',
  ArrivalQueued = 'ArrivalQueued',
  ArtifactUpdate = 'ArtifactUpdate',
  RadiusUpdated = 'RadiusUpdated',
  LocationRevealed = 'LocationRevealed',
  /**
   * The transaction has been queued for future execution.
   */
  TxQueued = 'TxQueued',
  /**
   * The transaction has been removed from the queue and is
   * calculating arguments in preparation for submission.
   */
  TxProcessing = 'TxProcessing',
  /**
   * The transaction is queued, but is prioritized for execution
   * above other queued transactions.
   */
  TxPrioritized = 'TxPrioritized',
  /**
   * The transaction has been submitted and we are awaiting
   * confirmation.
   */
  TxSubmitted = 'TxSubmitted',
  /**
   * The transaction has been confirmed.
   */
  TxConfirmed = 'TxConfirmed',
  /**
   * The transaction has failed for some reason. This
   * could either be a revert or a purely client side
   * error. In the case of a revert, the transaction hash
   * will be included in the transaction object.
   */
  TxErrored = 'TxErrored',
  /**
   * The transaction was cancelled before it left the queue.
   */
  TxCancelled = 'TxCancelled',
  PlanetTransferred = 'PlanetTransferred',
  PlanetClaimed = 'PlanetClaimed',
  LobbyCreated = 'LobbyCreated',
}

// planet locationID(BigInt), branch number
export type UpgradeArgs = [string, string];

export type MoveArgs = [
  [string, string], // proofA
  [
    // proofB
    [string, string],
    [string, string]
  ],
  [string, string], // proofC
  [
    string, // from locationID (BigInt)
    string, // to locationID (BigInt)
    string, // perlin at to
    string, // radius at to
    string, // distMax
    string, // planetHashKey
    string, // spaceTypeKey
    string, // perlin lengthscale
    string, // perlin xmirror (1 true, 0 false)
    string, // perlin ymirror (1 true, 0 false)
    string, // ships sent
    string, // silver sent
    string, // artifactId sent
    string // is planet being released (1 true, 0 false)
  ]
];

// Same as reveal args with Explicit coords attached
export type ClaimArgs = [
  [string, string],
  [[string, string], [string, string]],
  [string, string],
  [string, string, string, string, string, string, string, string, string]
];

export type DepositArtifactArgs = [string, string]; // locationId, artifactId
export type WithdrawArtifactArgs = [string, string]; // locationId, artifactId
export type WhitelistArgs = [string, string]; // hashed whitelist key, recipient address

export type PlanetTypeWeights = [number, number, number, number, number]; // relative frequencies of the 5 planet types
export type PlanetTypeWeightsByLevel = [
  PlanetTypeWeights,
  PlanetTypeWeights,
  PlanetTypeWeights,
  PlanetTypeWeights,
  PlanetTypeWeights,
  PlanetTypeWeights,
  PlanetTypeWeights,
  PlanetTypeWeights,
  PlanetTypeWeights,
  PlanetTypeWeights
];
export type PlanetTypeWeightsBySpaceType = [
  PlanetTypeWeightsByLevel,
  PlanetTypeWeightsByLevel,
  PlanetTypeWeightsByLevel,
  PlanetTypeWeightsByLevel
];

export interface ContractConstants {
  ADMIN_CAN_ADD_PLANETS: boolean;
  WORLD_RADIUS_LOCKED: boolean;
  WORLD_RADIUS_MIN: number;

  DISABLE_ZK_CHECKS: boolean;

  PLANETHASH_KEY: number;
  SPACETYPE_KEY: number;
  BIOMEBASE_KEY: number;
  PERLIN_LENGTH_SCALE: number;
  PERLIN_MIRROR_X: boolean;
  PERLIN_MIRROR_Y: boolean;

  TOKEN_MINT_END_SECONDS: number;

  MAX_NATURAL_PLANET_LEVEL: number;
  TIME_FACTOR_HUNDREDTHS: number;
  /**
   * The perlin value at each coordinate determines the space type. There are four space
   * types, which means there are four ranges on the number line that correspond to
   * each space type. This function returns the boundary values between each of these
   * four ranges: `PERLIN_THRESHOLD_1`, `PERLIN_THRESHOLD_2`, `PERLIN_THRESHOLD_3`.
   */
  PERLIN_THRESHOLD_1: number;
  PERLIN_THRESHOLD_2: number;
  PERLIN_THRESHOLD_3: number;
  INIT_PERLIN_MIN: number;
  INIT_PERLIN_MAX: number;
  SPAWN_RIM_AREA: number;
  BIOME_THRESHOLD_1: number;
  BIOME_THRESHOLD_2: number;
  PLANET_RARITY: number;
  /**
     The chance for a planet to be a specific level.
     Each index corresponds to a planet level (index 5 is level 5 planet).
     The lower the number the lower the chance.
     Note: This does not control if a planet spawns or not, just the level
     when it spawns.
   */
  PLANET_LEVEL_THRESHOLDS: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  PLANET_TRANSFER_ENABLED: boolean;
  PLANET_TYPE_WEIGHTS: PlanetTypeWeightsBySpaceType;
  ARTIFACT_POINT_VALUES: ArtifactPointValues;
  /**
   * How much score silver gives when withdrawing.
   * Expressed as a percentage integer.
   * (100 is 100%)
   */
  SILVER_SCORE_VALUE: number;
  // Space Junk
  SPACE_JUNK_ENABLED: boolean;
  /**
     Total amount of space junk a player can take on.
     This can be overridden at runtime by updating
     this value for a specific player in storage.
   */
  SPACE_JUNK_LIMIT: number;
  /**
     The amount of junk that each level of planet
     gives the player when moving to it for the
     first time.
   */
  PLANET_LEVEL_JUNK: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  /**
     The speed boost a movement receives when abandoning
     a planet.
   */
  ABANDON_SPEED_CHANGE_PERCENT: number;
  /**
     The range boost a movement receives when abandoning
     a planet.
   */
  ABANDON_RANGE_CHANGE_PERCENT: number;

  PHOTOID_ACTIVATION_DELAY: number;
  LOCATION_REVEAL_COOLDOWN: number;
  CLAIM_PLANET_COOLDOWN?: number;

  defaultPopulationCap: number[];
  defaultPopulationGrowth: number[];

  defaultSilverCap: number[];
  defaultSilverGrowth: number[];

  defaultRange: number[];
  defaultSpeed: number[];
  defaultDefense: number[];
  defaultBarbarianPercentage: number[];

  planetLevelThresholds: number[];
  planetCumulativeRarities: number[];

  upgrades: UpgradeBranches;

  adminAddress: EthAddress;

  // Capture Zones
  GAME_START_BLOCK: number;
  CAPTURE_ZONES_ENABLED: boolean;
  CAPTURE_ZONE_COUNT: number;
  CAPTURE_ZONE_CHANGE_BLOCK_INTERVAL: number;
  CAPTURE_ZONE_RADIUS: number;
  CAPTURE_ZONE_PLANET_LEVEL_SCORE: [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
  ];
  CAPTURE_ZONE_HOLD_BLOCKS_REQUIRED: number;
  CAPTURE_ZONES_PER_5000_WORLD_RADIUS: number;
}

export type ClientMockchainData =
  | null
  | undefined
  | number
  | string
  | boolean
  | EthersBN
  | ClientMockchainData[]
  | {
      [key in string | number]: ClientMockchainData;
    };

export const enum PlanetEventType {
  ARRIVAL,
}
