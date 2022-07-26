import { ArtifactRarity, ModalName, PlanetLevel } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { EmSpacer, Link, Section, SectionHeader } from '../../Components/CoreUI';
import { ArtifactRarityLabel } from '../../Components/Labels/ArtifactLabels';
import { Gold, White } from '../../Components/Text';
import dfstyles from '../../Styles/dfstyles';
import { useUIManager } from '../../Utils/AppHooks';
import { ModalPane } from '../../Views/Game/ModalPane';

const HelpContent = styled.div`
  width: 500px;
  height: 500px;
  max-height: 500px;
  max-width: 500px;
  overflow-y: scroll;
  text-align: justify;
  color: ${dfstyles.colors.text};
`;

export function HelpPane({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const uiManager = useUIManager();

  const silverScoreValue = uiManager.getSilverScoreValue();
  const artifactPointValues = uiManager.getArtifactPointValues();
  const captureZonePointValues = uiManager.getCaptureZonePointValues();

  return (
    <ModalPane id={ModalName.Help} title='Help' visible={visible} onClose={onClose}>
      <HelpContent>
        {uiManager.isRoundOver() && (
          <Section>
            <SectionHeader>Round 5 Complete</SectionHeader>
            Dark Forest v0.6 Round 5 is now complete! Scores are being compiled and winners will be
            announced shortly. Also, Artifacts will no longer be mintable. Thanks for playing!
          </Section>
        )}

        <Section>
          <SectionHeader>Firstly, Some Links:</SectionHeader>
          <Link to='https://blog.zkga.me'>Official Info and Announcements</Link>
          <br />
          <Link to='https://twitter.com/darkforest_eth'>Official Twitter</Link>
          <br />
          <Link to='https://discord.gg/2u2TN6v8r6'>Official Discord Server</Link>
          <br />
          <Link to='https://dfwiki.net/'>Community-Run Wiki</Link>
          <br />
          <br />
          Secondly... welcome to
        </Section>

        <Section>
          <SectionHeader>Dark Forest v0.6 R5: The Junk Wars</SectionHeader>
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
          <White>February 28, 2022</White> at 9PM Pacific Time. At that time, the top 63
          highest-scoring players will be awarded prizes from a pool 63 prize planets. You can see
          the current rankings by scrolling down on the landing page of the game.
          <EmSpacer height={1} />
          Scoring this round is made up of three parts: finding artifacts using you Gear ship,
          withdrawing silver from Spacetime Rips, and invading and capturing planets inside of
          Capture Zones. For more information about capture zones, hover over the 'Capture Zones'
          sections at the top of the screen.
          <EmSpacer height={1} />
          The values for each scoring type are provided below:
        </Section>

        <Section>
          <SectionHeader>Scoring values</SectionHeader>
          Each single <Gold>silver</Gold> you withdraw increases your score by{' '}
          {silverScoreValue / 100}.
          <EmSpacer height={1} />
          Discovering an artifact increases your score based on its rarity:
          <br />
          <ArtifactRarityLabel rarity={ArtifactRarity.Common} />:{' '}
          {artifactPointValues[ArtifactRarity.Common]}
          <br />
          <ArtifactRarityLabel rarity={ArtifactRarity.Rare} />:{' '}
          {artifactPointValues[ArtifactRarity.Rare]}
          <br />
          <ArtifactRarityLabel rarity={ArtifactRarity.Epic} />:{' '}
          {artifactPointValues[ArtifactRarity.Epic]}
          <br />
          <ArtifactRarityLabel rarity={ArtifactRarity.Legendary} />:{' '}
          {artifactPointValues[ArtifactRarity.Legendary]}
          <br />
          <ArtifactRarityLabel rarity={ArtifactRarity.Mythic} />:{' '}
          {artifactPointValues[ArtifactRarity.Mythic]}
          <EmSpacer height={1} />
          Capturing an invaded planet increases your score based on its level:
          <br />
          Level {PlanetLevel.ZERO}: {captureZonePointValues[PlanetLevel.ZERO]}
          <br />
          Level {PlanetLevel.ONE}: {captureZonePointValues[PlanetLevel.ONE]}
          <br />
          Level {PlanetLevel.TWO}: {captureZonePointValues[PlanetLevel.TWO]}
          <br />
          Level {PlanetLevel.THREE}: {captureZonePointValues[PlanetLevel.THREE]}
          <br />
          Level {PlanetLevel.FOUR}: {captureZonePointValues[PlanetLevel.FOUR]}
          <br />
          Level {PlanetLevel.FIVE}: {captureZonePointValues[PlanetLevel.FIVE]}
          <br />
          Level {PlanetLevel.SIX}: {captureZonePointValues[PlanetLevel.SIX]}
          <br />
          Level {PlanetLevel.SEVEN}: {captureZonePointValues[PlanetLevel.SEVEN]}
          <br />
          Level {PlanetLevel.EIGHT}: {captureZonePointValues[PlanetLevel.EIGHT]}
          <br />
          Level {PlanetLevel.NINE}: {captureZonePointValues[PlanetLevel.NINE]}
        </Section>
      </HelpContent>
    </ModalPane>
  );
}
