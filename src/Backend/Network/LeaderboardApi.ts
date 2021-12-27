import { Leaderboard, LeaderboardEntry } from '@darkforest_eth/types';
import GameManager from '../GameLogic/GameManager';

export async function loadLeaderboard(gameManager: GameManager | undefined): Promise<Leaderboard> {
  if (!process.env.DF_WEBSERVER_URL) {
    if(gameManager) {
      var entries: LeaderboardEntry[] = [];
      const players = await gameManager.getAllPlayers();
      players.forEach(player => {
        let entry: LeaderboardEntry = {
          score: player.score,
          ethAddress: player.address,
          twitter: player.twitter,
        };
        entries.push(entry);
      });
      return { entries };
    }
    else {
      return { entries: [] };
    }
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
