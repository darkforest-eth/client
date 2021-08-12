import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { HeaderText, Link, Spacer, TextButton } from '../Components/CoreUI';
import dfstyles from '../Styles/dfstyles';

const TipText = styled.div`
  max-width: 500px;
  word-break: keep-all;
  text-align: justify;
`;

const CYCLE_TIPS_INTERVAL = 10 * 1000;

export function DarkForestTips() {
  const [tipIndex, setTipIndex] = useState(0);
  const [_interval, setIntervalHandle] = useState<ReturnType<typeof setInterval> | undefined>();

  const incrementTipIndex = useCallback((increment: number, shouldClearInterval = false) => {
    if (shouldClearInterval) {
      setIntervalHandle((interval) => {
        if (interval) {
          clearInterval(interval);
        }
        return undefined;
      });
    }

    setTipIndex((tipIndex) => (tipIndex + increment + shuffledTips.length) % shuffledTips.length);
  }, []);

  useEffect(() => {
    const intervalHandle = setInterval(() => incrementTipIndex(1), CYCLE_TIPS_INTERVAL);
    setIntervalHandle(intervalHandle);
    return () => clearInterval(intervalHandle);
  }, [incrementTipIndex]);

  return (
    <TipsContainer>
      <HeaderText style={{ textDecoration: 'none' }}>Dark Forest Tips</HeaderText>{' '}
      <PrevNextContainer>
        <TextButton onClick={() => incrementTipIndex(-1, true)}>previous</TextButton>
        <Spacer width={16} />
        <TextButton onClick={() => incrementTipIndex(1, true)}>next</TextButton>
      </PrevNextContainer>
      <br />
      <br />
      <TipText>{shuffledTips[tipIndex]}</TipText>
    </TipsContainer>
  );
}

export function MakeDarkForestTips() {
  return <DarkForestTips />;
}

const PrevNextContainer = styled.div`
  float: right;
`;

const TipsContainer = styled.div`
  margin-bottom: 8px;
  background-color: ${dfstyles.colors.backgrounddark};
  width: 400px;
  height: 250px;
  padding: 16px;
  border-radius: 3px;
  overflow: hidden;
  border: 1px solid ${dfstyles.colors.border};
`;

const tips = [
  'Beware of pirates! To capture a planet with pirates, simply send an attack large enough to overcome its current energy.',
  <>
    Navigate the Dark Forest with allies (and enemies) - join the{' '}
    <Link to='https://discord.gg/C23An5qNGv'>Dark Forest Discord</Link>!
  </>,
  'There are many different artifact types, each with unique properties... try activating one on a planet!',
  'You can talk to artifacts that you own. They are powered by GPT3. Try it out from the Artifact Details pane!',
  'The top 63 players get NFT rewards at the end of each v0.6 round!',
  "There are many different ways to enjoy Dark Forest - as long as you're having fun, you're doing it right.",
  'Be careful when capturing planets - if you attack a player-owned planet, it may look like an act of war!',
  'A planet can have at most one active artifact.',
  'Withdrawing silver (via Spacetime Rips) and finding artifacts adds to your score.',
  'Withdrawing an artifact (via a Spacetime Rip) gives you full control of that artifact as an ERC 721 token. You can deposit artifacts you have withdrawn back into the universe via Spacetime Rips.',
  'You can use plugins to enhance your capabilities by automating repetitive tasks. The top players are probably using plugins (:',
  'Quasars can store lots of energy and silver, at the expense of being able to generate neither.',
  'Never share your private key with anyone else!',
  'Broadcasting a planet reveals its location to ALL other players!',
  'You can spend silver to upgrade your planets.',
  'Planets in Nebula are more difficult to capture than planets in Deep Space.',
  'Some of the universe is corrupted, and contains special versions of the artifacts.',
  'You can import and export maps! Be careful importing maps from others, they may contain fabricated map data.',
  <>
    If mining the universe is slow on your computer, you can try the Remote Miner plugin. Find that
    and other plugins on <Link to='https://plugins.zkga.me'>plugins.zkga.me</Link>.
  </>,
  "A planet can only have 6 artifacts on it at any given time. Sometimes more if you get lucky. It's the blockchain, after all.",
  'A foundry must be prospected before you can attempt to find an artifact, but make sure to click "Find" before 256 blocks or it will be lost forever.',
  'Defense upgrades make your planets less vulnerable to attack, Range upgrades make your voyages go further and decay less, and Speed upgrades make your voyages go much faster.',
  'Wormhole artifacts reduce the effective distance between 2 planets. Try using them to link 2 planets very far apart!',
  'Upon deactivation, most artifacts must cooldown for 24-hours before they can be activated again. However, wormholes go on a 48-hour cooldown!',
  'Photoid Cannon artifacts will debuff your planet on activation, but get a massive stat boost for the first voyage from the planet after that a charging period. Photoid Cannon artifacts are destroyed upon use.',
  "Planetary Shield artifacts will massively boost a planet's defense, but at the cost of energy and energy growth stats. Planetary Shield artifacts are destroyed upon deactivation.",
  "Bloom Filter artifacts instantly set a planet's energy and silver to full, but are destroyed upon activation. Try using them on a Quasar!",
  'Dark Forest exists on the blockchain, so you can play with an entirely different client if you want.',
  "Try running df.setMinerCores(8) in either the Dark Forest terminal, or your browser's developer tools console. This will make the game utilize more cores to mine the universe, mining it faster!",
  <>
    Writing plugins? Check out some documentation{' '}
    <Link to='https://github.com/darkforest-eth/client/blob/master/docs/classes/Backend_GameLogic_GameManager.default.md'>
      here
    </Link>{' '}
    and{' '}
    <Link to='https://github.com/darkforest-eth/client/blob/master/docs/classes/Backend_GameLogic_GameUIManager.default.md'>
      here
    </Link>
    .
  </>,
];

const shuffledTips = _.shuffle(tips);
