import { TooltipName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { TooltipTrigger } from '../../Panes/Tooltip';
import dfstyles from '../../Styles/dfstyles';

const StyledSilverLabel = styled.span`
  color: ${dfstyles.colors.text};
`;
export const SilverLabel = () => <StyledSilverLabel>Silver</StyledSilverLabel>;
export const SilverLabelTip = () => (
  <TooltipTrigger name={TooltipName.Silver}>
    <SilverLabel />
  </TooltipTrigger>
);

const StyledScoreLabel = styled.span`
  color: ${dfstyles.colors.dfyellow};
  -webkit-text-stroke: 1px;
`;
export const ScoreLabel = () => <StyledScoreLabel>Score</StyledScoreLabel>;

export const ScoreLabelTip = () => (
  <TooltipTrigger name={TooltipName.Score}>
    <ScoreLabel />
  </TooltipTrigger>
);
