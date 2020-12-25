import React, { useContext, useState, useEffect } from 'react';
import {
  Planet,
  EthAddress,
  Bonus,
  StatIdx,
  PlanetResource,
  isLocatable,
  BiomeNames,
} from '../../_types/global/GlobalTypes';
import { PlanetScape } from '../planetscape/PlanetScape';
import styled from 'styled-components';
import { Sub, Green } from '../../components/Text';
import {
  getFormatProp,
  getPlanetShortHash,
  bonusFromHex,
  getPlanetRank,
  planetCanUpgrade,
  PlanetStatsInfo,
} from '../../utils/Utils';
import GameUIManager from '../board/GameUIManager';
import GameUIManagerContext from '../board/GameUIManagerContext';
import {
  ModalPane,
  ModalHook,
  ModalName,
  ModalUpgradeDetailsIcon,
  ModalTwitterBroadcastIcon,
  ModalHatIcon,
  ModalArtifactIcon,
  ModalDepositIcon,
} from './ModalPane';
import {
  getPlanetBlurb,
  getPlanetName,
  getPlanetTagline,
  getPlanetTitle,
} from '../../utils/ProcgenUtils';
import { emptyAddress } from '../../utils/CheckedTypeUtils';
import { TooltipTrigger } from './Tooltip';
import { TooltipName } from '../../utils/WindowManager';
import { Btn } from '../GameWindowComponents/Btn';
import {
  AccountContext,
  ContextMenuType,
  SelectedContext,
  SelectedStatContext,
} from '../GameWindow';
import UIEmitter, { UIEmitterEvent } from '../../utils/UIEmitter';
import {
  DefenseIcon,
  EnergyGrowthIcon,
  EnergyIcon,
  RangeIcon,
  SilverIcon,
  SpeedIcon,
} from '../Icons';
import dfstyles from '../../styles/dfstyles';
import { HAT_SIZES } from '../../utils/constants';

const PlanetscapeWrapper = styled.div`
  width: 100%;
  height: fit-content;

  display: flex;
  flex-direction: row;
  justify-content: space-between;

  // planetscape
  & > div:first-child {
    flex-grow: 1;
  }

  // stats
  & > div:last-child {
    margin-left: 0.5em;
    width: 10em;

    // stat row
    & > div {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;

      & > span:first-child {
        &,
        & span {
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        text-align: left;
        // timestwo wrapper
        & > span:nth-child(2) {
          margin-left: 0.3em;
        }
      }

      & > span:last-child {
        text-align: right;
      }
    }
  }
`;

const TimesTwo = () => (
  <TooltipTrigger name={TooltipName.Bonus}>
    <Green>x2</Green>
  </TooltipTrigger>
);

const DetailsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;

  & > span:nth-child(2n) {
    text-align: right;
  }
`;

const ButtonRow = styled(DetailsRow)`
  & > span {
    display: flex;
    flex-direction: row;
    & > span {
      margin-left: 0.25em;
      &:first-child {
        margin-left: 0;
      }
    }
  }
`;

const StyledPlanetDetails = styled.div`
  height: 6em;
`;

const DetailsRowSingle = styled(DetailsRow)`
  & > span {
    &:last-child {
      margin-left: 0.5em;
      flex-grow: 1;
    }
  }
`;

const StyledPlanetDetailsPane = styled.div`
  // height: calc(100vh - 8em);
  height: fit-content;
  width: 31em;

  & .margin-top {
    margin-top: 0.5em;
  }
`;

const formatLocId = (loc: string): string => {
  return '0x' + loc.slice(0, 35) + '...' + loc.slice(-2);
};

function LocationViewer({ planet }: { planet: Planet | null }) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);

  const getLoc = (): string => {
    if (!planet || !uiManager) return '(0, 0)';
    const loc = uiManager.getLocationOfPlanet(planet.locationId);
    if (!loc) return '(0, 0)';
    return `(${loc.coords.x}, ${loc.coords.y})`;
  };

  const [hovering, setHovering] = useState<boolean>(false);

  return (
    <span
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {hovering ? getLoc() : planet ? formatLocId(planet.locationId) : '0'}
    </span>
  );
}

const StyledPlanetLore = styled.div`
  margin-top: 1.5em;

  & > p:first-child {
    text-decoration: underline;
  }

  & > div {
    height: 7.2em;
    overflow-y: auto;
    p {
      margin-top: 0.5em;
      color: ${dfstyles.colors.subtext};
    }
  }
