import {
  Artifact,
  ArtifactId,
  ArtifactRarityNames,
  ArtifactType,
  EthAddress,
  Upgrade,
} from '@darkforest_eth/types';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import { isActivated } from '../../Backend/GameLogic/ArtifactUtils';
import { artifactName, dateMintedAt } from '../../Backend/Procedural/ArtifactProcgen';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { getUpgradeStat } from '../../Backend/Utils/Utils';
import { ContractConstants } from '../../_types/darkforest/api/ContractsAPITypes';
import { StatIdx } from '../../_types/global/GlobalTypes';
import { ArtifactImage } from '../Components/ArtifactImage';
import { PaddedRecommendedModalWidth, Spacer } from '../Components/CoreUI';
import { StatIcon } from '../Components/Icons';
import { ArtifactRarityLabelAnim, ArtifactTypeText } from '../Components/Labels/ArtifactLabels';
import { ArtifactBiomeLabelAnim } from '../Components/Labels/BiomeLabels';
import { ReadMore } from '../Components/ReadMore';
import { Green, Red, Sub, White } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { TimeUntil } from '../Components/TimeUntil';
import { TooltipName } from '../Game/WindowManager';
import dfstyles from '../Styles/dfstyles';
import { useArtifact, useUIManager } from '../Utils/AppHooks';
import { ModalHandle } from '../Views/ModalPane';
import { TooltipTrigger } from './Tooltip';

const StatsContainer = styled.div`
  flex-grow: 1;
`;

const ArtifactDetailsHeader = styled.div`
  min-height: 128px;
  display: flex;
  flex-direction: row;

  & > div::last-child {
    flex-grow: 1;
  }

  .statrow {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > span:first-child {
      margin-right: 1.5em;
    }

    & > span:last-child {
      text-align: right;
      width: 6em;
      flex-grow: 1;
    }
  }
`;

export function UpgradeStatInfo({
  upgrades,
  stat,
}: {
  upgrades: (Upgrade | undefined)[];
  stat: StatIdx;
}) {
  let mult = 100;

  for (const upgrade of upgrades) {
    if (upgrade) {
      mult *= getUpgradeStat(upgrade, stat) / 100;
    }
  }

  return (
    <div className='statrow'>
      <TooltipTrigger name={TooltipName.Energy + stat}>
        <StatIcon stat={stat} />
      </TooltipTrigger>
      <span>
        {mult > 100 && <Green>+{Math.round(mult - 100)}%</Green>}
        {mult === 100 && <Sub>no effect</Sub>}
        {mult < 100 && <Red>-{Math.round(100 - mult)}%</Red>}
      </span>
    </div>
  );
}

const StyledArtifactDetailsBody = styled.div`
  & > div:first-child p {
    text-decoration: underline;
  }

  & .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & > span:first-child {
      color: ${dfstyles.colors.subtext};
    }

    & > span:last-child {
      text-align: right;
    }
  }

  & .link {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

const ArtifactName = styled.div`
  color: ${dfstyles.colors.text};
  font-weight: bold;
`;

const ArtifactNameSubtitle = styled.div`
  color: ${dfstyles.colors.subtext};
  margin-bottom: 8px;
