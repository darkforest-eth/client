import React, { useState } from 'react';
import { useEffect } from 'react';
import styled from 'styled-components';
import { Spacer, Underline } from '../Components/CoreUI';
import { White } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useUIManager } from '../Utils/AppHooks';
import { BooleanSetting, Setting } from '../Utils/SettingsHooks';
import { ModalHook, ModalPane } from '../Views/ModalPane';
import { TabbedView } from '../Views/TabbedView';

const DiagnosticsContent = styled.div`
  min-width: 350px;
`;

export interface Diagnostics {
  visiblePlanets: number;
  visibleChunks: number;
  fps: number;
  totalPlanets: number;
  chunkUpdates: number;
  totalCalls: number;
  callsInQueue: number;
  totalTransactions: number;
  transactionsInQueue: number;
  totalChunks: number;
}

export function DiagnosticsPane({ hook }: { hook: ModalHook }) {
  const uiManager = useUIManager();
  const [currentDiagnostics, setCurrentDiagnostics] = useState(uiManager.getDiagnostics());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDiagnostics(uiManager.getDiagnostics());
    }, 250);

    return () => clearInterval(interval);
  }, [uiManager]);

  return (
    <ModalPane hook={hook} title={'Diagnostics'}>
      <DiagnosticsContent>
        <DiagnosticsTabs diagnostics={currentDiagnostics} />
      </DiagnosticsContent>
    </ModalPane>
  );
}

function DiagnosticsTabs({ diagnostics }: { diagnostics: Diagnostics }) {
  return (
    <TabbedView
      tabTitles={['rendering', 'networking']}
      tabContents={(i) => {
        switch (i) {
          case 0:
            return <RenderingTab diagnostics={diagnostics} />;
          case 1:
            return <NetworkingTab diagnostics={diagnostics} />;
        }
      }}
    />
  );
}

function RenderingTab({ diagnostics }: { diagnostics: Diagnostics }) {
  const uiManager = useUIManager();

  return (
    <>
      <DiagnosticsTableStyle>
        <tbody>
          <tr>
            <td>fps</td>
            <td>{Math.floor(diagnostics.fps)}</td>
          </tr>
          <tr>
            <td>visible chunks</td>
            <td>{diagnostics.visibleChunks.toLocaleString()}</td>
          </tr>
          <tr>
            <td>total chunks</td>
            <td>{diagnostics.totalChunks.toLocaleString()}</td>
          </tr>
          <tr>
            <td>visible planets</td>
            <td>{diagnostics.visiblePlanets.toLocaleString()}</td>
          </tr>
          <tr>
            <td>total planets</td>
            <td>{diagnostics.totalPlanets.toLocaleString()}</td>
          </tr>
          <tr>
            <td>queued chunk writes</td>
            <td>{diagnostics.chunkUpdates.toLocaleString()}</td>
          </tr>
        </tbody>
      </DiagnosticsTableStyle>
      <Spacer height={8} />
      <Underline>
        <White>Debug Options</White>
      </Underline>
      <Spacer height={8} />
      <BooleanSetting
        uiManager={uiManager}
        setting={Setting.DrawChunkBorders}
        settingDescription='draw chunk borders'
      />
    </>
  );
}

function NetworkingTab({ diagnostics }: { diagnostics: Diagnostics }) {
  return (
    <DiagnosticsTableStyle>
      <tbody>
        <tr>
          <td>completed calls</td>
          <td>{diagnostics.totalCalls.toLocaleString()}</td>
        </tr>

        <tr>
          <td>queued calls</td>
          <td>{diagnostics.callsInQueue.toLocaleString()}</td>
        </tr>

        <tr>
          <td>completed transactions</td>
          <td>{diagnostics.totalTransactions.toLocaleString()}</td>
        </tr>

        <tr>
          <td>queued transactions</td>
          <td>{diagnostics.transactionsInQueue.toLocaleString()}</td>
        </tr>
      </tbody>
    </DiagnosticsTableStyle>
  );
}

const DiagnosticsTableStyle = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    border: 1px solid ${dfstyles.colors.subbertext};
    padding: 2px 4px;

    &:first-child {
      text-align: right;
    }

    &:last-child {
      min-width: 100px;
    }
  }
`;
