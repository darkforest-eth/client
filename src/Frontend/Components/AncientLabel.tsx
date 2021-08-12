import React from 'react';
/* ancient label */
import styled, { css, keyframes } from 'styled-components';
import { ANCIENT_BLUE, ANCIENT_PURPLE } from '../Styles/Colors';

const shakeAndFlash = keyframes`
0%   { 
  transform: skewX(-30deg); 
  color: ${ANCIENT_BLUE}; 
}
5%   { 
  transform: skewX( 30deg); 
  color: ${ANCIENT_BLUE}; 
  text-shadow: -1px -1px 0 ${ANCIENT_BLUE};
}
10%  { 
  transform: skewX(-30deg); 
  color: ${ANCIENT_PURPLE}; 
}
15%  { 
  transform: skewX( 30deg); 
  color: ${ANCIENT_PURPLE}; 
  text-shadow: -1px -1px 0 ${ANCIENT_BLUE};
}
20%  { 
  transform: skewX(  0deg); 
  color: ${ANCIENT_PURPLE}; 
}
100% { 
  transform: skewX(  0deg); 
  color: ${ANCIENT_PURPLE}; 
} 
`;

export const ancientAnim = css`
  display: inline-block;
  animation: 1.2s ${shakeAndFlash} linear infinite alternate;
`;

const StyledAncientLabelAnim = styled.span`
  ${ancientAnim}
  color: ${ANCIENT_PURPLE};
`;

export const AncientLabelAnim = () => <StyledAncientLabelAnim>Ancient</StyledAncientLabelAnim>;

const StyledAncientLabel = styled.span`
  color: ${ANCIENT_PURPLE};
`;

export const AncientLabel = () => <StyledAncientLabel>Ancient</StyledAncientLabel>;
