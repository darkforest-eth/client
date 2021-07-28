import React from 'react';
import { usePlayer, useUIManager } from '../../Utils/AppHooks';
import { Link } from '../CoreUI';
import { TextPreview } from '../TextPreview';

/**
 * Returns a either a link to the player's twitter, or a {@link TextPreview} of their address.
 */
export function LoggedInPlayer() {
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

/**
 * Link to a twitter account.
 */
export function TwitterLink({ twitter, color }: { twitter: string; color?: string }) {
  return (
    <Link color={color} to={`https://twitter.com/${twitter}`}>
      @{twitter}
    </Link>
  );
}
