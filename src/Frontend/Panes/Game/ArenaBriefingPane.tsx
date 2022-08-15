import React, {  useState } from 'react';
import { Btn } from '../../Components/Btn';
import { Bronze, Gold, Green, Silver } from '../../Components/Text';
import { bronzeTime, goldTime, silverTime } from '../../Utils/constants';
import { useUIManager } from '../../Utils/AppHooks';
import { formatDuration } from '../../Utils/TimeUtils';
import { StyledTutorialPane } from './StyledTutorialPane';


export function ArenaBriefingPane() {
  const [open, setOpen] = useState(true);
  const uiManager = useUIManager();
  const spectatorMode = uiManager.getGameManager().getIsSpectator();
  const isSinglePlayer = uiManager.getSpawnPlanets().length == 1 
  const victoryThreshold = uiManager.contractConstants.CLAIM_VICTORY_ENERGY_PERCENT;
  const numForVictory = uiManager.contractConstants.TARGETS_REQUIRED_FOR_VICTORY;
  const isCompetitive = uiManager.isCompetitive();


  if (spectatorMode || !open) {
    return null;
  }

  return (
    <StyledTutorialPane>
      <div className='tutzoom'>
        Welcome to Dark Forest Arena!
        <br />
        <br />
        <div>
          {isSinglePlayer? (
            <>
              Race against the clock to capture the Target Planet (it has a big 🎯 floating above
              it) and{' '}
              <Green>
                claim victory when it contains at least <Gold>{victoryThreshold}%</Gold> energy!
              </Green>
            </>
          ) : (
            <>
              Battle your opponent to capture the Target Planet (it has a big 🎯 floating above it)
              and{' '}
              <Green>
                claim victory when it contains at least <Gold>{victoryThreshold}%</Gold> energy!
              </Green>
              .
            </>
          )}
          You need {numForVictory} to win.
        </div>
        {isCompetitive && isSinglePlayer && (
          <div>
            <p>End the race in a certain time to earn Bronze, Silver, and Gold ranks.</p>
            <p>
              Gold: <Gold>{formatDuration(goldTime * 1000)}</Gold>
            </p>
            <p>
              Silver: <Silver>{formatDuration(silverTime * 1000)}</Silver>
            </p>
            <p>
              Bronze: <Bronze>{formatDuration(bronzeTime * 1000)}</Bronze>
            </p>
          </div>
        )}
        <div>
          ⏲️ starts {isSinglePlayer ? 'with your first move' : 'when you press ready'}!
          {isCompetitive && isSinglePlayer && 'The player with the fastest time after 48hrs will win XDAI and a 🏆!'}
        </div>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => setOpen(false)}>
            Next
          </Btn>
        </div>
      </div>
    </StyledTutorialPane>
  );
}
