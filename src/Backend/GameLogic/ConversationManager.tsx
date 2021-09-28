import {
  ArtifactRarity,
  ArtifactRarityNames,
  ArtifactType,
  ArtifactTypeNames,
  Conversation,
  ConversationArtifact,
  Message,
} from '@darkforest_eth/types';
import React from 'react';
import { TerminalTextStyle } from '../../Frontend/Utils/TerminalTypes';
import { TerminalHandle } from '../../Frontend/Views/Terminal';
import { startConversationOpenAI, stepConversationOpenAI } from '../Network/ConversationAPI';

const BadwordsFilter = require('bad-words');
const filter = new BadwordsFilter();

const clean = (str: string): string => filter.clean(str);

export class ConversationManager {
  private terminal: React.MutableRefObject<TerminalHandle | undefined>;
  private conversation: Conversation;
  private username: string;
  private artifact: ConversationArtifact;
  private setConversation: (conversation: Conversation) => void;
  private setLoading: (loading: boolean) => void;

  // TODO 0.6: hook this up to an actual artifact id
  private artifactId: string;

  constructor(
    terminal: React.MutableRefObject<TerminalHandle | undefined>,
    setConversation: (conversation: Conversation) => void,
    setLoading: (loading: boolean) => void,
    artifactType: ArtifactType,
    artifactRarity: ArtifactRarity
  ) {
    this.terminal = terminal;
    this.setConversation = setConversation;
    this.setLoading = setLoading;
    this.username = 'Ivan';
    this.artifact = {
      type: artifactType,
      rarity: artifactRarity,
      name: 'Qora',
    };
    this.artifactId = `prototype-ui-${ArtifactRarityNames[artifactRarity]}-${ArtifactTypeNames[artifactType]}`;
  }

  public async start() {
    this.terminal.current?.println('Press Enter to Begin...');
    await this.terminal.current?.getInput();
    this.terminal.current?.println('');

    this.terminal.current?.println(
      `Initializing conversation with ${this.artifact.name} (${this.artifact.type})`
    );
    this.terminal.current?.printLoadingSpinner();

    try {
      this.setLoading(true);
      this.conversation = await startConversationOpenAI(
        this.artifact,
        this.artifactId,
        this.username
      );
      this.setConversation(this.conversation);
    } catch (e) {
      this.terminal.current?.removeLast(2);
      this.terminal.current?.println(e.message, TerminalTextStyle.Red);
      return;
    } finally {
      this.setLoading(false);
    }
    this.terminal.current?.removeLast(2);

    let didError = false;

    while (true) {
      let removeLast = true;
      const lastMessage = this.conversation.messages[this.conversation.messages.length - 1];

      this.terminal.current?.print(this.artifact.name, TerminalTextStyle.Blue);
      this.terminal.current?.print(': ');
      if (!didError) {
        this.printLastMessage(lastMessage);
      } else {
        this.printClean('[TRANSLATION ERROR]. I was not able to understand. Try again.');
        didError = false;
      }
      this.terminal.current?.newline();
      const input = (await this.terminal.current?.getInput()) || '';

      /* filter to see if input is valid */
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
          const nextConvo = await stepConversationOpenAI(this.artifactId, input);

          this.conversation = nextConvo;
          this.setConversation(this.conversation);
        } catch (e) {
          this.terminal.current?.removeLast(2);
          this.terminal.current?.println(e.message, TerminalTextStyle.Red);
          removeLast = false;
          didError = true;
        } finally {
          this.setLoading(false);
        }
        if (removeLast) this.terminal.current?.removeLast(2);
      }
    }
  }

  private printClean(message: string, style?: TerminalTextStyle) {
    let cleanedVersion = message;

    if (message !== null && message.length !== 0) {
      cleanedVersion = clean(message);
    }

    this.terminal.current?.print(cleanedVersion, style);
  }

  private printLastMessage(message: Message) {
    if (message.highlights.length === 0) {
      this.printClean(message.message);
      return;
    }

    let cursor = 0;
    for (const highlight of message.highlights) {
      this.printClean(message.message.substr(cursor, highlight.start - cursor));
      this.printClean(message.message.substr(highlight.start, highlight.stop - highlight.start));
      cursor = highlight.stop;
    }
    this.terminal.current?.print(message.message.substr(cursor, message.message.length - cursor));
    this.terminal.current?.newline();
  }
}
