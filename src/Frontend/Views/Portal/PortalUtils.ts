import { address } from '@darkforest_eth/serde';
import {
  BadgeType,
  CleanConfigPlayer,
  CleanMatchEntry,
  EthAddress,
  ExtendedMatchEntry,
  GrandPrixMetadata,
  LiveMatch,
  SeasonScore,
} from '@darkforest_eth/types';
import { SeasonLeaderboardEntry } from '../../../Backend/Network/GraphApi/SeasonLeaderboardApi';
import {
  DAY_IN_SECONDS,
  DEV_CONFIG_HASH_1,
  DEV_CONFIG_HASH_2,
  SEASON_GRAND_PRIXS,
} from '../../Utils/constants';
import { SeasonHistoryItem } from './PortalHistoryView';

export function truncateAddress(address: EthAddress) {
  return address.substring(0, 4) + '...' + address.substring(38, 42);
}

export function truncateString(str: string, maxLength: number) {
  return str.length > maxLength ? str.substring(0, maxLength - 3) + '...' : str;
}

export const mockBadges: BadgeType[] = [
  BadgeType.Tree,
  BadgeType.Wallbreaker,
  BadgeType.Wallbreaker,
  BadgeType.Nice,
  BadgeType.Nice,
  BadgeType.Sleepy,
  BadgeType.Sleepy,
  BadgeType.StartYourEngine,
  BadgeType.StartYourEngine,
  BadgeType.Tree,
];

