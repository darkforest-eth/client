import { Leaderboard, LeaderboardEntry } from '@darkforest_eth/types';
import { CORE_CONTRACT_ADDRESS, GETTERS_CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { getEthConnection, loadCoreContract, loadGettersContract } from './Blockchain';
import { EthAddress } from '@darkforest_eth/types';
import { twitters } from './twitters';

export async function loadLeaderboard(inGame: boolean | undefined = false): Promise<Leaderboard> {
  if (!process.env.DF_WEBSERVER_URL) {
    if(!inGame) {
      const provider = (await getEthConnection()).getProvider();
      const core = await loadCoreContract(CORE_CONTRACT_ADDRESS, provider);
      const getters = await loadGettersContract(GETTERS_CONTRACT_ADDRESS, provider);
      const numPlayers = await core.getNPlayers();
      const players = await getters.bulkGetPlayers(0, numPlayers);
      var entries: LeaderboardEntry[] = [];
      players.forEach(player => {
        let entry: LeaderboardEntry = {
          score: player.score.toNumber(),
          ethAddress: player.player.toLowerCase() as EthAddress,
          twitter: twitters[player.player?.toLowerCase()] as string,
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
