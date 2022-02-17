import { Leaderboard } from '@darkforest_eth/types';

export async function loadLeaderboard(): Promise<Leaderboard> {
  if (!process.env.DF_WEBSERVER_URL) {
    return { entries: [] };
  }

  const address = `${process.env.DF_WEBSERVER_URL}/leaderboard`;
  const res = await fetch(address, {
    method: 'GET',
  });

  const rep = await res.json();

  if (rep.error) {
    throw new Error(rep.error);
  }

  return rep;
}
