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
        Welcome to the help pane! Hopefully you can find answers to your questions here.
        <Section>
          <SectionHeader>Overview</SectionHeader>
          Dark Forest is a vast universe, obfuscated by zero-knowledge cryptography.
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
          <br /> <br />
          For more details, check out the{' '}
          <Link to='https://dfwiki.net'>official Dark Forest Wiki</Link>
        </Section>
        <Section>
          <SectionHeader>If you want to learn more of the basics:</SectionHeader>
          <Link to='https://www.notion.so/cha0sg0d/Celestial-Bodies-503bb5dc2ad0443ca22891b07e853e55'>
            Celestial Bodies
          </Link>
          <br />
          <Link to='https://www.notion.so/cha0sg0d/Stats-3e8f0bb8b94a4db5bf9829f75ede219c'>
            Planet Stats
          </Link>
          <br />
          <Link to='https://www.notion.so/cha0sg0d/Space-Types-4a9db79416fa4cae9c5a1a62f107f053'>
            Space Types
          </Link>
          <br />
          <Link to='https://www.notion.so/cha0sg0d/Artifacts-c35916760c244cf1ba7e37a3d2003eb3'>
            Artifacts
          </Link>
          <br />
          <Link to='https://www.notion.so/cha0sg0d/Spaceships-d913314f917d42b0afe28a9b09148689'>
            Spaceships
          </Link>
          <br />
        </Section>
        <Section>
          <SectionHeader>
            If you want to improve your skills, try reading ClassicJ's Beginner's Guide!
          </SectionHeader>
          <Link to='https://medium.com/@classicjdf/classicjs-dark-forest-101-strategy-guide-part-1-energy-1b80923fee69'>
            Part 1: Energy
          </Link>
          <br />
          <Link to='https://medium.com/@classicjdf/classicjs-dark-forest-beginners-guide-part2-defense-ff0fd2fd442e'>
            Part 2: Defense
          </Link>
          <br />
          <Link to='https://medium.com/@classicjdf/classicjs-dark-forest-beginners-guide-part-3-range-c2f63d7a7ac0'>
            Part 3: Range
          </Link>
          <br />
          <Link to='https://medium.com/@classicjdf/classicjs-dark-forest-beginners-guide-part-4-speed-b17b8d3d85d5'>
            Part 4: Speed
          </Link>
          <br />
        </Section>
      </HelpContent>
    </ModalPane>
  );
}
