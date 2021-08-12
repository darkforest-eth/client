import React from 'react';
import styled from 'styled-components';
import { BtnProps } from '../Components/Btn';
import { ShortcutButton, Spacer } from '../Components/CoreUI';
import {
  ArtifactIcon,
  BroadcastIcon,
  HatIcon,
  HelpIcon,
  LeaderboardIcon,
  LockIcon,
  PlanetdexIcon,
  PlanetIcon,
  PluginIcon,
  SettingsIcon,
  ShareIcon,
  TwitterIcon,
  UpgradeIcon,
  WithdrawIcon,
} from '../Components/Icons';
import { ModalHook, ModalName } from './ModalPane';

const ModalIconText = styled.span`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const icon = (modal: ModalName): React.ReactNode => {
  if (modal === ModalName.Help) return <HelpIcon />;
  else if (modal === ModalName.PlanetDetails) return <PlanetIcon />;
  else if (modal === ModalName.Leaderboard) return <LeaderboardIcon />;
  else if (modal === ModalName.PlanetDex) return <PlanetdexIcon />;
  else if (modal === ModalName.UpgradeDetails) return <UpgradeIcon />;
  else if (modal === ModalName.TwitterVerify) return <TwitterIcon />;
  else if (modal === ModalName.Broadcast) return <BroadcastIcon />;
  else if (modal === ModalName.MapShare) return <ShareIcon />;
  else if (modal === ModalName.ManageAccount) return <LockIcon />;
  else if (modal === ModalName.Hats) return <HatIcon />;
  else if (modal === ModalName.Settings) return <SettingsIcon />;
  else if (modal === ModalName.Plugins) return <PluginIcon />;
  else if (modal === ModalName.YourArtifacts) return <ArtifactIcon />;
  else if (modal === ModalName.WithdrawSilver) return <WithdrawIcon />;
  return <span>T</span>;
};

/**
 * A button which allows you to open a modal.
 */
export function ModalToggleButton(
  props: {
    modal: ModalName;
    hook: ModalHook;
    text?: string;
    style?: React.CSSProperties;
    shortcutKey?: string;
  } & BtnProps
) {
  const {
    modal,
    hook: [_active, setActive],
    text,
  } = props;

  return (
    <ShortcutButton
      {...props}
      onClick={(e) => {
        setActive((b: boolean) => !b);
        e.stopPropagation();
      }}
    >
      <ModalIconText>
        {icon(modal)}
        {text !== undefined && (
          <>
            <Spacer width={8} />
            {text}
          </>
        )}
      </ModalIconText>
    </ShortcutButton>
  );
}

export function ModalArtifactIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.YourArtifacts}
      style={style}
      shortcutKey={shortcutKey}
      text={text}
    />
  );
}

export function ModalHelpIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.Help}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalPlanetDetailsIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.PlanetDetails}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalLeaderboardIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.Leaderboard}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalPlanetDexIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.PlanetDex}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalUpgradeDetailsIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.UpgradeDetails}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalMapShareIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.MapShare}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalTwitterVerifyIcon(
  props: {
    hook: ModalHook;
    text?: string;
    style?: React.CSSProperties;
    shortcutKey?: string;
  } & BtnProps
) {
  const { hook, text, style, shortcutKey } = props;

  return (
    <ModalToggleButton
      {...props}
      hook={hook}
      modal={ModalName.TwitterVerify}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalYourArtifactsIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.YourArtifacts}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function BroadcastPlanetIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.Broadcast}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalAccountIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.ManageAccount}
      style={style}
      shortcutKey={shortcutKey}
      text={text}
    />
  );
}

export function ModalSettingsIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.Settings}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalPluginIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.Plugins}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalArtifactsConversationIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.ArtifactConversation}
      text={text}
      style={style}
      shortcutKey={shortcutKey}
    />
  );
}

export function ModalWithdrawIcon({
  hook,
  text,
  style,
  shortcutKey,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
  shortcutKey?: string;
}) {
  return (
    <ModalToggleButton
      hook={hook}
      modal={ModalName.WithdrawSilver}
      style={style}
      shortcutKey={shortcutKey}
      text={text}
    />
  );
}
