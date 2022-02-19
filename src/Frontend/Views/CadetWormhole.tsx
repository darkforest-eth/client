import React from 'react';
import styled from 'styled-components';

const CadetWormholeContainer = styled.div`
  height: 100vh;
  width: 100vw;
  padding: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-image: url(/public/img/cadet-wormhole.png);
  background-attachment: fixed;
  background-position: top;
  background-repeat: no-repeat;

  /* This is the height of the background-image */
  @media (max-height: 1058px) {
    background-size: contain;
  }
`;

export function CadetWormhole({ imgUrl }: { imgUrl: string }) {
  return (
    <CadetWormholeContainer>
      <img src={imgUrl} />
    </CadetWormholeContainer>
  );
}
