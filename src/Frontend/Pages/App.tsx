import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { LandingPageBackground } from '../Renderers/LandingPageCanvas';
import dfstyles from '../Styles/dfstyles';
import { ConversationTest } from './ConversationTest';
import { GameLandingPage } from './GameLandingPage';
import { GifMaker } from './GifMaker';
import LandingPage from './LandingPage';
import { PreviewPage } from './PreviewPage';
import { ShareArtifact } from './ShareArtifact';
import { SharePlanet } from './SharePlanet';
import { TestArtifactImages } from './TestArtifactImages';
import { TxConfirmPopup } from './TxConfirmPopup';
import UnsubscribePage from './UnsubscribePage';
import { ValhallaPage } from './ValhallaPage';

const isProd = process.env.NODE_ENV === 'production';

function App() {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Route path='/play' component={GameLandingPage} />
          <Route path='/' exact component={LandingPage} />
          <Route path='/planet/:locationId' component={SharePlanet} />
          <Route path='/artifact/:artifactId' component={ShareArtifact} />
          <Route path='/wallet/:addr/:actionId/:balance/:method' component={TxConfirmPopup} />
          <Route path='/unsubscribe' component={UnsubscribePage} />
          <Route path='/conversation' component={ConversationTest} />
          <Route path='/valhalla' component={ValhallaPage} />
          {!isProd && <Route path='/images' component={TestArtifactImages} />}
          {!isProd && <Route path='/preview' component={PreviewPage} />}
          {!isProd && <Route path='/gifs' component={GifMaker} />}
          {!isProd && <Route path='/bg' component={LandingPageBackground} />}
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
  background-color: ${dfstyles.colors.background};
  font-family: 'Inconsolata', monospace;
  font-weight: 300;
}
`;

export default hot(App);
