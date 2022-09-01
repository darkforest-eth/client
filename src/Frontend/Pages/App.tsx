import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { Theme } from '../Components/Theme';
import { LandingPageBackground } from '../Renderers/LandingPageCanvas';
import dfstyles from '../Styles/dfstyles';
import { SeasonLeaderboardPage } from '../Views/Portal/SeasonLeaderboardPage';
import { EntryPage } from './EntryPage';
import { EventsPage } from './EventsPage';
import { GifMaker } from './GifMaker';
import LandingPage from './LandingPage';
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
      {/* Provides theming for WebComponents from the `@darkforest_eth/ui` package */}
      <Theme color='dark' scale='medium'>
        <Router>
          <Switch>
            <Route path='/' exact component={LandingPage} />
            <Route path='/planet/:locationId' component={SharePlanet} />
            <Route path='/events' component={EventsPage} />
            <Route path='/artifact/:artifactId' component={ShareArtifact} />
            <Route
              path='/wallet/:contract/:addr/:actionId/:balance/:method'
              component={TxConfirmPopup}
            />
            <Route path='/unsubscribe' component={UnsubscribePage} />
            <Route path='/valhalla' component={ValhallaPage} />
            {!isProd && <Route path='/images' component={TestArtifactImages} />}
            {!isProd && <Route path='/gifs' component={GifMaker} />}
            {!isProd && <Route path='/bg' component={LandingPageBackground} />}
            <Route path='*' component={EntryPage} />
            <Route path='/leaderboard' component={SeasonLeaderboardPage} />
          </Switch>
        </Router>
      </Theme>
    </>
  );
}

const GlobalStyle = createGlobalStyle`
body {
  width: 100vw;
  min-height: 100vh;
  background-color: ${dfstyles.colors.background};
}
`;

export default App;
