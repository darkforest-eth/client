// should be able to be treated as a text element
import { Planet, UpgradeBranchName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { getPlanetRank, isFullRank } from '../../Backend/Utils/Utils';
import { StatIdx } from '../../_types/global/GlobalTypes';
import dfstyles from '../Styles/dfstyles';

const SVGWrapper = styled.span`
  width: 1em;
  height: 1em;
  display: inline-block;
  position: relative;

  & svg {
    width: 100%;
    height: 100%;
    & path {
      fill: ${dfstyles.colors.text};
    }
  }
  & img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
  }
`;

const DefaultSVG = ({
  children,
  width,
  height,
}: {
  children: React.ReactNode;
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='512'
      height='512'
      viewBox={`0 0 ${height || 512} ${width || 512}`}
    >
      {children}
    </svg>
  );
};

const SilverGrowthSVG = ({ color }: { color?: string }) => (
  <svg
    version='1.1'
    id='Layer_1'
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    viewBox='0 0 512 512'
    // style="enable-background:new 0 0 512 512;"
  >
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M-0.5,166.3v305.1h512V166.3H-0.5z M95.8,441.7h-64v-64h32v32h32V441.7z M95.8,226.6h-32v32h-32v-64h64V226.6z M237.2,371.3
	c8.3,0,15,6.7,15,15s-6.7,15-15,15H120c-5.9,0-11.2-3.4-13.6-8.7c-2.4-5.3-1.6-11.6,2.2-16l96-112.3H120c-8.3,0-15-6.7-15-15
	s6.7-15,15-15h117.2c5.9,0,11.2,3.4,13.6,8.7c2.4,5.3,1.6,11.6-2.2,16l-96,112.3H237.2z M400.7,397.8c-2.8,2.4-6.3,3.6-9.7,3.6
	c-4.2,0-8.5-1.8-11.4-5.3l-44.5-52.3l-41.3,51.9c-2.9,3.7-7.3,5.7-11.7,5.7c-1.7,0-3.3-0.3-4.9-0.8c-6-2.1-10.1-7.8-10.1-14.2v-137
	c0-8.3,6.7-15,15-15s15,6.7,15,15v94l25.8-32.4c0,0,0,0,0.1-0.1l56.3-70.9c5.2-6.5,14.6-7.6,21.1-2.4c6.5,5.2,7.6,14.6,2.4,21.1
	l-48.6,61.1l48.3,56.8C407.7,382.9,407,392.4,400.7,397.8z M486.8,441.7h-64v-32h32v-32h32V441.7z M486.8,258.6h-32v-32h-32v-32h64
	V258.6z M35.8,102.9h439.5V150H35.8V102.9z M73.2,39.6h364.7v47.1H73.2V39.6z'
    />
  </svg>
);

const SilverSVG = ({ color }: { color?: string }) => (
  <svg
    version='1.1'
    id='Layer_1'
    xmlns='http://www.w3.org/2000/svg'
    x='0px'
    y='0px'
    viewBox='0 0 512 512'
  >
    <g id='icomoon-ignore'></g>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M-1,102.9v305.1h512V102.9H-1z M95.3,378.4h-64v-64h32v32h32V378.4z M95.3,163.3h-32v32h-32v-64h64V163.3z M236.7,308
	c8.3,0,15,6.7,15,15s-6.7,15-15,15H119.5c-5.9,0-11.2-3.4-13.6-8.7c-2.4-5.3-1.6-11.6,2.2-16l96-112.3h-84.6c-8.3,0-15-6.7-15-15
	s6.7-15,15-15h117.2c5.9,0,11.2,3.4,13.6,8.7c2.4,5.3,1.6,11.6-2.2,16l-96,112.3H236.7z M400.2,334.4c-2.8,2.4-6.3,3.6-9.7,3.6
	c-4.2,0-8.5-1.8-11.4-5.3l-44.5-52.3l-41.3,51.9c-2.9,3.7-7.3,5.7-11.7,5.7c-1.7,0-3.3-0.3-4.9-0.8c-6-2.1-10.1-7.8-10.1-14.2V186
	c0-8.3,6.7-15,15-15s15,6.7,15,15v94l25.8-32.4c0,0,0,0,0.1-0.1l56.3-70.9c5.2-6.5,14.6-7.6,21.1-2.4c6.5,5.2,7.6,14.6,2.4,21.1
	l-48.6,61.1l48.3,56.8C407.2,319.6,406.5,329.1,400.2,334.4z M486.3,378.4h-64v-32h32v-32h32V378.4z M486.3,195.3h-32v-32h-32v-32
	h64V195.3z'
    />
  </svg>
);

export const SilverIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <SilverSVG color={color} />
  </SVGWrapper>
);

export const SilverGrowthIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <SilverGrowthSVG color={color} />
  </SVGWrapper>
);

const EnergyGrowthSVG = ({ color }: { color?: string }) => (
  <DefaultSVG>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M251.6,164.4L416,0l-75,210H234.8L251.6,164.4z M407.4,224L284.2,343.4L224,512l288-288H407.4z'
    />
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M288,0L0,288h176L96,512l288-288H208L288,0z'
    />
  </DefaultSVG>
);

export const EnergyGrowthIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <EnergyGrowthSVG color={color} />
  </SVGWrapper>
);

const EnergySVG = ({ color }: { color?: string }) => (
  <DefaultSVG>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M352 0l-288 288h176l-80 224 288-288h-176z'
    ></path>
  </DefaultSVG>
);

export const EnergyIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <EnergySVG color={color} />
  </SVGWrapper>
);

