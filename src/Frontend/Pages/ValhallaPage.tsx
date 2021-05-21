import React from 'react';
import styled from 'styled-components';
import { Spacer } from '../Components/CoreUI';
import { LoadingSpinner } from '../Components/LoadingSpinner';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

const HomeLink = styled.a`
  text-decoration: underline;
  cursor: pointer;
`;

const Title = styled.div``;

export function ValhallaPage() {
  return (
    <Container>
      <Title>valhalla</Title>
      <Spacer height={32} />
      NFTs awarded to the top players of each round
      <br />
      of Dark Forest v0.6.x will be enshrined here.
      <Spacer height={16} />
      <LoadingSpinner initialText='Coming June 2021...' />
      <Spacer height={16} />
      <HomeLink href='/'>home</HomeLink>
    </Container>
  );
}
