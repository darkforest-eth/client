import { EthAddress } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { AlignCenterHorizontally, EmSpacer, Spacer } from '../Components/CoreUI';
import { AccountLabel } from '../Components/Labels/Labels';
import { Sub, White } from '../Components/Text';
import { TooltipName } from '../Game/WindowManager';
import { TooltipTrigger } from '../Panes/Tooltip';
import { usePlayer, useUIManager } from '../Utils/AppHooks';
import { GameWindowZIndex } from '../Utils/constants';
import { ModalTwitterVerifyIcon } from './ModalIcon';
import { ModalHook } from './ModalPane';

const TopBarContainer = styled.div`
  z-index: ${GameWindowZIndex.MenuBar};
  padding: 0 2px;
`;

function TopBarSection({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Spacer width={8} />
      {children}
    </>
  );
}

function BoardPlacement({ account }: { account: EthAddress | undefined }) {
  const uiManager = useUIManager();
  const player = usePlayer(uiManager, account);

  let content;

  if (!player.value) {
    content = <Sub>n/a</Sub>;
  } else {
    content = (
      <Sub>
        <TooltipTrigger name={TooltipName.Score}>
          <White>{player.value.score ?? 'n/a'}</White> pts
        </TooltipTrigger>
      </Sub>
    );
  }

  return <Points>{content}</Points>;
}

const Points = styled.div`
  display: inline-block;
`;

function ScoreSection({ account }: { account: EthAddress | undefined }) {
  return (
    <TopBarSection>
      <BoardPlacement account={account} />
    </TopBarSection>
  );
}

export function TopBar({ twitterVerifyHook }: { twitterVerifyHook: ModalHook }) {
  const uiManager = useUIManager();
  const player = usePlayer(uiManager);
  const account = player.value?.address;
  const twitter = player.value?.twitter;

  return (
    <TopBarContainer>
      <AlignCenterHorizontally style={{ width: '100%', justifyContent: 'space-between' }}>
        <AccountLabel />
        <EmSpacer width={1} />
        <ModalTwitterVerifyIcon
          small
          hook={twitterVerifyHook}
          style={{
            width: !twitter ? '100px' : '1.5em',
            height: !twitter ? '2em' : '1.5em',
          }}
          text={!twitter ? 'Connect' : undefined}
        />
        <EmSpacer width={1} />
        <ScoreSection account={account} />
      </AlignCenterHorizontally>
    </TopBarContainer>
  );
}