const RangeSVG = ({ color }: { color?: string }) => (
  <DefaultSVG>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M118.627 438.627l265.373-265.372v114.745c0 17.673 14.327 32 32 32s32-14.327 32-32v-192c0-12.942-7.797-24.611-19.754-29.563-3.962-1.642-8.121-2.42-12.246-2.419v-0.018h-192c-17.673 0-32 14.327-32 32 0 17.674 14.327 32 32 32h114.745l-265.372 265.373c-6.249 6.248-9.373 14.438-9.373 22.627s3.124 16.379 9.373 22.627c12.496 12.497 32.758 12.497 45.254 0z'
    ></path>
  </DefaultSVG>
);

export const RangeIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <RangeSVG color={color} />
  </SVGWrapper>
);

const TargetSVG = () => (
  <DefaultSVG>
    <path d='M512 224h-50.462c-13.82-89.12-84.418-159.718-173.538-173.538v-50.462h-64v50.462c-89.12 13.82-159.718 84.418-173.538 173.538h-50.462v64h50.462c13.82 89.12 84.418 159.718 173.538 173.538v50.462h64v-50.462c89.12-13.82 159.718-84.418 173.538-173.538h50.462v-64zM396.411 224h-49.881c-9.642-27.275-31.255-48.889-58.53-58.53v-49.881c53.757 12.245 96.166 54.655 108.411 108.411zM256 288c-17.673 0-32-14.327-32-32s14.327-32 32-32c17.673 0 32 14.327 32 32s-14.327 32-32 32zM224 115.589v49.881c-27.275 9.641-48.889 31.255-58.53 58.53h-49.881c12.245-53.756 54.655-96.166 108.411-108.411zM115.589 288h49.881c9.641 27.275 31.255 48.889 58.53 58.53v49.881c-53.756-12.245-96.166-54.654-108.411-108.411zM288 396.411v-49.881c27.275-9.642 48.889-31.255 58.53-58.53h49.881c-12.245 53.757-54.654 96.166-108.411 108.411z'></path>
  </DefaultSVG>
);

export const TargetIcon = () => (
  <SVGWrapper>
    <TargetSVG />
  </SVGWrapper>
);

const PlaySVG = () => (
  <DefaultSVG>
    <path d='M96 64l320 192-320 192z'></path>
  </DefaultSVG>
);

export const PlayIcon = () => (
  <SVGWrapper>
    <PlaySVG />
  </SVGWrapper>
);

const PauseSVG = () => (
  <DefaultSVG>
    <path d='M64 64h160v384h-160zM288 64h160v384h-160z'></path>
  </DefaultSVG>
);

export const PauseIcon = () => (
  <SVGWrapper>
    <PauseSVG />
  </SVGWrapper>
);

const UpgradeSVG = () => (
  <DefaultSVG>
    <path d='M256 16l-240 240h144v256h192v-256h144z'></path>
  </DefaultSVG>
);

export const UpgradeIcon = () => (
  <SVGWrapper>
    <UpgradeSVG />
  </SVGWrapper>
);

const HelpSVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M192 416h96v96h-96zM400 32c26.51 0 48 21.49 48 48v144l-160 96v64h-96v-96l160-96v-64h-256v-96h304z'
    ></path>
  </DefaultSVG>
);

export const HelpIcon = () => (
  <SVGWrapper>
    <HelpSVG />
  </SVGWrapper>
);

const PlanetSVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M504.915 112.289c-9.989-17.302-30.188-26.075-60.038-26.075-21.509 0-48.026 4.685-77.585 13.34-31.393-22.378-69.8-35.554-111.292-35.554-106.039 0-192 85.961-192 192 0 6.077 0.298 12.084 0.851 18.017-5.425 5.179-10.576 10.335-15.42 15.45-19.103 20.172-32.751 38.94-40.567 55.784-6.807 14.671-12.677 36.049-1.98 54.576 9.989 17.302 30.189 26.075 60.039 26.075 21.571 0 48.18-4.713 77.841-13.416 31.384 22.353 69.769 35.514 111.236 35.514 106.039 0 192-85.961 192-192 0-6.1-0.304-12.126-0.863-18.080 5.356-5.119 10.442-10.215 15.231-15.272 19.103-20.172 32.752-38.941 40.567-55.785 6.807-14.67 12.678-36.047 1.98-54.574zM435.503 197.208c-35.258 37.232-88.122 77.047-148.854 112.111-83.735 48.346-169.983 79.584-219.727 79.584-17.417 0-25.882-3.913-27.996-7.575-3.799-6.579 2.576-28.943 35.093-63.98 3.943 11.697 8.979 22.893 14.992 33.461 40.608-6.736 105.629-29.936 179.638-72.666 57.807-33.375 107.78-70.909 140.714-105.688 4.749-5.015 8.769-9.613 12.164-13.773-6.206-10.533-13.393-20.42-21.427-29.541 16.88-3.863 32.032-5.926 44.776-5.926 17.416 0 25.881 3.913 27.995 7.575 3.888 6.731-2.857 29.974-37.368 66.418z'
    ></path>
  </DefaultSVG>
);

export const PlanetIcon = () => (
  <SVGWrapper>
    <PlanetSVG />
  </SVGWrapper>
);

