import { address } from '@darkforest_eth/serde';
import { ConfigPlayer, GrandPrixResult, Leaderboard, LeaderboardEntry, SeasonPlayers, SeasonScore, Wallbreaker, WallbreakerArena } from '@darkforest_eth/types';
import {
  roundEndTimestamp,
  roundStartTimestamp,
  competitiveConfig,
  SEASON_GRAND_PRIXS,
} from '../../../Frontend/Utils/constants';
import { getGraphQLData } from '../GraphApi';
import { getAllTwitters } from '../UtilityServerAPI';

// Will be eventually imported from Dynasty. Need Start Time and End Time as Well

// One hour 
const WALLBREAKER_BONUS = 5 * 60;
const START_ENGINE_BONUS = 100;
const DAY_IN_SECONDS = 24 * 60 * 60;

export async function loadWallbreakers(): Promise<Wallbreaker[]> {
  const wallbreakerQuery = SEASON_GRAND_PRIXS.map((season) => {
    const QUERY = `
    query
    {
      arenas(
        where: {
          configHash: "${season.configHash}", 
          duration_not:null,
          startTime_gte: ${season.startTime}
          endTime_lte: ${season.endTime}
        }
        orderBy: duration
        orderDirection: asc
        first: 1
      ) {
        configHash
        lobbyAddress
        winners {
          address
        }
        duration
      }
    }
    `;
    console.log(QUERY);
    return getGraphQLData(QUERY, process.env.GRAPH_URL || 'localhost:8000');
  });

  const wallBreakersRaw = (await Promise.all(wallbreakerQuery)).map((x) => {
    if (x.error) {
      throw new Error(x.error);
    } else {
      return x.data.arenas[0] as WallbreakerArena;
    }
  });

  const wallBreakers = wallBreakersRaw.map((wbr) => {
    return {
      configHash: wbr.configHash,
      player: wbr.winners[0].address,
      duration: wbr.duration,
      arenaAddress: wbr.lobbyAddress,
    } as Wallbreaker;
  });

  return wallBreakers;
}

// This calls loadWallbreakers and adds the wallBreaker badge to each
export async function loadSeasonLeaderboard(): Promise<SeasonScore[]> {
  const stringHashes = SEASON_GRAND_PRIXS.map((season) => `"${season.configHash}"`);
  const QUERY = `
query
  {
    configPlayers(
      where: {
        configHash_in: [${stringHashes}],
        bestTime_:{gameOver: true}
      }
    ) {
      id
      address
      gamesStarted
      bestTime {
        winners(first:1) {
          moves
        }
        duration
      }
      configHash
      badge {
        based
        ouch
        startYourEngine
        nice
      }
    }
  }
`;
  const rawData = await getGraphQLData(QUERY, process.env.GRAPH_URL || 'localhost:8000');
  if (rawData.error) {
    throw new Error(rawData.error);
  }
  const seasonPlayers = await groupPlayers(rawData.data.configPlayers);
  const seasonScores = getSeasonScore(seasonPlayers);
  return seasonScores;
}

async function groupPlayers(configPlayers: ConfigPlayer[]): Promise<SeasonPlayers> {
  const wallBreakers = await loadWallbreakers();

  const seasonPlayers: SeasonPlayers = {};
  configPlayers.map((cp) => {
    if (!seasonPlayers[cp.address]) seasonPlayers[cp.address] = [];
    const grandPrixResult: GrandPrixResult = {
      bestTime: cp.bestTime.duration,
      moves: cp.bestTime.winners[0].moves,
      badges: cp.badge,
    };

    // Add Wallbreaker Badge
    const isWallBreaker = wallBreakers.filter(e => e.player === cp.address).length > 0
    grandPrixResult.badges.wallBreaker = isWallBreaker;
    
    seasonPlayers[cp.address].push(grandPrixResult);
  });
  return seasonPlayers;
}

function calcSeasonScore(grandPrixResult: GrandPrixResult): number {
  const timeScore = DAY_IN_SECONDS - grandPrixResult.bestTime;
  let badgeScore = 0;
  badgeScore += grandPrixResult.badges.startYourEngine ? START_ENGINE_BONUS : 0;
  badgeScore += grandPrixResult.badges.wallBreaker ? WALLBREAKER_BONUS : 0;
  return timeScore + badgeScore;
}

function getSeasonScore(seasonPlayers: SeasonPlayers): SeasonScore[] {
  const seasonScores: SeasonScore[] = [];
  for (const [player, grandPrixResults] of Object.entries(seasonPlayers)) {
    const seasonScore: SeasonScore = {
      player,
      score: grandPrixResults
        .map((result) => calcSeasonScore(result))
        .reduce((prev, curr) => prev + curr),
    };
    seasonScores.push(seasonScore);
  }
  console.log(`season Scores`, seasonScores);
  return seasonScores;
}

