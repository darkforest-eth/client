import { Artifact, ArtifactTypeNames, Conversation, Message } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { WikiPane } from '../../Frontend/Panes/WikiPane';
import dfstyles from '../../Frontend/Styles/dfstyles';
import { TerminalTextStyle } from '../../Frontend/Utils/TerminalTypes';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import { artifactName } from '../Procedural/ArtifactProcgen';
import GameUIManager from './GameUIManager';

const BadwordsFilter = require('bad-words');
const filter = new BadwordsFilter();

const clean = (str: string): string => filter.clean(str);

export class PaidConversationManager {
  private gameUIManager: GameUIManager;
  private terminal: React.MutableRefObject<TerminalHandle | undefined>;
  private conversation: Conversation | undefined;
  private setConversation: (conversation: Conversation | undefined) => void;
  private setLoading: (loading: boolean) => void;
  private artifact: Artifact;

  constructor(
    gameUIManager: GameUIManager,
    terminal: React.MutableRefObject<TerminalHandle | undefined>,
    setConversation: (conversation: Conversation) => void,
    setLoading: (loading: boolean) => void,
    artifact: Artifact
  ) {
    this.gameUIManager = gameUIManager;
    this.terminal = terminal;
    this.setConversation = setConversation;
    this.setLoading = setLoading;
    this.artifact = artifact;
  }

  public getQuestionsRemaining() {
    return (
      this.conversation &&
      this.conversation.questionsAllowed -
        this.conversation.messages.filter((m) => m.entity === 'AI').length
    );
  }

  public async start() {
    this.terminal.current?.printLoadingSpinner();
    const existingConversation = await this.gameUIManager.getConversation(this.artifact.id);
    this.terminal.current?.removeLast(2);

    this.conversation = existingConversation;
    this.setConversation(existingConversation);

    if (this.conversation) {
      this.printAllMessages();
    } else {
      while (true) {
        this.terminal.current?.println('Press Enter to Begin Chat...');
        await this.terminal.current?.getInput();
        this.terminal.current?.println(
          `Initializing conversation with ${artifactName(this.artifact)} (${
            ArtifactTypeNames[this.artifact.artifactType]
          })`
        );

        this.terminal.current?.printLoadingSpinner();

        try {
          this.setLoading(true);
          this.conversation = await this.gameUIManager.startConversation(this.artifact.id);
          this.setConversation(this.conversation);
          this.terminal.current?.removeLast(2);
          this.terminal.current?.newline();
          this.printMessage(this.conversation.messages[0]);
          break;
        } catch (e) {
          this.terminal.current?.removeLast(2);
          this.terminal.current?.println(e.message, TerminalTextStyle.Red);
          this.terminal.current?.newline();
        } finally {
          this.setLoading(false);
        }
      }
    }

    while (true) {
      const questionsRemaining = this.getQuestionsRemaining();

      if (questionsRemaining !== undefined && questionsRemaining <= 0) {
        this.printMessage({
          entity: 'AI',
          message:
            'My translation mechanisms are failing. See you at the heat death of the universe.',
          highlights: [],
        });
        this.terminal.current?.println('[LINK DISCONNECTED]', TerminalTextStyle.Green);
        this.terminal.current?.println('No questions remaining.');
        this.terminal.current?.newline();
        this.terminal.current?.setUserInputEnabled(false);
        return;
      }

      const input =
        (await this.terminal.current?.getInput()) || ''; /* filter to see if input is valid */
      if (input.length > 200) {
        this.terminal.current?.println(
          `Input too long. ${input.length} chars received. (Max 200)`,
          TerminalTextStyle.Red
        );
      } else if (filter.isProfane(input)) {
        this.terminal.current?.println(
          'Profane words detected. Please try again.',
          TerminalTextStyle.Red
        );
      } else {
        /* if valid, send to gpt */
        try {
          this.terminal.current?.printLoadingSpinner();

          this.setLoading(true);
          const nextConvo = await this.gameUIManager.stepConversation(this.artifact.id, input);
          if (nextConvo) {
            this.conversation = nextConvo;
            this.setConversation(this.conversation);
          } else {
            throw new Error('unable to step conversation');
          }
        } catch (e) {
          this.terminal.current?.removeLast(2);
          this.terminal.current?.println(e.message, TerminalTextStyle.Red);
          this.terminal.current?.newline();
          continue;
        } finally {
          this.setLoading(false);
        }

        // remove newline, loading spinner, newline, input view, prompt character
        this.terminal.current?.removeLast(5);

        // re-print last user message as if it we loaded it from the webserver, not as if it was just inputted
        // into the terminal
        const lastUserMessage = this.conversation.messages[this.conversation.messages.length - 2];
        this.printMessage(lastUserMessage);

        // also print the last artifact message
        const lastArtifactMessage =
          this.conversation.messages[this.conversation.messages.length - 1];
        this.printMessage(lastArtifactMessage);
      }
    }
  }

  private printClean(
    message: string,
    style?: TerminalTextStyle,
    hoverContents?: () => JSX.Element
  ) {
    let cleanedVersion = message;

    if (message !== null && message.length !== 0) {
      cleanedVersion = clean(message);
    }

    this.terminal.current?.print(cleanedVersion, style, hoverContents);
  }

  private printAllMessages() {
    this.conversation?.messages?.forEach((m) => this.printMessage(m));
  }

  private printMessage(message: Message) {
    if (message.entity === 'AI') {
      this.terminal.current?.print(artifactName(this.artifact), TerminalTextStyle.Blue);
      this.terminal.current?.print(': ');
    } else {
      this.terminal.current?.print('Adventurer', TerminalTextStyle.White);
      this.terminal.current?.print(': ');
    }

    if (message.highlights.length === 0) {
      this.printClean(message.message);
    } else {
      let cursor = 0;
      for (const highlight of message.highlights) {
        this.printClean(message.message.substr(cursor, highlight.start - cursor));
        this.printClean(
          message.message.substr(highlight.start, highlight.stop - highlight.start),
          TerminalTextStyle.Hoverable,
          () => (
            <WikiPane>
              <WikiEntryTitle>{highlight.entry.name}</WikiEntryTitle>
              {highlight.entry.definition}
            </WikiPane>
          )
        );
        cursor = highlight.stop;
      }
      this.printClean(message.message.substr(cursor, message.message.length - cursor));
    }

    this.terminal.current?.newline();
    this.terminal.current?.newline();
  }
}

const WikiEntryTitle = styled.div`
  font-weight: bold;
  font-size: 150%;
  margin-bottom: 8px;
  text-decoration: underline;
  color: ${dfstyles.colors.text};
`;
