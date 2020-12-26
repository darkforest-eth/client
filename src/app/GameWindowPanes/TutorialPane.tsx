import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { UIDataKey, useStoredUIState } from '../../api/UIStateStorageManager';
import { White } from '../../components/Text';
import dfstyles from '../../styles/dfstyles';
import TutorialManager, {
  TutorialManagerEvent,
  TutorialState,
} from '../../utils/TutorialManager';
import { Hook } from '../../_types/global/GlobalTypes';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import { Btn } from '../GameWindowComponents/GameWindowComponents';
import { PauseIcon, TargetIcon } from '../Icons';

function TutorialPaneContent({
  tutorialState,
}: {
  tutorialState: TutorialState;
}) {
  const tutorialManager = TutorialManager.getInstance();

  if (tutorialState === TutorialState.None) {
    return (
      <div className='tutintro'>
        Welcome to the universe of <White>DARK FOREST</White>. Would you like to
        play the tutorial?
        <div>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.None)}
          >
            Yes
          </Btn>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            No
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.HomePlanet) {
    return (
      <div>
        Welcome to the universe. You've initialized with 50 energy on your home
        planet, in a NEBULA.
        <br />
        <br />
        <White>Click your home planet to learn more.</White>
      </div>
    );
  } else if (tutorialState === TutorialState.SendFleet) {
    return (
      <div>
        Well done! On the right, you'll see more information about your planet.
        In the bottom-left, you'll see a <White>context menu</White>, showing
        quick information about your planet and the ability to send resources.
        <br />
        <br />
        <White>Try sending energy to another planet.</White> You can click and
        drag to look for other planets.
      </div>
    );
  } else if (tutorialState === TutorialState.Deselect) {
    return (
      <div>
        Congrats, you've submitted a move to xDAI! Moves that are in the mempool
        are shown as dotted lines. Accepted moves are shown as solid lines.
        <br />
        <br />
        <White>
          Try deselecting a planet now. Press ESC or click in empty space.
        </White>
      </div>
    );
  } else if (tutorialState === TutorialState.ZoomOut) {
    return (
      <div className='tutzoom'>
        Great! You'll notice that most of the universe appears grayed out. You
        need to explore those areas before you can view them.
        <br />
        <br />
        You'll notice a target <TargetIcon /> indicating where you are currently
        exploring. <White>Press next when you can see it.</White> You can also
        zoom using the mouse wheel.
        <div>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.ZoomOut)}
          >
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.MinerMove) {
    return (
      <div>
        You can move your explorer by using the bottom-left context menu when
        nothing is selected.
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
        Great! You can also pause your explorer by clicking the pause{' '}
        <PauseIcon /> button.
        <br />
        <br />
        <White>Try pausing your explorer now.</White>
      </div>
    );
  } else if (tutorialState === TutorialState.Sidebar) {
    return (
      <div>
        Now you know how the basics of how to play Dark Forest. Before you go,
        notice that there's additional information in the Sidebar on the left of
        the screen.
        <br />
        <br />
        You can hide this information by clicking the right edge of the sidebar.{' '}
        <White>Try hiding the sidebar now.</White>
      </div>
    );
  } else if (tutorialState === TutorialState.Terminal) {
    return (
      <div>
        You can also hide the terminal on the right by clicking on its left
        edge.
        <br />
        <br />
        <White>Try hiding the terminal now.</White>
      </div>
    );
  } else if (tutorialState === TutorialState.AlmostCompleted) {
    return (
      <div className='tutalmost'>
        This is the end of the tutorial. Go out and explore the universe! More
        information will pop up in the <White>upper-right</White> as you
        discover more about the game.
        <br />
        <br />
        We hope you enjoy the game!
        <div>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
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
  color: #e6c3b8;
  padding: 8px;
  border-bottom: 1px solid ${dfstyles.colors.text};
  border-right: 1px solid ${dfstyles.colors.text};

  width: 24em;
  height: fit-content;

  z-index: 10;

  & .btn {
    color: ${dfstyles.colors.text};
  }

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

export function TutorialPane({
  newPlayerHook,
}: {
  newPlayerHook: Hook<boolean>;
}) {
  const [visible, setVisible] = useState<boolean>(true);
  const tutorialManager = TutorialManager.getInstance();

  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  const [tutorialState, setTutorialState] = useState<TutorialState>(
    TutorialState.None
  );

  const [newPlayer] = newPlayerHook;

  const [completed, setCompleted] = useStoredUIState<boolean>(
    UIDataKey.tutorialCompleted,
    uiManager
  );

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

  // sync style to tutorial state
  useLayoutEffect(() => {
    if (newPlayer) {
      setVisible(false);
      return;
    }

    if (completed) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, [tutorialState, completed, newPlayer]);

  useEffect(() => {
    // console.log(tutorialState, visible, newPlayer);
  }, [tutorialState, visible, newPlayer]);

  return (
    <StyledTutorialPane visible={visible}>
      <TutorialPaneContent tutorialState={tutorialState} />
    </StyledTutorialPane>
  );
}
