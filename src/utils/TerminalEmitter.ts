import { EventEmitter } from 'events';
import { defaultTypistProps, shellProps } from '../app/Terminal';
import { TerminalPromptType } from '../_types/darkforest/app/board/utils/TerminalTypes';

export enum TerminalTextStyle {
  Green,
  Sub,
  White,
  Red,
  Blue,
  Invisible,
  Default,
  Underline,
}

export enum TerminalEvent {
  Print = 'Print',
  PrintLink = 'PrintLink',
  PrintLn = 'PrintLn',
  Newline = 'Newline',
  Shell = 'Shell',
  EnableUserInput = 'EnableUserInput',
  DisableUserInput = 'DisableUserInput',
  UserEnteredInput = 'UserEnteredInput',
  SkipAllTyping = 'SkipAllTyping',
  ChangePromptType = 'ChangePromptType',
  AllowUnfocusInput = 'AllowUnfocusInput',
}

class TerminalEmitter extends EventEmitter {
  static instance: TerminalEmitter;

  private constructor() {
    super();
  }

  static getInstance(): TerminalEmitter {
    if (!TerminalEmitter.instance) {
      TerminalEmitter.instance = new TerminalEmitter();
    }

    return TerminalEmitter.instance;
  }

  static initialize(): TerminalEmitter {
    const terminalEmitter = new TerminalEmitter();

    return terminalEmitter;
  }

  print(
    str: string,
    style: TerminalTextStyle = TerminalTextStyle.Default,
    skipTyping = false,
    typistProps = defaultTypistProps,
    recordAsInput: string | null = null
  ) {
    this.emit(
      TerminalEvent.Print,
      str,
      style,
      skipTyping,
      typistProps,
      recordAsInput
    );
  }

  newline() {
    this.emit(TerminalEvent.Newline);
  }

  println(
    str: string,
    style: TerminalTextStyle = TerminalTextStyle.Default,
    skipTyping = false,
    typistProps = defaultTypistProps,
    recordAsInput: string | null = null
  ) {
    this.emit(
      TerminalEvent.Print,
      str,
      style,
      skipTyping,
      typistProps,
      recordAsInput
    );
    this.emit(TerminalEvent.Newline);
  }

  printLink(
    str: string,
    onClick: () => void,
    style: TerminalTextStyle = TerminalTextStyle.Default,
    skipTyping = false,
    recordAsInput: string | null = null
  ) {
    this.emit(
      TerminalEvent.PrintLink,
      str,
      onClick,
      style,
      skipTyping,
      recordAsInput
    );
  }

  changePromptType(promptType: TerminalPromptType) {
    this.emit(TerminalEvent.ChangePromptType, promptType);
  }

  bashShell(str: string) {
    this.emit(
      TerminalEvent.Print,
      '$ ',
      TerminalTextStyle.Green,
      false,
      shellProps
    );
    this.emit(
      TerminalEvent.Print,
      str,
      TerminalTextStyle.White,
      false,
      shellProps
    );
    this.emit(TerminalEvent.Newline);
  }

  jsShell(str: string) {
    this.emit(
      TerminalEvent.Print,
      '> ',
      TerminalTextStyle.Blue,
      false,
      shellProps
    );
    this.emit(
      TerminalEvent.Print,
      str,
      TerminalTextStyle.White,
      false,
      shellProps,
      str
    );
    this.emit(TerminalEvent.Newline);
  }

  enableUserInput() {
    this.emit(TerminalEvent.EnableUserInput);
  }

  disableUserInput() {
    this.emit(TerminalEvent.DisableUserInput);
  }

  allowUnfocusInput() {
    this.emit(TerminalEvent.AllowUnfocusInput);
  }
}

export default TerminalEmitter;
