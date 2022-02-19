import { isLocatable } from '@darkforest_eth/gamelogic';
import { getPlanetName } from '@darkforest_eth/procedural';
import { Planet, TooltipName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { StatIdx } from '../../_types/global/GlobalTypes';
import { AlignCenterHorizontally, EmSpacer, InlineBlock, SpreadApart } from '../Components/CoreUI';
import { Icon, IconType } from '../Components/Icons';
import { AccountLabel } from '../Components/Labels/Labels';
import {
  DefenseText,
  EnergyGrowthText,
  JunkText,
  PlanetBiomeTypeLabelAnim,
  PlanetEnergyLabel,
  PlanetLevel,
  PlanetRank,
  PlanetSilverLabel,
  RangeText,
  SilverGrowthText,
  SpeedText,
} from '../Components/Labels/PlanetLabels';
import { Sub } from '../Components/Text';
import { PlanetIcons } from '../Renderers/PlanetscapeRenderer/PlanetIcons';
import dfstyles, { snips } from '../Styles/dfstyles';
import { useActiveArtifact, usePlanetArtifacts, useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { SelectArtifactRow } from './ArtifactRow';
import { Halved, PlanetActiveArtifact, RowTip, TimesTwo, TitleBar } from './PlanetCardComponents';

export function PlanetCardTitle({
  planet,
  small,
}: {
  planet: Wrapper<Planet | undefined>;
  small?: boolean;
}) {
  if (!planet.value) return <></>;
  if (small) return <>{getPlanetName(planet.value)}</>;

  return (
    <AlignCenterHorizontally style={{ width: 'initial', display: 'inline-flex' }}>
      {getPlanetName(planet.value)}
      <EmSpacer width={0.5} />
      <PlanetIcons planet={planet.value} />
    </AlignCenterHorizontally>
  );
}

const ElevatedContainer = styled.div`
  ${snips.roundedBordersWithEdge}
  border-color: ${dfstyles.colors.borderDarker};
  background-color: ${dfstyles.colors.backgroundlight};
  margin-top: 8px;
  margin-bottom: 8px;
  font-size: 85%;
`;

/** Preview basic planet information - used in `PlanetContextPane` and `HoverPlanetPane` */
export function PlanetCard({
  planetWrapper: p,
  standalone,
}: {
  planetWrapper: Wrapper<Planet | undefined>;
  standalone?: boolean;
}) {
  const uiManager = useUIManager();
  const active = useActiveArtifact(p, uiManager);
  const planet = p.value;
  const artifacts = usePlanetArtifacts(p, uiManager);
  const spaceJunkEnabled = uiManager.getSpaceJunkEnabled();
  const isAbandoning = useEmitterValue(uiManager.isAbandoning$, uiManager.isAbandoning());

  if (!planet || !isLocatable(planet)) return <></>;

  return (
    <>
      {standalone && (
        <TitleBar>
          <PlanetCardTitle planet={p} />
        </TitleBar>
      )}
      <div style={{ padding: standalone ? '8px' : undefined }}>
        <AlignCenterHorizontally style={{ justifyContent: 'space-between' }}>
          <InlineBlock>
            <PlanetLevel planet={planet} />
            <EmSpacer width={0.5} />
            <PlanetRank planet={planet} />
            <EmSpacer width={0.5} />
            <PlanetBiomeTypeLabelAnim planet={planet} />
            <EmSpacer width={0.5} />
          </InlineBlock>
        </AlignCenterHorizontally>
        {active && (
          <>
            <EmSpacer height={0.5} />
            <PlanetActiveArtifact artifact={active} planet={planet} />
          </>
        )}

        <ElevatedContainer>
          <StatRow>
            <SpreadApart>
              <div
                style={{
                  border: `1px solid ${dfstyles.colors.borderDarker}`,
                  borderTop: 'none',
                  borderLeft: 'none',
                  width: '50%',
                }}
              >
                <RowTip name={TooltipName.Energy}>
                  <SpreadApart>
                    <AlignCenterHorizontally>
                      <EmSpacer width={0.5} />
                      <Icon type={IconType.Energy} />
                    </AlignCenterHorizontally>
                    <AlignCenterHorizontally>
                      <PlanetEnergyLabel planet={planet} />
                      {planet?.bonus && planet.bonus[StatIdx.EnergyCap] && <TimesTwo />}
                      <EmSpacer width={0.5} />
                    </AlignCenterHorizontally>
                  </SpreadApart>
                </RowTip>
              </div>
              <div
                style={{
                  border: `1px solid ${dfstyles.colors.borderDarker}`,
                  borderTop: 'none',
                  borderRight: 'none',
                  borderLeft: 'none',
                  width: '50%',
                }}
              >
                <RowTip name={TooltipName.Silver}>
                  <SpreadApart>
                    <AlignCenterHorizontally>
                      <EmSpacer width={0.5} />
                      <Icon type={IconType.Silver} />
                    </AlignCenterHorizontally>
                    <AlignCenterHorizontally>
                      <PlanetSilverLabel planet={planet} />
                      <EmSpacer width={0.5} />
                    </AlignCenterHorizontally>
                  </SpreadApart>
                </RowTip>
              </div>
            </SpreadApart>
          </StatRow>
          <StatRow>
            <SpreadApart>
              <div
                style={{
                  border: `1px solid ${dfstyles.colors.borderDarker}`,
                  borderTop: 'none',
                  borderLeft: 'none',
                  borderBottom: 'none',
                  width: '50%',
                }}
              >
                <RowTip name={TooltipName.EnergyGrowth}>
                  <SpreadApart>
                    <AlignCenterHorizontally>
                      <EmSpacer width={0.5} />
                      <Icon type={IconType.EnergyGrowth} />
                    </AlignCenterHorizontally>
                    <AlignCenterHorizontally>
                      <EnergyGrowthText planet={planet} />
                      {planet?.bonus && planet.bonus[StatIdx.EnergyGro] && <TimesTwo />}
                      <EmSpacer width={0.5} />
                    </AlignCenterHorizontally>
                  </SpreadApart>
                </RowTip>
              </div>
              <div
                style={{
                  borderBottom: 'none',
                  borderTop: 'none',
                  borderRight: 'none',
                  width: '50%',
                }}
              >
                <RowTip name={TooltipName.SilverGrowth}>
                  <SpreadApart>
                    <AlignCenterHorizontally>
                      <EmSpacer width={0.5} />
                      <Icon type={IconType.SilverGrowth} />
                    </AlignCenterHorizontally>
                    <AlignCenterHorizontally>
                      <SilverGrowthText planet={p.value} />
                      <EmSpacer width={0.5} />
                    </AlignCenterHorizontally>
                  </SpreadApart>
                </RowTip>
              </div>
            </SpreadApart>
          </StatRow>

          <StatRow>
            <SpreadApart>
              <div
                style={{
                  border: `1px solid ${dfstyles.colors.borderDarker}`,
                  borderBottom: 'none',
                  borderLeft: 'none',
                  width: spaceJunkEnabled ? '25%' : '34%',
                }}
              >
                <RowTip name={TooltipName.Defense}>
                  <SpreadApart>
                    <AlignCenterHorizontally>
                      <EmSpacer width={0.5} />
                      <Icon type={IconType.Defense} />
                    </AlignCenterHorizontally>
                    <AlignCenterHorizontally>
                      <DefenseText planet={planet} />
                      {planet?.bonus && planet.bonus[StatIdx.Defense] && <TimesTwo />}
                      <EmSpacer width={0.5} />
                    </AlignCenterHorizontally>
                  </SpreadApart>
                </RowTip>
              </div>

              <div
                style={{
                  border: `1px solid ${dfstyles.colors.borderDarker}`,
                  borderLeft: 'none',
                  borderBottom: 'none',
                  width: spaceJunkEnabled ? '25%' : '33%',
                }}
              >
                <RowTip name={TooltipName.Speed}>
                  <SpreadApart>
                    <AlignCenterHorizontally>
                      <EmSpacer width={0.5} />
                      <Icon type={IconType.Speed} />
                    </AlignCenterHorizontally>
                    <AlignCenterHorizontally>
                      <SpeedText
                        planet={planet}
                        buff={isAbandoning ? uiManager.getSpeedBuff() : undefined}
                      />
                      {planet?.bonus && planet.bonus[StatIdx.Speed] && <TimesTwo />}
                      <EmSpacer width={0.5} />
                    </AlignCenterHorizontally>
                  </SpreadApart>
                </RowTip>
              </div>

              <div
                style={{
                  border: `1px solid ${dfstyles.colors.borderDarker}`,
                  borderLeft: 'none',
                  borderRight: 'none',
                  borderBottom: 'none',
                  width: spaceJunkEnabled ? '25%' : '33%',
                }}
              >
                <RowTip name={TooltipName.Range}>
                  <SpreadApart>
                    <AlignCenterHorizontally>
                      <EmSpacer width={0.5} />
                      <Icon type={IconType.Range} />
                    </AlignCenterHorizontally>

                    <AlignCenterHorizontally>
                      <RangeText
                        planet={planet}
                        buff={isAbandoning ? uiManager.getRangeBuff() : undefined}
                      />
                      {planet?.bonus && planet.bonus[StatIdx.Range] && <TimesTwo />}
                      <EmSpacer width={0.5} />
                    </AlignCenterHorizontally>
                  </SpreadApart>
                </RowTip>
              </div>

              {spaceJunkEnabled && (
                <div
                  style={{
                    border: `1px solid ${dfstyles.colors.borderDarker}`,
                    borderRight: 'none',
                    borderBottom: 'none',
                    width: '25%',
                  }}
                >
                  <RowTip name={TooltipName.SpaceJunk}>
                    <SpreadApart>
                      <AlignCenterHorizontally>
                        <EmSpacer width={0.5} />
                        <Icon type={IconType.TrashCan} />
                      </AlignCenterHorizontally>

                      <AlignCenterHorizontally>
                        <JunkText planet={planet} />
                        {planet?.bonus && planet.bonus[StatIdx.SpaceJunk] && <Halved />}
                        <EmSpacer width={0.5} />
                      </AlignCenterHorizontally>
                    </SpreadApart>
                  </RowTip>
                </div>
              )}
            </SpreadApart>
          </StatRow>
        </ElevatedContainer>

        {standalone && (
          <>
            <SpreadApart>
              <Sub>owner</Sub>
              <Sub>
                <AccountLabel ethAddress={planet.owner} includeAddressIfHasTwitter={true} />
              </Sub>
            </SpreadApart>
            <SelectArtifactRow artifacts={artifacts} />
          </>
        )}
      </div>
    </>
  );
}

const StatRow = styled(AlignCenterHorizontally)`
  ${snips.roundedBorders}
  display: inline-block;
  box-sizing: border-box;
  width: 100%;

  /* Set the Icon color to something a little dimmer */
  --df-icon-color: ${dfstyles.colors.subtext};
`;
