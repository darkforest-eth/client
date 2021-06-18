import { SpaceType } from '@darkforest_eth/types';
import { css } from 'styled-components';

export const ARTIFACT_ROW_H = 48;

export const SPACE_TYPE_COLORS: Record<SpaceType, string> = {
  [SpaceType.NEBULA]: 'rgb(0, 20.4, 81.6)',
  [SpaceType.SPACE]: 'rgb(0, 5.4, 43.35)',
  [SpaceType.DEEP_SPACE]: 'rgb(2.04, 0, 6.12)',
  [SpaceType.DEAD_SPACE]: 'rgb(37.485, 0, 36)',
};

const dfstyles = {
  colors: {
    text: '#ffffff',
    subtext: '#a0a0a0',
    subbertext: '#565656',
    subbesttext: '#383838',
    blueBackground: '#0a0a23',
    background: '#080808',
    backgrounddark: '#080808',
    backgroundlight: '#282834',
    backgroundlighter: '#4a4a5a',
    dfblue: '#00ADE1',

    dfgreen: '#00DC82',
    dfgreendark: '#025230',
    dfgreenlight: '#89facc',

    dfred: '#FF6492',
    dfyellow: '#e8e228',

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

export default dfstyles;
