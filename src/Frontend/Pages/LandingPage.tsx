import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { address } from '@darkforest_eth/serde';
import React, { CSSProperties } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { isRoundOngoing } from '../../Backend/Utils/Utils';
import { Btn } from '../Components/Btn';
import { EmSpacer, Link, Spacer, Title } from '../Components/CoreUI';
import { EmailCTA, EmailCTAMode } from '../Components/Email';
import { Modal } from '../Components/Modal';
import { Red, White, Text, HideSmall } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { ArenaLeaderboardDisplay } from '../Views/ArenaLeaderboard';
import { LandingPageRoundArt } from '../Views/LandingPageRoundArt';

export const enum LandingPageZIndex {
  Background = 0,
  Canvas = 1,
  BasePage = 2,
}

const links = {
  twitter: 'http://twitter.com/darkforest_eth',
  email: 'mailto:ivan@0xparc.org',
  blog: 'https://blog.zkga.me/',
  discord: 'https://discord.gg/2u2TN6v8r6',
  github: 'https://github.com/darkforest-eth',
  wiki: 'https://dfwiki.net/wiki/Main_Page',
  plugins: 'https://plugins.zkga.me/',
};

const defaultAddress = address(CONTRACT_ADDRESS);

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;

  @media only screen and (max-device-width: 1000px) {
    grid-template-columns: auto;
    flex-direction: column;
  }

  --df-button-color: ${dfstyles.colors.dfgreen};
  --df-button-border: 1px solid ${dfstyles.colors.dfgreen};
  --df-button-hover-background: ${dfstyles.colors.dfgreen};
  --df-button-hover-border: 1px solid ${dfstyles.colors.dfgreen};
`;

export default function LandingPage() {
  const history = useHistory();

  return (
    <>
      <PrettyOverlayGradient />
      <GrandPrix />

      <Page>
        <OnlyMobile>
          <Spacer height={8} />
        </OnlyMobile>
        <HideOnMobile>
          <Spacer height={150} />
        </HideOnMobile>

        <MainContentContainer>
          <Header>
            <LinkContainer>
              <Link to={links.email}>email</Link>
              <Spacer width={4} />
              <Link to={links.blog}>blog</Link>
              <Spacer width={4} />

              <a className={'link-twitter'} href={links.twitter}>
                <span className={'icon-twitter'}></span>
              </a>
              <Spacer width={4} />
              <a className={'link-discord'} href={links.discord}>
                <span className={'icon-discord'}></span>
              </a>
              <Spacer width={4} />
              <a className={'link-github'} href={links.github}>
                <span className={'icon-github'}></span>
              </a>

              <Spacer width={4} />
              <Link to={links.plugins}>plugins</Link>
              <Spacer width={4} />
              <Link to={links.wiki}>wiki</Link>
            </LinkContainer>

            <OnlyMobile>
              <Spacer height={4} />
            </OnlyMobile>
            <HideOnMobile>
              <Spacer height={16} />
            </HideOnMobile>

            <LandingPageRoundArt />

            <Spacer height={16} />
            <ButtonWrapper>
              <Btn
                size='large'
                // disabled={!isRoundOngoing()}
                style={{ borderColor: 'red', color: 'red' } as CSSStyleDeclaration & CSSProperties}
                onClick={() => history.push(`/play/`)}
              >
                Practice Grand Prix #2
              </Btn>
              <Btn size='large' onClick={() => history.push(`/arena/${defaultAddress}`)}>
                Create Custom Arena
              </Btn>
            </ButtonWrapper>
          </Header>

          <Spacer height={32} />

          <HallOfFame style={{ color: dfstyles.colors.text }}>
            <HallOfFameTitle>Racing Legends</HallOfFameTitle>
            <Spacer height={8} />
            <table style = {{width: '100%'}}>
              <tbody style = {{width: '100%'}}>
                <TRow>
                  <td>
                    <HideSmall>Week{' '}</HideSmall>1
                  </td>
                  <td>
                    06/05/<HideSmall>20</HideSmall>22
                  </td>
                  <td>
                    <Link to='https://twitter.com/TheVelorum'>Velorum</Link>
                  </td>
                </TRow>
                <TRow>
                  <td>
                    <HideSmall>Week{' '}</HideSmall>2
                  </td>
                  <td>
                    06/11/<HideSmall>20</HideSmall>22
                  </td>
                  <td>
                    {' '}
                    <Link to='https://twitter.com/Ner0nzz'>Ner0nzz</Link>
                  </td>
                </TRow>
              </tbody>
            </table>
          </HallOfFame>
          {/* <Link to='https://medium.com/dfdao/dark-forest-arena-grand-prix-f761896a752e'>
            🏎 Grand Prix Info 🏎
          </Link> */}
          {/* <Spacer height={32} /> */}
          {/* <EmailWrapper>
            <EmailCTA mode={EmailCTAMode.SUBSCRIBE} />
          </EmailWrapper> */}
        </MainContentContainer>

        <Spacer height={28} />

        {/* <LeadboardDisplay /> */}
        <ArenaLeaderboardDisplay />

        <Spacer height={256} />
      </Page>
    </>
  );
}

const PrettyOverlayGradient = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: linear-gradient(to left bottom, #012338, #1e2142, #3e173e, #56042a, #5e0808);
  background-position: 50%, 50%;
  display: inline-block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const Header = styled.div`
  text-align: center;
