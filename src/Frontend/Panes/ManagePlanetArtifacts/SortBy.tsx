import { TooltipName, Upgrade } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { CenterRow, Spacer } from '../../Components/CoreUI';
import { Icon, IconType } from '../../Components/Icons';
import dfstyles from '../../Styles/dfstyles';
import { TooltipTrigger } from '../Tooltip';

type IconConfig = {
  iconType: IconType;
  key: keyof Upgrade;
  tooltip: TooltipName;
};

const icons: readonly IconConfig[] = [
  {
    iconType: IconType.Defense,
    key: 'defMultiplier',
    tooltip: TooltipName.DefenseMultiplier,
  },
  {
    iconType: IconType.Energy,
    key: 'energyCapMultiplier',
    tooltip: TooltipName.EnergyCapMultiplier,
  },
  {
    iconType: IconType.EnergyGrowth,
    key: 'energyGroMultiplier',
    tooltip: TooltipName.EnergyGrowthMultiplier,
  },
  {
    iconType: IconType.Range,
    key: 'rangeMultiplier',
    tooltip: TooltipName.RangeMultiplier,
  },
  {
    iconType: IconType.Speed,
    key: 'speedMultiplier',
    tooltip: TooltipName.SpeedMultiplier,
  },
] as const;

export function SortBy({
  sortBy,
  setSortBy,
}: {
  sortBy: keyof Upgrade | undefined;
  setSortBy: (k: keyof Upgrade | undefined) => void;
}) {
  return (
    <CenterRow>
      Sort By:
      <Spacer width={8} />
      {icons.map(({ key, tooltip, iconType }) => (
        <TooltipTrigger key={key} name={tooltip}>
          <SortByIconContainer
            onClick={() => {
              if (key === sortBy) {
                setSortBy(undefined);
              } else {
                setSortBy(key);
              }
            }}
            iconColor={key === sortBy ? dfstyles.colors.dfgreen : dfstyles.colors.subtext}
          >
            <Icon type={iconType} />
          </SortByIconContainer>
        </TooltipTrigger>
      ))}
    </CenterRow>
  );
}

const SortByIconContainer = styled.div<{ iconColor: string }>`
  line-height: 0;
  padding-right: 8px;

  /* Set the Icon color if specified on the outer component */
  --df-icon-color: ${({ iconColor }) => iconColor};
`;
