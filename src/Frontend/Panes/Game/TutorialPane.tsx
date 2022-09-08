import { Setting } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import TutorialManager, {
  TutorialManagerEvent,
  TutorialState,
} from '../../../Backend/GameLogic/TutorialManager';
import { Btn } from '../../Components/Btn';
import { Link } from '../../Components/CoreUI';
import { Icon, IconType } from '../../Components/Icons';
import { Bronze, Gold, Green, Red, Silver, White } from '../../Components/Text';
import { TextPreview } from '../../Components/TextPreview';
import { useUIManager } from '../../Utils/AppHooks';
import { tutorialFoundryLocation } from '../../Utils/constants';
import { useBooleanSetting } from '../../Utils/SettingsHooks';
import { StyledTutorialPane } from './StyledTutorialPane';

function TutorialPaneContent({ tutorialState }: { tutorialState: TutorialState }) {
  const uiManager = useUIManager();
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
  if (tutorialState === TutorialState.Welcome) {
    return (
      <div className='tutzoom'>
        <White>
          Welcome to the Dark Forest Arena tutorial, Captain! You're an intergalactic explorer who
          commands planets in a fully on-chain universe.
        </White>
        <br />
        <div>Click your spawn planet to get started.</div>
      </div>
    );
  } else if (tutorialState === TutorialState.SpawnPlanet) {
    return (
      <div className='tutzoom'>
        Well done! This is your first planet. Over the course of the game, you will capture more
        throughout the universe.
        <br />
        The planet pane displays quick information about a planet.
        <br />
        <br />
        <div>
          <White>Hover over your planet's stats to learn more.</White> (Hint: they are located
          beneath the planet's Level and Rank)
        </div>
        <div style={{ gap: '5px' }}>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.SpawnPlanet)}
          >
            Continue
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.ZoomOut) {
    return (
      <div className='tutzoom'>
        To zoom in and out, use your mouse's scroll wheel. The edge of the universe is a big thick
        white line.
        <br />
        <White>To move around the universe, click empty space and drag your mouse.</White>
        <br />
        Try not to forget where your spawn planet is!
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.ZoomOut)}>
            Continue
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.SendFleet) {
    return (
      <div className='tutzoom'>
        To expand your empire, you need to capture planets. Planets you own have a{' '}
        <White>White ring</White> around them. Uncaptured planets have a <Red>Red</Red> ring. There
        is a nearby Asteroid Field! Use some of your planet's <White>Energy</White> to move capture
        that Asteroid Field.
        <br />
        <br />
        <White>
          Here's how: Click your spawn planet, press {<Red>q</Red>}, and click the Asteroid Field.
          You should see some energy fly there!
        </White>
      </div>
    );
  } else if (tutorialState === TutorialState.PlanetTypes) {
    return (
      <div className='tutzoom'>
        In the Dark Forest Universe, there are several types of planets. The two most important are{' '}
        <White>Planets</White> and <White>Asteroid Fields</White>.
        <br />
        <br />
        Asteroid fields are special because they produce <Gold>Silver</Gold>. Silver is represented
        by the Gold number above a planet.
        <br />
        You use <Gold>Silver</Gold> to upgrade <White>Planets</White>. You send it just like how you
        send Energy.
        <br />
        <br />
        <White>Try sending some Silver back to your spawn planet!</White>
        <br /> (Hint: Use the Silver slider on the planet pane to increase the Silver you send)
        <div style={{ gap: '5px' }}>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.PlanetTypes)}
          >
            Continue
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.Upgrade) {
    return (
      <div className='tutzoom'>
        You can use <Gold>Silver</Gold> to upgrade <White>Planets</White>.
        <br />
        <br />
        To upgrade your spawn planet, select the spawn planet and click the <White>
          Upgrade
        </White>{' '}
        button on the planet pane. Choose to upgrade either your planets Range or Speed.
        <br />
        <br />
        <White>When you are ready, press Upgrade and your planet's stats will improve.</White>
      </div>
    );
  } else if (tutorialState === TutorialState.UpgradeComplete) {
    return (
      <div className='tutzoom'>
        You know your planet is upgraded when it has a ring around it. Great job!
        <br />
        <br />
        <div style={{ gap: '5px' }}>
          <Btn
            className='btn'
            onClick={() => tutorialManager.acceptInput(TutorialState.UpgradeComplete)}
          >
            Continue
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.SpaceJunk) {
    return (
      <div className='tutzoom'>
        <p>
          Every time you capture a planet you accumulate <White>Space Junk</White>. Once you hit the
          Space Junk limit, you won't be able to move to new planets.
        </p>
        <p>
          To reduce your space junk, <Red>Abandon</Red> planets and keep expanding!
        </p>
        <br />
        <br />
        <White>
          Take a look at the top of the screen to see you current and maximum{' '}
          <White>Space Junk</White>.
        </White>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.SpaceJunk)}>
            Continue
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.Spaceship) {
    console.log('spaceship');
    return (
      <div className='tutzoom'>
        Your spawn planet controls an arsenal of spaceships. You can move spaceships between any two
        planets, even if you don't own them. Space ships can move any distance.
        <br />
        <br />
        <White>
          Hover over them in your spawn planet pane to learn more about their special abilities.
        </White>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.Spaceship)}>
            Continue
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.MoveSpaceship) {
    return (
      <div className='tutzoom'>
        <White>
          Try moving your Gear spaceship (the red one) to the Foundry Planet located at (
          {tutorialFoundryLocation.x}, {tutorialFoundryLocation.y}).
        </White>
        <p>(Hint: Before moving, click a spaceship to select it. Then execute your move.)</p>
      </div>
    );
  } else if (tutorialState === TutorialState.Foundry) {
    return (
      <div className='tutzoom'>
        Another type of planet is the Foundry. Foundries hold special items called{' '}
        <White>Artifacts</White>. When activated, <White>Artifacts</White> give your planet special
        abilities.
        <br />
        Let's extract the artifact from this foundry. <br />
        <br />
        First, capture the foundry by sending energy from your spawn planet. (Planets you own have
        white rings around them).
        <br />
        <br />
        <White>Once you own the foundry, press Prospect Artifact.</White>
      </div>
    );
  } else if (tutorialState === TutorialState.Artifact) {
    return (
      <div className='tutzoom'>
        {' '}
        Your foundry's planet pane should now contain a new Artifact! Hover over it to learn its
        effect.
        <br /> <br />
        In order to <White>activate</White> your artifact's special powers,{' '}
        <White>
          click <White>Inventory</White> on your Foundry's planet pane. Then press{' '}
          <White>Activate</White>.
        </White>
        Now your planet should have a stat boost.
        <br />
        <br />
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.Artifact)}>
            Continue
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.MinerMove) {
    return (
      <div className='tutzoom'>
        The bottom left context menu contains your explorer. The explorer{' '}
        <Icon type={IconType.Target} /> is used in large maps to reveal greyed parts of the map.
        <br />
        <br />
        <White>
          Pause your explorer by clicking the pause <Icon type={IconType.Pause} /> button.
        </White>
        <div style={{ gap: '5px' }}>
          <Btn className='btn' onClick={() => tutorialManager.acceptInput(TutorialState.MinerMove)}>
            Continue
          </Btn>
        </div>
      </div>
    );
  } else if (tutorialState === TutorialState.HowToGetScore) {
    const victoryThreshold = uiManager.contractConstants.CLAIM_VICTORY_ENERGY_PERCENT;
    return (
      <div className='tutzoom'>
        <p>
          Your objective is to race across the map to capture the Target Planet (it has a big 🎯
          floating above it) and{' '}
          <Green>
            claim victory when it contains at least <Gold>{victoryThreshold}%</Gold> energy.
          </Green>
        </p>
        <br />
        To get there, you will need to create a path of planets leading to the Target. Zoom out to
        see how far you need to go.
        <br />
        <br />
        <White>Now go capture the target planet and claim victory!</White>
      </div>
    );
  } else if (tutorialState === TutorialState.AlmostCompleted) {
    return (
      <div className='tutalmost'>
        Congratulations on completing your first round of Dark Forest Arena!
        <br /> <br />
        For in-depth strategy guide,{' '}
        <Link to='https://medium.com/@classicjdf/classicjs-dark-forest-101-strategy-guide-part-1-energy-1b80923fee69'>
          click here
        </Link>
        . For video tutorials,{' '}
        <Link to='https://www.youtube.com/watch?v=3a4i9IyfmBI&list=PLn4H2Bj-iklclFZW_YpKCQaTnBVaECLDK'>
          click here
        </Link>
        . More information will pop up in the <White>upper-right</White> as you discover more about
        the game.
        <br /> <br />
        If you want to jump straight into a competitive game,{' '}
        <Link to='/portal/home'>click here</Link> to head to the portal.
        <br /> <br />
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

export function TutorialPane() {
  const uiManager = useUIManager();
  const tutorialManager = TutorialManager.getInstance(uiManager);
  const [tutorialState, setTutorialState] = useState<TutorialState>(TutorialState.Welcome);
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

  if (completed) {
    return null;
  }

  return (
    <StyledTutorialPane>
      <TutorialPaneContent tutorialState={tutorialState} />
    </StyledTutorialPane>
  );
}
