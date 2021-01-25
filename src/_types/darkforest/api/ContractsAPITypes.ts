import { BigNumber as EthersBN } from 'ethers';
import {
  ArtifactId,
  EthAddress,
  LocationId,
  Location,
  Upgrade,
} from '../../global/GlobalTypes';

// TODO write these types
export type ContractCallArgs = Array<unknown>;

export enum ZKArgIdx {
  PROOF_A,
  PROOF_B,
  PROOF_C,
  DATA,
}

export enum InitArgIdxs {
  LOCATION_ID,
  PERLIN,
  RADIUS,
}

export enum MoveArgIdxs {
  FROM_ID,
  TO_ID,
  TO_PERLIN,
  TO_RADIUS,
  DIST_MAX,
  SHIPS_SENT,
  SILVER_SENT,
}

export enum UpgradeArgIdxs {
  LOCATION_ID,
  UPGRADE_BRANCH,
}

export enum ContractEvent {
  PlayerInitialized = 'PlayerInitialized',
  ArrivalQueued = 'ArrivalQueued',
  PlanetUpgraded = 'PlanetUpgraded',
  BoughtHat = 'BoughtHat',
  PlanetTransferred = 'PlanetTransferred',
  FoundArtifact = 'FoundArtifact',
  DepositedArtifact = 'DepositedArtifact',
  WithdrewArtifact = 'WithdrewArtifact',
}

export enum ContractsAPIEvent {
  PlayerInit = 'PlayerInit',
  PlanetUpdate = 'PlanetUpdate',
  ArtifactUpdate = 'ArtifactUpdate',
  RadiusUpdated = 'RadiusUpdated',
  TxInitFailed = 'TxInitFailed',
  TxSubmitted = 'TxSubmitted',
  TxConfirmed = 'TxConfirmed',
  TxReverted = 'TxReverted',
  PlanetTransferred = 'PlanetTransferred',
}

export type InitializePlayerArgs = [
  [string, string], // proofA
  [
    // proofB
    [string, string],
    [string, string]
  ],
  [string, string], // proofC
  [string, string, string] // locationId (BigInt), perlin, radius
];

// planet locationID(BigInt), branch number
export type UpgradeArgs = [string, string];

export type MoveSnarkArgs = [
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
    string // distMax
  ]
];

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
    string, // ships sent
    string // silver sent
  ]
];

export type BiomeArgs = [
  [string, string], // proofA
  [
    // proofB
    [string, string],
    [string, string]
  ],
  [string, string], // proofC
  [
    string, // hash
    string // biomebase
  ]
];

export type DepositArtifactArgs = [string, string]; // locationId, artifactId
export type WithdrawArtifactArgs = [string]; // locationId

export type UpgradeBranch = [Upgrade, Upgrade, Upgrade, Upgrade];
export type UpgradesInfo = [UpgradeBranch, UpgradeBranch, UpgradeBranch];

export interface ContractConstants {
  TIME_FACTOR_HUNDREDTHS: number;
  PERLIN_THRESHOLD_1: number;
  PERLIN_THRESHOLD_2: number;
  BIOME_THRESHOLD_1: number;
  BIOME_THRESHOLD_2: number;
  PLANET_RARITY: number;

  ARTIFACT_LOCKUP_DURATION_SECONDS: number;

  SILVER_RARITY_1: number;
  SILVER_RARITY_2: number;
  SILVER_RARITY_3: number;

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

