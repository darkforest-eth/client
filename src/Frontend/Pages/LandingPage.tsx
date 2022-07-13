import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { address } from '@darkforest_eth/serde';
import { IconType } from '@darkforest_eth/ui';
import React, { CSSProperties, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled, { createGlobalStyle, CSSObject } from 'styled-components';
import { isRoundOngoing } from '../../Backend/Utils/Utils';
import { Btn } from '../Components/Btn';
import { EmSpacer, Link, Spacer } from '../Components/CoreUI';
import { EmailCTA, EmailCTAMode } from '../Components/Email';
import { Icon } from '../Components/Icons';
import { Modal } from '../Components/Modal';
import { Red, White, Text, HideSmall } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { ArenaPortalButton } from '../Views/Portal/PortalHomeView';

export const enum LandingPageZIndex {
  Background = 0,
  Canvas = 1,
  BasePage = 2,
}

const links = {
  twitter: 'http://twitter.com/darkforest_eth',
  email: 'mailto:zeroxhank@gmail.com',
  blog: 'https://blog.zkga.me/',
  discord: 'https://discord.gg/WzYuegCh',
  github: 'https://github.com/darkforest-eth',
  wiki: 'https://dfwiki.net/wiki/Main_Page',
  plugins: 'https://plugins.zkga.me/',
};

export default function LandingPage() {
  const history = useHistory();
  const [showWallbreakers, setShowWallbreakers] = useState<boolean>(false);

  return (
    <>
      <Container>
        <BackgroundImage />
        <Nav>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <Icon
              style={{ width: '80px', height: '80px' } as CSSStyleDeclaration & CSSProperties}
              type={IconType.Dfdao}
            />
            <div>
              <WallbreakersButton onClick={() => setShowWallbreakers(!showWallbreakers)}>
                <span
                  style={{
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  Wallbreakers {showWallbreakers ? '↑' : '↓'}
                </span>
              </WallbreakersButton>
              {showWallbreakers && (
                <WallbreakersContainer>
                  <table style={{ width: '100%' }}>
                    <tbody style={{ width: '100%' }}>
                      <TRow>
                        <td>
                          <HideSmall>Week </HideSmall>1
                        </td>
                        <td>
                          <Link to='https://twitter.com/TheVelorum'>Velorum</Link>
                        </td>
                      </TRow>
                      <TRow>
                        <td>
                          <HideSmall>Week </HideSmall>2
                        </td>
                        <td>
                          {' '}
                          <Link to='https://twitter.com/Ner0nzz'>Ner0nzz</Link>
                        </td>
                      </TRow>
                      <TRow>
                        <td>
                          <HideSmall>Week </HideSmall>3
                        </td>
                        <td>
                          {' '}
                          <Link to='https://twitter.com/Ner0nzz'>Ner0nzz</Link>
                        </td>
                      </TRow>
                      <TRow>
                        <td>
                          <HideSmall>Week </HideSmall>4
                        </td>
                        <td>
                          {' '}
                          <Link to='https://twitter.com/ClassicJordon'>ClassicJordon</Link>
                        </td>
                      </TRow>
                      <TRow>
                        <td>
                          <HideSmall>Week </HideSmall>5
                        </td>
                        <td>
                          {' '}
                          <Link to='https://twitter.com/Yuri_v9v'>Yuri_v9v</Link>
                        </td>
                      </TRow>
                    </tbody>
                  </table>
                </WallbreakersContainer>
              )}
            </div>
          </div>
          <LinksContainer>
            {Object.entries(links).map(([link, href], key) => (
              <React.Fragment key={key}>
                <NavLink key={key} to={href}>
                  {link}
                </NavLink>
                {key !== Object.entries(links).length - 1 && <p>{` | `}</p>}
              </React.Fragment>
            ))}
          </LinksContainer>
        </Nav>
        <Content>
          <TextContainer>
            <Badge><HideSmall>Dark Forest Arena</HideSmall> 🏟️</Badge>
            {/* <Title>Playing is building</Title> */}
            {/* <Desc>Play dfdao's fast-paced, free version of the premier on-chain game.</Desc> */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArenaPortalButton style={{ flex: '2' }} onClick={() => history.push('/portal/map')}>
                Enter
              </ArenaPortalButton>
              <ArenaPortalButton style = {{flex: '1'}} secondary onClick={() => window.open('https://medium.com/dfdao/%EF%B8%8F-the-galactic-league-%EF%B8%8F-aa17acc9c7d7','blank')}>
                Learn More
              </ArenaPortalButton>
            </div>
          </TextContainer>
          {/* <ImgContainer>
            <img
              src='/public/round_art/galacticleague.jpg'
              style={{
                maxWidth: '90%',
                // transformStyle: 'preserve-3d',
                // transform: 'rotateY(358deg)',
              }}
            />
          </ImgContainer> */}
        </Content>
        {/* <HideOnMobile>
          <BgGrid src='/public/img/LandingPageGrid.svg' />
        </HideOnMobile> */}
      </Container>
    </>
  );
}

const HideOnMobile = styled.div`
  @media only screen and (max-device-width: 1000px) {
    display: none;
  }
`;

const BgGrid = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 1;
`;

const NavLink = styled(Link)`
  color: #fff;
  font-family: 'Karla', sans-serif;
  text-transform: uppercase;
  text-decoration: none;
  font-weight: 500;
  letter-spacing: 0.06em;
  transition: color 0.2s ease;
  &:hover {
    color: ${dfstyles.colors.dfblue};
  }
`;

const Badge = styled.div`
  font-size: 3rem;
  // border-radius: 3rem;
  // background-color: ${dfstyles.colors.backgroundlighter};
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  padding: 0.5rem 1rem;
  align-self: flex-start;
  @media (max-width: 768px) {
    align-self: center;
  }
`;

const WallbreakersButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  background: #323232;
  // border: 1px solid #646464;
  padding: 8px;
  cursor: pointer;
  box-shadow: 0px 0px 1px rgba(66, 71, 76, 0.32), 0px 4px 8px rgba(66, 71, 76, 0.06),
    0px 8px 48px rgba(87, 87, 87, 0.08);
`;

const Container = styled.div`
justify-content:center;
  background: #111;
  color: #fff;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  align-items: center;
  position: relative;
  @media (max-width: 768px) {
    overflow-y: auto;
    margin-bottom: 3rem;
  }
`;

const Content = styled.div`
  box-shadow 0px 0px 15px gray;
  justify-content: center;
  backdrop-filter: brightness(0.1) blur(5px);
  align-items: center;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  z-index: 2;
  border-radius: 20px;
`;


const Nav = styled.div`
  position: fixed;
  top: 0;
  backdrop-filter: brightness(0.2) blur(5px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem 3rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const LinksContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const TextContainer = styled.div`
border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  justify-content: center;
  padding: 3rem;
  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

const ImgContainer = styled.div`
  // perspective: 150px;
`;

const Title = styled.h1`
  font-family: 'Karla', sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  font-size: calc(36px + (64 - 36) * (100vw - 320px) / (1920 - 320));
  letter-spacing: -0.049375rem;
`;

const Desc = styled.span`
  font-family: 'Inconsolata', monospace;
  color: #fff;
  font-size: 1.5rem;
`;

export const BackgroundImage = styled.img`
  width: 100vw;
  height: 100vh;
  display: fixed;
  background-image: url(/public/img/deathstar.png);
  background-size: cover;
  filter: blur(5px) brightness(0.9);
  background-position: 50%, 50%;
  // display: inline-block;
  position: fixed;
  top: 0;
  left: 0;
  // z-index: -1;
`;

const TRow = styled.tr`
  & td:first-child {
    color: ${dfstyles.colors.subtext};
  }
  & td:nth-child(2) {
    padding-left: 12pt;
  }
  & td:nth-child(3) {
    text-align: right;
    padding-left: 16pt;
  }
`;

export const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    margin: 0 6pt;
    transition: color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      cursor: pointer;
      &.link-twitter {
        color: ${dfstyles.colors.icons.twitter};
      }
      &.link-github {
        color: ${dfstyles.colors.icons.github};
      }
      &.link-discord {
        color: ${dfstyles.colors.icons.discord};
      }
      &.link-blog {
        color: ${dfstyles.colors.icons.blog};
      }
      &.link-email {
        color: ${dfstyles.colors.icons.email};
      }
    }
  }
`;

const WallbreakersContainer = styled.div`
  position: absolute;
  padding: 16px;
  background-color: ${dfstyles.colors.backgroundlight};
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 20;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: space-between;
`;
