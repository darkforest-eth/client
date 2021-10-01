import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TutorialManager, {
  TutorialManagerEvent,
  TutorialState,
} from '../../Backend/GameLogic/TutorialManager';
import { Hook } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { Underline } from '../Components/CoreUI';
import { PauseIcon, TargetIcon } from '../Components/Icons';
import { White } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { Setting, useBooleanSetting } from '../Utils/SettingsHooks';

function TutorialPaneContent({ tutorialState }: { tutorialState: TutorialState }) {
  const uiManager = useUIManager();
  const tutorialManager = TutorialManager.getInstance();

  if (tutorialState === TutorialState.None) {
    return (
      <div className='tutintro'>
        Welcome to the universe of <White>DARK FOREST</White>. Would you like to play the tutorial?
        <div>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.None)}>
            Yes
          </Btn>
          <Btn className='btn' onClick={() => tutorialManager.complete(uiManager)}>
            No
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.HomePlanet) {
    return (
      <div>
        Welcome to the universe. You've initialized with 50 energy on your home planet, in a NEBULA.
        <br />
        <br />
        <White>Click your home planet to learn more.</White>
      </div>
    );
  } else if (tutorialState === TutorialState.SendFleet) {
    return (
      <div>
        Well done! In the Selected Planet pane, you'll see more information about your planet. This
        pane displays quick information about your planet and the ability to send resources.
        <br />
        <br />
        <White>Try sending energy to another planet.</White> You can click and drag to look for
        other planets.
      </div>
    );
  } else if (tutorialState === TutorialState.Deselect) {
    return (
      <div>
        Congrats, you've submitted a move to xDAI! Moves that are in the mempool are shown as dotted
        lines. Accepted moves are shown as solid lines.
        <br />
        <br />
        <White>Try deselecting a planet now. Click in empty space to deselect.</White>
      </div>
    );
  } else if (tutorialState === TutorialState.ZoomOut) {
    return (
      <div className='tutzoom'>
        Great! You'll notice that most of the universe appears grayed out. You need to explore those
        areas before you can view them.
        <br />
        <br />
        You'll notice a target <TargetIcon /> indicating where you are currently exploring.{' '}
        <White>Press next when you can see it.</White> You can also zoom using the mouse wheel.
        <div>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.ZoomOut)}>
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.MinerMove) {
    return (
      <div>
        You can move your explorer by using the bottom-left context menu when nothing is selected.
        <br />
        <br />
        <White>
          Try moving your explorer by clicking on the Move <TargetIcon /> button
        </White>
        , then clicking somewhere in space.
      </div>
    );
  } else if (tutorialState === TutorialState.MinerPause) {
    return (
      <div>
        Great! You can also pause your explorer by clicking the pause <PauseIcon /> button.
        <br />
        <br />
        <White>Try pausing your explorer now.</White>
      </div>
    );
  } else if (tutorialState === TutorialState.Terminal) {
    return (
      <div>
        You can hide the terminal on the right by clicking on its left edge.
        <br />
        <br />
        <White>Try hiding the terminal now.</White>
      </div>
    );
  } else if (tutorialState === TutorialState.HowToGetScore) {
    return (
      <div className='tutzoom'>
        <White>It's a Lightning Round!</White> <br />
        <br />
        Have the highest score at the end of the round to win!
        <br />
        <div>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.HowToGetScore)}
          >
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.ScoringDetails) {
    return (
      <div className='tutzoom'>
        You can increase your score by withdrawing silver via space time rips, and by finding
        artifacts. The rarer the artifact, the more points it gives you!
        <div>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.ScoringDetails)}
          >
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.Valhalla) {
    return (
      <div className='tutalmost'>
        Winners of each round of Dark Forest v0.6.x will receive a prize, and be added to the{' '}
        <Underline>Valhalla</Underline> universe.
        <br />
        <br />
        To win, have the highest score (^:
        <div>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.Valhalla)}>
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.AlmostCompleted) {
    return (
      <div className='tutalmost'>
        This is the end of the tutorial. Go out and explore the universe! More information will pop
        up in the <White>upper-right</White> as you discover more about the game.
        <br />
        We hope you enjoy Dark Forest!
        <div>
          <Btn className='btn' onClick={() => tutorialManager.complete(uiManager)}>
            Finish
          </Btn>
        </div>
      </div>
    );
  } else {
    return <> </>;
  }
}

const StyledTutorialPane = styled.div<{ visible: boolean }>`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  position: absolute;
  top: 0;
  left: 0;

  background: ${dfstyles.colors.backgroundlighter};
  color: ${dfstyles.colors.text};
  padding: 8px;
  border-bottom: 1px solid ${dfstyles.colors.border};
  border-right: 1px solid ${dfstyles.colors.border};

  width: 24em;
  height: fit-content;

  z-index: 10;

  & .tutintro {
    & > div:last-child {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      margin-top: 1em;
    }
  }

  & .tutzoom,
  & .tutalmost {
    & > div:last-child {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      margin-top: 1em;
    }
  }
`;

export function TutorialPane({ tutorialHook }: { tutorialHook: Hook<boolean> }) {
  const uiManager = useUIManager();
  const tutorialManager = TutorialManager.getInstance();

  const [tutorialState, setTutorialState] = useState<TutorialState>(TutorialState.None);
  const [tutorialOpen] = tutorialHook;
  const [completed, setCompleted] = useBooleanSetting(uiManager, Setting.TutorialCompleted);

  // sync tutorial state
  useEffect(() => {
    const update = (newState: TutorialState) => {
      setTutorialState(newState);
      setCompleted(newState === TutorialState.Completed);
    };
    tutorialManager.on(TutorialManagerEvent.StateChanged, update);

    return () => {
      tutorialManager.removeListener(TutorialManagerEvent.StateChanged, update);
    };
  }, [tutorialManager, setCompleted]);

  return (
    <StyledTutorialPane visible={!completed && tutorialOpen}>
      <TutorialPaneContent tutorialState={tutorialState} />
    </StyledTutorialPane>
  );
}
