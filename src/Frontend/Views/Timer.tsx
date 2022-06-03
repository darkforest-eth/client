import { TooltipName } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AccountLabel } from '../Components/Labels/Labels';
import { Gold } from '../Components/Text';
import { TooltipTrigger } from '../Panes/Tooltip';
import { useGameover, useUIManager } from '../Utils/AppHooks';
import { formatDuration } from '../Utils/TimeUtils';

export function Timer() {
  const uiManager = useUIManager();
  const [time, setTime] = useState('00:00:00');

  function CountDown() {

    const update = () => {
      const gameDuration = uiManager.getGameDuration();
      setTime(`${formatDuration(gameDuration * 1000)}`);
    };

    useEffect(() => {
      const interval = setInterval(() => {
        update();
      }, 333);

      return () => clearInterval(interval);
    }, []);

    return <span>{time}</span>;
  }

  return (
    <TimeContainer>
      <CountDown />
    </TimeContainer>
  );
}

const TimeContainer = styled.div`
  font-size: 1em;
  text-align: center;
`;
