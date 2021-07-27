import React from 'react';
import { usePlayer, useUIManager } from '../../Utils/AppHooks';
import { HoverLink } from '../CoreUI';
import { TextPreview } from '../TextPreview';

export function AccountLabel() {
  const uiManager = useUIManager();
  const player = usePlayer(uiManager);

  if (player.value !== undefined && player.value.twitter !== undefined) {
    return <TwitterLink twitter={player.value.twitter} />;
  }

  return (
    <TextPreview
      text={uiManager.getAccount() || '<no account>'}
      unFocusedWidth={'350px'}
      focusedWidth={'350px'}
    />
  );
}

export function TwitterLink({ twitter, color }: { twitter: string; color?: string }) {
  return (
    <HoverLink color={color} href={`https://twitter.com/${twitter}`} target='_blank'>
      @{twitter}
    </HoverLink>
  );
}