const LeaderboardSVG = () => (
  <DefaultSVG>
    <path d='M416 96v-64h-320v64h-96v64c0 53.019 42.979 96 96 96 10.038 0 19.715-1.543 28.81-4.401 23.087 33.004 58.304 56.898 99.19 65.198v99.203h-32c-35.347 0-64 28.653-64 64h256c0-35.347-28.653-64-64-64h-32v-99.203c40.886-8.3 76.103-32.193 99.19-65.198 9.095 2.858 18.772 4.401 28.81 4.401 53.021 0 96-42.981 96-96v-64h-96zM96 218c-31.981 0-58-26.019-58-58v-32h58v32c0 20.093 3.715 39.316 10.477 57.034-3.401 0.623-6.899 0.966-10.477 0.966zM474 160c0 31.981-26.019 58-58 58-3.578 0-7.076-0.343-10.477-0.966 6.762-17.718 10.477-36.941 10.477-57.034v-32h58v32z'></path>
  </DefaultSVG>
);

export const LeaderboardIcon = () => (
  <SVGWrapper>
    <LeaderboardSVG />
  </SVGWrapper>
);

const PlanetdexSVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M448 64v416h-336c-26.513 0-48-21.49-48-48s21.487-48 48-48h304v-384h-320c-35.199 0-64 28.8-64 64v384c0 35.2 28.801 64 64 64h384v-448h-32zM160 16h160v224l-80-80-80 80v-224z'
    ></path>
    <path
      fill='#000'
      d='M112.028 416v0c-0.009 0.001-0.019 0-0.028 0-8.836 0-16 7.163-16 16s7.164 16 16 16c0.009 0 0.019-0.001 0.028-0.001v0.001h303.945v-32h-303.945z'
    ></path>
  </DefaultSVG>
);

export const PlanetdexIcon = () => (
  <SVGWrapper>
    <PlanetdexSVG />
  </SVGWrapper>
);

const RightarrowSVG = () => (
  <DefaultSVG>
    <path d='M310.627 438.627l160-160c12.497-12.496 12.497-32.758 0-45.255l-160-160c-12.497-12.496-32.758-12.496-45.255 0s-12.497 32.758 0 45.255l105.373 105.373h-306.745c-17.673 0-32 14.327-32 32s14.327 32 32 32h306.745l-105.373 105.373c-6.248 6.248-9.372 14.438-9.372 22.627s3.124 16.379 9.372 22.627c12.497 12.497 32.758 12.497 45.255 0z'></path>
  </DefaultSVG>
);

export const RightarrowIcon = () => (
  <SVGWrapper>
    <RightarrowSVG />
  </SVGWrapper>
);

const TwitterSVG = () => (
  <DefaultSVG>
    <path d='M512 113.2c-18.8 8.4-39.1 14-60.3 16.5 21.7-13 38.3-33.6 46.2-58.1-20.3 12-42.8 20.8-66.7 25.5-19.2-20.4-46.5-33.1-76.7-33.1-58 0-105 47-105 105 0 8.2 0.9 16.2 2.7 23.9-87.3-4.4-164.7-46.2-216.5-109.8-9 15.5-14.2 33.6-14.2 52.8 0 36.4 18.5 68.6 46.7 87.4-17.2-0.5-33.4-5.3-47.6-13.1 0 0.4 0 0.9 0 1.3 0 50.9 36.2 93.4 84.3 103-8.8 2.4-18.1 3.7-27.7 3.7-6.8 0-13.3-0.7-19.8-1.9 13.4 41.7 52.2 72.1 98.1 73-36 28.2-81.2 45-130.5 45-8.5 0-16.8-0.5-25.1-1.5 46.6 29.9 101.8 47.2 161.1 47.2 193.2 0 298.9-160.1 298.9-298.9 0-4.6-0.1-9.1-0.3-13.6 20.5-14.7 38.3-33.2 52.4-54.3z'></path>
  </DefaultSVG>
);

export const TwitterIcon = () => (
  <SVGWrapper>
    <TwitterSVG />
  </SVGWrapper>
);

const BroadcastSVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M504.978 457.88v0l-218.537-435.556c-8.371-14.883-19.406-22.324-30.441-22.324s-22.070 7.441-30.442 22.324l-218.537 435.556c-16.743 29.766-2.5 54.12 31.652 54.12h434.654c34.151 0 48.396-24.354 31.651-54.12zM256 448c-17.673 0-32-14.327-32-32s14.327-32 32-32c17.674 0 32 14.326 32 32s-14.326 32-32 32zM288 320c0 17.673-14.327 32-32 32s-32-14.327-32-32v-96c0-17.673 14.327-32 32-32s32 14.327 32 32v96z'
    ></path>
  </DefaultSVG>
);

export const BroadcastIcon = () => (
  <SVGWrapper>
    <BroadcastSVG />
  </SVGWrapper>
);

const PiratesSVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M409.706 102.294c-45.33-45.33-105.6-70.294-169.706-70.294s-124.375 24.964-169.706 70.294-70.294 105.6-70.294 169.706c0 8.836 7.164 16 16 16 61.757 0 112 50.243 112 112v64c0 8.837 7.164 16 16 16s16-7.163 16-16v-64c0-8.837 7.164-16 16-16s16 7.163 16 16v96c0 8.837 7.164 16 16 16s16-7.163 16-16v-96c0-8.837 7.163-16 16-16s16 7.163 16 16v96c0 8.837 7.164 16 16 16s16-7.163 16-16v-96c0-8.837 7.163-16 16-16s16 7.163 16 16v64c0 8.837 7.164 16 16 16s16-7.163 16-16v-64c0-61.757 50.243-112 112-112 8.837 0 16-7.164 16-16 0-64.106-24.964-124.375-70.294-169.706zM192 224c0 17.6-14.4 32-32 32h-32c-17.6 0-32-14.4-32-32v-32c0-17.6 14.4-32 32-32h32c17.6 0 32 14.4 32 32v32zM384 224c0 17.6-14.4 32-32 32h-32c-17.6 0-32-14.4-32-32v-32c0-17.6 14.4-32 32-32h32c17.6 0 32 14.4 32 32v32z'
    ></path>
  </DefaultSVG>
);

