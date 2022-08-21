import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { SpaceType } from '@darkforest_eth/types';
import color from 'color';
import { css } from 'styled-components';

export const ARTIFACT_ROW_H = 48;

export const SPACE_TYPE_COLORS = {
  [SpaceType.NEBULA]: 'rgb(0, 20.4, 81.6)',
  [SpaceType.SPACE]: 'rgb(0, 5.4, 43.35)',
  [SpaceType.DEEP_SPACE]: 'rgb(2.04, 0, 6.12)',
  [SpaceType.DEAD_SPACE]: 'rgb(0, 37, 1)',
} as const;

const text = color('#bbb').hex();
const textLight = color(text).lighten(0.3).hex();
const subtext = color(text).darken(0.3).hex();
const subbertext = color(text).darken(0.5).hex();
const subbesttext = color(text).darken(0.8).hex();

const background = '#151515';
const backgrounddark = '#252525';
const backgroundlight = color(background).lighten(0.5).hex();
const backgroundlighter = color(backgroundlight).lighten(0.3).hex();

const border = '#777';
const borderDark = color(border).darken(0.2).hex();
const borderDarker = color(borderDark).darken(0.2).hex();
const borderDarkest = color(borderDarker).darken(0.5).hex();

const blueBackground = '#0a0a23';

const dfblue = '#00ADE1';
const dfgreen = '#00DC82';
const dfgreendark = color(dfgreen).darken(0.7).hex();
const dfgreenlight = color(dfgreen).lighten(0.1).hex();
const dfred = '#FF6492';
const dfyellow = '#e8e228';
const dfpurple = '#9189d9';
const dfwhite = '#ffffff';
const dforange = 'rgb(196, 101, 0)';

const alpurple = '#7978B3';

const dfstyles = {
  colors: {
    text,
    textLight,
    subtext,
    subbertext,
    subbesttext,
    blueBackground,
    background,
    backgrounddark,
    backgroundlight,
    backgroundlighter,
    dfblue,

    border,
    borderDark,
    borderDarker,
    borderDarkest,

    dfgreen,
    dfgreendark,
    dfgreenlight,
    dfred,
    dfyellow,
    dfpurple,
    dfwhite,
    dforange,
    alpurple,

    artifactBackground: 'rgb(21, 17, 71)',

    icons: {
      twitter: '#1DA1F2',
      github: '#8e65db',
      discord: '#7289da',
      email: '#D44638',
      blog: '#ffcb1f',
    },
  },

  borderRadius: '3px',

  fontSize: '16pt',
  fontSizeS: '12pt',
  fontSizeXS: '10pt',
  fontH1: '42pt',
  fontH1S: '36pt',
  fontH2: '24pt',

  titleFont: 'perfect_dos_vga_437regular',

  screenSizeS: '660px',

  game: {
    terminalWidth: '240pt',
    fontSize: '12pt',
    canvasbg: '#100544',
    rangecolors: {
      dash: '#9691bf',
      dashenergy: '#f5c082',
      colorenergy: '#080330',
      color100: '#050228',
      color50: '#050233',
      color25: '#050238',
    },
    bonuscolors: {
      energyCap: 'hsl(360, 73%, 70%)',
      speed: 'hsl(290, 73%, 70%)',
      def: 'hsl(231, 73%, 70%)',
      spaceJunk: 'hsl(43, 33%, 29%)',
      energyGro: 'hsl(136, 73%, 70%)',
      range: 'hsl(50, 73%, 70%)',
    },
    toolbarHeight: '12em',
    terminalFontSize: '10pt',

    styles: {
      active: 'filter: brightness(80%)',
      animProps: 'ease-in-out infinite alternate-reverse',
    },
  },

  prefabs: {
    // https://stackoverflow.com/questions/826782/how-to-disable-text-selection-highlighting
    noselect: css`
      -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
      -khtml-user-select: none; /* Konqueror HTML */
      -moz-user-select: none; /* Old versions of Firefox */
      -ms-user-select: none; /* Internet Explorer/Edge */
      user-select: none;
    `,
  },
};

export const snips = {
  bigPadding: css`
    padding: 2px 12px;
  `,
  defaultModalWidth: css`
    width: ${RECOMMENDED_MODAL_WIDTH};
    max-width: ${RECOMMENDED_MODAL_WIDTH};
  `,
  defaultBackground: `background: ${dfstyles.colors.background};`,
  roundedBorders: `border-radius:${dfstyles.borderRadius};`,
  roundedBordersWithEdge: css`
    border-radius: 3px;
    border: 1px solid ${dfstyles.colors.borderDark};
  `,
  absoluteTopLeft: css`
    position: absolute;
    top: 0;
    left: 0;
  `,
  pane: ``,
  // It is unclear where this should go in this file
  destroyedBackground: {
    backgroundImage: 'url("/public/img/destroyedbg.png")',
    backgroundSize: '150px',
    backgroundPosition: 'right bottom',
    backgroundRepeat: 'no-repeat',
  } as CSSStyleDeclaration & React.CSSProperties,
};

export default dfstyles;
