import { EthAddress, TooltipName } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRank, Rank } from '../../Backend/Utils/Rank';
import { AccountLabel } from '../Components/Labels/Labels';
import { Gold, Text, White } from '../Components/Text';
import { TooltipTrigger } from '../Panes/Tooltip';
import dfstyles from '../Styles/dfstyles';
import { useGameover, useUIManager } from '../Utils/AppHooks';
import { formatDuration } from '../Utils/TimeUtils';

export function Timer({ account }: { account: EthAddress | undefined }) {
  const uiManager = useUIManager();
  const [time, setTime] = useState('00:00:00');
  const [color, setColor] = useState(dfstyles.colors.dfwhite);
  const [moves, setMoves] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  const isCompetitive = uiManager.getGameManager().isCompetitive();

  function CountDown({ colored }: { colored: boolean }) {
    const update = () => {
      if (!account) return;
      const moves = uiManager.getPlayerMoves(account) || 0;
      const gameDuration = uiManager.getGameDuration();
      setMoves(moves);
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
      <TooltipTrigger
        name={TooltipName.Empty}
        extraContent={
          <Text>
            <p> score is calculated using the following equation:</p>
            <White>Score = Time (seconds) * (1 - Moves / 1000)</White>{'\n'}
            <p>Your score is {Math.round(score)} = {time} * (1 - {moves} / 1000)</p>
          </Text>
        }
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 33%)',
            width: '100%',
            textAlign: 'center',
          }}
        >
          <span style={{ gridColumn: '1' }}>Moves: {moves}</span>
          <span style={{ gridColumn: '2' }}>{time}</span>
          <span style={{ color, gridColumn: '3' }}>Score: {Math.round(score)}</span>
        </div>
      </TooltipTrigger>
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
