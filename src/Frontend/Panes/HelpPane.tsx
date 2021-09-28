import React from 'react';
import styled from 'styled-components';
import { EmSpacer, Link, Padded, Section, SectionHeader } from '../Components/CoreUI';
import { White } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { ModalHook, ModalName, ModalPane } from '../Views/ModalPane';

const HelpContent = styled(Padded)`
  width: 500px;
  height: 500px;
  max-height: 500px;
  max-width: 500px;
  overflow-y: scroll;
  text-align: justify;
  color: ${dfstyles.colors.text};
`;

export function HelpPane({ hook }: { hook: ModalHook }) {
  return (
    <ModalPane hook={hook} title='Help' name={ModalName.Help}>
      <HelpContent>
        {useUIManager().isRoundOver() && (
          <Section>
            <SectionHeader>Round 4 Complete</SectionHeader>
            Dark Forest v0.6 Round 4 is now complete! Scores are being compiled and winners will be
            announced shortly. Also, Artifacts will no longer be mintable. Thanks for playing!
          </Section>
        )}

        <Section>
          <SectionHeader>Firstly, Some Links:</SectionHeader>
          <Link to='https://blog.zkga.me'>Official Info and Announcements</Link>
          <br />
          <Link to='https://discord.gg/2u2TN6v8r6'>Official Discord Server</Link>
          <br />
          <Link to='https://dfwiki.net/'>Community-Run Wiki</Link>
          <br />
          <br />
          Secondly... welcome to
        </Section>

        <Section>
          <SectionHeader>Dark Forest v0.6 R4: Society Eggnog</SectionHeader>
          Dark Forest is a vast universe, obfuscated by zero-knowledge cryptography. Your{' '}
          <White>explorer</White> (bottom left) explores the universe, searching for{' '}
          <White>Planets</White> and other players.
          <EmSpacer height={1} />
          All planets produce <White>Energy</White>. You can click-drag to move energy from planets
          you own to new planets to conquer them.
          <EmSpacer height={1} />
          Also scattered through the universe are <White>Asteroid Fields</White>, which produce{' '}
          <White>Silver</White>. Silver can be sent to planets and can be spent on{' '}
          <White>Upgrades</White>.
          <EmSpacer height={1} /> Some planets contain <White>Artifacts</White> - ERC721 tokens that
          can be traded with other players. Artifacts can be harvested and deposited onto planets,
          buffing their stats.
        </Section>

        <Section>
          <SectionHeader>Prizes and Scoring</SectionHeader>A snapshot of scores will be taken on{' '}
          <White>October 4, 2021</White> at 9PM Pacific Time. At that time, the top 63
          highest-scoring players will be awarded prizes from a pool 63 prize planets. You can see
          the current rankings by scrolling down on the landing page of the game.
          <EmSpacer height={1} />
          Scoring this round is made up of two parts: finding artifacts and withdrawing silver. Each
          time you find an artifact, your score increases by an amount that depends on the rarity of
          that artifact. Rarer artifacts are found on larger foundries, and increase your score
          more. You can also increase your score by withdrawing silver from the game. Each single
          silver you withdraw increases your score by one. You can only withdraw silver using space
          time rips.
        </Section>
      </HelpContent>
    </ModalPane>
  );
}
