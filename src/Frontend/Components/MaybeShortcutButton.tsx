import { Setting } from '@darkforest_eth/types';
import React from 'react';
import { useUIManager } from '../Utils/AppHooks';
import { useBooleanSetting } from '../Utils/SettingsHooks';
import { Btn, ShortcutBtn } from './Btn';

/**
 * A button that will show shortcuts if enabled globally in the game, otherwise it will display a normal button
 *
 * Must ONLY be used when a GameUIManager is available.
 */
export function MaybeShortcutButton(
  props: React.ComponentProps<typeof Btn> | React.ComponentProps<typeof ShortcutBtn>
) {
  const uiManager = useUIManager();
  const [disableDefaultShortcuts] = useBooleanSetting(uiManager, Setting.DisableDefaultShortcuts);

  if (disableDefaultShortcuts) {
    return <Btn {...props} />;
  } else {
    return <ShortcutBtn {...props} />;
  }
}
