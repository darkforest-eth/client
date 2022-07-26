/** This file contains some common utilities used by the Lobbies UI */
import { Initializers } from '@darkforest_eth/settings';
import { EthAddress, LocationId, WorldCoords } from '@darkforest_eth/types';
import React, { ChangeEvent, MouseEventHandler, useCallback } from 'react';
import { useHistory, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { LobbyAdminTools } from '../../../Backend/Utils/LobbyAdminTools';
import { Btn, ShortcutBtn } from '../../Components/Btn';
import { Select, Title } from '../../Components/CoreUI';
import { Row } from '../../Components/Row';
import { Red } from '../../Components/Text';
import { LobbyConfigAction, LobbyConfigState, LobbyInitializers, toInitializers } from './Reducer';

export declare type LobbyPlanet = {
  x: number;
  y: number;
  level: number;
  planetType: number;
  isTargetPlanet: boolean;
  isSpawnPlanet: boolean;
  blockedPlanetLocs: WorldCoords[];
};

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
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='20'
    style={{ fill: '#bbbbbb' }}
  >
    <g>
      <path d='M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z' />
    </g>
  </svg>
);

export const mirrorY = (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width='20'
    transform='rotate(90)'
    style={{ fill: '#bbbbbb' }}
  >
    <g>
      <path d='M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z' />
    </g>
  </svg>
);

export function LinkButton({
  to,
  shortcut,
  children,
  disabled = false,
}: React.PropsWithChildren<{ to: string; shortcut?: string; disabled?: boolean }>) {
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
      disabled={disabled}
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
  renderer: Renderer,
  disabled = false,
}: {
  onError: (msg: string) => void;
  address: EthAddress | undefined;
  config: LobbyConfigState;
  renderer?: () => JSX.Element;
  disabled?: boolean;
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

  if (Renderer) {
    return (
      <div onClick={doDownload}>
        <Renderer />
      </div>
    );
  } else {
    return (
      <Btn disabled={disabled} slot='title' size='small' onClick={doDownload}>
        Download map (JSON)
      </Btn>
    );
  }
}

export function ConfigUpload({
  onError,
  onUpload,
  disabled = false,
  renderer: Renderer,
}: {
  onError: (msg: string) => void;
  onUpload: (initializers: Initializers) => void;
  disabled?: boolean;
  renderer?: () => JSX.Element;
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
    inputFile.accept = 'application/json'; // enforce only JSON file uploads in file picker
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

  if (Renderer) {
    return (
      <div onClick={doUpload}>
        <Renderer />
      </div>
    );
  } else {
    return (
      <Btn disabled={disabled} slot='title' size='small' onClick={doUpload}>
        Upload custom map (JSON)
      </Btn>
    );
  }
}

export function SelectMultipleFrom({
  options,
  values,
  setValues,
  style,
  wide,
}: {
  options: WorldCoords[];
  values: WorldCoords[];
  setValues: (values: WorldCoords[]) => void;
  style?: React.CSSProperties;
  wide?: boolean;
}) {
  const onSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    console.log('e:', e);
    // else setValues([...values, elem]);
  };

  const optionStrings = options.map((option) => `x: ${option.x}, y: ${option.y}`);

  const v = `${values.length} selected`;

  return (
    <Select wide={wide} style={style} value={v} onChange={onSelect}>
      {[v, ...optionStrings].map((label, i) => {
        return (
          <option key={`label-${i}`} value={i}>
            {label}
            {values.find((v) => label == `x: ${v.x}, y: ${v.y}`) && ' f'}
          </option>
        );
      })}
    </Select>
  );
}

export const removeAlphabet = (str: string) => str.replace(/[^0-9]/g, '');

export const CloseButton: React.FC<{ onClick: (e?: any) => void }> = ({ onClick }) => {
  return (
    <CloseButtonStyle onClick={onClick}>
      <CloseIcon />
    </CloseButtonStyle>
  );
};

export const CloseIcon = () => {
  return (
    <svg width='15' height='15' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z'
        fill='currentColor'
        fillRule='evenodd'
        clipRule='evenodd'
      ></path>
    </svg>
  );
};

export const CloseButtonStyle = styled.div`
  height: 24px;
  width: 24px;
  border-radius: 4px;
  background-color: #3e3e3e;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #505050;
  }
`;

export const DEFAULT_PLANET: LobbyPlanet = {
  x: 0,
  y: 0,
  level: 0,
  planetType: 0,
  isTargetPlanet: false,
  isSpawnPlanet: false,
  blockedPlanetLocs: [],
};

