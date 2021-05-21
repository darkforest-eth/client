import { Artifact, ArtifactRarity, ArtifactType } from '@darkforest_eth/types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { ArtifactConversationPane } from '../Panes/ArtifactConversation/ArtifactConversationPane';
import LandingPageCanvas from '../Renderers/LandingPageCanvas';
import { TopLevelDivProvider } from '../Utils/AppHooks';

const StyledConversationTest = styled.div`
  width: 100%;
  height: 100%;
`;

export function ConversationTest() {
  const convoHook = useState<boolean>(true);

  const [topLevelRef, setTopLevelRef] = useState<HTMLDivElement | null>(null);

  return (
    <StyledConversationTest>
      <div ref={(el) => setTopLevelRef(el)}></div>
      {topLevelRef && (
        <TopLevelDivProvider value={topLevelRef}>
          <ArtifactConversationPane
            hook={convoHook}
            artifact={
              {
                artifactType: ArtifactType.BloomFilter,
                rarity: ArtifactRarity.Rare,
                id: '00011110de1f42569c82b29e25096cd0246cc50a58e30b5bfba020f55a80eb20',
              } as Artifact
            }
          />
          <LandingPageCanvas />
        </TopLevelDivProvider>
      )}
    </StyledConversationTest>
  );
}