export const PiratesIcon = () => (
  <SVGWrapper>
    <PiratesSVG />
  </SVGWrapper>
);

const Rank1SVG = () => (
  <DefaultSVG>
    <path fill='#000' d='M32 416v64l224-112 224 112v-64l-224-112z'></path>
  </DefaultSVG>
);

export const Rank1Icon = () => (
  <SVGWrapper>
    <Rank1SVG />
  </SVGWrapper>
);

const Rank2SVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M32 416v64l224-112 224 112v-64l-224-112zM32 288v64l224-112 224 112v-64l-224-112z'
    ></path>
  </DefaultSVG>
);

export const Rank2Icon = () => (
  <SVGWrapper>
    <Rank2SVG />
  </SVGWrapper>
);

const Rank3SVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M32 416v64l224-112 224 112v-64l-224-112zM32 288v64l224-112 224 112v-64l-224-112zM256 48l-224 112v64l224-112 224 112v-64z'
    ></path>
  </DefaultSVG>
);

export const Rank3Icon = () => (
  <SVGWrapper>
    <Rank3SVG />
  </SVGWrapper>
);

const Rank4SVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M128 384h256v64h-256zM480 96c-17.673 0-32 14.327-32 32 0 6.567 1.981 12.67 5.375 17.75l-117.375 78.25-12.031-96.254c15.799-1.955 28.031-15.417 28.031-31.746 0-17.673-14.327-32-32-32s-32 14.327-32 32c0 12.528 7.203 23.367 17.689 28.621l-49.689 99.379-49.689-99.379c10.486-5.254 17.689-16.093 17.689-28.621 0-17.673-14.327-32-32-32s-32 14.327-32 32c0 16.329 12.232 29.791 28.032 31.746l-12.032 96.254-117.374-78.25c3.393-5.079 5.374-11.183 5.374-17.75 0-17.673-14.327-32-32-32s-32 14.327-32 32 14.327 32 32 32c4.478 0 8.738-0.923 12.607-2.583l83.393 194.583h256l83.393-194.583c3.869 1.66 8.13 2.583 12.607 2.583 17.673 0 32-14.327 32-32s-14.327-32-32-32z'
    ></path>
  </DefaultSVG>
);

export const Rank4Icon = () => (
  <SVGWrapper>
    <Rank4SVG />
  </SVGWrapper>
);

const FullRankSVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M487.024 132.75c-16.872-16.872-40.057-24.976-65.75-24.976-34.444 0-73.404 14.558-107.766 42.062-8.132-24.908-23.24-43.758-41.509-50.811v-35.025h48v-32h-48v-32h-32v32h-48v32h48v35.024c-18.268 7.053-33.376 25.902-41.508 50.809-34.361-27.503-73.321-42.062-107.765-42.060-25.693 0.002-48.879 8.104-65.75 24.976-43.739 43.739-28.542 129.85 33.941 192.333 11.679 11.679 24.186 21.694 37.083 29.993v46.882c43.829 8.785 99.454 14.043 160 14.043s116.171-5.258 160-14.043v-46.88c12.897-8.298 25.404-18.314 37.083-29.993 62.483-62.484 77.68-148.596 33.941-192.334zM81.546 189.322c0.539-0.36 3.423-1.548 9.181-1.549h0.008c15.925 0 43.814 9.293 70.005 35.484 17.287 17.287 29.66 38.181 33.948 57.326 3.059 13.66 0.767 20.748-0.007 21.868-0.536 0.359-3.416 1.549-9.18 1.549-15.928 0-43.822-9.294-70.015-35.486-17.288-17.289-29.662-38.185-33.948-57.33-3.058-13.656-0.766-20.741 0.008-21.862zM430.461 211.19c-4.287 19.145-16.66 40.039-33.946 57.324-26.193 26.193-54.086 35.486-70.015 35.486-5.762 0-8.644-1.188-9.18-1.548-0.773-1.119-3.066-8.204-0.009-21.862 4.286-19.146 16.66-40.041 33.948-57.33 26.192-26.192 54.087-35.486 70.015-35.486 5.764 0 8.645 1.188 9.18 1.548 0.774 1.12 3.067 8.208 0.007 21.868zM96 450.832v47.125c43.829 8.785 99.454 14.043 160 14.043s116.171-5.258 160-14.043v-47.125c-46.914 8.625-101.98 13.168-160 13.168s-113.086-4.543-160-13.168z'
    ></path>
  </DefaultSVG>
);

export const FullRankIcon = () => (
  <SVGWrapper>
    <FullRankSVG />
  </SVGWrapper>
);

const MaxLevelSVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M512 198.525l-176.89-25.704-79.11-160.291-79.108 160.291-176.892 25.704 128 124.769-30.216 176.176 158.216-83.179 158.216 83.179-30.217-176.176 128.001-124.769z'
    ></path>
  </DefaultSVG>
);

export const MaxLevelIcon = () => (
  <SVGWrapper>
    <MaxLevelSVG />
  </SVGWrapper>
);

