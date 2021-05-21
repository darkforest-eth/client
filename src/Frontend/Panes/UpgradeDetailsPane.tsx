import { UpgradeBranchName, Planet, Upgrade, PlanetType } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import {
  isFullRank,
  getPlanetRank,
  getPlanetMaxRank,
  upgradeName,
} from '../../Backend/Utils/Utils';
import { CenterBackgroundSubtext, Spacer } from '../Components/CoreUI';
import { Gold, Red, Sub, Subber } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useUIManager, useSelectedPlanet, useAccount } from '../Utils/AppHooks';
import { ModalHook, ModalName, ModalPane, RECOMMENDED_WIDTH } from '../Views/ModalPane';
import { UpgradePreview } from '../Views/UpgradePreview';
import { Btn } from '../Components/Btn';
import { LoadingSpinner } from '../Components/LoadingSpinner';

const UpgradeDetailsWrapper = styled.div`
  width: 100%;
`;

const SECTION_MARGIN = '0.75em';

const SectionPreview = styled.div`
  margin-top: ${SECTION_MARGIN};
`;

const SectionBuy = styled.div`
  margin-top: ${SECTION_MARGIN};
`;

const SectionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
`;

const StyledUpgradeButton = styled.div<{ active: boolean }>`
  ${({ active }: { active: boolean }) => css`
    color: ${dfstyles.colors.subtext};
    cursor: pointer;
    text-decoration: underline;
    padding: 4px 8px;
    border-radius: 2px;
    width: 33%;
    text-align: center;

    ${active &&
    `
      color: ${dfstyles.colors.background};
      background-color: ${dfstyles.colors.dfgreen};`}

    &:hover {
      color: ${dfstyles.colors.text};
      ${!active && `background-color: ${dfstyles.colors.backgroundlight};`}
    }
  `}
