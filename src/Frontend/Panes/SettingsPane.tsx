import { EthConnection } from '@darkforest_eth/network';
import { AutoGasSetting, Chunk, ModalName, Setting } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import TutorialManager from '../../Backend/GameLogic/TutorialManager';
import { Btn } from '../Components/Btn';
import { Section, SectionHeader, Spacer } from '../Components/CoreUI';
import { DarkForestTextInput, TextInput } from '../Components/Input';
import { Slider } from '../Components/Slider';
import { Green, Red } from '../Components/Text';
import Viewport, { getDefaultScroll } from '../Game/Viewport';
import { useAccount, useUIManager } from '../Utils/AppHooks';
import { useEmitterValue } from '../Utils/EmitterHooks';
import {
  BooleanSetting,
  ColorSetting,
  MultiSelectSetting,
  NumberSetting,
} from '../Utils/SettingsHooks';
import { ModalPane } from '../Views/ModalPane';

const SCROLL_MIN = 0.0001 * 10000;
const SCROLL_MAX = 0.01 * 10000;
const DEFAULT_SCROLL = Math.round(10000 * (getDefaultScroll() - 1));

const SettingsContent = styled.div`
  width: 500px;
  height: 500px;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  text-align: justify;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-between;
  align-items: center;

  & > span:first-child {
    flex-grow: 1;
  }
`;

