import { LiveMatch } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadLiveMatches } from '../../../Backend/Network/GraphApi/SpyApi';
import { FindMatch } from './FindMatch';

export function MatchmakingView() {
  const [liveMatches, setLiveMatches] = useState<LiveMatch | undefined>();
  const [liveMatchError, setLiveMatchError] = useState<Error | undefined>();

  useEffect(() => {
    loadLiveMatches()
      .then((matches) => {
        setLiveMatchError(undefined);
        setLiveMatches(matches);
      })
      .catch((e) => {
        console.log(e);
        setLiveMatchError(e);
      });
  }, []);

  return (
    <Container>
      <MatchmakingContainer>
        <span style={{ fontSize: '2.5rem' }}>Join a match</span>
        <FindMatch game={liveMatches} />
      </MatchmakingContainer>
    </Container>
  );
}

const MatchmakingContainer = styled.div`
  width: 70%;
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
`;
