import React, { useEffect, useState } from 'react';
import { Btn } from '../../Components/Btn';
import { Gold, Green } from '../../Components/Text';
import { useUIManager } from '../../Utils/AppHooks';
import { StyledTutorialPane } from './StyledTutorialPane';
import { setBooleanSetting } from '../../Utils/SettingsHooks';
import { Setting, WorldLocation } from '@darkforest_eth/types';
import { setObjectSyncState } from '../../Utils/EmitterUtils';

const enum BriefingStep {
  Welcome,
  Target,
  AlmostComplete,
  Complete,
}
export function ArenaBriefingPane() {
  const uiManager = useUIManager();
  const [open, setOpen] = useState(!uiManager.gameStarted);
  const [step, setStep] = useState<BriefingStep>(BriefingStep.Welcome);
  const [targetCoords, setTargetCoords] = useState<WorldLocation>();
  const [targetIdx, setTargetIdx] = useState(0);
  const config = {
    contractAddress: uiManager.getContractAddress(),
    account: uiManager.getAccount(),
  };
  const spectatorMode = uiManager.getGameManager().getIsSpectator();
  const isSinglePlayer = uiManager.getSpawnPlanets().length == 1;
  const victoryThreshold = uiManager.contractConstants.CLAIM_VICTORY_ENERGY_PERCENT;
  const numForVictory = uiManager.contractConstants.TARGETS_REQUIRED_FOR_VICTORY;
  const targetLocations = uiManager.getPlayerTargetPlanets();

  useEffect(() => {
    if (step == BriefingStep.Target) {
      if (!targetLocations || targetLocations.length <= targetIdx)
        return setStep(BriefingStep.AlmostComplete);
      const targetLocation = targetLocations[targetIdx];

      const coords = targetLocation
        ? uiManager.getGameManager().getRevealedLocations().get(targetLocation.locationId)
        : undefined;
      setTargetCoords(coords);
      uiManager.centerLocationId(targetLocation.locationId);
    } else if (step == BriefingStep.AlmostComplete) {
      const homeLocation = uiManager.getHomeHash();
      if (homeLocation) uiManager.centerLocationId(homeLocation);
      setOpen(false);
      setBooleanSetting(config, Setting.ShowArenaBriefing, true);
    }
  }, [step, setStep, targetIdx]);

  if (spectatorMode || !open) {
    return null;
  }

  const welcomeContent = (
    <div className='tutzoom'>
      Welcome to Dark Forest Arena!
      <br />
      <br />
      <div>
        <>
          Race against the clock to capture {numForVictory > 1 ? `${numForVictory}` : 'a'} Target
          Planet
          {targetLocations?.length > 1 && 's'} and{' '}
          <Green>
            claim victory when {targetLocations?.length > 1 ? 'each' : 'it'} contains at least{' '}
            <Gold>{victoryThreshold}%</Gold> energy!
          </Green>
        </>
        <div>
          You need {numForVictory} target planet{numForVictory > 1 && 's'} to claim victory.
        </div>
      </div>
      <br />
      <div style={{ gap: '5px' }}>
        <Btn className='btn' onClick={() => setOpen(false)}>
          Close
        </Btn>
        <Btn className='btn' onClick={() => setStep(BriefingStep.Target)}>
          View Target Planet
        </Btn>
      </div>
    </div>
  );

  const targetContent = (
    <div className='tutzoom'>
      {targetCoords ? (
        <>
          <div>
            This is {targetLocations?.length > 1 ? 'one of your objectives' : 'your objective'}: a
            🎯 Target Planet.{' '}
            {targetCoords &&
              `It is located at (${targetCoords.coords.x}, ${targetCoords.coords.y}).`}
          </div>
          <br />
          <div>
            The timer ⏲️ starts {isSinglePlayer ? 'with your first move' : 'when you press ready'}.
            Good luck!
          </div>
          <br />
          <div style={{ gap: '5px' }}>
            <Btn
              className='btn'
              onClick={() => {
                setTargetIdx(targetIdx + 1);
              }}
            >
              {targetLocations && targetIdx >= targetLocations.length - 1
                ? 'Return to home planet'
                : 'See next target planet'}
            </Btn>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );

  const completeContent = (
    <div className='tutzoom'>
      <div>
        The timer ⏲️ starts {isSinglePlayer ? 'with your first move' : 'when you press ready'}. Good
        luck!
      </div>
      <br />
      <div style={{ gap: '5px' }}>
        <Btn
          className='btn'
          onClick={() => {
            setStep(BriefingStep.Complete);
          }}
        >
          Exit
        </Btn>
      </div>
    </div>
  );

  return (
    <StyledTutorialPane>
      {step == BriefingStep.Welcome && welcomeContent}
      {step == BriefingStep.Target && targetContent}
      {step == BriefingStep.AlmostComplete && completeContent}
    </StyledTutorialPane>
  );
}
