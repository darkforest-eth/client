import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
`;

export function ValhallaPage() {
  window.location.href = 'https://valhalla.zkga.me';

  return <Container></Container>;
}