  upgrades: UpgradesInfo;
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

/*
export interface RawArrivalData {
  // note that from actual blockchain, this will be an array
  // not an object; this fields will be keyed by numerica index, not string
  arrivalId: string;
  departureTime: BigNumber;
  arrivalTime: BigNumber;
  player: string;
  oldLoc: BigNumber;
  newLoc: BigNumber;
  maxDist: BigNumber;
  shipsMoved: BigNumber;
  silverMoved: BigNumber;
}
*/
/*
export type RawQueuedArrival = {
  eventId: string;
  player: string;
  fromPlanet: BigNumber;
  toPlanet: BigNumber;
  popArriving: BigNumber;
  silverMoved: BigNumber;

  timeTrigger: BigNumber;
  timeAdded: BigNumber;
}
*/
export enum PlanetEventType {
  ARRIVAL,
}

export type RawPlanetEventMetadata = {
  id: string;
  eventType: EthersBN;
  timeTrigger: EthersBN;
  timeAdded: EthersBN;
};

export type RawUpgrade = {
  0: EthersBN;
  popCapMultiplier?: EthersBN;

  1: EthersBN;
  popGroMultiplier?: EthersBN;

  2: EthersBN;
  rangeMultiplier?: EthersBN;

  3: EthersBN;
  speedMultiplier?: EthersBN;

  4: EthersBN;
  defMultiplier?: EthersBN;
};

export type RawUpgradesInfo = [
  [RawUpgrade, RawUpgrade, RawUpgrade, RawUpgrade],
  [RawUpgrade, RawUpgrade, RawUpgrade, RawUpgrade],
  [RawUpgrade, RawUpgrade, RawUpgrade, RawUpgrade]
];

export type RawArrivalData = {
  0: EthersBN;
  id?: EthersBN;

  1: string;
  player?: string;

  2: EthersBN;
  fromPlanet?: EthersBN;

  3: EthersBN;
  toPlanet?: EthersBN;

  4: EthersBN;
  popArriving?: EthersBN;

  5: EthersBN;
  silverMoved?: EthersBN;

  6: EthersBN;
  departureTime?: EthersBN;

  7: EthersBN;
  arrivalTime?: EthersBN;
};

export type RawDefaults = {
  0: string;
  label?: string;

  1: EthersBN;
  populationCap?: EthersBN;

  2: EthersBN;
  populationGrowth?: EthersBN;

  3: EthersBN;
  range?: EthersBN;

  4: EthersBN;
  speed?: EthersBN;

  5: EthersBN;
  defense?: EthersBN;

  6: EthersBN;
  silverGrowth?: EthersBN;

  7: EthersBN;
  silverCap?: EthersBN;

  8: EthersBN;
  barbarianPercentage?: EthersBN;
}[];

export interface RawPlanetData {
  // note that from actual blockchain, this will be an array
  // not an object; this fields will be keyed by numerical index, not string
  0: string;
  owner?: string;

  1: EthersBN;
  range?: EthersBN;

  2: EthersBN;
  speed?: EthersBN;

  3: EthersBN;
  defense?: EthersBN;

  4: EthersBN;
  population?: EthersBN;

  5: EthersBN;
  populationCap?: EthersBN;

  6: EthersBN;
  populationGrowth?: EthersBN;

  7: number;
  planetResource?: number;

  8: EthersBN;
  silverCap?: EthersBN;

  9: EthersBN;
  silverGrowth?: EthersBN;

  10: EthersBN;
  silver?: EthersBN;

  11: EthersBN;
  planetLevel?: EthersBN;
}

export interface RawArtifactData {
  // note that from actual blockchain, this will be an array
  // not an object; this fields will be keyed by numerical index, not string
  0: EthersBN;
  id?: EthersBN;

  1: EthersBN;
  planetDiscoveredOn?: EthersBN;

  2: EthersBN;
  planetLevel?: EthersBN;

  3: number;
  planetBiome?: number;

  4: EthersBN;
  mintedAtTimestamp?: EthersBN;

  5: string;
  originalOwner?: string;

  6: number;
  artifactType?: number;
}

export interface RawArtifactWithMetadata {
  0: RawArtifactData;
  artifact?: RawArtifactData;

  1: RawUpgrade;
  upgrade?: RawUpgrade;

  2: string;
  owner?: string;

  3: EthersBN;
  locationId?: EthersBN;
}

export interface RawPlanetExtendedInfo {
  // note that from actual blockchain, this will be an array
  // not an object; this fields will be keyed by numerical index, not string
  0: boolean;
  isInitialized?: boolean;

  1: EthersBN;
  createdAt?: EthersBN;

  2: EthersBN;
  lastUpdated?: EthersBN;

  3: EthersBN;
  perlin?: EthersBN;

  4: number;
  spaceType?: number;

