import React from 'react';
import styled from 'styled-components';
import { Spacer } from '../Components/CoreUI';
import { IconButton } from '../Components/IconButton';
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
`;

export function ModalIcon({
  modal,
  hook: [active, setActive],
  text,
  style,
}: {
  modal: ModalName;
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  const icon = (): React.ReactNode => {
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

  return (
    <IconButton
      style={style}
      onClick={(e) => {
        setActive((b) => !b);
        e.stopPropagation();
      }}
      className={active ? 'active' : undefined}
    >
      {icon()}
      {text !== undefined && (
        <ModalIconText>
          <Spacer width={8} />
          {text}
        </ModalIconText>
      )}
    </IconButton>
  );
}

export function ModalArtifactIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.YourArtifacts} style={style} text={text} />;
}

export function ModalHelpIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.Help} text={text} style={style} />;
}

export function ModalPlanetDetailsIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.PlanetDetails} text={text} style={style} />;
}

export function ModalLeaderboardIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.Leaderboard} text={text} style={style} />;
}

export function ModalPlanetDexIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.PlanetDex} text={text} style={style} />;
}

export function ModalUpgradeDetailsIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.UpgradeDetails} text={text} style={style} />;
}

export function ModalMapShareIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.MapShare} text={text} style={style} />;
}

export function ModalTwitterVerifyIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.TwitterVerify} text={text} style={style} />;
}

export function ModalYourArtifactsIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.YourArtifacts} text={text} style={style} />;
}

export function BroadcastPlanetIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.Broadcast} text={text} style={style} />;
}

export function ModalAccountIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.ManageAccount} style={style} text={text} />;
}

export function ModalHatIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.Hats} text={text} style={style} />;
}

export function ModalSettingsIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.Settings} text={text} style={style} />;
}

export function ModalPluginIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.Plugins} text={text} style={style} />;
}

export function ModalArtifactsConversationIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.ArtifactConversation} text={text} style={style} />;
}

export function ModalWithdrawIcon({
  hook,
  text,
  style,
}: {
  hook: ModalHook;
  text?: string;
  style?: React.CSSProperties;
}) {
  return <ModalIcon hook={hook} modal={ModalName.WithdrawSilver} style={style} text={text} />;
}
