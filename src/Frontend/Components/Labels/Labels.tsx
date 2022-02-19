import { EMPTY_ADDRESS } from '@darkforest_eth/constants';
import { getPlayerColor } from '@darkforest_eth/procedural';
import { EthAddress } from '@darkforest_eth/types';
import colorFn from 'color';
import React from 'react';
import { usePlayer, useUIManager } from '../../Utils/AppHooks';
import { Link } from '../CoreUI';
import { Sub } from '../Text';
import { TextPreview } from '../TextPreview';

export function AccountLabel({
  includeAddressIfHasTwitter,
  ethAddress,
  width,
  style,
}: {
  includeAddressIfHasTwitter?: boolean;
  ethAddress?: EthAddress;
  width?: string;
  style?: React.CSSProperties;
}) {
  const uiManager = useUIManager();
  const player = usePlayer(uiManager, ethAddress);

  if (player.value !== undefined && player.value.twitter !== undefined) {
    const color = colorFn(getPlayerColor(player.value.address)).darken(0.5).hex();
    return (
      <span style={style}>
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

  if (ethAddress === EMPTY_ADDRESS) {
    return <>nobody</>;
  }

  return (
    <TextPreview
      text={ethAddress || uiManager.getAccount() || '<no account>'}
      unFocusedWidth={width ?? '150px'}
      focusedWidth={width ?? '150px'}
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
