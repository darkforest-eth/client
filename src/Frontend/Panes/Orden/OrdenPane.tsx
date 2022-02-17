import React, { useState } from 'react';
import styled from 'styled-components';

import dfstyles from '../../Styles/dfstyles';
import { getOrdenSettings, setOrdenSettings } from '../../Utils/OrdenUtils';
import { ModalHook, ModalName, ModalPane } from '../../Views/ModalPane';
import { Padded } from '../../Components/CoreUI';

const HelpContent = styled(Padded)`
  width: 300px;
  height: 300px;
  max-height: 500px;
  max-width: 500px;
  overflow-y: scroll;
  text-align: justify;
  color: ${dfstyles.colors.text};
`;

const CheckboxGroup = styled(Padded)`
  color: ${dfstyles.colors.text};
`;

export function OrdenPane({ hook }: { hook: ModalHook }) {
  const [settings, setSettings] = useState(getOrdenSettings());

  const handleSettingChange = (settingName: string, isSettingChecked: boolean) => {
    const updatedSettings = {...settings, [settingName]: !isSettingChecked};
    
    setSettings(updatedSettings);
    setOrdenSettings(updatedSettings);
  }
  
  return (
    <ModalPane hook={hook} title='Orden Pane' name={ModalName.OrdenPane}>
      <HelpContent>
        {
          Object.keys(settings).map(item => (
            <CheckboxGroup key={item}>
              show { item } <input type='checkbox' checked={settings[item]} onChange={() => handleSettingChange(item, settings[item])} />
            </CheckboxGroup>
          ))
        }
      </HelpContent>
    </ModalPane>
  );
}
