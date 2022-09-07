import { ModalName } from '@darkforest_eth/types';
import { IconType } from '@darkforest_eth/ui';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Hook } from '../../../_types/global/GlobalTypes';
import { BorderlessPane, EmSpacer, Spacer } from '../../Components/CoreUI';
import { Icon } from '../../Components/Icons';
import { MaybeShortcutButton } from '../../Components/MaybeShortcutButton';
import { DFZIndex } from '../../Utils/constants';
import {
  QUIT,
  TOGGLE_HELP_PANE,
  TOGGLE_PLUGINS_PANE,
  TOGGLE_SETTINGS_PANE,
  TOGGLE_TRANSACTIONS_PANE,
  TOGGLE_YOUR_ARTIFACTS_PANE,
  TOGGLE_YOUR_PLANETS_DEX_PANE,
} from '../../Utils/ShortcutConstants';
import { ModalIconText, ModalToggleButton } from '../../Views/ModalIcon';

export function SidebarPane({
  settingsHook,
  helpHook,
  pluginsHook,
  yourArtifactsHook,
  planetdexHook,
  exitHook,
}: {
  settingsHook: Hook<boolean>;
  helpHook: Hook<boolean>;
  pluginsHook: Hook<boolean>;
  yourArtifactsHook: Hook<boolean>;
  planetdexHook: Hook<boolean>;
  exitHook: () => void;
}) {
  const [sidebarHovered, setSidebarHovered] = useState<boolean>(false);
  const history = useHistory();

  return (
    <WindowTogglesPaneContainer
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      <BorderlessPane style={{ zIndex: sidebarHovered ? DFZIndex.Tooltip : undefined }}>
        <ModalToggleButton
          modal={ModalName.Settings}
          hook={settingsHook}
          text={sidebarHovered ? 'Settings' : undefined}
          size='stretch'
          shortcutKey={TOGGLE_SETTINGS_PANE}
          shortcutText={sidebarHovered ? TOGGLE_SETTINGS_PANE : undefined}
        />
        <EmSpacer height={0.5} />
        <ModalToggleButton
          modal={ModalName.Help}
          hook={helpHook}
          text={sidebarHovered ? 'Help' : undefined}
          size='stretch'
          shortcutKey={TOGGLE_HELP_PANE}
          shortcutText={sidebarHovered ? TOGGLE_HELP_PANE : undefined}
        />
        <EmSpacer height={0.5} />
        <ModalToggleButton
          modal={ModalName.Plugins}
          hook={pluginsHook}
          text={sidebarHovered ? 'Plugins' : undefined}
          size='stretch'
          shortcutKey={TOGGLE_PLUGINS_PANE}
          shortcutText={sidebarHovered ? TOGGLE_PLUGINS_PANE : undefined}
        />
        <EmSpacer height={0.5} />
        <ModalToggleButton
          modal={ModalName.YourArtifacts}
          hook={yourArtifactsHook}
          text={sidebarHovered ? 'Your Inventory' : undefined}
          size='stretch'
          shortcutKey={TOGGLE_YOUR_ARTIFACTS_PANE}
          shortcutText={sidebarHovered ? TOGGLE_YOUR_ARTIFACTS_PANE : undefined}
        />
        <EmSpacer height={0.5} />
        <ModalToggleButton
          modal={ModalName.PlanetDex}
          hook={planetdexHook}
          text={sidebarHovered ? 'Your Planets' : undefined}
          size='stretch'
          shortcutKey={TOGGLE_YOUR_PLANETS_DEX_PANE}
          shortcutText={sidebarHovered ? TOGGLE_YOUR_PLANETS_DEX_PANE : undefined}
        />
        <EmSpacer height={0.5} />{' '}
        <MaybeShortcutButton
          onClick={exitHook}
          shortcutKey={QUIT}
          shortcutText={sidebarHovered ? QUIT : undefined}
          onShortcutPressed={exitHook}
          size='stretch'
        >
          <ModalIconText>
            <Icon type={IconType.Exit} />
            {sidebarHovered && (
              <>
                <Spacer width={8} />
                Exit
              </>
            )}
          </ModalIconText>
        </MaybeShortcutButton>
      </BorderlessPane>
    </WindowTogglesPaneContainer>
  );
}

const WindowTogglesPaneContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
`;
