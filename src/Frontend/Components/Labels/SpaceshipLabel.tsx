import {
  SpaceshipType,
  SpaceshipTypeNames,
  SpaceshipTypeDesc
} from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { RarityColors } from '../../Styles/Colors';
import { Smaller } from '../Text';

export const SpaceshipText = ({ spaceship }: { spaceship: SpaceshipType }) => (
  <>{SpaceshipTypeNames[spaceship]}</>
);

export const SpaceshipDescription = ({ spaceship }: { spaceship: SpaceshipType }) => (
  <Smaller>{SpaceshipTypeDesc[spaceship]}</Smaller>
);

export const StyledSpaceshipLabel = styled.span<{ spaceship: SpaceshipType }>`
  color: ${({ spaceship }) => RarityColors[spaceship + 1]};
`;

export const SpaceshipLabel = ({ spaceship }: { spaceship: SpaceshipType }) => (
  <StyledSpaceshipLabel spaceship={spaceship}>
    <SpaceshipText spaceship={spaceship} />
  </StyledSpaceshipLabel>
);