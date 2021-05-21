import { Planet, PlanetType } from '@darkforest_eth/types';
import React from 'react';
import { ProcgenUtils } from '../../Backend/Procedural/ProcgenUtils';
import { Wrapper } from '../../Backend/Utils/Wrapper';
import { StatIdx } from '../../_types/global/GlobalTypes';
import {
  DefenseIcon,
  EnergyGrowthIcon,
  EnergyIcon,
  RangeIcon,
  SilverGrowthIcon,
  SilverIcon,
  SpeedIcon,
} from '../Components/Icons';
import {
  DefenseText,
  EnergyGrowthText,
  EnergyLabel,
  LevelRankTextEm,
  PlanetBiomeTypeLabel,
  PlanetOwnerLabel,
  RangeText,
  SilverGrowthText,
  SilverLabel,
  SpeedText,
} from '../Components/PlanetLabels';
import { PlanetPreview } from '../Components/PlanetPreview';
import { TooltipName } from '../Game/WindowManager';
import { PlanetIcons } from '../Renderers/PlanetscapeRenderer/PlanetIcons';
import { useUIManager, useActiveArtifact } from '../Utils/AppHooks';
import {
  StyledPlanetCard,
  PreviewSection,
  PlanetTag,
  IconsWrapper,
  StatSection,
  BigStatCell,
  RowTip,
  Small,
  StatRow,
  TitleBar,
  TopRow,
  PCStatIcon,
  ArtifactSection,
  PlanetActiveArtifact,
} from './PlanetCardComponents';

/** Preview basic planet information - used in `PlanetContextPane` and `HoverPlanetPane` */
export function PlanetCard({ planetWrapper }: { planetWrapper: Wrapper<Planet | undefined> }) {
  const uiManager = useUIManager();
  const active = useActiveArtifact(planetWrapper, uiManager);
  const planet = planetWrapper.value;

  return (
    <StyledPlanetCard>
      <TitleBar>
        <p>{ProcgenUtils.getPlanetName(planet)}</p>
        <p>
          <PlanetOwnerLabel planet={planet} showYours color />
        </p>
      </TitleBar>
      <PreviewSection>
        <PlanetPreview planet={planet} size={'5em'} res={100} />
        <PlanetTag planet={planet}>
          <p>
            <PlanetBiomeTypeLabel planet={planet} />
          </p>
          <p>
            <LevelRankTextEm planet={planet} delim={' / '} />
          </p>
        </PlanetTag>
        <IconsWrapper>
          <PlanetIcons planet={planet} />
        </IconsWrapper>
      </PreviewSection>
      <StatSection>
        <TopRow>
          <BigStatCell>
            <PCStatIcon planet={planet} stat={StatIdx.EnergyCap}>
              <EnergyIcon />
            </PCStatIcon>
            <EnergyLabel planet={planet} />
          </BigStatCell>
          <BigStatCell>
            <RowTip name={TooltipName.Silver}>
              <SilverIcon />
            </RowTip>
            <SilverLabel planet={planet} />
          </BigStatCell>
        </TopRow>
        <StatRow>
          <Small planet={planet}>
            <PCStatIcon planet={planet} stat={StatIdx.EnergyGro}>
              <EnergyGrowthIcon />
            </PCStatIcon>
            <EnergyGrowthText planet={planet} />
          </Small>
          {planet?.planetType === PlanetType.SILVER_MINE && (
            <Small planet={planet}>
              <RowTip name={TooltipName.SilverGrowth}>
                <SilverGrowthIcon />
              </RowTip>
              <SilverGrowthText planet={planet} />
            </Small>
          )}
          <Small planet={planet}>
            <PCStatIcon planet={planet} stat={StatIdx.Defense}>
              <DefenseIcon />
            </PCStatIcon>
            <DefenseText planet={planet} />
          </Small>
          <Small planet={planet}>
            <PCStatIcon planet={planet} stat={StatIdx.Speed}>
              <SpeedIcon />
            </PCStatIcon>
            <SpeedText planet={planet} />
          </Small>
          <Small planet={planet}>
            <PCStatIcon planet={planet} stat={StatIdx.Range}>
              <RangeIcon />
            </PCStatIcon>
            <RangeText planet={planet} />
          </Small>
        </StatRow>
      </StatSection>
      {active && (
        <ArtifactSection>
          <PlanetActiveArtifact artifact={active} planet={planet} />
        </ArtifactSection>
      )}
    </StyledPlanetCard>
  );
}
