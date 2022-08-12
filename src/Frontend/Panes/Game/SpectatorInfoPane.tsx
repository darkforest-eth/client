import React, {  useState } from 'react';
import { Btn } from '../../Components/Btn';
import { useUIManager } from '../../Utils/AppHooks';
import { StyledTutorialPane } from './StyledTutorialPane';

export function SpectatorInfoPane() {
  const uiManager = useUIManager();
  const spectatorMode = uiManager.getGameManager().getIsSpectator();
  const [open, setOpen] = useState(true);

  if (!spectatorMode || !open) {
    return null;
  }

  return (
    <StyledTutorialPane>
      <div className='tutzoom'>
        Welcome to Dark Forest Arena!
        <br />
        <br />
        <div>You are spectating this game! Enjoy the show!</div>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => setOpen(false)}>
            Okay
          </Btn>
        </div>
      </div>
    </StyledTutorialPane>
  );
}