const genRanHex = (size: number) =>
  [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

function getHashCode(text: string) {
  let hash = 0;
  if (text.length === 0) return hash;
  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  return hash;
}

export const addressToColor = (address: EthAddress) => {
  const colors = ['#FF9D9D', '#FFECA7', '#7DE4A0', '#51C3E8', '#9874FF', '#FC7DFF'];
  const hashCode = getHashCode((address as string).toLowerCase());
  return colors[Math.abs(hashCode % colors.length) ?? 0];
};

export function createDummySeasonData(nEntries: number): CleanConfigPlayer[] {
  let dummy: CleanConfigPlayer[] = [];
  for (let i = 0; i < nEntries; i++) {
    const address = '0x' + genRanHex(40);
    const startTime = Math.floor(Math.random() * 1000);
    const endTime = Math.floor(Math.random() * 1000) + startTime;
    const entry1: CleanConfigPlayer = {
      id: '123',
      address,
      duration: endTime - startTime,
      moves: Math.floor(Math.random() * 1000),
      startTime,
      endTime,
      badges: [
        {
          type: BadgeType.Nice,
          configHash: DEV_CONFIG_HASH_1,
        },
        {
          type: BadgeType.StartYourEngine,
          configHash: DEV_CONFIG_HASH_1,
        },
        {
          type: BadgeType.Sleepy,
          configHash: DEV_CONFIG_HASH_1,
        },
        {
          type: BadgeType.Tree,
          configHash: DEV_CONFIG_HASH_1,
        },
        {
          type: BadgeType.Wallbreaker,
          configHash: DEV_CONFIG_HASH_1,
        },
      ],
      configHash: DEV_CONFIG_HASH_1,
      gamesStarted: Math.floor(Math.random() * 100),
      gamesFinished: Math.floor(Math.random() * 100),
      score: DAY_IN_SECONDS - (endTime - startTime),
    };
    const entry2: CleanConfigPlayer = {
      ...entry1,
      configHash: DEV_CONFIG_HASH_2,
    };
    dummy.push(entry1);
    dummy.push(entry2);
  }
  return dummy;
}

export function createDummyLiveMatches(nEntries: number): LiveMatch {
  const entries: CleanMatchEntry[] = [];
  for (let i = 0; i < nEntries; i++) {
    const startTime = Math.floor(Math.random() * 1000);
    const endTime = Math.floor(Math.random() * 1000) + startTime;
    const player = '0x' + genRanHex(40);
    const lobby = '0x' + genRanHex(40);
    const entry1: CleanMatchEntry = {
      lobbyAddress: address(lobby),
      creator: address(player),
      moves: Math.floor(Math.random() * 100),
      // Have start time be later if game is not over
      startTime: endTime,
      endTime,
      configHash: DEV_CONFIG_HASH_1,
      gameOver: false,
      duration: endTime - startTime,
      numSpawn: 1,
      players: [address(player)],
    };
    const entry2: CleanMatchEntry = {
      ...entry1,
      gameOver: true,
      configHash: DEV_CONFIG_HASH_2,
    };
    entries.push(entry1);
    entries.push(entry2);
  }
  return { entries } as LiveMatch;
}

export const DummySeasons: SeasonHistoryItem[] = [
  {
    seasonId: 1,
    rank: 5,
    players: 1000,
    grandPrixHistoryItems: [
      {
        configHash: '0xd08bbeb0785370a68369f0a042e33ef2688da6da5e79acbb5688ddbb8ca4a862',
        startTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        endTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        players: 1000,
        rank: 5,
        score: 10000,
        badges: [BadgeType.StartYourEngine, BadgeType.Tree],
      },
      {
        configHash: '0xd08bbeb0785370a68369f0a042e33ef2688da6da5e79acbb5688ddbb8ca4a862',
        startTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        endTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        players: 1000,
        rank: 5,
        score: 10000,
        badges: [BadgeType.Nice, BadgeType.Wallbreaker],
      },
      {
        configHash: '0xd08bbeb0785370a68369f0a042e33ef2688da6da5e79acbb5688ddbb8ca4a862',
        startTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        endTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        players: 1000,
        rank: 5,
        score: 10000,
        badges: [BadgeType.Nice, BadgeType.Wallbreaker],
      },
    ],
  },
  {
    seasonId: 2,
    rank: 5,
    players: 1000,
    grandPrixHistoryItems: [
      {
        configHash: '0xfe719a3cfccf2bcfa23f71f0af80a931eda4f4197331828d728b7505a6156930',
        startTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        endTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        players: 1000,
        rank: 5,
        score: 10000,
        badges: [BadgeType.Tree, BadgeType.Nice],
      },
      {
        configHash: '0xfe719a3cfccf2bcfa23f71f0af80a931eda4f4197331828d728b7505a6156930',
        startTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        endTime: new Date('2022-07-13T00:00:00.000Z').getTime() / 1000,
        players: 1000,
        rank: 5,
        score: 10000,
        badges: [BadgeType.Nice, BadgeType.Nice],
      },
    ],
  },
];

// For now, just for season one.
// But later, you probably need this.
export function seasonScoreToSeasonHistoryItem(account: EthAddress, seasonScores: SeasonScore[]) {
  // Sort descending
  let rank = 0;

  seasonScores
    .sort((a, b) => b.score - a.score)
    .map((s, index) => {
      if (account && s.player == account) rank = index;
    });
  const history: SeasonHistoryItem = {
    seasonId: 1,
    grandPrixHistoryItems: [],
    rank,
    players: seasonScores.length,
  };
  return history;
}

export function getCurrentGrandPrix(
  seasonGrandPrixs: GrandPrixMetadata[]
): GrandPrixMetadata | undefined {
  if (seasonGrandPrixs.length == 0) return undefined;

  const now = Math.floor(Date.now() / 1000);
  const res = seasonGrandPrixs.find((gp) => now >= gp.startTime && now <= gp.endTime);
  // Return most recent grand prix if none are active
  if (!res) return seasonGrandPrixs.sort((a, b) => b.startTime - a.startTime)[0];
  return res;
}

export function scoreToTime(score?: number | null) {
  if (score === null || score === undefined) {
    return 'n/a';
  }
  score = Math.floor(score);

  const seconds = String(score % 60).padStart(2, '0');
  const minutes = String(Math.floor(score / 60) % 60).padStart(2, '0');
  const hours = String(Math.min(99, Math.floor(score / 3600))).padStart(2, '0');

  return hours + ':' + minutes + ':' + seconds;
}
