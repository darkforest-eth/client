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
import {
  Sub,
  Green,
  Red,
  ArtifactNameLink,
  StyledLink,
} from '../../components/Text';
import {
  getFormatProp,
  getPlanetShortHash,
  bonusFromHex,
  getPlanetRank,
  planetCanUpgrade,
  PlanetStatsInfo,
  getUpgradeStat,
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
import { ProcgenUtils } from '../../utils/ProcgenUtils';
import { CheckedTypeUtils } from '../../utils/CheckedTypeUtils';
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
    width: 11em;

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
  <TooltipTrigger name={TooltipName.Bonus} style={{ marginRight: '0.5em' }}>
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
  height: 7em;
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
  width: 32em;

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
    const planetname = ProcgenUtils.getPlanetName(selected);
    const shorthash = getPlanetShortHash(selected);
    const twitter = uiManager.getTwitter(selected.owner);

    if (selected.owner === CheckedTypeUtils.EMPTY_ADDRESS)
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
    } else if (selected && !isLocatable(selected)) {
      return 'Planet (biome unknown)';
    }
    return append + 'Planet';
  };

  const ArtifactStat = ({ stat }: { stat: StatIdx }) => {
    const artifactId = selectedStats?.heldArtifactId;
    const artifact = artifactId && uiManager?.getArtifactWithId(artifactId);

    const buff = artifact ? getUpgradeStat(artifact.upgrade, stat) - 100 : 0;

    return (
      <>
        {buff > 0 && <Green>+{buff}%</Green>}
        {buff < 0 && <Red>{buff}%</Red>}
      </>
    );
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
              <PlanetScape
                keepDrawing={visible && hook[0]}
                planet={selected}
                info={selectedStats}
              />
            </div>
            <div>
              <div>
                <span>
                  <TooltipTrigger name={TooltipName.Energy}>
                    <EnergyIcon />
                  </TooltipTrigger>
                  {bonus && bonus[StatIdx.EnergyCap] && <TimesTwo />}
                  <TooltipTrigger name={TooltipName.ArtifactBuff}>
                    <ArtifactStat stat={StatIdx.EnergyCap} />
                  </TooltipTrigger>
                </span>
                <span>
                  {selected?.owner === CheckedTypeUtils.EMPTY_ADDRESS &&
                  selected.energy > 0 ? (
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
                  <TooltipTrigger name={TooltipName.Silver}>
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
                  <TooltipTrigger name={TooltipName.EnergyGrowth}>
                    <EnergyGrowthIcon />
                  </TooltipTrigger>
                  {bonus && bonus[StatIdx.EnergyGro] && <TimesTwo />}
                  <TooltipTrigger name={TooltipName.ArtifactBuff}>
                    <ArtifactStat stat={StatIdx.EnergyGro} />
                  </TooltipTrigger>
                </span>
                <span>{getFormatProp(selected, 'energyGrowth')}</span>
              </div>

              <div>
                <span>
                  <TooltipTrigger name={TooltipName.Range}>
                    <RangeIcon />
                  </TooltipTrigger>
                  {bonus && bonus[StatIdx.Range] && <TimesTwo />}
                  <TooltipTrigger name={TooltipName.ArtifactBuff}>
                    <ArtifactStat stat={StatIdx.Range} />
                  </TooltipTrigger>
                </span>
                <span>{getFormatProp(selected, 'range')}</span>
              </div>
              <div>
                <span>
                  <TooltipTrigger name={TooltipName.Speed}>
                    <SpeedIcon />
                  </TooltipTrigger>
                  {bonus && bonus[StatIdx.Speed] && <TimesTwo />}
                  <TooltipTrigger name={TooltipName.ArtifactBuff}>
                    <ArtifactStat stat={StatIdx.Speed} />
                  </TooltipTrigger>
                </span>
                <span>{getFormatProp(selected, 'speed')}</span>
              </div>
              <div>
                <span>
                  <TooltipTrigger name={TooltipName.Defense}>
                    <DefenseIcon />
                  </TooltipTrigger>
                  {bonus && bonus[StatIdx.Defense] && <TimesTwo />}
                  <TooltipTrigger name={TooltipName.ArtifactBuff}>
                    <ArtifactStat stat={StatIdx.Defense} />
                  </TooltipTrigger>
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
                Rank {getPlanetRank(selected)} (
                {ProcgenUtils.getPlanetTitle(selected)})
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
            <DetailsRowSingle>
              <Sub>Artifact</Sub>
              <span>
                {!selectedStats?.heldArtifactId && (
                  <StyledLink onClick={() => findArtifactHook[1](true)}>
                    None
                  </StyledLink>
                )}
                {selectedStats?.heldArtifactId && (
                  <ArtifactNameLink id={selectedStats.heldArtifactId} />
                )}
              </span>
            </DetailsRowSingle>
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
              <p>{ProcgenUtils.getPlanetTagline(selected)}.</p>
              <p>{ProcgenUtils.getPlanetBlurb(selected)}</p>
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