const SilverProdSVG = () => (
  <DefaultSVG>
    <path
      fill='#000'
      d='M505.365 112.030c-9.915-17.175-30.021-25.883-59.756-25.883-21.674 0-48.428 4.748-78.262 13.523-31.425-22.447-69.87-35.67-111.347-35.67-105.869 0-192 86.131-192 192 0 6.159 0.304 12.248 0.874 18.26-5.502 5.245-10.723 10.467-15.628 15.646-19.125 20.196-32.785 38.978-40.601 55.822-6.774 14.6-12.621 35.861-2.009 54.242 9.916 17.175 30.021 25.883 59.757 25.883 21.671 0 48.427-4.754 78.254-13.528 31.427 22.45 69.874 35.675 111.353 35.675 105.869 0 192-86.131 192-192 0-6.158-0.304-12.245-0.873-18.256 5.5-5.246 10.722-10.468 15.628-15.649 19.125-20.196 32.785-38.977 40.601-55.823 6.774-14.6 12.621-35.861 2.009-54.242zM256 96c76.234 0 140.177 53.595 156.151 125.083-33.514 30.175-76.791 61.004-125.016 88.846-48.080 27.76-96.982 49.888-139.406 63.763-31.781-29.261-51.729-71.188-51.729-117.692 0-88.224 71.776-160 160-160zM37.813 381.971c-3.377-5.849-0.064-27.015 35.934-65.557 8.335 25.080 21.712 47.876 38.923 67.188-17.473 4.069-33.148 6.252-46.277 6.252-17.716 0-26.38-4.073-28.58-7.883zM256 416c-25.783 0-50.156-6.139-71.748-17.018 38.247-14.396 79.657-34.074 120.884-57.876 41.045-23.697 78.808-49.61 110.579-75.674-4.9 83.85-74.657 150.568-159.715 150.568zM438.253 195.586c-8.335-25.081-21.712-47.877-38.925-67.189 17.478-4.073 33.148-6.25 46.28-6.25 17.716 0 26.379 4.072 28.579 7.883 3.378 5.849 0.065 27.015-35.934 65.556z'
    ></path>
  </DefaultSVG>
);

export const SilverProdIcon = () => (
  <SVGWrapper>
    <SilverProdSVG />
  </SVGWrapper>
);

const ShareSVG = () => (
  <DefaultSVG>
    <path d='m395.99992,344.66662c-16.62499,0 -31.96665,5.83333 -43.98331,15.57499l-120.8666,-87.44162a93.72995,93.72995 0 0 0 0,-33.59998l120.8666,-87.44162c12.01666,9.74166 27.35832,15.57499 43.98331,15.57499c38.61665,0 69.99996,-31.38332 69.99996,-69.99996s-31.38332,-69.99996 -69.99996,-69.99996s-69.99996,31.38332 -69.99996,69.99996c0,6.76666 0.93333,13.24166 2.74167,19.42499l-114.79994,83.12496c-17.03332,-22.57499 -44.09998,-37.21665 -74.60829,-37.21665c-51.56664,0 -93.33328,41.76664 -93.33328,93.33328s41.76664,93.33328 93.33328,93.33328c30.50832,0 57.57497,-14.64166 74.60829,-37.21665l114.79994,83.12496c-1.80833,6.18333 -2.74167,12.71666 -2.74167,19.42499c0,38.61665 31.38332,69.99996 69.99996,69.99996s69.99996,-31.38332 69.99996,-69.99996s-31.38332,-69.99996 -69.99996,-69.99996zm0,-277.66652c16.74166,0 30.33332,13.59166 30.33332,30.33332s-13.59166,30.33332 -30.33332,30.33332s-30.33332,-13.59166 -30.33332,-30.33332s13.59166,-30.33332 30.33332,-30.33332zm-256.66653,240.33321c-28.29165,0 -51.33331,-23.04165 -51.33331,-51.33331s23.04165,-51.33331 51.33331,-51.33331s51.33331,23.04165 51.33331,51.33331s-23.04165,51.33331 -51.33331,51.33331zm256.66653,137.66659c-16.74166,0 -30.33332,-13.59166 -30.33332,-30.33332s13.59166,-30.33332 30.33332,-30.33332s30.33332,13.59166 30.33332,30.33332s-13.59166,30.33332 -30.33332,30.33332z' />
  </DefaultSVG>
);

export const ShareIcon = () => (
  <SVGWrapper>
    <ShareSVG />
  </SVGWrapper>
);

const LockSVG = () => {
  return (
    <DefaultSVG>
      <path
        fill='#000'
        d='M448 192h-32v-160c0-17.6-14.4-32-32-32h-256c-17.6 0-32 14.4-32 32v160h-32c-17.602 0-32 14.4-32 32v256c0 17.6 14.398 32 32 32h384c17.6 0 32-14.4 32-32v-256c0-17.6-14.4-32-32-32zM288 416h-64l13.92-69.6c-8.404-5.766-13.92-15.437-13.92-26.4 0-17.673 14.327-32 32-32s32 14.327 32 32c0 10.963-5.516 20.634-13.92 26.4l13.92 69.6zM352 192h-192v-128h192v128z'
      ></path>
    </DefaultSVG>
  );
};

export const LockIcon = () => {
  return (
    <SVGWrapper>
      <LockSVG />
    </SVGWrapper>
  );
};

const SpeedSVG = ({ color }: { color?: string }) => {
  return (
    <DefaultSVG>
      <path
        style={{ fill: color || dfstyles.colors.text }}
        d='M256 432v-160l-160 160v-352l160 160v-160l176 176z'
      ></path>
    </DefaultSVG>
  );
};

export const SpeedIcon = ({ color }: { color?: string }) => {
  return (
    <SVGWrapper>
      <SpeedSVG color={color} />
    </SVGWrapper>
  );
};