export const PLANET_TYPE_NAMES = ['Planet', 'Asteroid Field', 'Foundry', 'Spacetime Rip', 'Quasar'];

export const Logo = ({ width }: { width?: number }) => {
  return (
    <svg
      width={width ?? '162'}
      height='92'
      viewBox='0 0 162 92'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M137.33 76.8675C151.706 68.7032 160.088 57.7175 160.088 46C160.088 34.2825 151.706 23.2968 137.33 15.1325C123.01 6.99978 103.098 1.90883 80.9998 1.90883C58.9018 1.90883 38.9903 6.99978 24.6693 15.1325C10.293 23.2968 1.91183 34.2825 1.91183 46C1.91183 57.7175 10.293 68.7032 24.6693 76.8675C38.9903 85.0002 58.9018 90.0912 80.9998 90.0912C103.098 90.0912 123.01 85.0002 137.33 76.8675ZM80.9998 92C125.735 92 162 71.4051 162 46C162 20.5949 125.735 0 80.9998 0C36.2648 0 0 20.5949 0 46C0 71.4051 36.2648 92 80.9998 92Z'
        fill='white'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M78.9748 90.0912C106.052 90.0912 127.688 70.1855 127.688 46C127.688 21.8145 106.052 1.90883 78.9748 1.90883C51.8978 1.90883 30.2619 21.8145 30.2619 46C30.2619 70.1855 51.8978 90.0912 78.9748 90.0912ZM78.9748 92C106.934 92 129.6 71.4051 129.6 46C129.6 20.5949 106.934 0 78.9748 0C51.0156 0 28.3499 20.5949 28.3499 46C28.3499 71.4051 51.0156 92 78.9748 92Z'
        fill='white'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M91.5435 77.7587C95.0784 69.7289 97.3131 58.5018 97.3131 46C97.3131 33.4982 95.0784 22.2711 91.5435 14.2413C89.7749 10.2234 87.7183 7.09162 85.5314 4.99066C83.3541 2.89851 81.1414 1.90883 78.9748 1.90883C76.8085 1.90883 74.5959 2.89851 72.4182 4.99066C70.2314 7.09162 68.1751 10.2234 66.4062 14.2413C62.8712 22.2711 60.6369 33.4982 60.6369 46C60.6369 58.5018 62.8712 69.7289 66.4062 77.7587C68.1751 81.7766 70.2314 84.9084 72.4182 87.0093C74.5959 89.1015 76.8085 90.0912 78.9748 90.0912C81.1414 90.0912 83.3541 89.1015 85.5314 87.0093C87.7183 84.9084 89.7749 81.7766 91.5435 77.7587ZM78.9748 92C90.1586 92 99.2248 71.4051 99.2248 46C99.2248 20.5949 90.1586 0 78.9748 0C67.7913 0 58.7249 20.5949 58.7249 46C58.7249 71.4051 67.7913 92 78.9748 92Z'
        fill='white'
      />
      <path
        d='M17.9719 32.2569C17.9719 31.9567 17.9281 31.7253 17.8404 31.5625C17.7652 31.4002 17.6337 31.2811 17.4459 31.2062C17.258 31.1313 17.0075 31.0875 16.6944 31.0751C16.3938 31.0626 16.0181 31.0563 15.5672 31.0563V59.8695C16.0181 59.8695 16.3938 59.8633 16.6944 59.8508C17.0075 59.8379 17.258 59.7942 17.4459 59.7193C17.6337 59.6443 17.7652 59.5253 17.8404 59.3629C17.9281 59.2002 17.9719 58.9691 17.9719 58.669V32.2569ZM20.3766 58.669C20.3766 59.4191 20.2388 60.0007 19.9632 60.4132C19.6877 60.8136 19.3245 61.1075 18.8736 61.2949C18.4228 61.4826 17.9093 61.595 17.3331 61.6325C16.757 61.6578 16.1684 61.6703 15.5672 61.6703H13.1625V29.2555H15.5672C16.1684 29.2555 16.757 29.2742 17.3331 29.3117C17.9093 29.3367 18.4228 29.4428 18.8736 29.6306C19.3245 29.8179 19.6877 30.1181 19.9632 30.531C20.2388 30.931 20.3766 31.5063 20.3766 32.2569V58.669Z'
        fill='white'
      />
      <path d='M45.9421 31.0563H48.9479V29.2555H43.5374V61.6703H45.9421V31.0563Z' fill='white' />
      <path
        d='M79.7342 32.2569C79.7342 31.9567 79.6904 31.7253 79.6025 31.5625C79.5274 31.4002 79.3961 31.2811 79.2081 31.2062C79.0201 31.1313 78.7699 31.0875 78.4568 31.0751C78.1562 31.0626 77.7802 31.0563 77.3295 31.0563V59.8695C77.7802 59.8695 78.1562 59.8633 78.4568 59.8508C78.7699 59.8379 79.0201 59.7942 79.2081 59.7193C79.3961 59.6443 79.5274 59.5253 79.6025 59.3629C79.6904 59.2002 79.7342 58.9691 79.7342 58.669V32.2569ZM82.1389 58.669C82.1389 59.4191 82.0009 60.0007 81.7253 60.4132C81.4498 60.8136 81.0866 61.1075 80.6359 61.2949C80.1849 61.4826 79.6716 61.595 79.0955 61.6325C78.5193 61.6578 77.9307 61.6703 77.3295 61.6703H74.9248V29.2555H77.3295C77.9307 29.2555 78.5193 29.2742 79.0955 29.3117C79.6716 29.3367 80.1849 29.4428 80.6359 29.6306C81.0866 29.8179 81.4498 30.1181 81.7253 30.531C82.0009 30.931 82.1389 31.5063 82.1389 32.2569V58.669Z'
        fill='white'
      />
      <path
        d='M114.159 61.6703H116.564L114.76 29.2555H111.153L109.35 61.6703H111.754L112.356 44.8626L112.957 30.456L113.558 44.8626L114.159 61.6703Z'
        fill='white'
      />
      <path
        d='M147.951 58.669C147.951 58.8188 147.932 59.094 147.895 59.4944C147.857 59.882 147.726 60.2821 147.5 60.695C147.275 61.1075 146.918 61.4701 146.429 61.7827C145.941 62.1079 145.246 62.2706 144.344 62.2706C143.442 62.2706 142.747 62.1079 142.259 61.7827C141.77 61.4701 141.413 61.1075 141.188 60.695C140.962 60.2821 140.831 59.882 140.793 59.4944C140.756 59.094 140.737 58.8188 140.737 58.669V32.2569C140.737 32.1569 140.743 32.0067 140.756 31.8065C140.768 31.6066 140.806 31.3877 140.868 31.15C140.931 30.8998 141.038 30.65 141.188 30.3998C141.338 30.1372 141.545 29.8995 141.808 29.6868C142.071 29.4744 142.409 29.3055 142.822 29.1806C143.236 29.0428 143.743 28.9741 144.344 28.9741C144.945 28.9741 145.452 29.0428 145.866 29.1806C146.279 29.3055 146.617 29.4744 146.88 29.6868C147.143 29.8995 147.35 30.1372 147.5 30.3998C147.651 30.65 147.757 30.8998 147.819 31.15C147.882 31.3877 147.92 31.6066 147.932 31.8065C147.945 32.0067 147.951 32.1569 147.951 32.2569V58.669ZM143.142 58.669C143.142 58.8188 143.148 59.0003 143.161 59.213C143.173 59.4129 143.217 59.6068 143.292 59.7946C143.367 59.9819 143.486 60.1447 143.649 60.2821C143.812 60.4073 144.044 60.4698 144.344 60.4698C144.645 60.4698 144.876 60.4073 145.039 60.2821C145.202 60.1447 145.321 59.9819 145.396 59.7946C145.471 59.6068 145.515 59.4129 145.528 59.213C145.54 59.0003 145.546 58.8188 145.546 58.669V32.2569C145.546 32.1066 145.54 31.9442 145.528 31.769C145.515 31.5941 145.471 31.4376 145.396 31.3003C145.321 31.15 145.202 31.0251 145.039 30.9248C144.876 30.8249 144.645 30.7749 144.344 30.7749C144.044 30.7749 143.812 30.8249 143.649 30.9248C143.486 31.0251 143.367 31.15 143.292 31.3003C143.217 31.4376 143.173 31.5941 143.161 31.769C143.148 31.9442 143.142 32.1066 143.142 32.2569V58.669Z'
        fill='white'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M75.9373 46.5055H18.225V43.7076H75.9373V46.5055Z'
        fill='white'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M140.737 46.5055H82.0123V43.7076H140.737V46.5055Z'
        fill='white'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M162 46.5055H147.825V43.7076H162V46.5055Z'
        fill='white'
      />
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M15.1872 46.5055H1.01221V43.7076H15.1872V46.5055Z'
        fill='white'
      />
    </svg>
  );
};
