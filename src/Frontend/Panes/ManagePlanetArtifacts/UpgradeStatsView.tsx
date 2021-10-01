import { ArtifactType, Upgrade } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { EmSpacer, Spacer } from '../../Components/CoreUI';
import {
  DefenseIcon,
  EnergyGrowthIcon,
  EnergyIcon,
  RangeIcon,
  SpeedIcon,
} from '../../Components/Icons';
import dfstyles from '../../Styles/dfstyles';

const { dfgreen, dfred, subtext } = dfstyles.colors;

function upgradeValue(value: number) {
  const normalizedValue = Math.floor(value - 100);

  if (normalizedValue >= -0) {
    return '+' + normalizedValue + '%';
  } else {
    return normalizedValue + '%';
  }
}

type IconProps = {
  color?: string;
};

function SingleUpgrade({
  upgrade,
  active,
  icon,
  getMultiplier,
}: {
  upgrade: Upgrade;
  active: boolean;
  icon: (p: IconProps) => JSX.Element;
  getMultiplier: (u: Upgrade) => number;
}) {
  const mult = getMultiplier(upgrade);
  const activeColor = mult > 100 ? dfgreen : mult < 100 ? dfred : subtext;
  const color = active ? activeColor : subtext;

  return (
    <StyledSingleUpgrade color={color}>
      {icon({ color })}
      <Spacer width={2} />
      {upgradeValue(getMultiplier(upgrade))}
    </StyledSingleUpgrade>
  );
}

const getDefenseMult = (u: Upgrade) => u.defMultiplier;
const getEnergyCapMult = (u: Upgrade) => u.energyCapMultiplier;
const getEnergyGroMult = (u: Upgrade) => u.energyGroMultiplier;
const getRangeMult = (u: Upgrade) => u.rangeMultiplier;
const getSpeedMult = (u: Upgrade) => u.speedMultiplier;

export function UpgradeStatsView({
  upgrade,
  isActive,
  artifactType,
}: {
  upgrade: Upgrade;
  isActive: boolean;
  artifactType: ArtifactType;
}) {
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
    return (
      <UpgradeSummaryContainer>
        {specialDescription}
        <EmSpacer height={1} />
      </UpgradeSummaryContainer>
    );
  }

  const iconProps = { active: isActive, upgrade };

  return (
    <UpgradeSummaryContainer>
      <SingleUpgrade {...iconProps} icon={DefenseIcon} getMultiplier={getDefenseMult} />
      <SingleUpgrade {...iconProps} icon={EnergyIcon} getMultiplier={getEnergyCapMult} />
      <Spacer height={2} />
      <SingleUpgrade {...iconProps} icon={EnergyGrowthIcon} getMultiplier={getEnergyGroMult} />
      <SingleUpgrade {...iconProps} icon={RangeIcon} getMultiplier={getRangeMult} />
      <SingleUpgrade {...iconProps} icon={SpeedIcon} getMultiplier={getSpeedMult} />
    </UpgradeSummaryContainer>
  );
}

const StyledSingleUpgrade = styled.div<{ color?: string }>`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: 45px;
  ${({ color }) => color && `color: ${color};`}
`;

const UpgradeSummaryContainer = styled.div`
  color: ${dfstyles.colors.subtext};
  display: inline-block;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
`;