const DefenseSVG = ({ color }: { color?: string }) => {
  return (
    <DefaultSVG>
      <path
        style={{ fill: color || dfstyles.colors.text }}
        d='M256.002 52.45l143.999 78.545-0.001 109.005c0 30.499-3.754 57.092-11.477 81.299-7.434 23.303-18.396 43.816-33.511 62.711-22.371 27.964-53.256 51.74-99.011 76.004-45.753-24.263-76.644-48.042-99.013-76.004-15.116-18.896-26.078-39.408-33.512-62.711-7.722-24.207-11.476-50.8-11.476-81.299v-109.004l144.002-78.546zM256.003 0c-2.637 0-5.274 0.651-7.663 1.954l-176.002 96c-5.14 2.803-8.338 8.191-8.338 14.046v128c0 70.394 18.156 127.308 55.506 173.995 29.182 36.478 69.072 66.183 129.34 96.315 2.252 1.126 4.704 1.689 7.155 1.689s4.903-0.563 7.155-1.689c60.267-30.134 100.155-59.839 129.337-96.315 37.351-46.687 55.507-103.601 55.507-173.995l0.001-128c0-5.855-3.198-11.243-8.338-14.046l-175.999-96c-2.387-1.303-5.024-1.954-7.661-1.954v0z'
      ></path>
      <path
        style={{ fill: color || dfstyles.colors.text }}
        d='M160 159.491v80.509c0 25.472 3.011 47.293 9.206 66.711 5.618 17.608 13.882 33.085 25.265 47.313 14.589 18.237 34.038 34.408 61.531 50.927 27.492-16.518 46.939-32.688 61.53-50.927 11.382-14.228 19.646-29.704 25.263-47.313 6.194-19.418 9.205-41.239 9.205-66.711l0.001-80.51-95.999-52.363-96.002 52.364z'
      ></path>
    </DefaultSVG>
  );
};

export const DefenseIcon = ({ color }: { color?: string }) => {
  return (
    <SVGWrapper>
      <DefenseSVG color={color} />
    </SVGWrapper>
  );
};

const HatSVG = () => {
  return (
    <DefaultSVG>
      <path d='M416 248.575v-104.575c0-26.51-71.635-48-160-48s-160 21.49-160 48v104.575c-58.519 20.526-96 52.058-96 87.425 0 61.855 114.615 112 256 112s256-50.145 256-112c0-35.367-37.48-66.899-96-87.425zM416 336c0 26.51-71.635 48-160 48s-160-21.49-160-48v-64c0 26.51 71.635 48 160 48s160-21.49 160-48v64z'></path>
    </DefaultSVG>
  );
};

export const HatIcon = () => {
  return (
    <SVGWrapper>
      <HatSVG />
    </SVGWrapper>
  );
};

const EthSVG = () => {
  return (
    <svg
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      width='1024'
      height='1024'
      viewBox='0 0 1024 1024'
    >
      <path d='M509.611 766.72l-314.197-185.6 314.155 442.88 314.453-442.88-314.539 185.6zM514.389 0l-314.283 521.515 314.24 185.771 314.24-185.6z'></path>
    </svg>
  );
};

export const EthIcon = () => {
  return (
    <SVGWrapper>
      <EthSVG />
    </SVGWrapper>
  );
};

const SettingsSVG = () => {
  return (
    <DefaultSVG>
      <path d='M466.895 305.125c-26.863-46.527-10.708-106.152 36.076-133.244l-50.313-87.146c-14.375 8.427-31.088 13.259-48.923 13.259-53.768 0-97.354-43.873-97.354-97.995h-100.629c0.133 16.705-4.037 33.641-12.979 49.126-26.862 46.528-86.578 62.351-133.431 35.379l-50.312 87.146c14.485 8.236 27.025 20.294 35.943 35.739 26.819 46.454 10.756 105.96-35.854 133.112l50.313 87.146c14.325-8.348 30.958-13.127 48.7-13.127 53.598 0 97.072 43.596 97.35 97.479h100.627c-0.043-16.537 4.136-33.285 12.983-48.609 26.818-46.453 86.388-62.297 133.207-35.506l50.313-87.145c-14.39-8.233-26.846-20.249-35.717-35.614zM256 359.666c-57.254 0-103.668-46.412-103.668-103.667 0-57.254 46.413-103.667 103.668-103.667s103.666 46.413 103.666 103.667c-0.001 57.255-46.412 103.667-103.666 103.667z'></path>
    </DefaultSVG>
  );
};

export const SettingsIcon = () => {
  return (
    <SVGWrapper>
      <SettingsSVG />
    </SVGWrapper>
  );
};

const ArtifactSVG = () => (
  <DefaultSVG>
    <path d='M385.758 160c9.063-6.44 17.756-13.608 25.722-21.574 16.701-16.701 27.873-37.25 31.456-57.861 3.929-22.593-1.836-43.57-15.815-57.55-11.15-11.149-26.255-17.043-43.682-17.043-24.816 0-50.961 11.912-71.73 32.681-33.238 33.238-52.613 79.119-63.038 111.861-7.72-32.901-23.103-77.322-53.009-107.229-16.047-16.046-36.557-24.285-55.923-24.285-15.827 0-30.89 5.502-42.13 16.743-24.993 24.994-21.616 68.893 7.543 98.052 10.396 10.396 22.549 19.031 35.36 26.206h-108.512v128h32v224h384v-224.001h32v-128h-94.242zM337.163 64.109c13.862-13.862 31.161-22.137 46.275-22.137 5.35 0 12.854 1.127 18.225 6.499 13.015 13.014 5.706 43.154-15.64 64.499-21.973 21.973-51.53 37.084-77.216 47.030h-25.336c9.284-28.774 26.029-68.228 53.692-95.891zM130.607 108.338c-7.914-7.914-12.885-18.080-13.64-27.893-0.351-4.56-0.025-13.124 6.098-19.247 5.122-5.122 11.894-6.198 16.674-6.198v0c10.629 0 21.734 5.008 30.466 13.74 16.936 16.936 30.883 43.886 40.334 77.938 0.255 0.92 0.504 1.835 0.748 2.743-0.908-0.243-1.823-0.492-2.743-0.748-34.052-9.451-61.002-23.399-77.937-40.335zM448 272h-160v208h-64v-208h-160v-16h160v-64h64v64h160v16z'></path>
  </DefaultSVG>
);

