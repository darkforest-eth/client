import { ArtifactRarity, ModalName, PlanetLevel } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { EmSpacer, Link, Section, SectionHeader } from '../Components/CoreUI';
import { ArtifactRarityLabel } from '../Components/Labels/ArtifactLabels';
import { Gold, White } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { ModalPane } from '../Views/ModalPane';

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
          <SectionHeader>First, some links:</SectionHeader>
          <Link to='https://blog.altlayer.io/launching-dark-forest-community-gaming-round-e243e116f3d5'>Official Info and Announcements</Link>
          <br />
          <Link to='https://alt.ws/twitter'>AltLayer Twitter</Link>
          <br />
          <Link to='https://discord.gg/altlayer'>Official Discord Server</Link>
          <br />
          <br />
          Second, welcome to:
        </Section>

        <Section>
          <SectionHeader>Dark Forest on AltLayer Community Round 1</SectionHeader>
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
          <White>Sep 11th, 2022</White> at 12PM GMT Time. At that time, the top 20
          highest-scoring players will be awarded by AltLayer OG badges. You can see
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
