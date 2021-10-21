import { Planet, Upgrade, UpgradeBranchName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { getPlanetMaxRank, getPlanetRank, upgradeName } from '../../Backend/Utils/Utils';
import { Icon, IconType } from '../Components/Icons';
import { Green, Red, Sub } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';

const StyledUpgradePreview = styled.div`
  min-width: 15em;
  width: 100%;
  border-radius: 3px;
  border: 1px solid ${dfstyles.colors.borderDark};
  font-size: ${dfstyles.fontSizeXS};
`;

const StatRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 4px;
  padding-right: 4px;

  & > span {
    margin-left: 0.2em;

    &:nth-child(1) {
      color: ${dfstyles.colors.subtext};
      margin-left: 0;
      width: 9em;
    }
    &:nth-child(2),
    &:nth-child(4) {
      text-align: center;
      width: 6em;
      flex-grow: 1;
    }
    &:nth-child(3) {
      // arrow
      text-align: center;
      width: 1.5em;

      /* Set the Icon color to something a little dimmer */
      --df-icon-color: ${dfstyles.colors.subtext};
    }
    &:nth-child(5) {
      width: 5em;
      text-align: right;
    }
  }

  &.upgrade-willupdate {
    background: ${dfstyles.colors.backgroundlighter};
  }
`;

const StatRowFilled = ({
  planet,
  upgrade,
  title,
  stat,
  className,
}: {
  planet: Planet | undefined;
  upgrade: Upgrade | undefined;
  title: string;
  stat: string;
  className?: string;
}) => {
  const getStat = (stat: string): number => {
    if (!planet) return 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mySelected = planet as any;

    if (stat === 'silverGrowth') return mySelected[stat] * 60;
    else return mySelected[stat];
  };
  const statNow = (stat: string): string => {
    const num = getStat(stat);
    if (num % 1.0 === 0) return num.toFixed(0);
    else return num.toFixed(2);
  };
  const getStatFuture = (stat: string): number => {
    if (!planet) return 0;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mySelected = planet as any;

    if (!upgrade) return mySelected[stat];

    let mult = 1;
    if (stat === 'energyCap') {
      mult = upgrade.energyCapMultiplier / 100;
    } else if (stat === 'energyGrowth') {
      mult = upgrade.energyGroMultiplier / 100;
    } else if (stat === 'range') {
      mult = upgrade.rangeMultiplier / 100;
    } else if (stat === 'speed') {
      mult = upgrade.speedMultiplier / 100;
    } else if (stat === 'defense') {
      mult = upgrade.defMultiplier / 100;
    }

    return getStat(stat) * mult;
  };
  const statFuture = (stat: string): string => {
    const num = getStatFuture(stat);
    if (num % 1.0 === 0) return num.toFixed(0);
    else return num.toFixed(2);
  };
  const getStatDiff = (stat: string): number => {
    return getStatFuture(stat) - getStat(stat);
  };
  const statDiff = (stat: string): React.ReactNode => {
    const diff: number = getStatDiff(stat);
    if (diff < 0) return <Red>{diff.toFixed(2)}</Red>;
    else if (diff > 0) return <Green>+{diff.toFixed(2)}</Green>;
    else return <Sub>0</Sub>;
  };

  const updateClass = (stat: string): string => {
    if (getStat(stat) !== getStatFuture(stat)) return 'upgrade-willupdate';
    return '';
  };

  return (
    <StatRow className={[className, updateClass(stat)].join(' ')}>
      <span>{title}</span>
      <span>{statNow(stat)}</span>
      <span>
        <Icon type={IconType.RightArrow} />
      </span>
      <span>{statFuture(stat)}</span>
      <span>{statDiff(stat)}</span>
    </StatRow>
  );
};

export function UpgradePreview({
  planet,
  upgrade,
  branchName,
  cantUpgrade,
}: {
  planet: Planet | undefined;
  upgrade: Upgrade | undefined;
  branchName: UpgradeBranchName | undefined;
  cantUpgrade: boolean;
}) {
  const branchStrName = branchName !== undefined && upgradeName(branchName);
  const maxRank = getPlanetMaxRank(planet);
  const maxBranchRank = Math.min(4, maxRank);
  const branchUpgradeState = (branchName && planet && planet.upgradeState[branchName]) || 0;

  if (cantUpgrade) {
    upgrade = {
      defMultiplier: 100,
      energyCapMultiplier: 100,
      energyGroMultiplier: 100,
      rangeMultiplier: 100,
      speedMultiplier: 100,
    };
  }

  const increment = cantUpgrade ? 0 : 1;

  return (
    <StyledUpgradePreview>
      <StatRowFilled planet={planet} upgrade={upgrade} stat='energyCap' title='Energy Cap' />
      <StatRowFilled planet={planet} upgrade={upgrade} stat='energyGrowth' title='Energy Growth' />
      <StatRowFilled planet={planet} upgrade={upgrade} title='Range' stat='range' />
      <StatRowFilled planet={planet} upgrade={upgrade} title='Speed' stat='speed' />
      <StatRowFilled planet={planet} upgrade={upgrade} title='Defense' stat='defense' />
      <StatRow className={cantUpgrade ? '' : 'upgrade-willupdate'}>
        <span>{branchStrName} Rank</span>
        <span>{branchUpgradeState}</span>
        <span>
          <Icon type={IconType.RightArrow} />
        </span>
        <span>
          {branchUpgradeState + increment} of {maxBranchRank} <Sub>max</Sub>
        </span>
        <span>{cantUpgrade ? <Sub>0</Sub> : <Green>+1</Green>}</span>
      </StatRow>
      <StatRow className={cantUpgrade ? '' : 'upgrade-willupdate'}>
        <span>Planet Rank</span>
        <span>{getPlanetRank(planet)}</span>
        <span>
          <Icon type={IconType.RightArrow} />
        </span>
        <span>
          {getPlanetRank(planet) + increment} of {maxRank} <Sub>max</Sub>
        </span>
        <span>{cantUpgrade ? <Sub>0</Sub> : <Green>+1</Green>}</span>
      </StatRow>
    </StyledUpgradePreview>
  );
}