export const ArtifactIcon = () => (
  <SVGWrapper>
    <ArtifactSVG />
  </SVGWrapper>
);

const PluginSVG = () => (
  <DefaultSVG>
    <path d='M512 141.25l-45.253-45.25-89.373 89.376-50.75-50.751 89.375-89.375-45.25-45.25-89.375 89.375-57.374-57.375-43.313 43.312 256.001 256 43.312-43.311-57.376-57.376 89.376-89.375z'></path>
    <path d='M397.020 336.895l-221.912-221.912c-47.909 57.452-102.26 146.227-64.698 222.608l-66.124 66.124c-15.556 15.557-15.556 41.012 0 56.568l7.429 7.429c15.557 15.557 41.013 15.557 56.569 0l66.123-66.122c76.382 37.566 165.159-16.783 222.613-64.695z'></path>
  </DefaultSVG>
);

export const PluginIcon = () => (
  <SVGWrapper>
    <PluginSVG />
  </SVGWrapper>
);

// IcoMoon Free ImBoxAdd
const DepositSVG = ({ color }: { color?: string }) => (
  <DefaultSVG>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M416 32h-320l-96 96v336c0 8.837 7.163 16 16 16h480c8.836 0 16-7.163 16-16v-336l-96-96zM256 416l-160-128h96v-96h128v96h96l-160 128zM77.255 96l32-32h293.489l32 32h-357.489z'
    ></path>
  </DefaultSVG>
);

export const DepositIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <DepositSVG color={color} />
  </SVGWrapper>
);

// IcoMoon Free ImQuestionCircle
const QuestionCircle = ({ color }: { color?: string }) => (
  <DefaultSVG width={512} height={512}>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M256 48C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48zm-4.3 304c-11.8 0-21.4-9-21.4-20.6 0-11.5 9.6-20.6 21.4-20.6 11.9 0 21.5 9 21.5 20.6 0 11.6-9.5 20.6-21.5 20.6zm40.2-96.9c-17.4 10.1-23.3 17.5-23.3 30.3v7.9h-34.7l-.3-8.6c-1.7-20.6 5.5-33.4 23.6-44 16.9-10.1 24-16.5 24-28.9s-12-21.5-26.9-21.5c-15.1 0-26 9.8-26.8 24.6H192c.7-32.2 24.5-55 64.7-55 37.5 0 63.3 20.8 63.3 50.7 0 19.9-9.6 33.6-28.1 44.5z'
    ></path>
  </DefaultSVG>
);

export const QuestionCircleIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <QuestionCircle color={color} />
  </SVGWrapper>
);

// IcoMoon Free CloseCircle
const CloseCircle = ({ color }: { color?: string }) => (
  <DefaultSVG width={512} height={512}>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M256 48C140.559 48 48 140.559 48 256c0 115.436 92.559 208 208 208 115.435 0 208-92.564 208-208 0-115.441-92.564-208-208-208zm104.002 282.881l-29.12 29.117L256 285.117l-74.881 74.881-29.121-29.117L226.881 256l-74.883-74.881 29.121-29.116L256 226.881l74.881-74.878 29.12 29.116L285.119 256l74.883 74.881z'
    ></path>
  </DefaultSVG>
);

export const CloseCircleIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <CloseCircle color={color} />
  </SVGWrapper>
);

// IcoMoon Free CloseCircle
const MaximizeCircle = ({ color }: { color?: string }) => (
  <DefaultSVG width={512} height={512}>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M256 48C141.125 48 48 141.125 48 256s93.125 208 208 208 208-93.125 208-208S370.875 48 256 48zm107 229h-86v86h-42v-86h-86v-42h86v-86h42v86h86v42z'
    ></path>
  </DefaultSVG>
);

export const MaximizeCircleIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <MaximizeCircle color={color} />
  </SVGWrapper>
);

// IcoMoon Free CloseCircle
const MinimizeCircle = ({ color }: { color?: string }) => (
  <DefaultSVG width={512} height={512}>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M256 48C141.125 48 48 141.125 48 256s93.125 208 208 208 208-93.125 208-208S370.875 48 256 48zm107 229H149v-42h214v42z'
    ></path>
  </DefaultSVG>
);

export const MinimizeCircleIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <MinimizeCircle color={color} />
  </SVGWrapper>
);

// IcoMoon Free ImBoxRemove
const WithdrawSVG = ({ color }: { color?: string }) => (
  <DefaultSVG width={16} height={16}>
    <path
      style={{ fill: color }}
      d='M13 1h-10l-3 3v10.5c0 0.276 0.224 0.5 0.5 0.5h15c0.276 0 0.5-0.224 0.5-0.5v-10.5l-3-3zM10 10v3h-4v-3h-3l5-4 5 4h-3zM2.414 3l1-1h9.171l1 1h-11.171z'
    ></path>
  </DefaultSVG>
);

export const WithdrawIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <WithdrawSVG color={color} />
  </SVGWrapper>
);

