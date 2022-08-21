import { CONTRACT_ADDRESS } from '@darkforest_eth/contracts';
import { address } from '@darkforest_eth/serde';
import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { EmSpacer, Link, Spacer, Title } from '../Components/CoreUI';
import { EmailCTA, EmailCTAMode } from '../Components/Email';
import { Modal } from '../Components/Modal';
import { HideSmall, Text, White, Gold, ALPurple, Txt90pc, Larger, Smaller_2 } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { LandingPageRoundArt } from '../Views/LandingPageRoundArt';
import { LeadboardDisplay } from '../Views/Leaderboard';

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

const altLayerLinks = {
  twitter: 'https://alt.ws/twitter',
  blog: 'https://blog.altlayer.io/',
  discord: 'https://discord.gg/altlayer',
  github: 'https://github.com/alt-research',
  privacy: 'https://docs.altlayer.io/privacy-policy.html'
}

const defaultAddress = address(CONTRACT_ADDRESS);

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  flex-direction: row;

  @media only screen and (max-device-width: 1000px) {
    grid-template-columns: auto;
    flex-direction: column;
  }

  --df-button-color: ${dfstyles.colors.alpurple};
  --df-button-background: #000;
  --df-button-border: 2px solid ${dfstyles.colors.alpurple};
  --df-button-hover-background: ${dfstyles.colors.alpurple};
  --df-button-hover-border: 1px solid ${dfstyles.colors.alpurple};
  text-shadow: 0px 0px 1px ${dfstyles.colors.alpurple};
  filter: brightness(1.4);
  font-weight: 600;
`;

export default function LandingPage() {
  const history = useHistory();

  return (
    <>
      <PrettyOverlayGradient />
      {/*<HiringAltLayer />*/}
      {/*<HiringDarkForest />*/}

      <Page>
        {
          /*<OnlyMobile>
            <Spacer height={8} />
          </OnlyMobile>
          <HideOnMobile>
            <Spacer height={150} />
          </HideOnMobile>*/
        }
        <OuterWrapper>
          <LinkContainer>

            <HideOnMobile><LinkContainerLeftSpacing/></HideOnMobile>

            <LinkContainerRightSide>
              <LinkInnerContainer>
                <Text style={{marginRight: ".5em"}}>AltLayer</Text>
                <a className={'link-twitter'} href={altLayerLinks.twitter}>
                  <span className={'icon-twitter'}></span>
                </a>
                <Spacer width={4} />
                <a className={'link-discord'} href={altLayerLinks.discord}>
                  <span className={'icon-discord'}></span>
                </a>
                <Spacer width={4} />
                <a className={'link-github'} href={altLayerLinks.github}>
                  <span className={'icon-github'}></span>
                </a>
                <Link to={altLayerLinks.blog}>Blog</Link>
                <Spacer width={4} />
                <Link to={altLayerLinks.privacy}>Privacy</Link>
              </LinkInnerContainer>

              <HideOnMobile><EmSpacer width={2}/></HideOnMobile>

              <LinkInnerContainer>
                <Text style={{marginRight: ".5em"}}>Dark Forest</Text>
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
                <Link to={links.blog}>Blog</Link>
                <Spacer width={4} />
                <Link to={links.email}>Email</Link>
                <Spacer width={4} />
                <Link to={links.plugins}>Plugins</Link>
                <Spacer width={4} />
                <Link to={links.wiki}>Wiki</Link>
              </LinkInnerContainer>
            </LinkContainerRightSide>
          </LinkContainer>

          <EmSpacer height={2}/>

          <MainContentContainer>
            <TextCentered>
              <LandingPageRoundArt />
              <HeroSection>
                <TitleSection>
                  <ALPurple><Larger>Dark Forest on AltLayer<br/>Community Round 1</Larger></ALPurple><br/>
                  <Spacer height={10} />
                  <ALPurple><Smaller_2>Sep 9th 12:00 - Sep 11th 12:00 (GMT), 2022</Smaller_2></ALPurple>
                </TitleSection>

                <Spacer height={40} />

                <ButtonWrapper>
                  {/*
                    // Disallow creating custom lobby
                    <Btn size='large' onClick={() => history.push(`/lobby/${defaultAddress}`)}>
                      Create Lobby
                    </Btn>
                  */}
                  <Btn size='large' onClick={() => history.push(`/play/${defaultAddress}`)}>
                    Enter Community Round
                  </Btn>
                </ButtonWrapper>
              </HeroSection>
            </TextCentered>
          </MainContentContainer>
        </OuterWrapper>
      </Page>
    </>
  );
}

const HeroSection = styled.div`
  position: relative;
  top: -4rem;
`;

const TitleSection = styled.div`
  font-family: "PressStart2P", Inconsolata, monospace;
  filter: brightness(120%)
`;

export const LinkContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100vw;
  height: 70pt;
  font-size: 80%;
  text-shadow: 0 0 1px white;

  a {
    margin: 0 6pt;
    transition: color 0.2s;
    color: white;
    text-decoration: none;
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
const LinkContainerLeftSpacing = styled.div`
  display: flex;
  flex-grow: 1;
`;

const LinkContainerRightSide = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-right: 2em;
  height: 100%;

  @media only screen and (max-width: 900px) {
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
  }
`;

const LinkInnerContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const PrettyOverlayGradient = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("/img/background.png") no-repeat center fixed;
  background-size: cover;
  display: inline-block;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
`;

const TextCentered = styled.div`
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

const OuterWrapper= styled.div`
  max-width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
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

function HiringAltLayer() {
  return (
    <HideOnMobile>
      <Modal contain={['top', 'left', 'right']} initialX={30} initialY={30}>
        <Title slot='title'>AltLayer is Hiring!</Title>
        <div style={{ maxWidth: '320px', textAlign: 'justify' }}>
          We are looking for experienced Rust and Solidity developers to join our team! If you
          are interested in building out a multi-chain, elastic scaling layer-2 solution,{' '}
          <Link to='https://careers.altlayer.io/' openInThisTab={false}>learn more about these roles</Link>.
        </div>
      </Modal>
    </HideOnMobile>
  );
}

function HiringDarkForest() {
  return (
    <HideOnMobile>
      <Modal contain={['top', 'left', 'right']} initialX={30} initialY={220}>
        <Title slot='title'>Dark Forest is Hiring!</Title>
        <div style={{ maxWidth: '320px', textAlign: 'justify' }}>
          We are looking for experienced full stack and solidity developers to join our team! If you
          like what you see,{' '}
          <Link to='https://docs.google.com/forms/d/e/1FAIpQLSdaWvjxX4TrDDLidPXtgk6UW3rC082rpvi3AIPkCPxAahg_rg/viewform?usp=sf_link'>
            consider applying
          </Link>
          . If you know someone who you think would be a great fit for our team,{' '}
          <Link to='https://docs.google.com/forms/d/e/1FAIpQLScku_bQDbkPqpHrwBzOBfQ4SV6Nw6Tgxi6zWQL8Bb0olyBE3w/viewform?usp=sf_link'>
            please refer them here
          </Link>
          .
          <br />
          <br />
          Learn more about the role{' '}
          <Link to='https://ivanchub.notion.site/Dark-Forest-is-Hiring-ad1f0cbe816640fb9b4c663dacaaca04'>
            here
          </Link>
          .
        </div>
      </Modal>
    </HideOnMobile>
  );
}

const HideOnMobile = styled.div`
  @media only screen and (max-width: 900px) {
    div {
      display: none;
    }
  }
`;

const OnlyMobile = styled.div`
  @media only screen and (min-width: 900px) {
    div {
      display: none;
    }
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
