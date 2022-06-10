import { TooltipName } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getRank, Rank } from '../../Backend/Utils/Rank';
import { AccountLabel } from '../Components/Labels/Labels';
import { Gold } from '../Components/Text';
import { TooltipTrigger } from '../Panes/Tooltip';
import dfstyles from '../Styles/dfstyles';
import { useGameover, useUIManager } from '../Utils/AppHooks';
import { formatDuration } from '../Utils/TimeUtils';

export function Timer() {
  const uiManager = useUIManager();
  const [time, setTime] = useState('00:00:00');
  const [color, setColor] = useState(dfstyles.colors.dfwhite)
  const isCompetitive = uiManager.getGameManager().isCompetitive();
  function CountDown({colored} : {colored : boolean}) {

    const update = () => {
      const gameDuration = uiManager.getGameDuration();
      setTime(`${formatDuration(gameDuration * 1000)}`);
      if(colored) {
        const rank = getRank(gameDuration);
        if(rank == Rank.GOLD) setColor(dfstyles.colors.dfgold)
        else if(rank == Rank.SILVER) setColor(dfstyles.colors.dfsilver)
        else if(rank == Rank.BRONZE) setColor(dfstyles.colors.dfbronze);
        else setColor(dfstyles.colors.dfwhite);
      }
    };

    useEffect(() => {
      const interval = setInterval(() => {
        update();
      }, 333);

      return () => clearInterval(interval);
    }, []);

    return <span style = {{color}} >{time}</span>;
  }

  return (
    <TimeContainer>
      <CountDown colored = {isCompetitive} />
    </TimeContainer>
  );
}

const TimeContainer = styled.div`
  font-size: 1em;
  text-align: center;
`;
