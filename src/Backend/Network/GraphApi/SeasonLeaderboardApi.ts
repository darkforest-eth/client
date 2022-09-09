import { address } from '@darkforest_eth/serde';
import {
  BadgeType,
  CleanConfigPlayer,
  ConfigBadge,
  ConfigPlayer,
  EthAddress,
  GrandPrixHistory,
  GrandPrixMetadata,
  GrandPrixPlayers,
  Leaderboard,
  LeaderboardEntry,
  SeasonHistory,
  SeasonPlayers,
  SeasonScore,
  Wallbreaker,
  WallbreakerArena,
} from '@darkforest_eth/types';
import { UniquePlayerBadges } from '@darkforest_eth/types/src/grand_prix';
import {
  // SEASON_GRAND_PRIXS,
  HOUR_IN_SECONDS,
  EGP,
  DUMMY,
  BADGE_BONUSES,
} from '../../../Frontend/Utils/constants';
import {
  createDummySeasonData,
  isPastOrCurrentRound,
} from '../../../Frontend/Views/Portal/PortalUtils';
import { AddressTwitterMap } from '../../../_types/darkforest/api/UtilityServerAPITypes';
import { getGraphQLData } from '../GraphApi';
import { getAllTwitters } from '../UtilityServerAPI';
import { graphBadgeToGrandPrixBadge } from './BadgeApi';

