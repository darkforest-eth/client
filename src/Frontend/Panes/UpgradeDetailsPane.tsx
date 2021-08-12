import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { LocationId, Planet, PlanetType, UpgradeBranchName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import {
  getPlanetMaxRank,
  getPlanetRank,
  isFullRank,
  upgradeName,
} from '../../Backend/Utils/Utils';
import { Btn } from '../Components/Btn';
import { CenterBackgroundSubtext, Padded, Spacer } from '../Components/CoreUI';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { Gold, Red, Sub, Subber } from '../Components/Text';
import { useAccount, usePlanet, useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { ModalHandle } from '../Views/ModalPane';
import { TabbedView } from '../Views/TabbedView';
import { UpgradePreview } from '../Views/UpgradePreview';

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

export function UpgradeDetailsPaneHelpContent() {
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

export function UpgradeDetailsPane({
  initialPlanetId,
  modal: _modal,
}: {
  modal: ModalHandle;
  initialPlanetId: LocationId | undefined;
}) {
  const uiManager = useUIManager();
  const planetId = useEmitterValue(uiManager.selectedPlanetId$, initialPlanetId);
  const planet = usePlanet(uiManager, planetId).value;
  const account = useAccount(uiManager);
  const planetAtMaxRank = isFullRank(planet);

  let content = (
    <CenterBackgroundSubtext width={RECOMMENDED_MODAL_WIDTH} height='100px'>
      Select a Planet <br /> You Own
    </CenterBackgroundSubtext>
  );

  if (planet && account) {
    if (planet.owner !== account) {
    } else if (planet.planetType !== PlanetType.PLANET || planet.silverCap === 0) {
      content = (
        <CenterBackgroundSubtext width={RECOMMENDED_MODAL_WIDTH} height='100px'>
          This Planet <br /> is not Upgradeable
        </CenterBackgroundSubtext>
      );
    } else {
      content = (
        <>
          <TabbedView
            tabTitles={['Defense', 'Range', 'Speed']}
            tabContents={(branch: UpgradeBranchName) => {
              const currentLevel = planet.upgradeState[branch];
              const branchAtMaxRank = !planet || planet.upgradeState[branch] >= 4;
              const upgrade = branchAtMaxRank
                ? undefined
                : uiManager.getUpgrade(branch, currentLevel);

              const totalLevel = planet.upgradeState.reduce((a, b) => a + b);
              const silverNeeded = Math.floor((totalLevel + 1) * 0.2 * planet.silverCap);
              const enoughSilver = planet.silver >= silverNeeded;
              const isPendingUpgrade = planet.unconfirmedUpgrades.length > 0;
              const canUpgrade =
                enoughSilver && !planetAtMaxRank && !branchAtMaxRank && !isPendingUpgrade;

              const doUpgrade = (branch: UpgradeBranchName) => {
                if (canUpgrade) {
                  uiManager.upgrade(planet, branch);
                }
              };

              return (
                <>
                  <SectionPreview>
                    <UpgradePreview
                      upgrade={upgrade}
                      planet={planet}
                      branchName={branch}
                      cantUpgrade={planetAtMaxRank || branchAtMaxRank}
                    />
                  </SectionPreview>
                  <SectionBuy>
                    <div>
                      <Sub>Silver Available</Sub>: <span>{planet.silver}</span>
                    </div>
                    <div>
                      <Sub>Silver Cost:</Sub> <SilverRequired planet={planet} />
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

  return <Padded>{content}</Padded>;
}