  5: EthersBN;
  upgradeState0?: EthersBN;

  6: EthersBN;
  upgradeState1?: EthersBN;

  7: EthersBN;
  upgradeState2?: EthersBN;

  8: EthersBN;
  hatLevel?: EthersBN;

  9: boolean;
  hasTriedFindingArtifact?: boolean;

  10: EthersBN;
  heldArtifactId?: EthersBN;

  11: EthersBN;
  artifactLockedTimestamp?: EthersBN;
}

export enum EthTxType {
  INIT = 'INIT',
  MOVE = 'MOVE',
  UPGRADE = 'UPGRADE',
  BUY_HAT = 'BUY_HAT',
  PLANET_TRANSFER = 'PLANET_TRANSFER',
  FIND_ARTIFACT = 'FIND_ARTIFACT',
  DEPOSIT_ARTIFACT = 'DEPOSIT_ARTIFACT',
  WITHDRAW_ARTIFACT = 'WITHDRAW_ARTIFACT',
}

export const TxTypeToEthFunctionName: Record<EthTxType, string> = {
  [EthTxType.INIT]: 'initializePlayer',
  [EthTxType.MOVE]: 'move',
  [EthTxType.UPGRADE]: 'upgradePlanet',
  [EthTxType.BUY_HAT]: 'buyHat',
  [EthTxType.PLANET_TRANSFER]: 'transferOwnership',
  [EthTxType.FIND_ARTIFACT]: 'findArtifact',
  [EthTxType.DEPOSIT_ARTIFACT]: 'depositArtifact',
  [EthTxType.WITHDRAW_ARTIFACT]: 'withdrawArtifact',
};

export enum EthTxStatus {
  Init,
  Submit,
  Confirm,
  Fail,
}

export type TxIntent = {
  // we generate a txId so we can reference the tx
  // before it is submitted to chain and given a txHash
  actionId: string;
  type: EthTxType;
};

export type SubmittedTx = TxIntent & {
  txHash: string;
  sentAtTimestamp: number;
};

export type UnconfirmedInit = TxIntent & {
  type: EthTxType.INIT;
  locationId: LocationId;
  location: Location;
};

export type SubmittedInit = UnconfirmedInit & SubmittedTx;

export type UnconfirmedMove = TxIntent & {
  type: EthTxType.MOVE;
  from: LocationId;
  to: LocationId;
  forces: number;
  silver: number;
};

export type SubmittedMove = UnconfirmedMove & SubmittedTx;

export type UnconfirmedFindArtifact = TxIntent & {
  type: EthTxType.FIND_ARTIFACT;
  planetId: LocationId;
};

export type SubmittedFindArtifact = UnconfirmedFindArtifact & SubmittedTx;

export type UnconfirmedPlanetTransfer = TxIntent & {
  type: EthTxType.PLANET_TRANSFER;
  planetId: LocationId;
  newOwner: EthAddress;
};

export type SubmittedPlanetTransfer = UnconfirmedPlanetTransfer & SubmittedTx;

export type UnconfirmedUpgrade = TxIntent & {
  type: EthTxType.UPGRADE;
  locationId: LocationId;
  upgradeBranch: number; // 0, 1, or 2
};

export type SubmittedUpgrade = UnconfirmedUpgrade & SubmittedTx;

export type UnconfirmedBuyHat = TxIntent & {
  type: EthTxType.BUY_HAT;
  locationId: LocationId;
};

export type SubmittedBuyHat = UnconfirmedBuyHat & SubmittedTx;

export type UnconfirmedDepositArtifact = TxIntent & {
  type: EthTxType.DEPOSIT_ARTIFACT;
  locationId: LocationId;
  artifactId: ArtifactId;
};

export type SubmittedDepositArtifact = UnconfirmedDepositArtifact & SubmittedTx;

export type UnconfirmedWithdrawArtifact = TxIntent & {
  type: EthTxType.WITHDRAW_ARTIFACT;
  locationId: LocationId;
  artifactId: ArtifactId;
};

export type SubmittedWithdrawArtifact = UnconfirmedWithdrawArtifact &
  SubmittedTx;
