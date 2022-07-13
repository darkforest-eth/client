import { Setting } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TutorialManager, {
  TutorialManagerEvent,
  TutorialState,
} from '../../Backend/GameLogic/TutorialManager';
import { Hook } from '../../_types/global/GlobalTypes';
import { Btn } from '../Components/Btn';
import { Link } from '../Components/CoreUI';
import { Icon, IconType } from '../Components/Icons';
import { Bronze, Gold, Green, Red, Silver, White } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { bronzeTime, goldTime, silverTime } from '../Utils/constants';
import { useBooleanSetting } from '../Utils/SettingsHooks';
import { formatDuration } from '../Utils/TimeUtils';

function TutorialPaneContent({ tutorialState }: { tutorialState: TutorialState }) {
  const uiManager = useUIManager();
  const isCompetitive = uiManager.getGameManager().isCompetitive();
  const gameManager = uiManager.getGameManager();
  const victoryThreshold = gameManager.getContractConstants().CLAIM_VICTORY_ENERGY_PERCENT;
  const numForVictory = gameManager.getContractConstants().TARGETS_REQUIRED_FOR_VICTORY;

  const tutorialManager = TutorialManager.getInstance(uiManager);

  const [sKey, setSKey] = useState<string | undefined>(undefined);
  const [viewPrivateKey, setViewPrivateKey] = useState<boolean>(false);
  const [viewHomeCoords, setViewHomeCoords] = useState<boolean>(false);

  useEffect(() => {
    if (!uiManager) return;
    setSKey(uiManager.getPrivateKey());
  }, [uiManager]);

  const [home, setHome] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!uiManager) return;
    const coords = uiManager.getHomeCoords();
    setHome(coords ? `(${coords.x}, ${coords.y})` : '');
  }, [uiManager]);
  if (tutorialState === TutorialState.Spectator) {
    return (
      <div className='tutzoom'>
        Welcome to Dark Forest Arena!
        <br />
        <br />
        <div>You are spectating this game! Enjoy the show!</div>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
        </div>
      </div>
    );
  }
  if (tutorialState === TutorialState.None) {
    const isSinglePlayer = uiManager.getSpawnPlanets().length == 1 
    return (
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
          ⏲️ starts when you press ready!
          {isCompetitive && 'The player with the fastest time after 48hrs will win XDAI and a 🏆!'}
        </div>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.None)}>
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.Security) {
    return (
      <div className='tutzoom'>
        <div>
          The game stores your <White>private key</White> and home coordinates in your browser. They
          are your password, and <Red>should never be viewed by anyone else.</Red>
        </div>
        <div>
          <Btn
            onClick={() => {
              setViewPrivateKey(!viewPrivateKey);
            }}
          >
            {viewPrivateKey ? 'Hide' : 'View'} private key
          </Btn>{' '}
          <br />
          Your private key is:{' '}
          <TextPreview
            text={viewPrivateKey ? sKey : 'hidden'}
            focusedWidth={'150px'}
            unFocusedWidth={'150px'}
          />
        </div>
        <div>
          <Btn
            onClick={() => {
              setViewHomeCoords(!viewHomeCoords);
            }}
          >
            {viewHomeCoords ? 'Hide' : 'View'} home coords
          </Btn>{' '}
          <br />
          Your home coords are:{' '}
          <TextPreview
            text={viewHomeCoords ? home : 'hidden'}
            focusedWidth={'150px'}
            unFocusedWidth={'150px'}
          />
        </div>

        <p>We recommend you back this information up.</p>
        <br />
        <p>
          If you are new to Dark Forest, play the tutorial! Otherwise, skip and jump into the
          action.
        </p>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.Security)}>
            Play Tutorial
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.SpawnPlanet) {
    return (
      <div className='tutzoom'>
        <White>Click your home planet to learn more.</White>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.SpawnPlanet)}
          >
            Skip
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.SendFleet) {
    return (
      <div className='tutzoom'>
        Well done! This pane displays quick information about your planet and the ability to send
        resources. Your planet uses <White>energy</White> to capture nearby planets. You can use{' '}
        <Gold>silver</Gold> for planet upgrades{' '}
        <Link to='https://www.youtube.com/watch?v=eXWfaVt_i3o&list=PLn4H2Bj-iklclFZW_YpKCQaTnBVaECLDK&index=5'>
          (Click here for more on silver)
        </Link>
        .
        <br />
        <br />
        <White>Try sending energy to another planet.</White> You can click and drag to send energy
        to another planet. Alternatively, click your planet, press {<White>q</White>}, and click a
        nearby planet.
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.SendFleet)}>
            Skip
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.SpaceJunk) {
    return (
      <div className='tutzoom'>
        <p>
          When you send planet you accumulate <White>Space Junk</White>. Once you hit the Space Junk
          limit, you won't be able to move to new planets.
        </p>
        <p>
          To reduce your space junk, <Red>Abandon</Red> planets and keep expanding!
        </p>
        <br />
        <br />
        Take a look at the top of the screen to see you current and maximum{' '}
        <White>Space Junk</White>.
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.SpaceJunk)}>
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.Spaceship) {
    return (
      <div className='tutzoom'>
        <p>
          You also control several space ships - check your home planet! You can move spaceships
          between any two planets, even if you don't own them. Space ships can move any distance!{' '}
          <White>Try moving a spaceship you own to another planet now!</White>
        </p>
        <p>Tip: Before moving, click a spaceship to select it. Then execute your move.</p>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.Spaceship)}>
            Skip
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.Deselect) {
    return (
      <div className='tutzoom'>
        Congrats, you've submitted a move to xDAI! Moves that are in the mempool are shown as dotted
        lines. Accepted moves are shown as solid lines.
        <br />
        <br />
        <White>Try deselecting a planet now. Click in empty space to deselect.</White>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.Deselect)}>
            Skip
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.ZoomOut) {
    return (
      <div className='tutzoom'>
        <p>Great! You can zoom using the mouse wheel. </p>
        <p>Try zooming all the way out so you can find the target planet!</p>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>

          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.ZoomOut)}>
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.MinerMove) {
    return (
      <div className='tutzoom'>
        Most of the universe appears greyed out. You need to use your explorer{' '}
        <Icon type={IconType.Target} /> to reveal those areas.
        <br />
        The explorer <Icon type={IconType.Target} /> indicates where you are exploring.
        <br />
        <White>
          Move your explorer with the bottom-left context menu by clicking on the Move{' '}
          <Icon type={IconType.Target} /> button
        </White>
        , then clicking in a grey region.
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.MinerMove)}>
            Skip
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.MinerPause) {
    return (
      <div className='tutzoom'>
        Great! You can also pause your explorer by clicking the pause <Icon type={IconType.Pause} />{' '}
        button.
        <br />
        <br />
        <White>Try pausing your explorer now.</White>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.MinerPause)}
          >
            Skip
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.Terminal) {
    return (
      <div className='tutzoom'>
        You can hide the terminal on the right by clicking on its left edge.
        <br />
        <br />
        <White>Try hiding the terminal now.</White>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.Terminal)}>
            Skip
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.HowToGetScore) {
    const isCompetitive = uiManager.getGameManager().isCompetitive();
    const victoryThreshold = uiManager
      .getGameManager()
      .getContractConstants().CLAIM_VICTORY_ENERGY_PERCENT;
    return (
      <div className='tutzoom'>
        <White>It's a{isCompetitive ? ' Grand Prix!' : 'n Arena Battle!'}</White>
        <p>
          Race against the clock to capture the Target Planet (it has a big 🎯 floating above it)
          and{' '}
          <Green>
            claim victory when it contains at least <Gold>{victoryThreshold}%</Gold> energy!
          </Green>
        </p>
        {isCompetitive && (
          <p>The player with the fastest time after 48hrs will win XDAI and a 🏆!</p>
        )}
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.HowToGetScore)}
          >
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.BlockedPlanet) {
    return (
      <div className='tutzoom'>
        <p>
          This game includes blocked planets. You can't move to this planet! However, your opponents
          may be able to.
        </p>
        <p>
          Hover over the blocked icon on the planet card to see which players can move to that
          planet.
        </p>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.BlockedPlanet)}
          >
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.DefensePlanet) {
    return (
      <div className='tutzoom'>
        <p>This is your home planet. A home planet is a target planet that you cannot move to!</p>
        <p>
          You will need to defend this planet from potential attacks, because if someone else
          captures it, they could win. Hover over the blocked icon on the planet card to see which
          players can move there.
        </p>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.complete()}>
            Exit
          </Btn>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.DefensePlanet)}
          >
            Next
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.AlmostCompleted) {
    return (
      <div className='tutalmost'>
        This is the end of the tutorial. For a more in-depth strategy guide,{' '}
        <Link to='https://medium.com/@classicjdf/classicjs-dark-forest-101-strategy-guide-part-1-energy-1b80923fee69'>
          click here
        </Link>
        . For video tutorials,{' '}
        <Link to='https://www.youtube.com/watch?v=3a4i9IyfmBI&list=PLn4H2Bj-iklclFZW_YpKCQaTnBVaECLDK'>
          click here
        </Link>
        . More information will pop up in the <White>upper-right</White> as you discover more about
        the game.
        <br />
        We hope you enjoy Dark Forest!
        <div style={{ gap: '5px' }}>
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

export function TutorialPane({ tutorialHook }: { tutorialHook: boolean }) {
  const uiManager = useUIManager();
  const tutorialManager = TutorialManager.getInstance(uiManager);

  const spectatorMode = uiManager.getGameManager().getIsSpectator();

  const [tutorialState, setTutorialState] = useState<TutorialState>(
    spectatorMode ? TutorialState.Spectator : TutorialState.None
  );
  const tutorialOpen = tutorialHook;
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
