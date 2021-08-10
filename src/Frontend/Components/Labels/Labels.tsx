import { EthAddress } from '@darkforest_eth/types';
import React from 'react';
import { usePlayer, useUIManager } from '../../Utils/AppHooks';
import { Link } from '../CoreUI';
import { Sub } from '../Text';
import { TextPreview } from '../TextPreview';

export function AccountLabel({
  includeAddressIfHasTwitter,
  ethAddress,
}: {
  includeAddressIfHasTwitter?: boolean;
  ethAddress?: EthAddress;
}) {
  const uiManager = useUIManager();
  const player = usePlayer(uiManager, ethAddress);

  if (player.value !== undefined && player.value.twitter !== undefined) {
    return (
      <>
        <TwitterLink twitter={player.value.twitter} />
        {includeAddressIfHasTwitter && (
          <Sub>
            (
            <TextPreview
              text={ethAddress || uiManager.getAccount() || '<no account>'}
              unFocusedWidth={'100px'}
              focusedWidth={'100px'}
            />
            )
          </Sub>
        )}
      </>
    );
  }

  return (
    <TextPreview
      text={ethAddress || uiManager.getAccount() || '<no account>'}
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
