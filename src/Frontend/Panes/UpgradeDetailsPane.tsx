import { UpgradeBranchName, Planet, PlanetType } from '@darkforest_eth/types';
import _ from 'lodash';
import React from 'react';
import styled from 'styled-components';
import {
  isFullRank,
  getPlanetRank,
  getPlanetMaxRank,
  upgradeName,
} from '../../Backend/Utils/Utils';
import { CenterBackgroundSubtext, Spacer } from '../Components/CoreUI';
import { Gold, Red, Sub, Subber } from '../Components/Text';
import { useUIManager, useSelectedPlanet, useAccount } from '../Utils/AppHooks';
import { ModalHook, ModalName, ModalPane, RECOMMENDED_WIDTH } from '../Views/ModalPane';
import { UpgradePreview } from '../Views/UpgradePreview';
import { Btn } from '../Components/Btn';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { TabbedView } from '../Views/TabbedView';

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
  const selected = useSelectedPlanet(uiManager).value;
  const account = useAccount(uiManager);
  const planetAtMaxRank = isFullRank(selected);

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
          <TabbedView
            tabTitles={['Defense', 'Range', 'Speed']}
            tabContents={(branch: UpgradeBranchName) => {
              const currentLevel = selected.upgradeState[branch];
              const branchAtMaxRank = !selected || selected.upgradeState[branch] >= 4;
              const upgrade = branchAtMaxRank
                ? undefined
                : uiManager.getUpgrade(branch, currentLevel);

              const totalLevel = selected.upgradeState.reduce((a, b) => a + b);
              const silverNeeded = Math.floor((totalLevel + 1) * 0.2 * selected.silverCap);
              const enoughSilver = selected.silver >= silverNeeded;
              const isPendingUpgrade = selected.unconfirmedUpgrades.length > 0;
              const canUpgrade =
                enoughSilver && !planetAtMaxRank && !branchAtMaxRank && !isPendingUpgrade;

              const doUpgrade = (branch: UpgradeBranchName) => {
                if (canUpgrade) {
                  uiManager.upgrade(selected, branch);
                }
              };

              return (
                <>
                  <SectionPreview>
                    <UpgradePreview
                      upgrade={upgrade}
                      planet={selected}
                      branchName={branch}
                      cantUpgrade={planetAtMaxRank || branchAtMaxRank}
                    />
                  </SectionPreview>
                  <SectionBuy>
                    <div>
                      <Sub>Silver Available</Sub>: <span>{selected.silver}</span>
                    </div>
                    <div>
                      <Sub>Silver Cost:</Sub> <SilverRequired planet={selected} />
                    </div>
                    <div>
                      <Spacer height={8} />
                      {isPendingUpgrade ? (
                        <Btn disabled={true}>
                          <LoadingSpinner initialText='Upgrading...' />
                        </Btn>
                      ) : (
                        <>
                          <Btn onClick={() => doUpgrade(branch)} disabled={!canUpgrade}>
                            {'Upgrade'}
                          </Btn>{' '}
                          {planetAtMaxRank ? (
                            <Red>Planet at Max Rank</Red>
                          ) : branchAtMaxRank ? (
                            <Red>{upgradeName(branch)} at Max Rank</Red>
                          ) : !enoughSilver ? (
                            <Red>Not Enough Silver</Red>
                          ) : undefined}
                        </>
                      )}
                    </div>
                  </SectionBuy>
                </>
              );
            }}
          />

          <UpgradeDetailsWrapper></UpgradeDetailsWrapper>
        </>
      );
    }
  }

  return (
    <ModalPane
      hook={hook}
      title={'Upgrade'}
      name={ModalName.UpgradeDetails}
      helpContent={HelpContent}
      width={RECOMMENDED_WIDTH}
    >
      {content}
    </ModalPane>
  );
}