`;

export function PlanetDetailsPane({
  hook,
  broadcastHook,
  upgradeDetHook,
  hatHook,
  findArtifactHook,
  depositHook,
}: {
  hook: ModalHook;
  broadcastHook: ModalHook;
  upgradeDetHook: ModalHook;
  hatHook: ModalHook;
  findArtifactHook: ModalHook;
  depositHook: ModalHook;
}) {
  const uiManager = useContext<GameUIManager | null>(GameUIManagerContext);
  const selected = useContext<Planet | null>(SelectedContext);
  const selectedStats = useContext<PlanetStatsInfo | null>(SelectedStatContext);

  const account = useContext<EthAddress | null>(AccountContext);

  const trueHook = useState<boolean>(true);
  const [visible, setVisible] = trueHook;

  const [planetOwnerTwitter, setPlanetOwnerTwitter] = useState<string | null>(
    null
  );

  const [bonus, setBonus] = useState<Bonus | null>(null);

  // sync selected with bonus
  useEffect(() => {
    if (!uiManager || !selected) setBonus(null);
    else setBonus(bonusFromHex(selected.locationId));
  }, [selected, uiManager]);

  useEffect(() => {
    if (!uiManager || !account) return;
    if (!selected) {
      setPlanetOwnerTwitter(null);
      return;
    }
    setPlanetOwnerTwitter(uiManager.getTwitter(selected.owner));
  }, [uiManager, selected, account]);

  // total length 40 - 3 = 37
  const formatOwner = (owner: string): string => {
    return owner;
  };

  const windowName = (): string => {
    const str = 'Planet Details';
    if (!uiManager) return str;
    if (!selected || !account) return str;
    const planetname = getPlanetName(selected);
    const shorthash = getPlanetShortHash(selected);
    const twitter = uiManager.getTwitter(selected.owner);

    if (selected.owner === emptyAddress)
      return `Unclaimed ${shorthash} ${planetname} - ${str}`;

    if (!twitter) return `${shorthash} ${planetname} - ${str}`;
    else return `@${twitter}'s ${shorthash} ${planetname} - ${str}`;
  };

  /*
  const sharePlanet = (): void => {
    const str = `I found an awesome level ${
      selected?.planetLevel
    } planet named ${getPlanetName(
      selected
    )}! @darkforest_eth (https://zkga.me/planet${selected?.locationId})`;
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURI(
        str
      )}&hashtags=darkforest`
    );
  };
  */

  useEffect(() => {
    const doChange = (type: ContextMenuType) => {
      if (type === ContextMenuType.Planet) {
        setVisible(true);
      } else if (type === ContextMenuType.None) {
        setVisible(false);
      }
    };
    const uiEmitter = UIEmitter.getInstance();
    uiEmitter.on(UIEmitterEvent.ContextChange, doChange);

    return () => {
      uiEmitter.removeListener(UIEmitterEvent.ContextChange, doChange);
    };
  });

  const getSilverNeeded = (): number => {
    if (!selected || !uiManager) return 0;
    const totalLevel = selected.upgradeState.reduce((a, b) => a + b);
    return (totalLevel + 1) * 0.2 * selected.silverCap;
  };

  const getSilverLeft = (): number => {
    return Math.max(getSilverNeeded() - (selected ? selected.silver : 0), 0);
  };

  const canUpgrade = (): boolean => {
    return (
      selected !== null &&
      selected.planetLevel !== 0 &&
      selected.planetResource !== PlanetResource.SILVER
    );
  };

  const biomePlanet = (): string => {
    let append = '';
    if (selected && isLocatable(selected)) {
      append = BiomeNames[selected.biome] + ' ';
    }
    return append + 'Planet';
  };

  return (
    <ModalPane
      style={{
        opacity: visible && hook[0] ? '1' : '0',
        pointerEvents: visible && hook[0] ? 'auto' : 'none',
        // zIndex: visible && hook[0] ? undefined : -1000,
      }}
      hook={hook}
      title={windowName()}
      name={ModalName.PlanetDetails}
      fixCorner
    >
      <StyledPlanetDetailsPane>
        <div
          style={{
            opacity: selected ? '1' : '0',
            pointerEvents: selected ? 'auto' : 'none',
            // display: selected ? 'block' : 'none',
          }}
        >
          <PlanetscapeWrapper>
            <div>
              <PlanetScape planet={selected} info={selectedStats} />
            </div>
            <div>
              <div>
                <span>
                  <TooltipTrigger name={TooltipName.Energy} needsShift>
                    <EnergyIcon />
                  </TooltipTrigger>
                  {bonus && bonus[StatIdx.EnergyCap] && <TimesTwo />}
                </span>
                <span>
                  {selected?.owner === emptyAddress && selected.energy > 0 ? (
                    <TooltipTrigger
                      name={TooltipName.Pirates}
                      display='inline-flex'
                    >
                      <span>{getFormatProp(selectedStats, 'energy')}</span>
                    </TooltipTrigger>
                  ) : (
                    <>{getFormatProp(selectedStats, 'energy')}</>
                  )}{' '}
                  <Sub>/</Sub> {getFormatProp(selected, 'energyCap')}
                </span>
              </div>
              <div>
                <span>
                  <TooltipTrigger name={TooltipName.Silver} needsShift>
                    <SilverIcon />
                  </TooltipTrigger>
                </span>
                <span>
                  {getFormatProp(selectedStats, 'silver')} <Sub>/</Sub>{' '}
                  {getFormatProp(selected, 'silverCap')}
                </span>
              </div>

              <div className='margin-top'>
                <span>
                  <TooltipTrigger name={TooltipName.EnergyGrowth} needsShift>
                    <EnergyGrowthIcon />
                  </TooltipTrigger>
                  {bonus && bonus[StatIdx.EnergyGro] && <TimesTwo />}
                </span>
                <span>{getFormatProp(selected, 'energyGrowth')}</span>
              </div>

              <div>
                <span>
                  <TooltipTrigger name={TooltipName.Range} needsShift>
                    <RangeIcon />
                  </TooltipTrigger>
                  {bonus && bonus[StatIdx.Range] && <TimesTwo />}
                </span>
                <span>{getFormatProp(selected, 'range')}</span>
              </div>
              <div>
                <span>
                  <TooltipTrigger name={TooltipName.Speed} needsShift>
                    <SpeedIcon />
                  </TooltipTrigger>
                  {bonus && bonus[StatIdx.Speed] && <TimesTwo />}
                </span>
                <span>{getFormatProp(selected, 'speed')}</span>
              </div>
              <div>
                <span>
                  <TooltipTrigger name={TooltipName.Defense} needsShift>
                    <DefenseIcon />
                  </TooltipTrigger>
                  {bonus && bonus[StatIdx.Defense] && <TimesTwo />}
                </span>
                <span>{getFormatProp(selected, 'defense')}</span>
              </div>
            </div>
          </PlanetscapeWrapper>

          <DetailsRowSingle className='margin-top' style={{ marginTop: '1em' }}>
            <Sub>Owner</Sub>
            <span>
              {selected
                ? planetOwnerTwitter
                  ? '@' + planetOwnerTwitter
                  : formatOwner(selected.owner)
                : '0'}
            </span>
          </DetailsRowSingle>
          <DetailsRowSingle>
            <Sub>Location</Sub>
            <LocationViewer planet={selected} />
          </DetailsRowSingle>

          <StyledPlanetDetails>
            <DetailsRowSingle className='margin-top'>
              <Sub>Celestial Body</Sub>
              <span>
                Level {selected && selected.planetLevel}{' '}
                {selected && selected.planetResource === PlanetResource.SILVER
                  ? 'Asteroid Field'
                  : biomePlanet()}
              </span>
            </DetailsRowSingle>
            <DetailsRowSingle>
              <Sub>
                {selected && selected.planetResource === PlanetResource.SILVER
                  ? 'Silver Mine'
                  : 'Planet'}{' '}
                Rank
              </Sub>
              <span>
                Rank {getPlanetRank(selected)} ({getPlanetTitle(selected)})
              </span>
            </DetailsRowSingle>
            <DetailsRowSingle>
              <Sub>HAT</Sub>
              <span>
                {HAT_SIZES[selectedStats ? selectedStats.hatLevel : 0]}{' '}
                {selected && selectedStats && selected.owner === account && (
                  <Btn onClick={() => hatHook[1](true)}>
                    {selectedStats.hatLevel > 0 ? 'Upgrade' : 'Buy'}
                  </Btn>
                )}
              </span>
            </DetailsRowSingle>
            {selected && selected.planetResource === PlanetResource.SILVER && (
              <DetailsRowSingle>
                <Sub>Silver Growth</Sub>
                <span>{selected.silverGrowth.toFixed(2)}</span>
              </DetailsRowSingle>
            )}
            {canUpgrade() && (
              <DetailsRowSingle>
                <Sub>Silver to Next Rank</Sub>
                <span>
                  {getSilverLeft() === 0 ? (
                    <Btn onClick={() => upgradeDetHook[1](true)}>
                      View Upgrades
                    </Btn>
                  ) : (
                    Math.floor(getSilverLeft())
                  )}
                </span>
              </DetailsRowSingle>
            )}
          </StyledPlanetDetails>
          <StyledPlanetLore>
            <p className='margin-top'>Captain's Log</p>

            <div>
              <p>{getPlanetTagline(selected)}.</p>
              <p>{getPlanetBlurb(selected)}</p>
            </div>
          </StyledPlanetLore>

          <ButtonRow className='margin-top' style={{ marginTop: '1em' }}>
            <span>
              {/*<Btn
                onClick={() => window.open('/planet' + selected?.locationId)}
              >
                View Planet Card
              </Btn>
              <Btn onClick={sharePlanet}>Share Planet</Btn>*/}
            </span>

            <span>
              {selected && selected.planetResource !== PlanetResource.SILVER && (
                <>
                  <ModalArtifactIcon hook={findArtifactHook} />
                  <ModalDepositIcon hook={depositHook} />
                </>
              )}
              <ModalHatIcon hook={hatHook} />
              <ModalTwitterBroadcastIcon hook={broadcastHook} />
              {planetCanUpgrade(selected) && (
                <ModalUpgradeDetailsIcon hook={upgradeDetHook} />
              )}
            </span>
          </ButtonRow>
        </div>
      </StyledPlanetDetailsPane>
    </ModalPane>
  );
}
