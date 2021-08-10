import React, { useState } from 'react';
import styled from 'styled-components';
import { BorderlessPane, EmSpacer } from '../Components/CoreUI';
import { GameWindowZIndex } from '../Utils/constants';
import {
  TOGGLE_HELP_PANE,
  TOGGLE_PLUGINS_PANE,
  TOGGLE_SETTINGS_PANE,
  TOGGLE_YOUR_ARTIFACTS_PANE,
  TOGGLE_YOUR_PLANETS_DEX_PANE,
} from '../Utils/ShortcutConstants';
import {
  ModalHelpIcon,
  ModalPlanetDexIcon,
  ModalPluginIcon,
  ModalSettingsIcon,
  ModalYourArtifactsIcon,
} from './ModalIcon';
import { ModalHook } from './ModalPane';

export function SidebarPane({
  settingsHook,
  helpHook,
  pluginsHook,
  yourArtifactsHook,
  planetdexHook,
}: {
  settingsHook: ModalHook;
  helpHook: ModalHook;
  pluginsHook: ModalHook;
  yourArtifactsHook: ModalHook;
  planetdexHook: ModalHook;
}) {
  const [sidebarHovered, setSidebarHovered] = useState<boolean>(false);

  return (
    <WindowTogglesPaneContainer
      onMouseEnter={() => setSidebarHovered(true)}
      onMouseLeave={() => setSidebarHovered(false)}
    >
      <BorderlessPane style={{ zIndex: sidebarHovered ? GameWindowZIndex.Tooltip : undefined }}>
        <ModalSettingsIcon
          hook={settingsHook}
          style={{
            width: '100%',
            height: '2em',
            padding: '4px 8px',
          }}
          text={sidebarHovered ? 'Settings' : undefined}
          shortcutKey={sidebarHovered ? TOGGLE_SETTINGS_PANE : undefined}
        />
        <EmSpacer height={0.5} />
        <ModalHelpIcon
          hook={helpHook}
          style={{
            width: '100%',
            height: '2em',
            padding: '4px 8px',
          }}
          text={sidebarHovered ? 'Help' : undefined}
          shortcutKey={sidebarHovered ? TOGGLE_HELP_PANE : undefined}
        />
        <EmSpacer height={0.5} />

        <ModalPluginIcon
          hook={pluginsHook}
          style={{
            width: '100%',
            height: '2em',
            padding: '4px 8px',
          }}
          text={sidebarHovered ? 'Plugins' : undefined}
          shortcutKey={sidebarHovered ? TOGGLE_PLUGINS_PANE : undefined}
        />
        <EmSpacer height={0.5} />
        <ModalYourArtifactsIcon
          hook={yourArtifactsHook}
          style={{
            width: '100%',
            height: '2em',
            padding: '4px 8px',
          }}
          text={sidebarHovered ? 'Your Artifacts' : undefined}
          shortcutKey={sidebarHovered ? TOGGLE_YOUR_ARTIFACTS_PANE : undefined}
        />
        <EmSpacer height={0.5} />
        <ModalPlanetDexIcon
          hook={planetdexHook}
          style={{
            width: '100%',
            height: '2em',
            padding: '4px 8px',
          }}
          text={sidebarHovered ? 'Your Planets' : undefined}
          shortcutKey={sidebarHovered ? TOGGLE_YOUR_PLANETS_DEX_PANE : undefined}
        />
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
