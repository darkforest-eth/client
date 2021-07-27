import { Upgrade } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { CenterRow, HoverableTooltip, Spacer } from '../../Components/CoreUI';
import { Hoverable, TOOLTIP_SLOW } from '../../Components/Hoverable';
import {
  DefenseIcon,
  EnergyGrowthIcon,
  EnergyIcon,
  RangeIcon,
  SpeedIcon,
} from '../../Components/Icons';
import dfstyles from '../../Styles/dfstyles';

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
    tooltip: string;
  }> = [
    {
      icon: (color: string) => <DefenseIcon color={color} />,
      key: 'defMultiplier',
      tooltip: 'defense multiplier',
    },
    {
      icon: (color: string) => <EnergyIcon color={color} />,
      key: 'energyCapMultiplier',
      tooltip: 'energy cap multiplier',
    },
    {
      icon: (color: string) => <EnergyGrowthIcon color={color} />,
      key: 'energyGroMultiplier',
      tooltip: 'energy growth multiplier',
    },
    {
      icon: (color: string) => <RangeIcon color={color} />,
      key: 'rangeMultiplier',
      tooltip: 'range multiplier',
    },
    {
      icon: (color: string) => <SpeedIcon color={color} />,
      key: 'speedMultiplier',
      tooltip: 'speed multiplier',
    },
  ];
  /* eslint-enable react/display-name */

  return (
    <CenterRow>
      Sort By:
      <Spacer width={8} />
      {icons.map((i) => (
        <Hoverable
          key={i.key}
          quick
          hoverDelay={TOOLTIP_SLOW}
          hoverContents={() => <HoverableTooltip>{i.tooltip}</HoverableTooltip>}
        >
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
        </Hoverable>
      ))}
    </CenterRow>
  );
}

const SortByIconContainer = styled.div`
  line-height: 0;
  padding-right: 8px;
`;
