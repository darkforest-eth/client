import { EthAddress, LocationId } from '../../global/GlobalTypes';

export type AddressTwitterMap = {
  [ethAddress: string]: string;
};

// TODO common module with the
export type ServerScoreboardEntry = {
  player: EthAddress;
  score: number;
  top5Planets: LocationId[];
};

export type ServerScoreboard = ServerScoreboardEntry[];