// https://ionicons.com/ IoIosFlash
const ActivateSVG = ({ color }: { color?: string }) => (
  <DefaultSVG>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M376.2 224H268l52.4-186.9c.9-4.5-4.6-7.1-7.2-3.4L129.5 274.6c-3.8 5.6-.2 13.4 6.3 13.4H244l-52.4 186.9c-.9 4.5 4.6 7.1 7.2 3.4l183.7-240.8c3.7-5.7.2-13.5-6.3-13.5z'
    ></path>
  </DefaultSVG>
);

export const ActivateIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <ActivateSVG color={color} />
  </SVGWrapper>
);

// https://ionicons.com/ IoIosFlashOff
const DeactivateSVG = ({ color }: { color?: string }) => (
  <DefaultSVG>
    <path
      style={{ fill: color || dfstyles.colors.text }}
      d='M382.1 442.7L154.5 55c-4-6.7-12.7-9-19.5-5.1-6.8 3.9-9.1 12.6-5.1 19.3L357.5 457c2.6 4.5 7.4 7 12.3 7 2.4 0 4.9-.6 7.2-1.9 6.7-4 9-12.6 5.1-19.4zM324.6 313.3l57.9-75.8c3.8-5.6.2-13.4-6.3-13.4h-104l52.4 89.2zM320.4 37.1c.9-4.5-4.6-7.1-7.2-3.4L227 146.9l42.4 72.3 51-182.1zM187.4 198.7l-57.9 75.8c-3.8 5.6-.2 13.4 6.3 13.4h103.9l-52.3-89.2zM191.6 474.9c-.9 4.5 4.6 7.1 7.2 3.4L285 365.1l-42.4-72.3-51 182.1z'
    ></path>
  </DefaultSVG>
);

export const DeactivateIcon = ({ color }: { color?: string }) => (
  <SVGWrapper>
    <DeactivateSVG color={color} />
  </SVGWrapper>
);

export const RankIcon = ({ planet }: { planet: Planet | undefined }) => {
  const rank = getPlanetRank(planet);
  if (isFullRank(planet)) return <FullRankIcon />;
  if (rank === 1) return <Rank1Icon />;
  else if (rank === 2) return <Rank2Icon />;
  else if (rank === 3) return <Rank3Icon />;
  return <Rank4Icon />;
};

export const BranchIcon = ({ branch }: { branch: number }) => {
  if (branch === UpgradeBranchName.Range) return <EnergyIcon />;
  else if (branch === UpgradeBranchName.Defense) return <SilverIcon />;
  else return <RangeIcon />;
};

export const StatIcon = ({ stat }: { stat: StatIdx }) => {
  if (stat === StatIdx.Defense) return <DefenseIcon />;
  else if (stat === StatIdx.EnergyGro) return <EnergyGrowthIcon />;
  else if (stat === StatIdx.EnergyCap) return <EnergyIcon />;
  else if (stat === StatIdx.Range) return <RangeIcon />;
  else if (stat === StatIdx.Speed) return <SpeedIcon />;
  else return <DefenseIcon />;
};

/** 
 Allow for tweaking the size of an icon based on the context.
 Biome & Spacetype Notifications should fill the notification box
 Others should be 3/4's the size and centered
*/
interface AlertIcon {
  height?: string;
  width?: string;
}

export const Quasar = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/planettypes/quasar.svg' />;
};

export const FoundRuins = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/planettypes/ruins.svg' />;
};

export const FoundSpacetimeRip = ({ height, width }: AlertIcon) => {
  return (
    <img height={height} width={width} src='public/icons/alerts/planettypes/tradingpost.svg' />
  );
};

export const FoundSilver = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/planettypes/asteroid.svg' />;
};

export const FoundTradingPost = ({ height, width }: AlertIcon) => {
  return (
    <img height={height} width={width} src='public/icons/alerts/planettypes/tradingpost.svg' />
  );
};

export const FoundSpace = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/spacetypes/space.svg' />;
};

export const FoundDeepSpace = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/spacetypes/deepspace.svg' />;
};

export const FoundDeadSpace = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/spacetypes/deadspace.svg' />;
};

export const FoundPirates = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/combat/pirates.svg' />;
};

export const Generic = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/generic/generic.svg' />;
};

export const ArtifactFound = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/artifacts/find.svg' />;
};
export const ArtifactProspected = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/artifacts/prospect.svg' />;
};

export const FoundOcean = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/biomes/ocean.svg' />;
};

export const FoundForest = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/biomes/forest.svg' />;
};

export const FoundGrassland = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/biomes/grassland.svg' />;
};

export const FoundTundra = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/biomes/tundra.svg' />;
};

export const FoundSwamp = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/biomes/swamp.svg' />;
};

export const FoundDesert = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/biomes/desert.svg' />;
};

export const FoundIce = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/biomes/ice.svg' />;
};

export const FoundWasteland = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/biomes/wasteland.svg' />;
};

export const FoundLava = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/biomes/lava.svg' />;
};

export const FoundCorrupted = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/biomes/corrupted.svg' />;
};
export const PlanetAttacked = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/combat/planetattacked.svg' />;
};
export const PlanetLost = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/combat/planetlost.svg' />;
};
export const PlanetConquered = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/combat/planetwon.svg' />;
};
export const MetPlayer = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/combat/metplayer.svg' />;
};
export const TxAccepted = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/transactions/accepted.svg' />;
};
export const TxConfirmed = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/transactions/confirmed.svg' />;
};
export const TxInitialized = ({ height, width }: AlertIcon) => {
  return (
    <img height={height} width={width} src='public/icons/alerts/transactions/initialized.svg' />
  );
};
export const TxDeclined = ({ height, width }: AlertIcon) => {
  return <img height={height} width={width} src='public/icons/alerts/transactions/declined.svg' />;
};
