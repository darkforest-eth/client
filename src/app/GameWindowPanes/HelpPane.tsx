import React from 'react';
import { ModalName, ModalPane, ModalHook } from './ModalPane';
import styled from 'styled-components';
import dfstyles from '../../styles/dfstyles';
import { White } from '../../components/Text';
import TutorialManager from '../../utils/TutorialManager';

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
      margin: 0.75em 0 0.5em 0;
      text-decoration: underline;
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
export function HelpPane({ hook }: { hook: ModalHook }) {
  return (
    <ModalPane hook={hook} title='Help' name={ModalName.Help}>
      <HelpWrapper>
        <p className='title'>Patch Notes</p>
        <ul>
          <li>
            Added PLUGINS: You can now write and share arbitrary client tools
            and customizations.
          </li>
          <li>
            Upgraded Graphics: Planets are no longer solid-colored circles.
          </li>
          <li>
            Added Artifacts: Collect Dark Forest NFTs by exploring the universe.
          </li>
          <li>
            Improved performance: Sped up loading times, reduced frequency of
            errors and network failure.
          </li>
        </ul>

        <p className='title'>Tutorial</p>
        <p>
          <a onClick={() => TutorialManager.getInstance().reset()}>
            Reset Tutorial
          </a>
        </p>
        <p className='title'>FAQ and Troubleshooting</p>
        <p>
          <a onClick={() => window.open('https://blog.zkga.me/df-05-faq')}>
            FAQ
          </a>
        </p>
        <p></p>
        <p className='title'>Welcome to Dark Forest v0.5!</p>
        <p>
          This window gives additional information about the game. When you are
          done reading, click the <White>X</White> in the upper-right corner to
          close this window.
        </p>
        <p>
          You can reopen this window anytime by clicking the question mark icon
          on the <White>Menu Bar</White>, in the top left.
        </p>
        <p></p>
        <p className='title'>The Universe</p>
        <p>
          Dark Forest is a vast universe, obfuscated by zero-knowledge
          cryptography. Your <White>Explorer</White> explores the universe,
          searching for <White>Planets</White> and other players.
        </p>
        <p>
          All planets produce <White>Energy</White>. You can move energy from
          planets you own to new planets to conquer them.
        </p>
        <p>
          Also scattered through the universe are <White>Asteroid Fields</White>
          , which produce <White>Silver</White>. Silver can be sent to planets
          and can be spent on <White>Upgrades</White>. Producing and spending
          silver increases your score.
        </p>
        <p>
          Some planets contain <White>Artifacts</White>. Artifacts can be
          harvested and deposited onto planets, buffing their stats. Artifacts
          are ERC721 tokens that can be traded with other players.
        </p>
        <p>
          If you need help, click "Reset Tutorial" above, or check out the FAQ.
          You can also hold down <White>SHIFT</White> and hover over anything
          that is highlighted <BlueBG>Blue</BlueBG> to learn more about it!
        </p>
        <p className='title'>Prizes and Scoring</p>
        <p>
          A snapshot of scores will be taken on 01/08/2021. At that time, the
          top 15 highest-scoring players will be awarded prizes from a pool of
          1024 DAI. Your score is determined by the value of your largest 10
          planets, plus the silver you've produced and spent during the game.
        </p>
      </HelpWrapper>
    </ModalPane>
  );
}