export function SettingsPane({
  ethConnection,
  visible,
  onClose,
  onOpenPrivate,
}: {
  ethConnection: EthConnection;
  visible: boolean;
  onClose: () => void;
  onOpenPrivate: () => void;
}) {
  const uiManager = useUIManager();
  const account = useAccount(uiManager);
  const isDevelopment = process.env.NODE_ENV !== 'production';
  const gasPrices = useEmitterValue(ethConnection.gasPrices$, ethConnection.getAutoGasPrices());

  const [rpcUrl, setRpcURL] = useState<string>(ethConnection.getRpcEndpoint());
  const onChangeRpc = () => {
    ethConnection
      .setRpcUrl(rpcUrl)
      .then(() => {
        localStorage.setItem('XDAI_RPC_ENDPOINT_v5', rpcUrl);
      })
      .catch(() => {
        setRpcURL(ethConnection.getRpcEndpoint());
      });
  };

  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    if (!uiManager) return;
    const updateBalance = () => {
      setBalance(uiManager.getMyBalance());
    };

    updateBalance();
    const intervalId = setInterval(updateBalance, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [uiManager]);

  const [failure, setFailure] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [importMapByTextBoxValue, setImportMapByTextBoxValue] = useState('');
  useEffect(() => {
    if (failure) {
      setSuccess('');
    }
  }, [failure]);
  useEffect(() => {
    if (success) {
      setFailure('');
    }
  }, [success]);
  const onExportMap = async () => {
    if (uiManager) {
      const chunks = uiManager.getExploredChunks();
      const chunksAsArray = Array.from(chunks);
      try {
        const map = JSON.stringify(chunksAsArray);
        await window.navigator.clipboard.writeText(map);
        setSuccess('Copied map!');
      } catch (err) {
        console.error(err);
        setFailure('Failed to export');
      }
    } else {
      setFailure('Unable to export map right now.');
    }
  };
  const onImportMapFromTextBox = async () => {
    try {
      const chunks = JSON.parse(importMapByTextBoxValue);
      await uiManager.bulkAddNewChunks(chunks as Chunk[]);
      setImportMapByTextBoxValue('');
    } catch (e) {
      setFailure('Invalid map data. Check the data in your clipboard.');
    }
  };
  const onImportMap = async () => {
    if (uiManager) {
      let input;
      try {
        input = await window.navigator.clipboard.readText();
      } catch (err) {
        console.error(err);
        setFailure('Unable to import map. Did you allow clipboard access?');
        return;
      }

      let chunks;
      try {
        chunks = JSON.parse(input);
      } catch (err) {
        console.error(err);
        setFailure('Invalid map data. Check the data in your clipboard.');
        return;
      }
      await uiManager.bulkAddNewChunks(chunks as Chunk[]);
      setSuccess('Successfully imported a map!');
    } else {
      setFailure('Unable to import map right now.');
    }
  };

  const [clicks, setClicks] = useState<number>(8);
  const doPrivateClick = () => {
    setClicks((x) => x - 1);
    if (clicks === 1) {
      onOpenPrivate();
      setClicks(5);
    }
  };

  const [scrollSpeed, setScrollSpeed] = useState<number>(DEFAULT_SCROLL);
  const onScrollChange = (e: Event & React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value)) setScrollSpeed(value);
  };

  useEffect(() => {
    const scroll = localStorage.getItem('scrollSpeed');
    if (scroll) {
      setScrollSpeed(10000 * (parseFloat(scroll) - 1));
    }
  }, [setScrollSpeed]);

  useEffect(() => {
    if (!Viewport.instance) return;
    Viewport.instance.setMouseSensitivty(scrollSpeed / 10000);
  }, [scrollSpeed]);

  return (
    <ModalPane id={ModalName.Settings} title='Settings' visible={visible} onClose={onClose}>
      <SettingsContent>
        {isDevelopment && (
          <Section>
            <SectionHeader>Development</SectionHeader>
            <BooleanSetting
              uiManager={uiManager}
              setting={Setting.ForceReloadEmbeddedPlugins}
              settingDescription={'force reload embedded plugins'}
            />
          </Section>
        )}

        <Section>
          <SectionHeader>Burner Wallet Info</SectionHeader>
          <Row>
            <span>Public Key</span>
            <span>{account}</span>
          </Row>
          <Row>
            <span>Balance</span>
            <span>{balance}</span>
          </Row>
        </Section>

        <Section>
          <SectionHeader>Gas Price</SectionHeader>
          Your gas price setting determines the price you pay for each transaction. A higher gas
          price means your transactions will be prioritized by the blockchain, making them confirm
          faster. We recommend using the auto average setting. All auto settings prices are pulled
          from an oracle and are capped at 15 gwei.
          <Spacer height={16} />
          <MultiSelectSetting
            wide
            uiManager={uiManager}
            setting={Setting.GasFeeGwei}
            values={[
              '1',
              '2',
              '5',
              '10',
              '20',
              '40',
              AutoGasSetting.Slow,
              AutoGasSetting.Average,
              AutoGasSetting.Fast,
            ]}
            labels={[
              '1 gwei (default)',
              '2 gwei (faster)',
              '5 gwei (turbo)',
              '10 gwei (mega turbo)',
              '20 gwei (need4speed)',
              '40 gwei (gigafast)',
              `slow auto (~${gasPrices.slow} gwei)`,
              `average auto (~${gasPrices.average} gwei)`,
              `fast auto (~${gasPrices.fast} gwei)`,
            ]}
          />
        </Section>

        <Section>
          <SectionHeader>Burner Wallet Info (Private)</SectionHeader>
          Your secret key, together with your home planet's coordinates, grant you access to your
          Dark Forest account on different browsers. You should save this info somewhere on your
          computer.
          <Spacer height={16} />
          <Red>WARNING:</Red> Never ever send this to anyone!
          <Spacer height={8} />
          <Btn size='stretch' variant='danger' onClick={doPrivateClick}>
            Click {clicks} times to view info
          </Btn>
        </Section>

        <Section>
          <SectionHeader>Auto Confirm Transactions</SectionHeader>
          Whether or not to auto-confirm all transactions, except purchases. This will allow you to
          make moves, spend silver on upgrades, etc. without requiring you to confirm each
          transaction. However, the client WILL ask for confirmation before sending transactions
          that spend wallet funds.
          <Spacer height={16} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.AutoApproveNonPurchaseTransactions}
            settingDescription={'auto confirm non-purchase transactions'}
          />
        </Section>

        <Section>
          <SectionHeader>Import and Export Map Data</SectionHeader>
          <Red>WARNING:</Red> Maps from others could be altered and are not guaranteed to be
          correct!
          <Spacer height={16} />
          <TextInput
            value={importMapByTextBoxValue}
            placeholder={'Paste map contents here'}
            onChange={(e: Event & React.ChangeEvent<DarkForestTextInput>) =>
              setImportMapByTextBoxValue(e.target.value)
            }
          />
          <Spacer height={8} />
          <Btn
            size='stretch'
            onClick={onImportMapFromTextBox}
            disabled={importMapByTextBoxValue.length === 0}
          >
            Import Map From Above
          </Btn>
          <Spacer height={8} />
          <Btn size='stretch' onClick={onExportMap}>
            Copy Map to Clipboard
          </Btn>
          <Spacer height={8} />
          <Btn size='stretch' onClick={onImportMap}>
            Import Map from Clipboard
          </Btn>
          <Spacer height={8} />
          <Green>{success}</Green>
          <Red>{failure}</Red>
        </Section>

        <Section>
          <SectionHeader>Change RPC Endpoint</SectionHeader>
          <Spacer height={8} />
          Current RPC Endpoint: {rpcUrl}
          <Spacer height={8} />
          <TextInput
            value={rpcUrl}
            onChange={(e: Event & React.ChangeEvent<DarkForestTextInput>) =>
              setRpcURL(e.target.value)
            }
          />
          <Spacer height={8} />
          <Btn size='stretch' onClick={onChangeRpc}>
            Change RPC URL
          </Btn>
        </Section>

        <Section>
          <SectionHeader>Metrics Opt Out</SectionHeader>
          We collect a minimal set of data and statistics such as SNARK proving times, average
          transaction times across browsers, and ALT transaction errors, to help us optimize
          performance and fix bugs. This does not include personal data like email or IP address.
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.OptOutMetrics}
            settingDescription='metrics opt out'
          />
        </Section>

        <Section>
          <SectionHeader>Performance</SectionHeader>
          High performance mode turns off background rendering, and reduces the detail at which
          smaller planets are rendered.
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.HighPerformanceRendering}
            settingDescription='high performance mode'
          />
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.DisableEmojiRendering}
            settingDescription='disable emoji rendering'
          />
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.DisableHatRendering}
            settingDescription='disable hat rendering'
          />
        </Section>

        <Section>
          <SectionHeader>Notifications</SectionHeader>
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.MoveNotifications}
            settingDescription='show notifications for move transactions'
          />
          <Spacer height={8} />
          Auto clear transaction confirmation notifications after this many seconds. Set to a
          negative number to not auto-clear.
          <Spacer height={8} />
          <NumberSetting
            uiManager={uiManager}
            setting={Setting.AutoClearConfirmedTransactionsAfterSeconds}
          />
          <Spacer height={8} />
          Auto clear transaction rejection notifications after this many seconds. Set to a negative
          number to not auto-clear.
          <NumberSetting
            uiManager={uiManager}
            setting={Setting.AutoClearRejectedTransactionsAfterSeconds}
          />
        </Section>

        <Section>
          <SectionHeader>Scroll speed</SectionHeader>
          <Spacer height={8} />
          <Slider
            variant='filled'
            editable={true}
            labelVisibility='none'
            value={scrollSpeed}
            min={SCROLL_MIN}
            max={SCROLL_MAX}
            step={SCROLL_MIN / 10}
            onChange={onScrollChange}
          />
        </Section>

        <Section>
          <SectionHeader>Reset Tutorial</SectionHeader>
          <Spacer height={8} />
          <Btn size='stretch' onClick={() => TutorialManager.getInstance(uiManager).reset()}>
            Reset Tutorial
          </Btn>
        </Section>

        <Section>
          <SectionHeader>Disable Default Shortcuts</SectionHeader>
          If you'd like to use custom shortcuts via a plugin, you can disable the default shortcuts
          here.
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.DisableDefaultShortcuts}
            settingDescription='toggle disable default shortcuts'
          />
        </Section>

        <Section>
          <SectionHeader>Enable Experimental Features</SectionHeader>
          Features that aren't quite ready for production but we think are cool.
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.ExperimentalFeatures}
            settingDescription='toggle expeirmental features'
          />
        </Section>

        <Section>
          <SectionHeader>Renderer Settings</SectionHeader>
          Some options for the default renderer which is included with the game.
          <Spacer height={8} />
          <BooleanSetting
            uiManager={uiManager}
            setting={Setting.DisableFancySpaceEffect}
            settingDescription='disable fancy space shaders'
          />
          <Spacer height={8} />
          <ColorSetting
            uiManager={uiManager}
            setting={Setting.RendererColorInnerNebula}
            settingDescription='inner nebula color'
          />
          <ColorSetting
            uiManager={uiManager}
            setting={Setting.RendererColorNebula}
            settingDescription='nebula color'
          />
          <ColorSetting
            uiManager={uiManager}
            setting={Setting.RendererColorSpace}
            settingDescription='space color'
          />
          <ColorSetting
            uiManager={uiManager}
            setting={Setting.RendererColorDeepSpace}
            settingDescription='deep space color'
          />
          <ColorSetting
            uiManager={uiManager}
            setting={Setting.RendererColorDeadSpace}
            settingDescription='dead space color'
          />
        </Section>
      </SettingsContent>
    </ModalPane>
  );
}