export async function loadWallbreakers(
  SEASON_GRAND_PRIXS: GrandPrixMetadata[]
): Promise<Wallbreaker[]> {
  const wallbreakerQuery = SEASON_GRAND_PRIXS.map((grandPrix) => {
    const QUERY = `
    query
    {
      arenas(
        where: {
          configHash: "${grandPrix.configHash}", 
          duration_not:null,
          startTime_gte: ${grandPrix.startTime}
          endTime_lte: ${grandPrix.endTime}
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
    return getGraphQLData(QUERY, process.env.GRAPH_URL || 'localhost:8000');
  });
  const res = await Promise.all(wallbreakerQuery);
  if (res && res.length == 0) return [];
  const wallBreakersRaw = res.map((x) => {
    if (x.error) {
      throw new Error(x.error);
    } else {
      return x.data.arenas[0] as WallbreakerArena;
    }
  });

  // Filter undefined because graph returns [undefined] if query isn't found
  const wallBreakers = wallBreakersRaw
    .filter((wbr) => wbr !== undefined)
    .map((wbr) => {
      return {
        configHash: wbr.configHash,
        player: wbr.winners[0].address,
        duration: wbr.duration,
        arenaAddress: wbr.lobbyAddress,
      } as Wallbreaker;
    });
  return wallBreakers;
}

// Returns all the ConfigPlayers for each Grand Prix, including the Wallbreaker.
// It calls loadWallbreakers() internally.
export async function loadAllPlayerData(
  SEASON_GRAND_PRIXS: GrandPrixMetadata[]
): Promise<CleanConfigPlayer[]> {
  if (DUMMY) return createDummySeasonData(200);
  if (!EGP) return [];
  const stringHashes = SEASON_GRAND_PRIXS.map((season) => `"${season.configHash}"`);
  // Query size is number of unique players on each Grand Prix in a season. (6 GPs * 100 players = 100 results).
  // If > 1000, graph won't return.
  const QUERY = `
query
  {
    configPlayers(
      first: 1000
    ) {
      id
      address
      gamesStarted
      gamesFinished
      bestTime {
        winners(first:1) {
          moves
        }
        duration
        startTime
        endTime
        gameOver
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

  if (!rawData.data) {
    throw new Error(`rawData.data undefined. Make sure query is correct`);
  }
  if (!rawData.data.configPlayers)
    throw new Error(`config players undefined. Make sure query is correct`);

  const configPlayersFinal = await buildCleanConfigPlayer(
    rawData.data.configPlayers,
    SEASON_GRAND_PRIXS
  );
  return configPlayersFinal;
}

// Grand Prixs for each player in the given season, grouped by player.
export function loadSeasonPlayers(
  configPlayers: CleanConfigPlayer[],
  seasonId: number,
  SEASON_GRAND_PRIXS: GrandPrixMetadata[]
): SeasonPlayers {
  const seasonConfigHashes = SEASON_GRAND_PRIXS.filter((s) => s.seasonId == seasonId).map((s) =>
    s.configHash.toLowerCase()
  );
  const seasonConfigPlayers = configPlayers.filter(
    (cp) =>
      seasonConfigHashes.includes(cp.configHash.toLowerCase()) &&
      isPastOrCurrentRound(cp.configHash, SEASON_GRAND_PRIXS) &&
      cp.gamesFinished > 0
  );
  const seasonPlayers = groupByPlayers(seasonConfigPlayers);
  return seasonPlayers;
}

export interface SeasonLeaderboardEntry {
  address: string;
  games: CleanConfigPlayer[];
  score: number;
  totalDuration: number;
  badges: number;
}

export interface SeasonLeaderboardProps {
  seasonId: number;
  entries: SeasonLeaderboardEntry[];
}

// Called after seasonPlayers are filtered for the given season.
export function loadSeasonLeaderboard(
  configPlayers: CleanConfigPlayer[],
  seasonId: number,
  SEASON_GRAND_PRIXS: GrandPrixMetadata[]
): SeasonLeaderboardProps {
  const seasonPlayers = loadSeasonPlayers(configPlayers, seasonId, SEASON_GRAND_PRIXS);
  const leaderboardProps: SeasonLeaderboardProps = {
    seasonId,
    entries: [],
  };

  for (const [player, cleanConfigPlayers] of Object.entries(seasonPlayers)) {
    const allBadges = cleanConfigPlayers
      .map((ccp) => ccp.badges.map((badge) => badge.type).flat())
      .flat();
    const badgeScore = calcBadgeTypeScore(allBadges);
    const { score, badges, totalDuration } = cleanConfigPlayers
      .map((ccp) => {
        return { score: ccp.score, badges: ccp.badges.length, totalDuration: ccp.duration };
      })
      .reduce((a, b) => {
        return {
          score: a.score + b.score,
          badges: a.badges + b.badges,
          totalDuration: a.totalDuration + b.totalDuration,
        };
      });
    const entry: SeasonLeaderboardEntry = {
      address: player,
      games: cleanConfigPlayers,
      score: score + badgeScore,
      totalDuration: totalDuration - badgeScore,
      badges,
    };
    leaderboardProps.entries.push(entry);
  }
  return leaderboardProps;
}

// Filter to get all Config Players for a single Grand Prix
// Can be used for badges
export function loadGrandPrixPlayers(configPlayers: CleanConfigPlayer[], configHash: string) {
  const grandPrixScores = configPlayers
    .filter((cp) => cp.configHash == configHash)
    .sort((a, b) => a.duration - b.duration);
  return grandPrixScores;
}

// Assumes configPlayers have same configHash
export function configPlayersToLeaderboard(
  configPlayers: CleanConfigPlayer[],
  twitters?: AddressTwitterMap
) {
  let entries: LeaderboardEntry[] = [];

  // Just show wallBreaker badge in client.
  let numMatches = 0;
  configPlayers
    .filter((cp) => cp.score > 0)
    .map((cp) => {
      numMatches += cp.gamesStarted;
      const leaderBoardEntry: LeaderboardEntry = {
        ethAddress: address(cp.address),
        score: calcCleanGrandPrixScore(cp),
        twitter: twitters?.[cp.address],
        moves: cp.moves,
        startTime: cp.startTime,
        endTime: cp.endTime,
        time: cp.duration,
        gamesFinished: cp.gamesFinished,
        gamesStarted: cp.gamesStarted,
        wallBreaker: cp.badges.some((cp) => cp.type == BadgeType.Wallbreaker),
      };
      entries.push(leaderBoardEntry);
    });

  return { entries, length: numMatches } as Leaderboard;
}

// Get a single player's Season data. Best Grand Prix results and badges.
export function loadSeasonPlayer(playerId: string, configPlayers: ConfigPlayer[]): ConfigPlayer[] {
  return configPlayers.filter((cp) => cp.address === playerId);
}

export function loadGrandPrixLeaderboard(
  configPlayers: CleanConfigPlayer[],
  configHash: string,
  twitters?: AddressTwitterMap
) {
  const players = loadGrandPrixPlayers(configPlayers, configHash);
  const leaderboard = configPlayersToLeaderboard(players, twitters);
  return leaderboard;
}

// Returns true if a given match has occurred after the Grand Prix start time.
export function validGrandPrixMatch(
  configHash: string,
  startTime: number | undefined,
  SEASON_GRAND_PRIXS: GrandPrixMetadata[]
) {
  const grandPrixs = SEASON_GRAND_PRIXS.filter((gp) => gp.configHash == configHash);
  if (grandPrixs.length == 0) return true; // Match is valid if not an official Grand Prix.
  if (!startTime) return false;
  const grandPrix = grandPrixs[0];
  return startTime >= grandPrix.startTime;
}

// Add wallbreaker badge to ConfigPlayers
async function buildCleanConfigPlayer(
  configPlayers: ConfigPlayer[],
  SEASON_GRAND_PRIXS: GrandPrixMetadata[]
): Promise<CleanConfigPlayer[]> {
  const wallBreakers = await loadWallbreakers(SEASON_GRAND_PRIXS);
  return configPlayers
    .filter(
      (cp) =>
        validGrandPrixMatch(cp.configHash, cp.bestTime?.startTime, SEASON_GRAND_PRIXS) &&
        cp.gamesFinished > 0
    )
    .map((cfp) => {
      const isWallBreaker =
        wallBreakers.length > 0 &&
        wallBreakers.filter((e) => e.player === cfp.address && e.configHash === cfp.configHash)
          .length > 0;
      if (isWallBreaker && cfp.badge) {
        cfp.badge.wallBreaker = true;
      }
      const duration = cfp.bestTime ? cfp.bestTime.duration : HOUR_IN_SECONDS;
      const cleanConfig: CleanConfigPlayer = {
        id: cfp.id,
        address: cfp.address,
        duration,
        moves: cfp.bestTime ? cfp.bestTime.winners[0].moves : 0,
        startTime: cfp.bestTime ? cfp.bestTime.startTime : Math.floor(Date.now() / 1000),
        endTime: cfp.bestTime ? cfp.bestTime.endTime : Math.floor(Date.now() / 1000),
        badges: graphBadgeToGrandPrixBadge(cfp.badge, cfp.configHash),
        configHash: cfp.configHash,
        gamesStarted: cfp.gamesStarted,
        gamesFinished: cfp.gamesFinished,
        score: calcGrandPrixScore(duration), // Doesn't include badges!!
      };
      return cleanConfig;
    });
}

// Group ConfigPlayers by address to calculate Season Score
export function groupByPlayers(configPlayers: CleanConfigPlayer[]): SeasonPlayers {
  const seasonPlayers: SeasonPlayers = {};
  configPlayers.map((cp) => {
    if (!seasonPlayers[cp.address]) seasonPlayers[cp.address] = [];
    seasonPlayers[cp.address].push(cp);
  });
  return seasonPlayers;
}

// Sum player dictionary to create list of {player, score}
export function getSeasonScore(
  seasonPlayers: SeasonPlayers,
  SEASON_GRAND_PRIXS: GrandPrixMetadata[]
): SeasonScore[] {
  const seasonScores: SeasonScore[] = [];
  for (const [player, cleanConfigPlayers] of Object.entries(seasonPlayers)) {
    const badges: ConfigBadge[][] = [];
    const seasonScore: SeasonScore = {
      player,
      score: cleanConfigPlayers
        .filter((ccp) => isPastOrCurrentRound(ccp.configHash, SEASON_GRAND_PRIXS))
        .map((result) => {
          badges.push(result.badges);
          return calcCleanGrandPrixScore(result);
        })
        .reduce((prev, curr) => prev + curr),
      grandPrixsFinished: cleanConfigPlayers.length,
    };
    seasonScore.score -= calcBadgeTypeScore(badges.flat().map((b) => b.type));
    seasonScores.push(seasonScore);
  }
  return seasonScores;
}
function groupByGrandPrix(configPlayers: CleanConfigPlayer[] | undefined): GrandPrixPlayers {
  if (!configPlayers) return {};

  const seasonPlayers: GrandPrixPlayers = {};
  configPlayers.map((cp) => {
    if (!seasonPlayers[cp.configHash]) seasonPlayers[cp.configHash] = [];
    seasonPlayers[cp.configHash].push(cp);
  });
  return seasonPlayers;
}

export interface Seasons {
  [id: number]: GrandPrixMetadata[];
}

function groupBySeason(grandPrixs: GrandPrixMetadata[]): Seasons {
  const seasons: Seasons = {};
  grandPrixs.map((gp) => {
    if (!seasons[gp.seasonId]) seasons[gp.seasonId] = [];
    seasons[gp.seasonId].push(gp);
  });
  return seasons;
}

/**
 * Utils to calculate scores
 */
export function calcBadgeTypeScore(badges: BadgeType[]): number {
  let badgeScore = 0;
  for (let item of Object.values(BadgeType)) {
    if (badges.includes(item as BadgeType)) badgeScore += BADGE_BONUSES[item as BadgeType].bonus;
  }
  return badgeScore;
}

// Doesn't include badges. Badges just add season points.
export function calcCleanGrandPrixScore(cleanConfigPlayer: CleanConfigPlayer): number {
  // return HOUR_IN_SECONDS - cleanConfigPlayer.duration;
  return cleanConfigPlayer.duration;
}

export function calcGrandPrixScore(duration: number): number {
  return duration;
}

/**
 * Big daddy score calculation
 */

// Returns empty values if player not found
export function loadPlayerSeasonHistoryView(
  player: EthAddress,
  configPlayers: CleanConfigPlayer[],
  SEASON_GRAND_PRIXS: GrandPrixMetadata[]
): SeasonHistory[] {
  const seasonHistories: SeasonHistory[] = [];

  // Get Season Rank and Score.
  // Need to handle multiple seasons.

  // Loops over all official Grand Prixs
  const seasons = groupBySeason(SEASON_GRAND_PRIXS);

  // For each Season, get required data.
  for (const [key, value] of Object.entries(seasons)) {
    const grandPrixs = value as GrandPrixMetadata[];

    // Calculate Player's Season Aggregate Statistics
    const seasonId = parseInt(key);
    const seasonScores = getSeasonScore(
      loadSeasonPlayers(configPlayers, seasonId, SEASON_GRAND_PRIXS),
      SEASON_GRAND_PRIXS
    );
    let rank = seasonScores.length;
    let score = 0;
    seasonScores
      .sort((a, b) => {
        if (a.grandPrixsFinished > b.grandPrixsFinished) return -1;
        else if (b.grandPrixsFinished > a.grandPrixsFinished) return 1;
        else {
          return a.score - b.score;
        }
      })
      .map((s, index) => {
        if (s.player == player) {
          rank = index + 1;
          score = s.score;
        }
      });

    const seasonHistory: SeasonHistory = {
      seasonId,
      rank,
      score,
      players: seasonScores.length,
      grandPrixs: [],
    };

    const grandPrixHistories: GrandPrixHistory[] = [];

    // Calculate Grand prix aggregate statistics
    grandPrixs.map((gp) => {
      // When no players have started a game, no config players exist.
      const allGrandPrixs = groupByGrandPrix(configPlayers)[gp.configHash];
      let rank = allGrandPrixs ? allGrandPrixs.length : 0;
      let score = 0;
      if (allGrandPrixs && allGrandPrixs.length > 0) {
        allGrandPrixs
          .sort((a, b) => a.score - b.score)
          .map((s, index) => {
            if (s.address == player) {
              rank = index + 1;
              score = s.score;
            }
          });

        // Get grand prixs player has participated in for badges
        const seasonPlayers = groupByPlayers(configPlayers)[player] as
          | CleanConfigPlayer[]
          | undefined;
        const playerGrandPrixs = seasonPlayers?.filter((cp) => cp.configHash == gp.configHash)[0];

        const grandPrixHistory: GrandPrixHistory = {
          configHash: gp.configHash,
          rank,
          score,
          players: allGrandPrixs.length,
          badges: playerGrandPrixs ? playerGrandPrixs.badges : [],
        };

        grandPrixHistories.push(grandPrixHistory);
      }
    });

    seasonHistory.grandPrixs = grandPrixHistories;
    seasonHistories.push(seasonHistory);
  }
  return seasonHistories;
}

export function getBadges(configBadges: BadgeType[][]): BadgeType[] {
  return configBadges.map((configBadge) => configBadge).flat();
}

// Output: object of player address => unique season badges
export function loadUniquePlayerBadges(
  configPlayers: CleanConfigPlayer[],
  seasonId: number,
  SEASON_GRAND_PRIXS: GrandPrixMetadata[]
) {
  const seasonPlayers = loadSeasonPlayers(configPlayers, seasonId, SEASON_GRAND_PRIXS);
  const res: { [player: string]: ConfigBadge[] } = {};
  for (const [player, playerGrandPrixs] of Object.entries(seasonPlayers)) {
    const allBadges = playerGrandPrixs.map((pgp) => pgp.badges).flat();
    const uniqueBadgeSet: UniquePlayerBadges = {};
    const wallBreakers: ConfigBadge[] = [];
    allBadges.forEach((cb) => {
      if (cb.type != BadgeType.Wallbreaker) {
        uniqueBadgeSet[cb.type] = cb;
      } else {
        wallBreakers.push(cb);
      }
    });

    const uniques = Object.values(uniqueBadgeSet) as ConfigBadge[];
    res[player] = uniques.concat(wallBreakers);
  }
  return res;
}
