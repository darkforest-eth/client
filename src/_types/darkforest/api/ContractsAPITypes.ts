import { ArtifactPointValues, UpgradeBranches } from '@darkforest_eth/types';
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
  LocationRevealed = 'LocationRevealed',
  ArtifactFound = 'ArtifactFound',
  ArtifactDeposited = 'ArtifactDeposited',
  ArtifactWithdrawn = 'ArtifactWithdrawn',
  ArtifactActivated = 'ArtifactActivated',
  ArtifactDeactivated = 'ArtifactDeactivated',
  PlanetSilverWithdrawn = 'PlanetSilverWithdrawn',

  // DarkForestGPTCredit
  ChangedGPTCreditPrice = 'ChangedCreditPrice',
  // DarkForestScoringRound3
  LocationClaimed = 'LocationClaimed',
}

export const enum ContractsAPIEvent {
  PlayerUpdate = 'PlayerUpdate',
  PlanetUpdate = 'PlanetUpdate',
  ArrivalQueued = 'ArrivalQueued',
  ArtifactUpdate = 'ArtifactUpdate',
  RadiusUpdated = 'RadiusUpdated',
  LocationRevealed = 'LocationRevealed',
  ChangedGPTCreditPrice = 'ChangedCreditPrice',
  TxInitFailed = 'TxInitFailed',
  TxSubmitted = 'TxSubmitted',
  TxConfirmed = 'TxConfirmed',
  TxReverted = 'TxReverted',
  PlanetTransferred = 'PlanetTransferred',
  PlanetClaimed = 'PlanetClaimed',
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
    string // artifactId sent
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
  PLANET_TYPE_WEIGHTS: PlanetTypeWeightsBySpaceType;
  ARTIFACT_POINT_VALUES: ArtifactPointValues;

  PHOTOID_ACTIVATION_DELAY: number;
  LOCATION_REVEAL_COOLDOWN: number;
  CLAIM_PLANET_COOLDOWN: number;

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
