import { Artifact, Conversation } from '@darkforest_eth/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { ConversationManager } from '../../../Backend/GameLogic/ConversationManager';
import dfstyles from '../../Styles/dfstyles';
import { ModalHook, ModalPane } from '../../Views/ModalPane';
import { Terminal, TerminalHandle } from '../../Views/Terminal';
import { ConversationSuggestions } from './ConversationSuggestions';

export function ArtifactConversationPane({
  hook,
  artifact,
}: {
  hook: ModalHook;
  artifact: Artifact | undefined;
}) {
  const terminalHandle = useRef<TerminalHandle | undefined>();
  const [conversation, setConversation] = useState<Conversation | undefined>();
  const [loading, setLoading] = useState(true);
  const selectQuestion = useCallback(
    (question: string) => {
      terminalHandle.current?.setInput(question);
      terminalHandle.current?.focus();
    },
    [terminalHandle]
  );

  useEffect(() => {
    if (terminalHandle.current && artifact) {
      const conversation = new ConversationManager(
        terminalHandle,
        setConversation,
        setLoading,
        artifact?.artifactType,
        artifact.rarity
      );
      terminalHandle.current?.clear();
      conversation.start();
      terminalHandle.current.focus();
    }
  }, [terminalHandle, setConversation, artifact]);

  return (
    <ModalPane title={'Artifact Conversation'} hook={hook}>
      <ContentContainer>
        <TerminalContainer>
          <Terminal key={JSON.stringify(artifact?.id)} ref={terminalHandle} promptCharacter={'>'} />
        </TerminalContainer>
        <SuggestionsContainer>
          <ConversationSuggestions
            disabled={loading}
            selectQuestion={selectQuestion}
            exampleQuestions={conversation && conversation.exampleQuestions}
          />
        </SuggestionsContainer>
      </ContentContainer>
    </ModalPane>
  );
}

const SuggestionsContainer = styled.div`
  flex-shrink: 0;
`;

const TerminalContainer = styled.div`
  flex-grow: 1;
  overflow-y: scroll;
  border: 1px solid ${dfstyles.colors.backgroundlighter};
  padding: 4px;
`;

const ContentContainer = styled.div`
  width: 600px;
  height: 600px;
  max-width: 600px;
  max-height: 600px;
  display: flex;
  flex-direction: column;
`;
