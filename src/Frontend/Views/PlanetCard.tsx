import { Planet, PlanetType } from '@darkforest_eth/types';
import React from 'react';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { StatIdx } from '../../_types/global/GlobalTypes';
import { EmSpacer, HorizontalFlex, InlineBlock, Padded } from '../Components/CoreUI';
import {
  DefenseIcon,
  EnergyGrowthIcon,
  EnergyIcon,
  SilverGrowthIcon,
  SilverIcon,
  SpeedIcon,
} from '../Components/Icons';
import {
  DefenseText,
  EnergyGrowthText,
  PlanetBiomeTypeLabelAnim,
  PlanetEnergyLabel,
  PlanetLevel,
  PlanetRank,
  PlanetSilverLabel,
  SilverGrowthText,
  SpeedText,
} from '../Components/Labels/PlanetLabels';
import { ReadMore } from '../Components/ReadMore';
import { TextPreview } from '../Components/TextPreview';
import { TooltipName } from '../Game/WindowManager';
import { PlanetIcons } from '../Renderers/PlanetscapeRenderer/PlanetIcons';
import { useActiveArtifact, useUIManager } from '../Utils/AppHooks';
import {
  DestroyedMarker,
  PCStatIcon,
  PlanetActiveArtifact,
  RowTip,
  StatContainer,
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
    <HorizontalFlex style={{ width: 'initial', display: 'inline-flex' }}>
      {planet.value.destroyed && (
        <>
          <DestroyedMarker />
          <EmSpacer width={0.5} />
        </>
      )}
      {ProcgenUtils.getPlanetName(planet.value)}
      <EmSpacer width={0.5} />
      <PlanetIcons planet={planet.value} />
    </HorizontalFlex>
  );
}

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

  return (
    <div>
      {standalone && (
        <TitleBar>
          <PlanetCardTitle planet={p} />
        </TitleBar>
      )}

      <Padded bottom={'0'}>
        <HorizontalFlex style={{ justifyContent: 'space-between' }}>
          <InlineBlock>
            <PlanetLevel planet={planet} />
            <EmSpacer width={0.5} />
            <PlanetRank planet={planet} />
            <EmSpacer width={1} />
            <PlanetBiomeTypeLabelAnim planet={planet} />
          </InlineBlock>
        </HorizontalFlex>
      </Padded>

      <ReadMore height={(!standalone && '5em') || undefined}>
        <StatContainer wide>
          <div>
            <HorizontalFlex>
              <EnergyIcon />
              <EmSpacer width={0.5} />
              Energy
            </HorizontalFlex>
          </div>

          <PlanetEnergyLabel planet={planet} />
        </StatContainer>

        <StatContainer wide>
          <div>
            <SilverIcon />
            <EmSpacer width={0.5} />
            Silver
          </div>
          <PlanetSilverLabel planet={planet} />
        </StatContainer>

        <StatContainer wide>
          <div>
            <HorizontalFlex>
              <PCStatIcon planet={planet} stat={StatIdx.EnergyGro}>
                <EnergyGrowthIcon />
              </PCStatIcon>
              <EmSpacer width={0.5} />
              Energy Growth
            </HorizontalFlex>
          </div>
          <EnergyGrowthText planet={planet} />
        </StatContainer>

        {(p.value?.planetType === PlanetType.SILVER_MINE && (
          <StatContainer wide>
            <div>
              <HorizontalFlex>
                <RowTip name={TooltipName.SilverGrowth}>
                  <SilverGrowthIcon />
                </RowTip>
                <EmSpacer width={0.5} />
                Silver Growth
              </HorizontalFlex>
            </div>
            <SilverGrowthText planet={planet} />
          </StatContainer>
        )) || <></>}

        <StatContainer wide>
          <div>
            <HorizontalFlex>
              <PCStatIcon planet={planet} stat={StatIdx.Defense}>
                <DefenseIcon />
              </PCStatIcon>
              <EmSpacer width={0.5} />
              Defense
            </HorizontalFlex>
          </div>
          <DefenseText planet={planet} />
        </StatContainer>

        <StatContainer wide>
          <div>
            <HorizontalFlex>
              <PCStatIcon planet={planet} stat={StatIdx.Speed}>
                <SpeedIcon />
              </PCStatIcon>
              <EmSpacer width={0.5} />
              Speed
            </HorizontalFlex>
          </div>
          <SpeedText planet={planet} />
        </StatContainer>

        <StatContainer wide>
          <div>Owner Address</div>
          <TextPreview text={planet?.owner} focusedWidth={'150px'} unFocusedWidth={'150px'} />{' '}
        </StatContainer>

        <StatContainer wide>
          <div>Planet Id</div>
          <TextPreview text={planet?.locationId} focusedWidth={'150px'} unFocusedWidth={'150px'} />
        </StatContainer>
      </ReadMore>
      {active && <PlanetActiveArtifact artifact={active} planet={planet} />}
    </div>
  );
}