`;

export function ArtifactDetailsHelpContent() {
  return (
    <div>
      <p>
        In this pane, you can see specific information about a particular artifact. You can also
        initiate a conversation with the artifact! Try talking to your artifacts. Make some new
        friends (^:
      </p>
    </div>
  );
}

export function ArtifactDetailsBody({
  artifactId,
  contractConstants,
}: {
  artifactId: ArtifactId;
  contractConstants: ContractConstants;
  modal: ModalHandle;
}) {
  const uiManager = useUIManager();
  const artifactWrapper = useArtifact(uiManager, artifactId);
  const artifact = artifactWrapper.value;

  if (!artifact) {
    return null;
  }

  const account = (addr: EthAddress) => {
    const twitter = uiManager?.getTwitter(addr);
    if (twitter) {
      return '@' + twitter;
    }
    return <TextPreview text={addr} />;
  };

  const owner = () => {
    if (!artifact) return '';
    return account(artifact.currentOwner);
  };

  const discoverer = () => {
    if (!artifact) return '';
    return account(artifact.discoverer);
  };

  // TODO make this common with playerartifactspane
  const planetArtifactName = (a: Artifact): string | undefined => {
    const onPlanet = uiManager?.getArtifactPlanet(a);
    if (!onPlanet) return undefined;
    return ProcgenUtils.getPlanetName(onPlanet);
  };

  const planetClicked = (): void => {
    if (artifact.onPlanetId) uiManager?.setSelectedId(artifact.onPlanetId);
  };

  let readyInStr = undefined;

  if (artifact.artifactType === ArtifactType.PhotoidCannon && isActivated(artifact)) {
    readyInStr = (
      <TimeUntil
        timestamp={
          artifact.lastActivated * 1000 + contractConstants.PHOTOID_ACTIVATION_DELAY * 1000
        }
        ifPassed={'now!'}
      />
    );
  }

  return (
    <PaddedRecommendedModalWidth>
      <ArtifactName>{artifactName(artifact)}</ArtifactName>
      <ArtifactNameSubtitle>
        <ArtifactRarityLabelAnim rarity={artifact.rarity} />{' '}
        <ArtifactBiomeLabelAnim artifact={artifact} /> <ArtifactTypeText artifact={artifact} />
      </ArtifactNameSubtitle>

      <ArtifactDetailsHeader>
        <ArtifactImage artifact={artifact} size={128} />
        <Spacer width={8} />

        <StatsContainer>
          {_.range(0, 5).map((val) => (
            <UpgradeStatInfo
              upgrades={[artifact.upgrade, artifact.timeDelayedUpgrade]}
              stat={val}
              key={val}
            />
          ))}
        </StatsContainer>
      </ArtifactDetailsHeader>

      <StyledArtifactDetailsBody>
        <ArtifactDescription artifact={artifact} />
        <Spacer height={8} />

        <div className='row'>
          <span>Located On</span>
          {planetArtifactName(artifact) ? (
            <span className='link' onClick={planetClicked}>
              {planetArtifactName(artifact)}
            </span>
          ) : (
            <span>n / a</span>
          )}
        </div>

        <div className='row'>
          <span>Minted At</span>
          <span>{dateMintedAt(artifact)}</span>
        </div>
        <div className='row'>
          <span>Discovered On</span>
          <span>{ProcgenUtils.getPlanetNameHash(artifact.planetDiscoveredOn)}</span>
        </div>
        <div className='row'>
          <span>Owner</span>
          <span>{owner()}</span>
        </div>
        <div className='row'>
          <span>Discovered By</span>
          <span>{discoverer()}</span>
        </div>
        <div className='row'>
          <span>Artifact ID</span>
          <TextPreview text={artifact.id} />
        </div>
        {readyInStr && (
          <div className='row'>
            <span>Ready In</span>
            <span>{readyInStr}</span>
          </div>
        )}
        <Spacer height={8} />
        {/* if one wanted to, one could add a 'next artifact' and 'previous artifact' button here */}
      </StyledArtifactDetailsBody>
    </PaddedRecommendedModalWidth>
  );
}

export function ArtifactDetailsPane({
  modal,
  artifactId,
}: {
  modal: ModalHandle;
  artifactId: ArtifactId;
}) {
  const uiManager = useUIManager();
  const contractConstants = uiManager.getContractConstants();

  return (
    <ArtifactDetailsBody
      modal={modal}
      artifactId={artifactId}
      contractConstants={contractConstants}
    />
  );
}

function ArtifactDescription({ artifact }: { artifact: Artifact }) {
  let content;

  const maxLevelsBlackDomain = [0, 2, 4, 6, 8, 9];
  const maxLevelBlackDomain = maxLevelsBlackDomain[artifact.rarity];

  const maxLevelsBloomFilter = [0, 2, 4, 6, 8, 9];
  const maxLevelBloomFilter = maxLevelsBloomFilter[artifact.rarity];

  const wormholeShrinkLevels = [0, 2, 4, 8, 16, 32];
  const rarityName = ArtifactRarityNames[artifact.rarity];
  const photoidRanges = [0, 2, 2, 2, 2, 2];
  const photoidSpeeds = [0, 5, 10, 15, 20, 25];

  switch (artifact.artifactType) {
    case ArtifactType.BlackDomain:
      content = (
        <Sub>
          When activated, permanently disables your planet. It'll still be yours, but you won't be
          able to do anything with it. It turns completely black too. Just ... gone. Because this
          one is <White>{rarityName}</White>, it works on planets up to level{' '}
          <White>{maxLevelBlackDomain}</White>. This artifact is consumed on activation.
        </Sub>
      );
      break;
    case ArtifactType.BloomFilter:
      content = (
        <Sub>
          When activated refills your planet's energy and silver to their respective maximum values.
          How it does this, we do not know. Because this one is <White>{rarityName}</White>, it
          works on planets up to level <White>{maxLevelBloomFilter}</White>. This artifact is
          consumed on activation.
        </Sub>
      );
      break;
    case ArtifactType.Wormhole:
      content = (
        <Sub>
          When activated, shortens the distance between this planet and another one. All moves
          between those two planets decay less energy, and complete faster. Because this one is{' '}
          <White>{rarityName}</White>, it shrinks the distance by a factor of{' '}
          <White>{wormholeShrinkLevels[artifact.rarity]}</White>x.
        </Sub>
      );
      break;
    case ArtifactType.PhotoidCannon:
      content = (
        <Sub>
          Ahh, the Photoid Canon. Activate it, wait four hours. Because this one is{' '}
          <White>{rarityName}</White>, the next move you send will be able to go{' '}
          <White>{photoidRanges[artifact.rarity]}</White>x further and{' '}
          <White>{photoidSpeeds[artifact.rarity]}</White>x faster. During the 4 hour waiting period,
          your planet's defense is temporarily decreased. This artifact is consumed once the canon
          is fired.
        </Sub>
      );
      break;
    case ArtifactType.PlanetaryShield:
      content = (
        <Sub>
          Activate the planetary shield to gain a defense bonus on your planet, at the expense of
          range and speed. When this artifact is deactivated, it is destroyed and your planet's
          stats are reverted--so use it wisely!
        </Sub>
      );
      break;
  }

  if (content) {
    return <ReadMore height={'1em'}>{content}</ReadMore>;
  }

  return null;
}
