import { ModalName } from '@darkforest_eth/types';
import React from 'react';
import styled from 'styled-components';
import { Hook } from '../../_types/global/GlobalTypes';
import { Spacer } from '../Components/CoreUI';
import { Icon, IconType } from '../Components/Icons';
import { MaybeShortcutButton } from '../Components/MaybeShortcutButton';

const ModalIconText = styled.span`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  height: 26px;
`;

const icon = (modal: ModalName): React.ReactNode => {
  if (modal === ModalName.Help) return <Icon type={IconType.Help} />;
  else if (modal === ModalName.PlanetDetails) return <Icon type={IconType.Planet} />;
  else if (modal === ModalName.Leaderboard) return <Icon type={IconType.Leaderboard} />;
  else if (modal === ModalName.PlanetDex) return <Icon type={IconType.PlanetDex} />;
  else if (modal === ModalName.UpgradeDetails) return <Icon type={IconType.Upgrade} />;
  else if (modal === ModalName.TwitterVerify) return <Icon type={IconType.Twitter} />;
  else if (modal === ModalName.Broadcast) return <Icon type={IconType.Broadcast} />;
  else if (modal === ModalName.MapShare) return <Icon type={IconType.Share} />;
  else if (modal === ModalName.ManageAccount) return <Icon type={IconType.Lock} />;
  else if (modal === ModalName.Hats) return <Icon type={IconType.Hat} />;
  else if (modal === ModalName.Settings) return <Icon type={IconType.Settings} />;
  else if (modal === ModalName.Plugins) return <Icon type={IconType.Plugin} />;
  else if (modal === ModalName.YourArtifacts) return <Icon type={IconType.Artifact} />;
  else if (modal === ModalName.WithdrawSilver) return <Icon type={IconType.Withdraw} />;
  else if (modal === ModalName.TransactionLog) return <Icon type={IconType.DoubleArrows} />;
  return <span>T</span>;
};

/**
 * A button which allows you to open a modal.
 */
export function ModalToggleButton({
  modal,
  hook: [_active, setActive],
  text,
  style,
  ...props
}: {
  modal: ModalName;
  hook: Hook<boolean>;
  text?: string;
  style?: React.CSSProperties;
} & React.ComponentProps<typeof MaybeShortcutButton>) {
  const toggle = () => {
    setActive((b: boolean) => !b);
  };

  return (
    <MaybeShortcutButton {...props} onClick={toggle} onShortcutPressed={toggle}>
      <ModalIconText style={style}>
        {icon(modal)}
        {text !== undefined && (
          <>
            <Spacer width={8} />
            {text}
          </>
        )}
      </ModalIconText>
    </MaybeShortcutButton>
  );
}
