import React from 'react';
import { ModalName, ModalPane, ModalHook } from '../Views/ModalPane';
import styled from 'styled-components';
import TutorialManager from '../../Backend/GameLogic/TutorialManager';
import { White } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { MythicLabel } from '../Components/Labels/MythicLabel';
import { ScoreLabel } from '../Components/Labels/KeywordLabels';
import { LegendaryLabel } from '../Components/Labels/LegendaryLabel';
import { useUIManager } from '../Utils/AppHooks';

const HelpWrapper = styled.div`
  width: 36em;
  height: 30em;
  overflow-y: scroll;

  & p,
  ul {
    color: ${dfstyles.colors.subtext};
    margin-top: 0.5em;
    &.title {
      color: ${dfstyles.colors.text};
      text-decoration: underline;
      font-size: 1.5em;
    }
  }
  & ul {
    list-style: inside;
    list-style-position: outside;
    margin-left: 1em;
    margin-right: 1em;
    & > li {
      margin: 0 1em;
    }
  }

  & a {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const BlueBG = styled.span`
  background: ${dfstyles.colors.dfblue};
  color: ${dfstyles.colors.text};
`;

// TODO: make this pane aware of end time
export function HelpPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();

  return (
    <ModalPane hook={hook} title='Help' name={ModalName.Help}>
      <HelpWrapper>
        <p>
          This window gives additional information about the game. When you are done reading, click
          the <White>X</White> in the upper-right corner to close this window.
        </p>
        {/*isOver && (
          <>
            <p className='title'>Round 2 Complete</p>
            <p>
              Dark Forest v0.6 Round 2 is now complete! Scores are being compiled and winners will
              be announced shortly. Also, Artifacts will no longer be mintable. Thanks for playing!
            </p>
          </>
        )*/}
        <p className='title'>Dark Forest v0.6 Round 2 - Inspired Hallowed</p>
        <p>
          <a onClick={() => window.open('https://blog.zkga.me')}>Official Info and Announcements</a>
        </p>
        <p>
          <a onClick={() => TutorialManager.getInstance().reset(uiManager.getAccount())}>
            Reset Tutorial
          </a>
        </p>

        <p className='title'>Welcome!</p>
        <p>
          This window gives additional information about the game. When you are done reading, click
          the <White>X</White> in the upper-right corner to close this window.
        </p>
        <p>
          You can reopen this window anytime by clicking the question mark icon on the{' '}
          <White>Menu Bar</White>, in the top left.
        </p>
        <p></p>
        <p className='title'>The Universe</p>
        <p>
          Dark Forest is a vast universe, obfuscated by zero-knowledge cryptography. Your{' '}
          <White>Explorer</White> explores the universe, searching for <White>Planets</White> and
          other players.
        </p>
        <p>
          All planets produce <White>Energy</White>. You can move energy from planets you own to new
          planets to conquer them.
        </p>
        <p>
          Also scattered through the universe are <White>Asteroid Fields</White>, which produce{' '}
          <White>Silver</White>. Silver can be sent to planets and can be spent on{' '}
          <White>Upgrades</White>. Withdrawing silver from spacetime rips increases your{' '}
          <ScoreLabel />.
        </p>
        <p>
          Some planets contain <White>Artifacts</White> - ERC721 tokens that can be traded with
          other players. Artifacts can be harvested and deposited onto planets, buffing their stats.
          Harvesting artifacts also increases your <ScoreLabel />
        </p>
        <p>
          If you need help, click "Reset Tutorial" above, or check out the FAQ. You can also hold
          down <White>CTRL</White> and hover over anything that is highlighted <BlueBG>Blue</BlueBG>{' '}
          to learn more about it!
        </p>
        <p className='title'>Prizes and Scoring</p>
        <p>
          A snapshot of scores will be taken on <White>July 3, 2021</White> at 9PM Pacific Time. At
          that time, the top 63 highest-scoring players will be awarded prizes from a pool 63 prize
          planets. You can see the current rankings by scrolling down on the landing page of the
          game.
        </p>
        <p>
          Your score is determined by the total amount of <White>Silver</White> you have withdrawn
          from the universe, plus additional bonuses for finding artifacts. Artifacts of different
          rarities are worth different amounts of points: Common are 5k, Rare are 20k, Epic are
          200k, <LegendaryLabel /> are 3M, and <MythicLabel /> are 20M.
        </p>
      </HelpWrapper>
    </ModalPane>
  );
}
