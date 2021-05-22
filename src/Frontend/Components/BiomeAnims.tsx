import { css, keyframes } from 'styled-components';

const shake = keyframes`
  0% { transform: skewX(-30deg); }
  5% { transform: skewX(30deg); }
  10% { transform: skewX(-30deg); }
  15% { transform: skewX(30deg); }
  20% { transform: skewX(0deg); }
  100% { transform: skewX(0deg); }  
`;

export const shakeAnim = css`
  display: inline-block;
  animation: 1.2s ${shake} linear infinite alternate;
`;

const yellow = '#fed91f';
const orange = '#ff9500';
const red = '#f95e5e';

const base = `
    1px 1px 0px ${red},
`;

const burn = keyframes`
  0% {
    text-shadow:
    ${base}
    1px -1px 2px ${yellow},
    0 0px 7px ${red},
    5px -7px 7px ${orange};
  }
  33% {
    text-shadow:
    ${base}
    1px -1px 2px ${yellow},
    5px -2px 7px ${red},
    3px 0 10px ${orange};
  }
  66% {
    text-shadow:
    ${base}
    1px -1px 2px ${yellow},
    2px -3px 7px ${red},
    0 -3px 10px ${orange};
  }
  100% {
    text-shadow:
    ${base}
    1px -1px 2px ${yellow},
    2px -5px 7px ${red},
    5px 0 10px ${orange};
  }
`;

export const burnAnim = css`
  animation: 5s ${burn} infinite alternate;
`;

export const wiggle = keyframes`
0%   { transform: rotate(-15deg); }
48%  { transform: rotate(-15deg); }
50%  { transform: rotate(15deg); }
98%  { transform: rotate(15deg); }
100% { transform: rotate(-15deg); }
`;

const s1 = `hsla(198, 78%, 77%, 0.60)`;
const s2 = `hsla(198, 78%, 77%, 0.30)`;
const s3 = `hsla(198, 78%, 77%, 0.15)`;

export const icyAnim = css`
  text-shadow: 0 -3px 0 ${s1}, 0 -6px 0 ${s2}, 0 -9px 0 ${s3};
  display: inline-block;
  animation: 4s ${wiggle} linear infinite;
`;
