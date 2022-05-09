/** This file contains some common utilities used by the Lobbies UI */
import React from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Initializers } from '../../../../../packages/settings/dist';
import { EthAddress } from '../../../../../packages/types/dist';
import { Btn, ShortcutBtn } from '../../Components/Btn';
import { Title } from '../../Components/CoreUI';
import { Row } from '../../Components/Row';
import { Red } from '../../Components/Text';
import { LobbyConfigAction, LobbyConfigState, toInitializers } from './Reducer';

export declare type LobbyPlanet = {
    x: number;
    y: number;
    level: number;
    planetType: number;
    isTargetPlanet: boolean;
    isSpawnPlanet: boolean;
}

export interface LobbiesPaneProps {
  config: LobbyConfigState;
  onUpdate: (change: LobbyConfigAction) => void;
}

export const ButtonRow = styled(Row)`
  gap: 8px;

  .button {
    flex: 1 1 50%;
  }
`;

export const mirrorX = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' style = {{fill : '#bbbbbb'}}>
    <g>
      <path d='M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z' />
    </g>
  </svg>
);

export const mirrorY = (
  <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='20' transform = "rotate(90)" style = {{fill : '#bbbbbb'}}>
    <g>
      <path d='M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z' />
    </g>
  </svg>
);

export function LinkButton({
  to,
  shortcut,
  children,
  disabled = false
}: React.PropsWithChildren<{ to: string; shortcut?: string; disabled?: boolean}>) {
  const { url } = useRouteMatch();
  const history = useHistory();

  function navigate() {
    history.push(`${url}${to}`);
  }

  // Adding className="button" so ButtonRow will add the flex stuff
  return (
    <ShortcutBtn
      className='button'
      size='stretch'
      onClick={navigate}
      onShortcutPressed={navigate}
      shortcutKey={shortcut}
      shortcutText={shortcut}
      disabled = {disabled}
    >
      {children}
    </ShortcutBtn>
  );
}

export function NavigationTitle({ children }: React.PropsWithChildren<unknown>) {
  const history = useHistory();

  const shortcut = 't';

  function goBack() {
    history.goBack();
  }

  return (
    <>
      <ShortcutBtn
        slot='title'
        size='small'
        onClick={goBack}
        onShortcutPressed={goBack}
        shortcutKey={shortcut}
        shortcutText={shortcut}
      >
        back
      </ShortcutBtn>
      <Title slot='title'>{children}</Title>
    </>
  );
}

export function Warning({ children }: React.PropsWithChildren<unknown>) {
  if (!children) {
    return null;
  } else {
    return (
      <div style={{ margin: 'auto', maxWidth: '80%', textAlign: 'center' }}>
        <Red>Error:</Red> {children}
      </div>
    );
  }
}

export function ConfigDownload({
  onError,
  address,
  config,
  disabled = false
}: {
  onError: (msg: string) => void;
  address: EthAddress | undefined;
  config: LobbyConfigState;
  disabled? : boolean;
}) {
  function doDownload() {
    try {
      const initializers = toInitializers(config);
      const blob = new Blob([JSON.stringify(initializers, null, 2)], { type: 'application/json' });
      const name = address
        ? `${address.substring(0, 6)}-lobbies-config.json`
        : 'lobbies-config.json';
      const blobAsUrl = (window.webkitURL || window.URL).createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = blobAsUrl;
      anchor.download = name;
      anchor.click();
    } catch (err) {
      console.error(err);
      onError('Unable to download config file');
    }
  }

  return (
    <Btn disabled = {disabled} slot='title' size='small' onClick={doDownload}>
      Download
    </Btn>
  );
}

export function ConfigUpload({
  onError,
  onUpload,
  disabled = false

}: {
  onError: (msg: string) => void;
  onUpload: (initializers: Initializers) => void;
  disabled? : boolean;
}) {
  function doUpload() {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        try {
          onUpload(JSON.parse(reader.result));
        } catch (err) {
          onError('Cannot process uploaded JSON');
        }
      } else {
        onError('Could not read uploaded file');
      }
    };
    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.onchange = () => {
      try {
        const file = inputFile.files?.item(0);

        if (file) {
          reader.readAsText(file);
        } else {
          onError('Could not find a file to upload');
        }
      } catch (err) {
        console.error(err);
        onError('Upload failed');
      }
    };
    inputFile.click();
  }

  return (
    <Btn disabled = {disabled} slot='title' size='small' onClick={doUpload}>
      Upload
    </Btn>
  );
}
