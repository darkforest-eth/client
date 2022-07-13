import { TooltipName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import Button from '../Components/Button';
import { TooltipTrigger } from '../Panes/Tooltip';
import { useGameover, usePaused, useUIManager } from '../Utils/AppHooks';

export function Play() {
  const gameManager = useUIManager().getGameManager();
  const CONFIRM_START = gameManager.getContractConstants().CONFIRM_START;
  const paused = usePaused();
  const hidePlay = !(paused && CONFIRM_START);

  const ready = () => {
    console.log('marking ready...');
    gameManager.ready();
  };

  return (
    <PlayContainer>
      {hidePlay ? null : (
        <Btn onClick={ready}>
          <TooltipTrigger
            extraContent={<>Click Play to unpause and start the clock</>}
            name={TooltipName.Empty}
          >
            Play
          </TooltipTrigger>
        </Btn>
      )}
    </PlayContainer>
  );
}

const PlayContainer = styled.div`
  font-size: 2em;
  text-align: center;
`;