import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import { PortalHistoryView } from './PortalHistoryView';
import { competitiveConfig } from '../../Utils/constants';
import { AccountInfoView } from './AccountInfoView';
import { MapInfoView } from './MapInfoView';
import { PortalCommunityView } from './PortalCommunityView';
import { MatchmakingView } from './MatchmakingView';
import { PortalHomeView } from './PortalHomeView';
import './portal.css';
import { PortalHeader } from './Components/PortalHeader';
import { theme } from './styleUtils';
import { SeasonLeaderboardPage } from './SeasonLeaderboardPage';

export function PortalMainView() {
  return (
    <>
      <div style={{ paddingBottom: '3rem' }}>
        <PortalHeader />
        <Switch>
          <Redirect path='/portal/map' to={`/portal/map/${competitiveConfig}`} exact={true} />
          <Route path={'/portal/home'} exact={true} component={PortalHomeView} />
          <Route path={'/portal/map/:configHash'} component={MapInfoView} />
          <Route path={'/portal/account/:account'} component={AccountInfoView} />
          <Route path={'/portal/history/:account'} component={PortalHistoryView} />
          <Route path={'/portal/community'} component={PortalCommunityView} />
          <Route path={'/portal/matchmaking'} component={MatchmakingView} />
          {/* <Route path={'/portal/leaderboard'} component={SeasonLeaderboardPage} /> */}
          <Route
            path='/portal/*'
            component={() => (
              <div className='row' style={{ justifyContent: 'center' }}>
                Page Not Found
              </div>
            )}
          />
        </Switch>
      </div>
    </>
  );
}

export const MinimalButton = styled.button`
  border-radius: 3px;
  padding: 8px;
  background: ${theme.colors.bg1};
  color: #fff;
  text-transform: uppercase;
`;
