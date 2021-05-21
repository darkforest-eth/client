import { ArtifactType, Upgrade } from '@darkforest_eth/types';
import React from 'react';
import styled, { css } from 'styled-components';
import { Spacer } from '../../Components/CoreUI';
import {
  DefenseIcon,
  EnergyGrowthIcon,
  EnergyIcon,
  RangeIcon,
  SpeedIcon,
} from '../../Components/Icons';
import dfstyles from '../../Styles/dfstyles';

function upgradeValue(value: number) {
  const normalizedValue = Math.floor(value - 100);

  if (normalizedValue >= -0) {
    return '+' + normalizedValue + '%';
  } else {
    return normalizedValue + '%';
  }
}

export function UpgradeStatsView({
  upgrade,
  isActive,
  artifactType,
}: {
  upgrade: Upgrade;
  isActive: boolean;
  artifactType: ArtifactType;
}) {
  const iconColor = isActive ? dfstyles.colors.dfgreen : dfstyles.colors.subtext;

  let specialDescription;

  switch (artifactType) {
    case ArtifactType.BlackDomain:
      specialDescription = 'locks planet';
      break;
    case ArtifactType.Wormhole:
      specialDescription = 'decreases travel time';
      break;
    case ArtifactType.BloomFilter:
      specialDescription = "refills planet's energy and silver";
      break;
    case ArtifactType.PhotoidCannon:
      specialDescription = 'single use sniper';
      break;
  }

  if (specialDescription) {
    return <UpgradeSummaryContainer>{specialDescription}</UpgradeSummaryContainer>;
  }

  return (
    <UpgradeSummaryContainer isActive={isActive}>
      <SingleUpgrade>
        <DefenseIcon color={iconColor} />
        <Spacer width={2} />
        {upgradeValue(upgrade.defMultiplier)}
      </SingleUpgrade>
      <SingleUpgrade>
        <EnergyIcon color={iconColor} />
        <Spacer width={2} />
        {upgradeValue(upgrade.energyCapMultiplier)}
      </SingleUpgrade>
      <SingleUpgrade>
        <EnergyGrowthIcon color={iconColor} />
        <Spacer width={2} />
        {upgradeValue(upgrade.energyGroMultiplier)}
      </SingleUpgrade>
      <SingleUpgrade>
        <RangeIcon color={iconColor} />
        <Spacer width={2} />
        {upgradeValue(upgrade.rangeMultiplier)}
      </SingleUpgrade>
      <SingleUpgrade>
        <SpeedIcon color={iconColor} />
        <Spacer width={2} />
        {upgradeValue(upgrade.speedMultiplier)}
      </SingleUpgrade>
    </UpgradeSummaryContainer>
  );
}

const SingleUpgrade = styled.div`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: 50px;
`;

const UpgradeSummaryContainer = styled.div`
  ${({ isActive }: { isActive?: boolean }) => css`
    display: inline-block;
    font-size: 12px;
    justify-content: space-between;
    align-items: center;
    color: ${isActive ? dfstyles.colors.dfgreen : dfstyles.colors.subtext};
  `}
`;
