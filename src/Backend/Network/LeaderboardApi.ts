import { EthAddress } from "@darkforest_eth/types";
const API_URL_GRAPH =
  "https://api.thegraph.com/subgraphs/name/cha0sg0d/death-of-the-universe";
const API_URL_NAMES = "https://api.zkga.me/twitter/all-twitters";

export interface Leaderboard {
  entries: LeaderboardEntry[];
}
export interface LeaderboardEntry {
  silverArtifacts: number | undefined;
  distanceToCenter: number | undefined;
  destroyedScore: number | undefined;
  ethAddress: EthAddress;
  twitter?: string;
}

const PLAYERS_QUERY = `
{
  players(first:1000, block:{number:19943660}, where:{ id_not: "0x0000000000000000000000000000000000000000" }) {
    id
    score
    destroyedScore
    planets(orderBy: revealedRadius, where: {revealedRadius_not: 0, destroyed:false, planetLevel_gte: 3}, first: 1) {
      revealedRadius
    }
  }
}
`;

async function fetchGQL(query: any, graphApiUrl = API_URL_GRAPH) {
  const response = await fetch(graphApiUrl, {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  return await response.json();
}

async function fetchTwitterNames() {
  return fetch(API_URL_NAMES).then((response) => response.json());
}

type PlayerQueryPlanet = {
  revealedRadius: number;
};

type PlayerQueryEntry = {
  id: string;
  score: number;
  destroyedScore: number;
  planets?: PlayerQueryPlanet[];
};

export async function loadLeaderboard(): Promise<Leaderboard> {
  const twitterNames = await fetchTwitterNames();
  const players = await fetchGQL(PLAYERS_QUERY).catch((err) => {
    throw new Error(err);
  });

  const entries = players.data.players.map((entry: PlayerQueryEntry) => {
    return {
      ethAddress: entry.id,
      silverArtifacts: entry.score,
      distanceToCenter: entry.planets?.[0]?.revealedRadius,
      destroyedScore: entry.destroyedScore,
      twitter: twitterNames[entry.id],
    };
  });

  return { entries };
}
