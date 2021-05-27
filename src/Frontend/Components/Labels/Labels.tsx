import { EthAddress } from '@darkforest_eth/types';
import React from 'react';
import { useTwitter, useUIManager } from '../../Utils/AppHooks';
import { TextPreview } from '../TextPreview';

export function AccountLabel({ account }: { account: EthAddress | undefined }) {
  const uiManager = useUIManager();
  const twitter = useTwitter(account, uiManager);

  let content;
  if (account)
    content = twitter ? (
      <>@{twitter}</>
    ) : (
      <TextPreview text={account} unFocusedWidthPx={100} focusedWidthPx={100} />
    );

  return <>{content}</>;
}