`;

const EmailWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

const MainContentContainer = styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Page = styled.div`
  position: absolute;
  width: 100vw;
  max-width: 100vw;
  height: 100%;
  color: white;
  font-size: ${dfstyles.fontSize};
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: ${LandingPageZIndex.BasePage};
`;

const HallOfFameTitle = styled.div`
  color: ${dfstyles.colors.subtext};
  display: inline-block;
  border-bottom: 1px solid ${dfstyles.colors.subtext};
  line-height: 1em;
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

function GrandPrix() {
  return (
    <HideOnMobile>
      <Modal contain={['top', 'left', 'right']} initialX={50} initialY={50}>
        <Title slot='title'>🏎 Grand Prix Info 🏎</Title>
        <div style={{ maxWidth: '300px', textAlign: 'justify' }}>
          Race in the Grand Prix for a $100 prize and NFT trophies! Here is more{' '}
          <Link to='https://medium.com/dfdao/grand-prix-week-2-dc3bef0d3913'>rules and info</Link>
          .
          <br />
          <br />
          If you are new to Dark Forest, check out our{' '}
          <Link to='https://www.youtube.com/watch?v=3a4i9IyfmBI&list=PLn4H2Bj-iklclFZW_YpKCQaTnBVaECLDK'>
            video tutorials
          </Link>
          , courtesy of <Link to='https://twitter.com/moongate_io'>Moongate Guild</Link>.
          <br />
          <br />
          If you enjoy the game, consider donating to our{' '}
          <Link to='https://gitcoin.co/grants/4875/dfdao-dark-forest-gaming-collective'>
            Gitcoin GR14 grant!
          </Link>
          <br />
          <br />
          Happy racing!
        </div>
      </Modal>
    </HideOnMobile>
  );
}

const HideOnMobile = styled.div`
  @media only screen and (max-device-width: 1000px) {
    display: none;
  }
`;

const OnlyMobile = styled.div`
  @media only screen and (min-device-width: 1000px) {
    display: none;
  }
`;

const Involved = styled.div`
  width: 100%;
  padding-left: 16px;
  padding-right: 16px;
  display: grid;
  grid-template-columns: auto auto;
  gap: 10px;
  grid-auto-rows: minmax(100px, auto);

  @media only screen and (max-device-width: 1000px) {
    grid-template-columns: auto;
  }
`;

const InvolvedItem = styled.a`
  height: 150px;
  display: inline-block;
  margin: 4px;
  padding: 4px 8px;

  background-color: ${dfstyles.colors.backgroundlighter};
  background-size: cover;
  background-position: 50% 50%;
  background-repeat: no-repeat;

  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    transform: scale(1.03);
  }
  &:hover:active {
    transform: scale(1.05);
  }
`;

const HallOfFame = styled.div`
  @media only screen and (max-device-width: 1000px) {
    font-size: 70%;
  }
`;