`;

function UpgradeButton({
  branch,
  hook,
  planet,
}: {
  branch: UpgradeBranchName;
  hook: BranchHook;
  planet: Planet | undefined;
}) {
  if (!planet) return <></>;

  const [myBranch, setBranch] = hook;

  return (
    <StyledUpgradeButton onClick={() => setBranch(branch)} active={branch === myBranch}>
      {upgradeName(branch)}
    </StyledUpgradeButton>
  );
}

type BranchHook = [
  UpgradeBranchName | undefined,
  Dispatch<SetStateAction<UpgradeBranchName | undefined>>
];

function HelpContent() {
  return (
    <div>
      <p>
        Upgrades cost Silver, and allow you to boost the stats of your planet. You need to move the
        required silver to this planet to be able to spend it on upgrades.
      </p>
      <Spacer height={8} />
      <p>
        All planets have a certain max rank, and only you to upgrade each of the upgrade branches
        only to a certain rank.
      </p>
    </div>
  );
}

function SilverRequired({ planet }: { planet: Planet }) {
  const maxRank = getPlanetMaxRank(planet);
  const silverPerRank = [];

  for (let i = 0; i < maxRank; i++) {
    silverPerRank[i] = Math.floor((i + 1) * 0.2 * planet.silverCap);
  }

  return (
    <>
      {silverPerRank.map((silver: number, i: number) => (
        <span key={i}>
          {i === getPlanetRank(planet) ? <Gold>{silver}</Gold> : <Subber>{silver}</Subber>}
          <Spacer width={8} />
        </span>
      ))}
    </>
  );
}

export function UpgradeDetailsPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const selectedWrapper = useSelectedPlanet(uiManager);
  const selected = selectedWrapper.value;
  const account = useAccount(uiManager);
  const branchHook = useState<UpgradeBranchName>(UpgradeBranchName.Range);
  const [upgrade, setUpgrade] = useState<Upgrade | undefined>(undefined);
  const [branch, _setBranch] = branchHook;

  const branchStrName = upgradeName(branch);
  const planetAtMaxRank = isFullRank(selected);
  const branchAtMaxRank = !selected || selected.upgradeState[branch] >= 3;

  const getSilver = (): number => {
    if (!selected) return 0;
    return Math.floor(selected.silver);
  };

  const getSilverNeeded = (): number => {
    if (!selected || !uiManager) return 0;
    const totalLevel = selected.upgradeState.reduce((a, b) => a + b);
    return Math.floor((totalLevel + 1) * 0.2 * selected.silverCap);
  };

  const enoughSilver = getSilver() >= getSilverNeeded();

  // sync branch to upgrade
  useEffect(() => {
    if (!uiManager || !selected) return;

    if (branch === undefined) {
      setUpgrade(undefined);
      return;
    }

    const currentLevel = selected.upgradeState[branch];
    const newUpgrade = uiManager.getUpgrade(branch, currentLevel);

    setUpgrade(newUpgrade);
  }, [branch, uiManager, selected]);

  useEffect(() => {
    if (!selected) return;
    if (planetAtMaxRank || selected.planetLevel === 0) setUpgrade(undefined);
  }, [selected, planetAtMaxRank]);

  const canUpgrade = (): boolean => {
    if (!selected) return false;
    const silverNeeded = getSilverNeeded();
    const silver = getSilver();
    if (silverNeeded === 0) return false;
    if (planetAtMaxRank || branchAtMaxRank) return false;
    return silver >= silverNeeded;
  };

  const isPending = (): boolean => {
    if (!selected) return true;
    if (!selected.unconfirmedUpgrades) return false;
    return selected.unconfirmedUpgrades.length > 0;
  };

  const doUpgrade = (_e: React.MouseEvent) => {
    if (!canUpgrade() || !uiManager || !selected || branch === undefined) return;
    uiManager.upgrade(selected, branch);
  };

  const windowName = (): string => {
    return 'Upgrades';
  };

  let content = (
    <CenterBackgroundSubtext width='100%' height='100px'>
      Select a Planet <br /> You Own
    </CenterBackgroundSubtext>
  );

  if (selected && account) {
    if (selected.owner !== account) {
    } else if (selected.planetType !== PlanetType.PLANET || selected.silverCap === 0) {
      content = (
        <CenterBackgroundSubtext width='100%' height='100px'>
          This Planet <br /> is not Upgradeable
        </CenterBackgroundSubtext>
      );
    } else {
      content = (
        <>
          <UpgradeDetailsWrapper>
            <SectionButtons>
              <UpgradeButton branch={0} hook={branchHook} planet={selected} />
              <UpgradeButton branch={1} hook={branchHook} planet={selected} />
              <UpgradeButton branch={2} hook={branchHook} planet={selected} />
            </SectionButtons>

            <SectionPreview>
              <UpgradePreview
                upgrade={upgrade}
                planet={selected}
                branchName={branchHook[0]}
                cantUpgrade={planetAtMaxRank || branchAtMaxRank}
              />
            </SectionPreview>

            <SectionBuy>
              <div>
                <Sub>Silver Available</Sub>: <span>{getSilver()}</span>
              </div>
              <div>
                <Sub>Silver Cost:</Sub> <SilverRequired planet={selected} />
              </div>
              <div>
                <Spacer height={8} />
                {isPending() ? (
                  <Btn disabled={true}>
                    <LoadingSpinner initialText='Upgrading...' />
                  </Btn>
                ) : (
                  <>
                    <Btn onClick={doUpgrade} disabled={!canUpgrade()}>
                      {'Upgrade'}
                    </Btn>{' '}
                    {planetAtMaxRank ? (
                      <Red>Planet at Max Rank</Red>
                    ) : branchAtMaxRank ? (
                      <Red>{branchStrName} at Max Rank</Red>
                    ) : !enoughSilver ? (
                      <Red>Not Enough Silver</Red>
                    ) : undefined}
                  </>
                )}
              </div>
            </SectionBuy>
          </UpgradeDetailsWrapper>
        </>
      );
    }
  }

  return (
    <ModalPane
      hook={hook}
      title={windowName()}
      name={ModalName.UpgradeDetails}
      helpContent={HelpContent}
      width={RECOMMENDED_WIDTH}
    >
      {content}
    </ModalPane>
  );
}
