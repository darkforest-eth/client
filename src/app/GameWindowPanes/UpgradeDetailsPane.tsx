import React, {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import styled from 'styled-components';
import { ModalPane, ModalHook, ModalName } from './ModalPane';
import { Sub, White } from '../../components/Text';
import _ from 'lodash';
import {
  Planet,
  Upgrade,
  EthAddress,
  UpgradeBranchName,
  SpaceType,
} from '../../_types/global/GlobalTypes';
import {
  getPlanetRank,
  getPlanetShortHash,
  isFullRank,
  planetCanUpgrade,
  PlanetStatsInfo,
} from '../../utils/Utils';
import { RightarrowIcon } from '../Icons';
import dfstyles from '../../styles/dfstyles';
import GameUIManagerContext from '../board/GameUIManagerContext';
import GameUIManager from '../board/GameUIManager';
import { ProcgenUtils } from '../../utils/ProcgenUtils';
import { CheckedTypeUtils } from '../../utils/CheckedTypeUtils';
import { TooltipTrigger } from './Tooltip';
import { TooltipName } from '../../utils/WindowManager';
import {
  AccountContext,
  ContextMenuType,
  SelectedContext,
  SelectedStatContext,
} from '../GameWindow';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import { UpgradePreview } from './UpgradePreview';

const UpgradeDetailsWrapper = styled.div`
  min-width: 20em;
  width: fit-content;
  min-height: 10em;
`;
const Message = styled.div`
  height: 100%;
  width: 27em;
  text-align: center;
`;
const SECTION_MARGIN = '0.75em';
const SectionTitle = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: ${SECTION_MARGIN};

  & > span:nth-child(2n + 1) {
    // not the arrow
    flex-grow: 1;
    & > span {
      display: inline-block;
    }
  }

  & > span:nth-child(2) {
    // arrow
    text-align: center;
    & svg path {
      fill: ${dfstyles.colors.subtext};
    }
  }
  & > span:last-child {
    text-align: right;
  }
`;

const SectionPreview = styled.div`
  margin-top: ${SECTION_MARGIN};
`;
const SectionBuy = styled.div`
  margin-top: ${SECTION_MARGIN};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  & > span:nth-child(2) {
    flex-grow: 1;
    text-align: right;
  }

  & > span:last-child {
    margin-left: 0.75em;
    text-align: right;
    & .btn-upgrade {
      display: inline-block;
      border-radius: 3px;
      padding: 0 0.3em;
      border: 1px solid ${dfstyles.colors.text};
      transition: background 0.2s, colors 0.2s;
      &:hover {
        color: ${dfstyles.colors.background};
        background: ${dfstyles.colors.text};
        cursor: pointer;
      }
      &:active {
        ${dfstyles.game.styles.active};
      }

      &.btn-disabled,
      &.btn-disabled:hover,
      &.btn-disabled:active {
        color: ${dfstyles.colors.subtext};
        background: none;
        border: 1px solid ${dfstyles.colors.subtext};
        cursor: default;
        filter: none;
      }
    }
  }
`;

const SectionButtons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const StyledUpgradeButton = styled.div<{ active: boolean }>`
  // flex-grow: 1;
  width: 10em;

  margin-right: 0.25em;
  &:last-child {
    margin-right: 0;
  }

  border-radius: 2px;
  border: 1px solid ${dfstyles.colors.subtext};
  padding: 0.2em 0;

  text-align: center;

  &:hover {
    cursor: pointer;
    border: 1px solid ${dfstyles.colors.text};
  }

  background: ${({ active }) => (active ? dfstyles.colors.text : 'none')};

  &,
  & span {
    ${({ active }) =>
      active && `color: ${dfstyles.colors.background} !important`};
  }

  &.disabled {
    border: 1px solid ${dfstyles.colors.subtext} !important;
    &,
    & span {
      color: ${dfstyles.colors.subtext} !important;
      cursor: auto !important;
    }
  }
`;

function UpgradeButton({
  branch,
  hook,
  disabled,
  planet,
}: {
  branch: UpgradeBranchName;
  hook: BranchHook;
  disabled: boolean;
  planet: Planet | null;
}) {
  if (!planet) return <></>;

  const [myBranch, setBranch] = hook;
  const getBranchName = () => ['Defense', 'Range', 'Speed'][branch];

  return (
    <StyledUpgradeButton
      onClick={() => disabled || setBranch(branch)}
      active={branch === myBranch}
      className={disabled ? 'disabled' : ''}
    >
      <p>
        <Sub>
          <White>{getBranchName()}</White> (lv
          <White>{planet.upgradeState[branch]}</White>)
        </Sub>
      </p>
    </StyledUpgradeButton>
  );
}

type BranchHook = [
  UpgradeBranchName | null,
  Dispatch<SetStateAction<UpgradeBranchName | null>>
];

export function UpgradeDetailsPane({ hook }: { hook: ModalHook }) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);
  const selected = useContext<Planet | null>(SelectedContext);
  const selectedStats = useContext<PlanetStatsInfo | null>(SelectedStatContext);

  const account = useContext<EthAddress | null>(AccountContext);

  const branchHook = useState<UpgradeBranchName | null>(null);
  const [branch, _setBranch] = branchHook;

  const [upgrade, setUpgrade] = useState<Upgrade | null>(null);

  // sync branch to upgrade
  useEffect(() => {
    if (!uiManager || !selected) return;

    if (branch === null) {
      setUpgrade(null);
      return;
    }

    const currentLevel = selected.upgradeState[branch];
    const newUpgrade = uiManager.getUpgrade(branch, currentLevel);
    setUpgrade(newUpgrade);
  }, [branch, uiManager, selected]);

  useEffect(() => {
    if (!selected) return;
    if (isFullRank(selected) || selected.planetLevel === 0) setUpgrade(null);
  }, [selected]);

  const getSilver = (): number => {
    if (!selectedStats) return 0;
    return Math.floor(selectedStats.silver);
  };

  const getSilverNeeded = (): number => {
    if (!selected || !uiManager) return 0;
    const totalLevel = selected.upgradeState.reduce((a, b) => a + b);
    return Math.floor((totalLevel + 1) * 0.2 * selected.silverCap);
  };

  const canUpgrade = (): boolean => {
    if (!selected) return false;
    const silverNeeded = getSilverNeeded();
    const silver = getSilver();
    if (silverNeeded === 0) return false;
    if (isFullRank(selected)) return false;
    return silver >= silverNeeded;
  };

  const isPending = (): boolean => {
    if (!selected) return true;
    if (!selected.unconfirmedUpgrades) return false;
    return selected.unconfirmedUpgrades.length > 0;
  };

  const doUpgrade = (_e: React.MouseEvent) => {
    if (!canUpgrade() || !uiManager || !selected || branch === null) return;
    uiManager.upgrade(selected, branch);
  };

  const getMyRank = (planet: Planet | null): string => {
    if (isFullRank(planet)) return 'MAX';
    else return '' + getPlanetRank(planet);
  };

  const getRank = (): string => {
    return getMyRank(selected);
  };

  const getRankFuture = (): string => {
    if (!selected || branch === null) return getRank();
    const myObj = _.cloneDeep(selected);
    myObj.upgradeState[branch]++;
    return getMyRank(myObj);
  };

  const getTitle = (): string => {
    return ProcgenUtils.getPlanetTitle(selected);
  };

  const getTitleFuture = (): string => {
    if (!selected || branch === null) return getTitle();
    const myObj = _.cloneDeep(selected);
    myObj.upgradeState[branch]++;
    return ProcgenUtils.getPlanetTitle(myObj);
  };

  const windowName = (): string => {
    const str = 'Upgrade Details';
    if (!uiManager) return str;
    if (!selected || !account) return str;
    const planetname = ProcgenUtils.getPlanetName(selected);
    const shorthash = getPlanetShortHash(selected);
    const twitter = uiManager.getTwitter(selected.owner);

    if (selected.owner === CheckedTypeUtils.EMPTY_ADDRESS)
      return `Unclaimed ${shorthash} ${planetname} - ${str}`;

    if (!twitter) return `${shorthash} ${planetname} - ${str}`;
    else return `@${twitter}'s ${shorthash} ${planetname} - ${str}`;
  };

  // tuple of 3 bools, one for each branch
  const disabled: boolean[] = planetCanUpgrade(selected)
    ? selected?.upgradeState.map((level, i) => {
        if (
          i === UpgradeBranchName.Defense &&
          selected.spaceType === SpaceType.DEEP_SPACE
        )
          return level >= 2;
        return level >= 4;
      }) || [true, true, true]
    : [true, true, true];

  useEffect(() => {
    const [, setVisible] = hook;
    const doChange = (type: ContextMenuType) => {
      if (type === ContextMenuType.None) {
        setVisible(false);
      }
    };
    const uiEmitter = UIEmitter.getInstance();
    uiEmitter.on(UIEmitterEvent.ContextChange, doChange);

    const hide = () => setVisible(false);
    uiEmitter.on(UIEmitterEvent.GamePlanetSelected, hide);

    return () => {
      uiEmitter.removeListener(UIEmitterEvent.ContextChange, doChange);
      uiEmitter.removeListener(UIEmitterEvent.GamePlanetSelected, hide);
    };
  });

  return (
    <ModalPane hook={hook} title={windowName()} name={ModalName.UpgradeDetails}>
      {selected && account && selected.owner === account ? (
        <UpgradeDetailsWrapper>
          <SectionButtons>
            <UpgradeButton
              branch={0}
              hook={branchHook}
              disabled={disabled[0]}
              planet={selected}
            />
            <UpgradeButton
              branch={1}
              hook={branchHook}
              disabled={disabled[1]}
              planet={selected}
            />
            <UpgradeButton
              branch={2}
              hook={branchHook}
              disabled={disabled[2]}
              planet={selected}
            />
          </SectionButtons>
          <SectionTitle>
            <span>
              <span>{getTitle()}</span>
              <br />
              <Sub>
                (Rank{' '}
                <TooltipTrigger needsCtrl name={TooltipName.Upgrades}>
                  {getRank()}
                </TooltipTrigger>
                )
              </Sub>
            </span>
            <span>
              <RightarrowIcon />
            </span>
            <span>
              <span>{getTitleFuture()}</span>
              <br />
              <Sub>
                (Rank{' '}
                <TooltipTrigger needsCtrl name={TooltipName.Upgrades}>
                  {getRankFuture()}
                </TooltipTrigger>
                )
              </Sub>
            </span>
          </SectionTitle>

          <SectionPreview>
            <UpgradePreview upgrade={upgrade} planet={selected} />
          </SectionPreview>

          <SectionBuy>
            <span>
              <Sub>Silver Cost</Sub>
            </span>
            <span>
              {getSilver()} <Sub>/</Sub> {getSilverNeeded()}
            </span>
            <span>
              <span
                className={[
                  'btn-upgrade',
                  !canUpgrade() || isPending() ? 'btn-disabled' : undefined,
                ].join(' ')}
                onClick={doUpgrade}
              >
                {isPending() ? 'Pending' : 'Upgrade'}
              </span>
            </span>
          </SectionBuy>
        </UpgradeDetailsWrapper>
      ) : (
        <Message>
          <p>Please select a planet you own to view upgrades.</p>
        </Message>
      )}
    </ModalPane>
  );
}
