import dfstyles from '@darkforest_eth/ui/dist/styles';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

export const OfficialGameBanner: React.FC<{
  configHash: string;
  style?: React.CSSProperties;
}> = ({ configHash, style }) => {
  const history = useHistory();

  return (
    <Banner
      style={{ ...style, flexGrow: 2 }}
      onClick={() => {
        history.push(`/portal/map/${configHash}`);
      }}
    >
      <OfficialGameBackground />
      <BannerTitle>Play Galactic League</BannerTitle>
    </Banner>
  );
};

export const TutorialBanner: React.FC<{
  configHash: string;
  style?: React.CSSProperties;
}> = ({ configHash, style }) => {
  const history = useHistory();

  return (
    <Banner
      style={{ ...style, flexGrow: 1 }}
      onClick={() => {
        history.push(`/portal/map/${configHash}`);
      }}
    >
      <TutorialBackground />
      <BannerTitle
        style={{
          bottom: '50%',
          transform: 'translateY(50%)',
          borderRadius: '20px',
          background: '#000000cc',
          alignSelf: 'center',
          padding: 0,
        }}
      >
        Tutorial
      </BannerTitle>
    </Banner>
  );
};

const Banner = styled.button`
  position: relative;
  background: #000;
  color: #fff;
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 6px;
  min-height: 270px;
  max-height: 25vh;
  overflow: hidden;
  margin: 10px 0;
  align-self: center;
  gap: 10px;
  flex-direction: column;
  border: solid 1px ${dfstyles.colors.border};
`;

const BannerTitle = styled.span`
  font-size: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  position: absolute;
  bottom: 0;
  background: black;
  border-radius: 0px 20px 0px 0px;
  padding: 20px;
  color: ${dfstyles.colors.text}
  font-weight: 700;
`;

const OfficialGameBackground = styled.div`
  background: url('/public/img/deathstar.png');
  flex-grow: 1;
  border-radius: 20px;
  filter: brightness(0.8) blur(2px);
`;

const TutorialBackground = styled.div`
  background: url('/public/img/tutorial-banner.png');
  background-repeat: no-repeat;
  background-position: center;
  background-size: auto 100%;
  flex-grow: 1;
  border-radius: 20px;
  filter: brightness(0.9);
`;
