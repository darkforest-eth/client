import { BadgeType, EthAddress, ExtendedMatchEntry, LeaderboardEntry } from '@darkforest_eth/types';
import { SeasonLeaderboardEntry } from '../../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import { SEASON_GRAND_PRIXS } from '../../Utils/constants';

export function truncateAddress(address: EthAddress) {
  return address.substring(0, 6) + '...' + address.substring(36, 42);
}

export function truncateString(str: string, maxLength: number) {
  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
}

export function createDummySeasonLeaderboardData(nEntries: number): SeasonLeaderboardEntry[] {
  let dummy: SeasonLeaderboardEntry[] = [];
  for (let i = 0; i < nEntries; i++) {
    const address = '0x' + Math.floor(Math.random() * Math.pow(10,40)).toString(16);
    const entry: SeasonLeaderboardEntry = {
      address,
      games: [
        {
          id: '123',
          address: address,
          duration: Math.floor(Math.random() * 1000),
          moves: Math.floor(Math.random() * 1000),
          startTime: SEASON_GRAND_PRIXS[0].startTime,
          endTime: SEASON_GRAND_PRIXS[0].endTime,
          badges: [BadgeType.StartYourEngine, BadgeType.Wallbreaker],
          gamesStarted: Math.floor(Math.random() * 100),
          gamesFinished: Math.floor(Math.random() * 100),
          configHash: '0x' + Math.floor(Math.random() * 10000000000000000).toString(16),
          score: Math.floor(i * Math.random() * 1000),
        },
        {
          id: '123',
          address: address,
          duration: Math.floor(Math.random() * 1000),
          moves: Math.floor(Math.random() * 1000),
          startTime: SEASON_GRAND_PRIXS[0].startTime,
          endTime: SEASON_GRAND_PRIXS[0].endTime,
          badges: [BadgeType.StartYourEngine, BadgeType.Wallbreaker],
          gamesStarted: Math.floor(Math.random() * 100),
          gamesFinished: Math.floor(Math.random() * 100),
          configHash: '0x' + Math.floor(Math.random() * 10000000000000000).toString(16),
          score: Math.floor(i * Math.random() * 1000),
        },
        {
          id: '123',
          address: address,
          duration: Math.floor(Math.random() * 1000),
          moves: Math.floor(Math.random() * 1000),
          startTime: SEASON_GRAND_PRIXS[0].startTime,
          endTime: SEASON_GRAND_PRIXS[0].endTime,
          badges: [BadgeType.StartYourEngine, BadgeType.Wallbreaker],
          gamesStarted: Math.floor(Math.random() * 100),
          gamesFinished: Math.floor(Math.random() * 100),
          configHash: '0x' + Math.floor(Math.random() * 10000000000000000).toString(16),
          score: Math.floor(i * Math.random() * 1000),
        },
      ],
      score: Math.floor(i * Math.random() * 1000),
      badges: Math.floor(Math.random() * 1000),
    };
    dummy.push(entry);
  }
  return dummy;
}
