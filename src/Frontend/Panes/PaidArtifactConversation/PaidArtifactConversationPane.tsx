import { Artifact, Conversation } from '@darkforest_eth/types';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PaidConversationManager } from '../../../Backend/GameLogic/PaidConversationManager';
import { artifactName } from '../../../Backend/Procedural/ArtifactProcgen';
import { Spacer } from '../../Components/CoreUI';
import { Sub } from '../../Components/Text';
import dfstyles from '../../Styles/dfstyles';
import { useUIManager } from '../../Utils/AppHooks';
import { ModalHook, ModalPane } from '../../Views/ModalPane';
import { Terminal, TerminalHandle } from '../../Views/Terminal';
import { ConversationSuggestions } from '../ArtifactConversation/ConversationSuggestions';
import { ConversationInfo } from './ConversationInfo';
import { CurrencyView } from './CurrencyView';

export function PaidArtifactConversationPane({
  hook,
  artifact,
}: {
  hook: ModalHook;
  artifact: Artifact | undefined;
}) {
  const uiManager = useUIManager();
  const terminalHandle = useRef<TerminalHandle | undefined>();
  const [conversationManager, setConversationManager] =
    useState<PaidConversationManager | undefined>();
  const [conversation, setConversation] = useState<Conversation | undefined>();
  const [loading, setLoading] = useState(true);

  const questionsRemaining = conversationManager?.getQuestionsRemaining();

  const selectQuestion = useCallback(
    (question: string) => {
      terminalHandle.current?.setInput(question);
      terminalHandle.current?.focus();
    },
    [terminalHandle]
  );

  useEffect(() => {
    if (terminalHandle.current && artifact) {
      const conversationManager = new PaidConversationManager(
        uiManager,
        terminalHandle,
        setConversation,
        setLoading,
        artifact
      );
      setConversationManager(conversationManager);
      terminalHandle.current?.clear();
      conversationManager.start();
      terminalHandle.current.focus();
    }
  }, [terminalHandle, setConversation, artifact, uiManager]);

  const title = artifact ? `Chat with ${artifactName(artifact)}` : 'Artifact Conversation';

  let remainingQuestionsSection = undefined;
  if (questionsRemaining !== undefined && questionsRemaining > 0) {
    remainingQuestionsSection = (
      <>
        <div>
          <Sub>Questions Remaining: {Math.max(0, questionsRemaining)}</Sub>
        </div>
        <Spacer height={8} />
      </>
    );
  }

  return (
    <ModalPane
      title={title}
      hook={hook}
      backgroundColor={dfstyles.colors.dfyellow}
      titlebarColor={dfstyles.colors.dfyellow}
      borderColor={'#918d0c'}
    >
      <ContentContainer>
        {remainingQuestionsSection}
        <TerminalContainer>
          <Terminal key={JSON.stringify(artifact?.id)} ref={terminalHandle} promptCharacter={'>'} />
        </TerminalContainer>
        {(questionsRemaining && questionsRemaining > 0 && (
          <SuggestionsContainer>
            <ConversationSuggestions
              disabled={loading}
              selectQuestion={selectQuestion}
              exampleQuestions={conversation && conversation.exampleQuestions}
            />
          </SuggestionsContainer>
        )) || <Spacer height={8} />}
      </ContentContainer>
      <BottomDetailsBar>
        {questionsRemaining !== undefined && (
          <ConversationInfo questionsRemaining={questionsRemaining} />
        )}
        <CurrencyView />
      </BottomDetailsBar>
    </ModalPane>
  );
}

const BottomDetailsBar = styled.div`
  border-top: 1px solid ${dfstyles.colors.backgroundlighter};
  padding: 4px 8px;
  color: ${dfstyles.colors.subtext};
`;

const SuggestionsContainer = styled.div`
  flex-shrink: 0;
  margin-top: 8px;
  margin-bottom: 8px;
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
  padding: 8px;
  padding-bottom: 0;
`;
