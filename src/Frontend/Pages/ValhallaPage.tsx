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
  window.location.href = 'https://valhalla.zkga.me';

  return <Container></Container>;
}
