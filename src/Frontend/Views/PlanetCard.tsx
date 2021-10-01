import { Planet } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { isLocatable, StatIdx } from '../../_types/global/GlobalTypes';
import {
  AlignCenterHorizontally,
  EmSpacer,
  FullWidth,
  InlineBlock,
  SpreadApart,
} from '../Components/CoreUI';
import {
  DefenseIcon,
  EnergyGrowthIcon,
  EnergyIcon,
  RangeIcon,
  SilverGrowthIcon,
  SilverIcon,
  SpeedIcon,
} from '../Components/Icons';
import { AccountLabel } from '../Components/Labels/Labels';
import {
  DefenseText,
  EnergyGrowthText,
  PlanetBiomeTypeLabelAnim,
  PlanetEnergyLabel,
  PlanetLevel,
  PlanetRank,
  PlanetSilverLabel,
  RangeText,
  SilverGrowthText,
  SpeedText,
} from '../Components/Labels/PlanetLabels';
import { PlanetPreview } from '../Components/PlanetPreview';
import { ReadMore } from '../Components/ReadMore';
import { Sub } from '../Components/Text';
import { TextPreview } from '../Components/TextPreview';
import { TooltipName } from '../Game/WindowManager';
import { TooltipTrigger } from '../Panes/Tooltip';
import { PlanetIcons } from '../Renderers/PlanetscapeRenderer/PlanetIcons';
import dfstyles, { snips } from '../Styles/dfstyles';
import { useActiveArtifact, useUIManager } from '../Utils/AppHooks';
import { Setting, useBooleanSetting } from '../Utils/SettingsHooks';
import {
  DestroyedMarker,
  PlanetActiveArtifact,
  RowTip,
  TimesTwo,
  TitleBar,
} from './PlanetCardComponents';

export function PlanetCardTitle({
  planet,
  small,
}: {
  planet: Wrapper<Planet | undefined>;
  small?: boolean;
}) {
  if (!planet.value) return <></>;
  if (small) return <>{ProcgenUtils.getPlanetName(planet.value)}</>;

  return (
    <AlignCenterHorizontally style={{ width: 'initial', display: 'inline-flex' }}>
      {planet.value.destroyed && (
        <>
          <DestroyedMarker />
          <EmSpacer width={0.5} />
        </>
      )}
      {ProcgenUtils.getPlanetName(planet.value)}
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
  const [experimentalFeatures] = useBooleanSetting(uiManager, Setting.ExperimentalFeatures);
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

        <FullWidth>
          {experimentalFeatures && (
            <ElevatedContainer
              style={{
                padding: '2px',
                marginRight: '8px',
                backgroundColor: 'rgba(0, 20, 80, 1.0)',
                display: 'inline-flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '110px',
              }}
            >
              <PlanetPreview planet={planet} size={'50px'} />
            </ElevatedContainer>
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
                        <EnergyIcon color={dfstyles.colors.subtext} />
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
                        <SilverIcon color={dfstyles.colors.subtext} />
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
                        <EnergyGrowthIcon color={dfstyles.colors.subtext} />
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
                        <SilverGrowthIcon color={dfstyles.colors.subtext} />
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
                    width: '34%',
                  }}
                >
                  <RowTip name={TooltipName.Defense}>
                    <SpreadApart>
                      <AlignCenterHorizontally>
                        <EmSpacer width={0.5} />
                        <DefenseIcon color={dfstyles.colors.subtext} />
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
                    width: '33%',
                  }}
                >
                  <RowTip name={TooltipName.Speed}>
                    <SpreadApart>
                      <AlignCenterHorizontally>
                        <EmSpacer width={0.5} />
                        <SpeedIcon color={dfstyles.colors.subtext} />
                      </AlignCenterHorizontally>
                      <AlignCenterHorizontally>
                        <SpeedText planet={planet} />
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
                    width: '33%',
                  }}
                >
                  <RowTip name={TooltipName.Range}>
                    <SpreadApart>
                      <AlignCenterHorizontally>
                        <EmSpacer width={0.5} />
                        <RangeIcon color={dfstyles.colors.subtext} />
                      </AlignCenterHorizontally>

                      <AlignCenterHorizontally>
                        <RangeText planet={planet} />
                        {planet?.bonus && planet.bonus[StatIdx.Range] && <TimesTwo />}
                        <EmSpacer width={0.5} />
                      </AlignCenterHorizontally>
                    </SpreadApart>
                  </RowTip>
                </div>
              </SpreadApart>
            </StatRow>
          </ElevatedContainer>
        </FullWidth>

        {!standalone && (
          <ReadMore height={'0'}>
            <div style={{ textAlign: 'right' }}>
              <TooltipTrigger name={TooltipName.Empty} extraContent={<>id</>}>
                <TextPreview
                  style={{ color: dfstyles.colors.subtext }}
                  text={planet?.locationId}
                  focusedWidth={'150px'}
                  unFocusedWidth={'150px'}
                />
              </TooltipTrigger>
              <br />
              <TooltipTrigger name={TooltipName.Empty} extraContent={<>coords</>}>
                <TextPreview
                  style={{ color: dfstyles.colors.subtext }}
                  text={`(${planet.location.coords.x}, ${planet.location.coords.y})`}
                  focusedWidth={'150px'}
                  unFocusedWidth={'150px'}
                />
              </TooltipTrigger>
              <br />
              <TooltipTrigger name={TooltipName.Empty} extraContent={<>owner</>}>
                <AccountLabel
                  style={{ color: dfstyles.colors.subtext }}
                  ethAddress={planet.owner}
                  includeAddressIfHasTwitter
                />
              </TooltipTrigger>
            </div>
          </ReadMore>
        )}

        {standalone && (
          <SpreadApart>
            <Sub>owner</Sub>
            <Sub>
              <AccountLabel ethAddress={planet.owner} includeAddressIfHasTwitter={true} />
            </Sub>
          </SpreadApart>
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

  path {
    fill: ${dfstyles.colors.subtext};
  }
`;
