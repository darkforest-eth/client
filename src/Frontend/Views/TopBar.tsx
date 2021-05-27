import { EthAddress } from '@darkforest_eth/types';
import _ from 'lodash';
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { formatNumber } from '../../Backend/Utils/Utils';
import { Hook } from '../../_types/global/GlobalTypes';
import { ArtifactIcon, EnergyIcon, SilverIcon } from '../Components/Icons';
import { AccountLabel } from '../Components/Labels/Labels';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { LongDash, Sub, White } from '../Components/Text';
import { TooltipName } from '../Game/WindowManager';
import { TooltipTrigger } from '../Panes/Tooltip';
import dfstyles from '../Styles/dfstyles';
import { useAccount, useUIManager } from '../Utils/AppHooks';
import { GameWindowZIndex } from '../Utils/constants';
import { usePoll } from '../Utils/Hooks';

export const TOP_BAR_HEIGHT = '2.5em';

const StyledTopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: ${GameWindowZIndex.MenuBar};

  display: flex;
  flex-direction: row;
  align-items: center;

  height: ${TOP_BAR_HEIGHT};
  width: fit-content;
  background: ${dfstyles.colors.background};
  border-bottom: 1px solid ${dfstyles.colors.subtext};
  border-right: 1px solid ${dfstyles.colors.subtext};

  border-bottom-right-radius: ${dfstyles.borderRadius};
`;

const StyledCollapser = styled.span`
  width: 1.5em;
  text-align: center;
  color: ${dfstyles.colors.subtext};

  &:hover {
    cursor: pointer;
    color: ${dfstyles.colors.text};
  }
`;

function Collapser({
  expanded,
  setExpanded,
}: {
  expanded: boolean;
  setExpanded: Hook<boolean>[1];
}) {
  return (
    <StyledCollapser onClick={() => setExpanded((b: boolean) => !b)}>
      {expanded ? <LongDash /> : '+'}
    </StyledCollapser>
  );
}

const StyledTopBarSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: fit-content;
  padding: 0.5em;
  border-right: 1px solid ${dfstyles.colors.subtext};

  &:last-child {
    border-right: none;
  }
`;

function TopBarSection({
  collapsible,
  children,
}: {
  collapsible?: boolean;
  children: React.ReactNode;
}) {
  const [expanded, setExpanded] = useState<boolean>(true);

  return (
    <StyledTopBarSection>
      {(!collapsible || (collapsible && expanded)) && children}
      {collapsible && <Collapser expanded={expanded} setExpanded={setExpanded} />}
    </StyledTopBarSection>
  );
}

const BarItem = styled.span<{ width?: string }>`
  margin-right: 1em;
  ${({ width }) => width && `width: ${width};`}

  &:last-child {
    margin-right: 0;
  }
`;

const AccountItem = styled(BarItem)`
  text-align: left;
  width: 8em;
`;

const StyledBoardPlacement = styled.span<{ single?: boolean }>`
  min-width: 12em;
  display: inline-flex;
  flex-direction: row;
  justify-content: ${({ single }) => (single ? 'flex-end' : 'space-between')};
`;

// const TEN_MIN = 10 * 60 * 1000;

function BoardPlacement({ account }: { account: EthAddress | undefined }) {
  const uiManager = useUIManager();
  // const twitter = useTwitter(account, uiManager);

  // const { leaderboard, error } = useLeaderboard(TEN_MIN);
  const [score, setScore] = useState<number | undefined>();
  // const [place, setPlace] = useState<number | undefined>();

  // useEffect(() => {
  //   if (!leaderboard || !account) return;

  //   const keys = Object.getOwnPropertyNames(leaderboard);
  //   const forVersion = leaderboard[keys[0]];

  //   const score = forVersion.scoresByPlayer[account];
  //   setScore(score);

  //   const entries: [string, number][] = Object.getOwnPropertyNames(leaderboard.scoresByPlayer).map(
  //     (name) => [name, forVersion.scoresByPlayer[name]]
  //   );

  //   const sortedEntries = _.sortBy(entries, (row) => -row[1]);

  //   const idx = sortedEntries.findIndex(([acc, _score]) => acc === twitter || acc === account);
  //   setPlace(idx + 1);
  // }, [leaderboard, account, twitter]);
  const syncScore = useCallback(() => {
    setScore(uiManager.getMyScore());
  }, [uiManager, setScore]);

  usePoll(syncScore, 5000);

  let content, single;
  // if (error || !account) {
  //   single = true;
  //   content = <Sub>error loading leaderboard</Sub>;
  // }
  // else if (!leaderboard) {
  //   single = true;
  //   content = (
  //     <Sub>
  //       <LoadingSpinner initialText={'loading leaderboard...'} />
  //     </Sub>
  //   );
  // }
  if (!account) {
    content = <Sub>error loading account</Sub>;
  } else {
    single = true;
    content = (
      <>
        {/* <Sub>{!score || !place ? 'unranked' : place}</Sub> */}
        <Sub>
          <TooltipTrigger name={TooltipName.Score}>
            <White>{score || 0}</White> pts
          </TooltipTrigger>
        </Sub>
      </>
    );
  }

  return <StyledBoardPlacement single={single}>{content}</StyledBoardPlacement>;
}

function ScoreSection({ account }: { account: EthAddress | undefined }) {
  return (
    <TopBarSection>
      <AccountItem>
        <AccountLabel account={account} />
      </AccountItem>
      <BarItem>
        <BoardPlacement account={account} />
      </BarItem>
    </TopBarSection>
  );
}

const ONE_MIN = 1 * 60 * 1000;

const ResItem = styled(BarItem)`
  display: inline-flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 4em;
`;

function DataSection({ account }: { account: EthAddress | undefined }) {
  const uiManager = useUIManager();

  const [silver, setSilver] = useState<number | undefined>();
  const [energy, setEnergy] = useState<number | undefined>();
  const [artifacts, setArtifacts] = useState<number | undefined>();

  const poll = useCallback(() => {
    if (!account) return;

    setSilver(uiManager.getSilverOfPlayer(account));
    setEnergy(uiManager.getEnergyOfPlayer(account));
    setArtifacts(uiManager.getMyArtifacts().length);
  }, [setSilver, setEnergy, setArtifacts, uiManager, account]);

  usePoll(poll, ONE_MIN, true);

  let content;

  if (silver === undefined || energy === undefined || artifacts === undefined)
    content = (
      <BarItem width={'12em'}>
        <LoadingSpinner initialText='loading player info...' />
      </BarItem>
    );
  else
    content = (
      <>
        <ResItem>
          <SilverIcon />
          <Sub>{formatNumber(silver)}</Sub>
        </ResItem>
        <ResItem>
          <EnergyIcon />
          <Sub>{formatNumber(energy)}</Sub>
        </ResItem>
        <ResItem>
          <ArtifactIcon />
          <Sub>{artifacts}</Sub>
        </ResItem>
      </>
    );

  return <TopBarSection collapsible>{content}</TopBarSection>;
}

export function TopBar() {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);

  return (
    <StyledTopBar>
      <ScoreSection account={account} />
      <DataSection account={account} />
    </StyledTopBar>
  );
}
