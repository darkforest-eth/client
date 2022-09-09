import React from 'react';
import styled from 'styled-components';
import { theme } from '../styleUtils';

export const PortalModal: React.FC<{
  width: number;
  children: React.ReactNode;
  onClick: () => void;
}> = ({ width, children, onClick }) => {
  return (
    <Container onClick={onClick}>
      <ModalContainer onClick={(e) => e.stopPropagation()} width={width}>
        {children}
      </ModalContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1000;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
  animation: bgFadeIn 0.15s ease;
  @keyframes bgFadeIn {
    0% {
      opacity: 0;
    }
    ,
    100% {
      opacity: 1;
    }
  }
`;
const ModalContainer = styled.div<{ width: number }>`
  width: ${(p) => p.width}px;
  font-family: ${theme.fonts.mono};
  box-sizing: content-box;
  min-height: 20%;
  background: ${theme.colors.bg1};
  color: ${theme.colors.fgPrimary};
  display: flex;
  flex-direction: column;
  padding: ${theme.spacing.lg};
  justify-content: space-between;
  align-items: center;
  border-radius: ${theme.borderRadius};
  position: relative;
  animation: fadeIn 0.15s ease;
  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: translateY(100%);
    }
    ,
    100% {
      opacity: 1;
      transform: translateY(0%);
    }
  }
`;
