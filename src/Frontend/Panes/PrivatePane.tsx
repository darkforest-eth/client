import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Sub } from '../Components/Text';
import { useUIManager } from '../Utils/AppHooks';
import { ModalHook, ModalName, ModalPane } from '../Views/ModalPane';

const StyledPrivatePane = styled.div`
  width: 36em;
  height: 10em;
  & > div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;
export function PrivatePane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();

  const [sKey, setSKey] = useState<string | undefined>(undefined);
  const [home, setHome] = useState<string | undefined>(undefined);
  useEffect(() => {
    if (!uiManager) return;
    setSKey(uiManager.getPrivateKey());
    const coords = uiManager.getHomeCoords();
    setHome(coords ? `(${coords.x}, ${coords.y})` : '');
  }, [uiManager]);
  return (
    <ModalPane hook={hook} title={'View Secret Key and Home Coords'} name={ModalName.Private}>
      <StyledPrivatePane>
        <p>
          <Sub>
            <u>secret key</u>
          </Sub>
        </p>
        <p>{sKey}</p>
        <br />
        <p>
          <Sub>
            <u>Home Coords</u>
          </Sub>
        </p>
        <p>{home}</p>
      </StyledPrivatePane>
    </ModalPane>
  );
}
