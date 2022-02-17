import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { EmSpacer, Link, Padded, Section, SectionHeader } from '../../Components/CoreUI';
import dfstyles from '../../Styles/dfstyles';
import { ModalHook, ModalName, ModalPane } from '../../Views/ModalPane';
import { getOrdenSettings, setOrdenSettings } from '../../Utils/OrdenUtils';

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

  const handleChange = (name: string, b: boolean) => (event: object) => {
    
    const duplicate = {...settings};

    duplicate[name] = !b;
    
    setSettings(duplicate);
    setOrdenSettings(duplicate);
  }
  
  return (
    <ModalPane hook={hook} title='Orden Pane' name={ModalName.OrdenPane}>
      <HelpContent>
        {
          Object.keys(settings).map( item => (
            <CheckboxGroup key={item}>
              show { item } <input type='checkbox' checked={settings[item]} onChange={handleChange(item, settings[item])} />
            </CheckboxGroup>
          ))
        }
      </HelpContent>
    </ModalPane>
  );
}
