import { goldTime, silverTime, bronzeTime } from '../../Frontend/Utils/constants';


export enum Rank {
  GOLD,
  SILVER,
  BRONZE,
  NONE,
}

export function getRank(time: number): Rank {
  if (time <= goldTime) return Rank.GOLD;
  else if (time <= silverTime) return Rank.SILVER;
  else if (time <= bronzeTime) return Rank.BRONZE;
  else return Rank.NONE;
}
