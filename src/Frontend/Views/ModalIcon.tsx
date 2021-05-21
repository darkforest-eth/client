import React from 'react';
import { IconButton } from '../Components/IconButton';
import {
  HelpIcon,
  PlanetIcon,
  LeaderboardIcon,
  PlanetdexIcon,
  UpgradeIcon,
  TwitterIcon,
  BroadcastIcon,
  ShareIcon,
  LockIcon,
  HatIcon,
  SettingsIcon,
  PluginIcon,
  ArtifactIcon,
  WithdrawIcon,
} from '../Components/Icons';
import { TooltipName } from '../Game/WindowManager';
import { ModalName, ModalHook } from './ModalPane';
import { TooltipTrigger } from '../Panes/Tooltip';

export function ModalIcon({
  modal,
  hook: [active, setActive],
}: {
  modal: ModalName;
  hook: ModalHook;
}) {
  const child = (): React.ReactNode => {
    if (modal === ModalName.Help) return <HelpIcon />;
    else if (modal === ModalName.PlanetDetails) return <PlanetIcon />;
    else if (modal === ModalName.Leaderboard) return <LeaderboardIcon />;
    else if (modal === ModalName.PlanetDex) return <PlanetdexIcon />;
    else if (modal === ModalName.UpgradeDetails) return <UpgradeIcon />;
    else if (modal === ModalName.TwitterVerify) return <TwitterIcon />;
    else if (modal === ModalName.TwitterBroadcast) return <BroadcastIcon />;
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
    <TooltipTrigger
      name={TooltipName.ModalHelp + modal}
      display='inline-block'
      style={{ height: '1.5em' }}
    >
      <IconButton
        onClick={(e) => {
          setActive((b) => !b);
          e.stopPropagation();
        }}
        className={active ? 'active' : undefined}
      >
        {child()}
      </IconButton>
    </TooltipTrigger>
  );
}

export function ModalArtifactIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.YourArtifacts} />;
}

export function ModalHelpIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.Help} />;
}

export function ModalPlanetDetailsIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.PlanetDetails} />;
}

export function ModalLeaderboardIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.Leaderboard} />;
}

export function ModalPlanetDexIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.PlanetDex} />;
}

export function ModalUpgradeDetailsIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.UpgradeDetails} />;
}

export function ModalMapShareIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.MapShare} />;
}

export function ModalTwitterVerifyIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.TwitterVerify} />;
}

export function ModalYourArtifactsIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.YourArtifacts} />;
}

export function ModalTwitterBroadcastIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.TwitterBroadcast} />;
}

export function ModalAccountIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.ManageAccount} />;
}

export function ModalHatIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.Hats} />;
}

export function ModalSettingsIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.Settings} />;
}

export function ModalPluginIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.Plugins} />;
}

export function ModalArtifactsConversationIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.ArtifactConversation} />;
}

export function ModalWithdrawIcon({ hook }: { hook: ModalHook }) {
  return <ModalIcon hook={hook} modal={ModalName.WithdrawSilver} />;
}
