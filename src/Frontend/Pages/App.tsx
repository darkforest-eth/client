import React from 'react';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import GameLandingPage from './GameLandingPage';
import dfstyles from '../Styles/dfstyles';
import { createGlobalStyle } from 'styled-components';
import { SharePlanet } from './SharePlanet';
import { TxConfirmPopup } from './TxConfirmPopup';
import UnsubscribePage from './UnsubscribePage';
import { hot } from 'react-hot-loader/root';
import { ShareArtifact } from './ShareArtifact';
import { ConversationTest } from './ConversationTest';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path='/game1' component={GameLandingPage} />
          <Route path='/' exact component={LandingPage} />
          <Route path='/planet/:locationId' component={SharePlanet} />
          <Route path='/artifact/:artifactId' component={ShareArtifact} />
          <Route path='/wallet/:addr/:actionId/:balance/:method' component={TxConfirmPopup} />
          <Route path='/unsubscribe' component={UnsubscribePage} />
          <Route path='/conversation' component={ConversationTest} />
        </Switch>
      </Router>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@300&display=swap');

body {
  color: ${dfstyles.colors.text};
  width: 100vw;
  min-height: 100vh;
  background-color: ${dfstyles.colors.backgrounddark};
  font-family: 'Inconsolata', monospace;
  font-weight: 300;
}
`;

export default hot(App);
