import React from 'react';
import styled from 'styled-components';
import { EmSpacer, Link, Padded, Section, SectionHeader } from '../Components/CoreUI';
import { ScoreLabel } from '../Components/Labels/KeywordLabels';
import { LegendaryLabel } from '../Components/Labels/LegendaryLabel';
import { MythicLabel } from '../Components/Labels/MythicLabel';
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
            <SectionHeader>Round 2 Complete</SectionHeader>
            Dark Forest v0.6 Round 2 is now complete! Scores are being compiled and winners will be
            announced shortly. Also, Artifacts will no longer be mintable. Thanks for playing!
          </Section>
        )}

        <Section>
          <Link to='https://blog.zkga.me'>Official Info and Announcements</Link>
        </Section>

        <Section>
          <SectionHeader>The Universe</SectionHeader>
          Dark Forest is a vast universe, obfuscated by zero-knowledge cryptography. Your{' '}
          <White>explorer</White> explores the universe, searching for <White>Planets</White> and
          other players.
          <EmSpacer height={1} />
          All planets produce <White>Energy</White>. You can move energy from planets you own to new
          planets to conquer them.
          <EmSpacer height={1} />
          Also scattered through the universe are <White>Asteroid Fields</White>, which produce{' '}
          <White>Silver</White>. Silver can be sent to planets and can be spent on{' '}
          <White>Upgrades</White>. Withdrawing silver from spacetime rips increases your{' '}
          <ScoreLabel />.
          <EmSpacer height={1} /> Some planets contain <White>Artifacts</White> - ERC721 tokens that
          can be traded with other players. Artifacts can be harvested and deposited onto planets,
          buffing their stats. Harvesting artifacts also increases your <ScoreLabel />
        </Section>

        <Section>
          <SectionHeader>Prizes and Scoring</SectionHeader>A snapshot of scores will be taken on{' '}
          <White>July 3, 2021</White> at 9PM Pacific Time. At that time, the top 63 highest-scoring
          players will be awarded prizes from a pool 63 prize planets. You can see the current
          rankings by scrolling down on the landing page of the game.
          <EmSpacer height={1} />
          Your score is determined by the total amount of <White>Silver</White> you have withdrawn
          from the universe, plus additional bonuses for finding artifacts. Artifacts of different
          rarities are worth different amounts of points: Common are 5k, Rare are 20k, Epic are
          200k, <LegendaryLabel /> are 3M, and <MythicLabel /> are 20M.
        </Section>
      </HelpContent>
    </ModalPane>
  );
}
