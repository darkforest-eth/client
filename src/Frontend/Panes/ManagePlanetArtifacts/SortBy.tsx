import { Upgrade } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { CenterRow, Spacer } from '../../Components/CoreUI';
import {
  DefenseIcon,
  EnergyGrowthIcon,
  EnergyIcon,
  RangeIcon,
  SpeedIcon,
} from '../../Components/Icons';
import { TooltipName } from '../../Game/WindowManager';
import dfstyles from '../../Styles/dfstyles';
import { TooltipTrigger } from '../Tooltip';

export function SortBy({
  sortBy,
  setSortBy,
}: {
  sortBy: keyof Upgrade | undefined;
  setSortBy: (k: keyof Upgrade | undefined) => void;
}) {
  /* eslint-disable react/display-name */
  const icons: Array<{
    icon: (color: string) => React.ReactElement;
    key: keyof Upgrade;
    tooltip: TooltipName;
  }> = [
    {
      icon: (color: string) => <DefenseIcon color={color} />,
      key: 'defMultiplier',
      tooltip: TooltipName.DefenseMultiplier,
    },
    {
      icon: (color: string) => <EnergyIcon color={color} />,
      key: 'energyCapMultiplier',
      tooltip: TooltipName.EnergyCapMultiplier,
    },
    {
      icon: (color: string) => <EnergyGrowthIcon color={color} />,
      key: 'energyGroMultiplier',
      tooltip: TooltipName.EnergyGrowthMultiplier,
    },
    {
      icon: (color: string) => <RangeIcon color={color} />,
      key: 'rangeMultiplier',
      tooltip: TooltipName.RangeMultiplier,
    },
    {
      icon: (color: string) => <SpeedIcon color={color} />,
      key: 'speedMultiplier',
      tooltip: TooltipName.SpeedMultiplier,
    },
  ];
  /* eslint-enable react/display-name */

  return (
    <CenterRow>
      Sort By:
      <Spacer width={8} />
      {icons.map((i) => (
        <TooltipTrigger key={i.key} name={i.tooltip}>
          <SortByIconContainer
            onClick={() => {
              if (i.key === sortBy) {
                setSortBy(undefined);
              } else {
                setSortBy(i.key);
              }
            }}
          >
            {i.icon(i.key === sortBy ? dfstyles.colors.dfgreen : dfstyles.colors.subtext)}
          </SortByIconContainer>
        </TooltipTrigger>
      ))}
    </CenterRow>
  );
}

const SortByIconContainer = styled.div`
  line-height: 0;
  padding-right: 8px;
`;
