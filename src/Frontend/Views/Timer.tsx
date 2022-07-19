import { EthAddress, TooltipName } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRank, Rank } from '../../Backend/Utils/Rank';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { formatDuration } from '../Utils/TimeUtils';

export function Timer({ account }: { account: EthAddress | undefined }) {
  const uiManager = useUIManager();
  const [time, setTime] = useState('00:00:00');
  const [color, setColor] = useState(dfstyles.colors.dfwhite);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const isCompetitive = uiManager.isCompetitive();

  function CountDown({ colored }: { colored: boolean }) {
    const update = () => {
      if (account) {
        const moves = uiManager.getPlayerMoves(account) || 0;
        setMoves(moves);
      }

      const gameDuration = uiManager.getGameDuration();
      setTime(`${formatDuration(gameDuration * 1000)}`);
      const points = gameDuration * (1 + moves / 1000);
      setScore(points);
      if (colored) {
        const rank = getRank(points);
        if (rank == Rank.GOLD) setColor(dfstyles.colors.dfgold);
        else if (rank == Rank.SILVER) setColor(dfstyles.colors.dfsilver);
        else if (rank == Rank.BRONZE) setColor(dfstyles.colors.dfbronze);
        else setColor(dfstyles.colors.dfwhite);
      }
    };

    useEffect(() => {
      const interval = setInterval(() => {
        update();
      }, 800);

      return () => clearInterval(interval);
    }, []);

    return (
      <>
        {account && <span style={{ gridColumn: '1' }}>Moves: {moves}</span>}
        <span style={{ gridColumn: '2' }}>{time}</span>
        {/* <span style={{ color, gridColumn: '3' }}>Score: {Math.round(score)}</span> */}
      </>
    );
  }

  return (
    <>
      <CountDown colored={isCompetitive} />
    </>
  );
}

const TimeContainer = styled.div`
  font-size: 1em;
  text-align: center;
  gap: 5px;
`;
