import { ArtifactType, Upgrade } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { EmSpacer, Spacer } from '../../Components/CoreUI';
import { Icon, IconType } from '../../Components/Icons';
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

function SingleUpgrade({
  upgrade,
  active,
  icon,
  getMultiplier,
}: {
  upgrade: Upgrade;
  active: boolean;
  icon: IconType;
  getMultiplier: (u: Upgrade) => number;
}) {
  const mult = getMultiplier(upgrade);
  const activeColor = mult > 100 ? dfgreen : mult < 100 ? dfred : subtext;
  const color = active ? activeColor : subtext;

  return (
    <StyledSingleUpgrade color={color} iconColor={color}>
      <Icon type={icon} />
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
      <SingleUpgrade {...iconProps} icon={IconType.Defense} getMultiplier={getDefenseMult} />
      <SingleUpgrade {...iconProps} icon={IconType.Energy} getMultiplier={getEnergyCapMult} />
      <Spacer height={2} />
      <SingleUpgrade {...iconProps} icon={IconType.EnergyGrowth} getMultiplier={getEnergyGroMult} />
      <SingleUpgrade {...iconProps} icon={IconType.Range} getMultiplier={getRangeMult} />
      <SingleUpgrade {...iconProps} icon={IconType.Speed} getMultiplier={getSpeedMult} />
    </UpgradeSummaryContainer>
  );
}

const StyledSingleUpgrade = styled.div<{ color?: string; iconColor?: string }>`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  width: 45px;
  color: ${({ color }) => color};

  /* Set the Icon color if specified on the outer component */
  --df-icon-color: ${({ iconColor }) => iconColor};
`;

const UpgradeSummaryContainer = styled.div`
  color: ${dfstyles.colors.subtext};
  display: inline-block;
  font-size: 12px;
  justify-content: space-between;
  align-items: center;
`;
