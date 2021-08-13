import { EthAddress } from '@darkforest_eth/types';
import colorFn from 'color';
import React from 'react';
import { ProcgenUtils } from '../../../Backend/Procedural/ProcgenUtils';
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
    const color = colorFn(ProcgenUtils.getPlayerColor(player.value.address)).darken(0.5).hex();
    return (
      <span>
        <TwitterLink twitter={player.value.twitter} color={color} />
        {includeAddressIfHasTwitter && (
          <Sub>
            {' '}
            <TextPreview
              text={ethAddress || uiManager.getAccount() || '<no account>'}
              unFocusedWidth={'50px'}
              focusedWidth={'50px'}
            />
          </Sub>
        )}
      </span>
    );
  }

  return (
    <TextPreview
      text={ethAddress || uiManager.getAccount() || '<no account>'}
      unFocusedWidth={'150px'}
      focusedWidth={'150px'}
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
