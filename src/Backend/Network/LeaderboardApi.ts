import { AggregateLeaderboard } from '@darkforest_eth/types';

const LEADERBOARD_API = process.env.LEADERBOARD_API as string;

export async function loadLeaderboard(): Promise<AggregateLeaderboard> {
  const address = `${LEADERBOARD_API}/leaderboard`;
  const res = await fetch(address, {
    method: 'GET',
  });

  const rep = await res.json();

  if (rep.error) {
    throw new Error(rep.error);
  }

  return rep;
}
