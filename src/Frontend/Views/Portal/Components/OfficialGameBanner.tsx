import { getConfigName } from '@darkforest_eth/procedural';
import { EthAddress, Leaderboard } from '@darkforest_eth/types';
import dfstyles from '@darkforest_eth/ui/dist/styles';
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  GraphConfigPlayer,
  loadEloLeaderboard,
} from '../../../../Backend/Network/GraphApi/EloLeaderboardApi';
import { loadRecentMaps } from '../../../../Backend/Network/GraphApi/MapsApi';
import { MinimalButton } from '../PortalMainView';

export const OfficialGameBanner: React.FC<{
  title?: string;
  description?: string | JSX.Element;
  disabled?: boolean;
  link: string;
  imageUrl: string;
  historyLink?: string;
  style?: React.CSSProperties;
}> = ({ title, description, disabled = false, link, imageUrl, style, historyLink }) => {
  const [hovering, setHovering] = useState<boolean>(false);
  const history = useHistory();

  const hoveringStyle: React.CSSProperties = useMemo(() => {
    if (!hovering) return {};
    return disabled
      ? {
          cursor: 'not-allowed',
        }
      : { boxShadow: '0 0 0 4px white' };
  }, [hovering]);

  return (
    <Banner
      disabled={disabled}
      onClick={() => {
        history.push(link);
      }}
      style={{
        ...hoveringStyle,
        ...style,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <PrettyOverlayGradient
        src={imageUrl}
        style={disabled ? { filter: 'brightness(0.8) blur(2px) grayscale(1)' } : {}}
      />
      {title && (
        <BannerTitleContainer>
          <Title>{title}</Title>
          <span>{description}</span>
        </BannerTitleContainer>
      )}
    </Banner>
  );
};

const Banner = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  background: #000;
  color: #fff;
  padding: 1rem;
  border: solid 1px ${dfstyles.colors.border};
  border-radius: 6px;
`;

const Title = styled.span`
  text-transform: uppercase;
  font-size: 1.25rem;
`;

const BannerTitleContainer = styled.span`
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 4px;
  letter-spacing: 0.06em;
  position: absolute;
  bottom: 0;
  left: 0;
  background: black;
  border-radius: 0px 20px 0px 0px;
  padding: 16px;
  color: ${dfstyles.colors.text}
  font-weight: 700;

`;

const PrettyOverlayGradient = styled.img`
  width: 100%;
  height: 100%;
  display: inline-block;
  object-fit: cover;
  border-radius: 20px;
  filter: brightness(1) blur(2px);
`;
