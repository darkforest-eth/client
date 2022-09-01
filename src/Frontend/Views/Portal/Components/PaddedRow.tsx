import React from 'react';
import styled from 'styled-components';
import { theme } from '../styleUtils';

export const PaddedRow = ({ children }: { children: React.ReactNode }) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  background: ${theme.colors.bg1};
  border-radius: ${theme.borderRadius};
  display: flex;
  align-items: center;
  padding: ${theme.spacing.lg};
  font-family: ${theme.fonts.mono};
`;
