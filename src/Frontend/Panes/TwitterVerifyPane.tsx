import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Btn } from '../Components/Btn';
import { Input } from '../Components/Input';
import { Sub, Green, White, Red } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { ModalHook, ModalName, ModalPane } from '../Views/ModalPane';

const TwitterWrapper = styled.div`
  width: 30em;
  height: 15em;

  & > .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;

    & .input-twitter {
      transition: background-color 0.2s, color 0.2s, width 0.2s !important;
      outline: none;
      background: ${dfstyles.colors.background};
      color: ${dfstyles.colors.subtext};
      border-radius: 4px;
      border: 1px solid ${dfstyles.colors.text};
      margin-left: 0.75em;
      width: 6em;
      padding: 2px 6px;

      &:focus {
        background: ${dfstyles.colors.backgroundlight};
        color: ${dfstyles.colors.text};
        width: 8em;
      }
    }
  }

  & span.clickable {
    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
  & > div,
  & > p {
    margin: 0.5em 0;
    &:first-child {
      margin-top: 0;
    }
  }
`;
export function TwitterVerifyPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const [twitter, setTwitter] = useState<string | undefined>(undefined);
  const [twitterInput, setTwitterInput] = useState<string>('');
  const [failedVerify, setFailedVerify] = useState<boolean>(false);

  useEffect(() => {
    if (!uiManager) return;
    setTwitter(uiManager.getTwitter(undefined));
  }, [uiManager]);

  const onTweetClick = async () => {
    if (uiManager) {
      const tweetText = await uiManager.generateVerificationTweet(twitterInput);
      const str = `Verifying my @darkforest_eth v0.6 account (https://zkga.me): ${tweetText}`;
      window.open(`https://twitter.com/intent/tweet?hashtags=darkforest&text=${encodeURI(str)}`);
    }
  };

  const onVerifyClick = async () => {
    if (uiManager) {
      const success = await uiManager.verifyTwitter(twitterInput);
      if (success) {
        setTwitter(twitterInput);
      } else {
        setFailedVerify(true);
      }
    }
  };

  return (
    <ModalPane hook={hook} title='Twitter Verification' name={ModalName.TwitterVerify}>
      <TwitterWrapper>
        <div className='row'>
          <p onClick={onTweetClick}>Connect to Twitter by signing a public tweet.</p>
        </div>
        {twitter && (
          <p>
            <Sub>
              <Green>You are connected.</Green> Thank you for verifying your twitter account,{' '}
              <White>@{twitter}</White>.
            </Sub>
          </p>
        )}
        {!twitter && (
          <>
            <div className='row'>
              <Sub>Verify using this handle:</Sub>
              <span>
                @
                <Input
                  className='input-twitter'
                  value={twitterInput}
                  onChange={(e) => setTwitterInput(e.target.value)}
                  placeholder={'my-twitter'}
                />
              </span>
            </div>
            <div className='row'>
              <Btn onClick={onTweetClick}>Tweet</Btn>
            </div>
            <p>Once you've tweeted, you can verify your account.</p>
            <div className='row'>
              <span> </span>
              <Btn onClick={onVerifyClick}>Verify</Btn>
            </div>
            {failedVerify && (
              <p>
                <Red>ERROR: failed to verify signature.</Red> <Sub>Please try again.</Sub>
              </p>
            )}
          </>
        )}
      </TwitterWrapper>
    </ModalPane>
  );
}
