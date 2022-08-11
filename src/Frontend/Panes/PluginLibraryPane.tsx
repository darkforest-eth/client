import { RECOMMENDED_MODAL_WIDTH } from '@darkforest_eth/constants';
import { ModalName, PluginId, Setting } from '@darkforest_eth/types';
import React, { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { SerializedPlugin } from '../../Backend/Plugins/SerializedPlugin';
import { Btn } from '../Components/Btn';
import { Link, Spacer, Truncate } from '../Components/CoreUI';
import { PluginModal } from '../Components/PluginModal';
import { RemoteModal } from '../Components/RemoteModal';
import { Sub } from '../Components/Text';
import dfstyles from '../Styles/dfstyles';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { getBooleanSetting, setSetting, useBooleanSetting } from '../Utils/SettingsHooks';
import { ModalPane } from '../Views/ModalPane';
import { PluginEditorPane } from './PluginEditorPane';

function HelpContent() {
  return (
    <div>
      <p>
        Plugins are bits of code that can be written by anyone, and allows the writer to program the
        game. Plugins range from cosmetic (try the rage cage plugin) to functional (imagine a plugin
        that fights your wars for you).
      </p>
      <Spacer height={8} />
      <p>
        Dark Forest maintains a repository to which community members can submit their own plugins.
        You can find it <Link to='https://plugins.zkga.me/'>here</Link>.
      </p>
      <Spacer height={8} />
      <p>Try editing one of the default plugins to see how it works!</p>
    </div>
  );
}

const Actions = styled.div`
  float: right;

  .blue {
    --df-button-hover-background: ${dfstyles.colors.dfblue};
    --df-button-hover-border: 1px solid ${dfstyles.colors.dfblue};
  }

  .red {
    --df-button-hover-background: ${dfstyles.colors.dfred};
    --df-button-hover-border: 1px solid ${dfstyles.colors.dfred};
  }

  .green {
    --df-button-hover-background: ${dfstyles.colors.dfgreen};
    --df-button-hover-border: 1px solid ${dfstyles.colors.dfgreen};
  }
`;

/**
 * This modal presents an overview of all of the player's plugins. Has a button to add a new plugin,
 * and lists out all the existing plugins, allowing the user to view their titles, as well as either
 * edit, delete, or open their modal.
 *
 * You can think of this as the plugin process list, the Activity Monitor of Dark forest.
 */
export function PluginLibraryPane({
  gameUIManager,
  visible,
  onClose,
  modalsContainer,
}: {
  gameUIManager: GameUIManager;
  visible: boolean;
  onClose: () => void;
  modalsContainer: Element;
}) {
  const pluginManager = gameUIManager.getPluginManager();
  const modalManager = gameUIManager.getModalManager();
  const plugins = useEmitterValue(pluginManager.plugins$, pluginManager.getLibrary());
  const contractAddress = gameUIManager.getContractAddress();
  const account = gameUIManager.getAccount();
  const config = { contractAddress, account };
  const isAdmin = gameUIManager.isAdmin();
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  const [warningIsOpen, setWarningIsOpen] = useState(false);
  const [clicksUntilHasPlugins, setClicksUntilHasPlugins] = useState(8);
  const [forceReloadEmbeddedPlugins, _s] = useBooleanSetting(
    gameUIManager,
    Setting.ForceReloadEmbeddedPlugins
  );

  /**
   * the id of the plugin that the user is currently editing.
   */
  const [currentlyEditingPluginId, setEditingPluginId] = useState<PluginId | undefined>();

  /**
   * to get a unique editor for every time we open the editor. this means that every
   * time you open the editor, you get a fresh copy of your plugin, or a blank state.
   * if we did not do this, then the previous unsaved edits would persist in the editor
   * ui.
   */
  const [editorNonce, setEditorNonce] = useState(0);

  /**
   * Opens an editor that would overwrite an existing plugin if one
   * exists for the given plugin id. If one doesn't exist, opens
   * an editor that will save a new plugin. Returns a function that
   * closes the editor.
   */
  function openEditorForPlugin(pluginId?: PluginId) {
    // Early return to disable opening plugin editor
    return;

    if (!account || !getBooleanSetting(config, Setting.HasAcceptedPluginRisk)) {
      setWarningIsOpen(true);
      return;
    }

    setWarningIsOpen(false);
    setEditorIsOpen(true);
    setEditorNonce(editorNonce + 1);

    if (currentlyEditingPluginId !== pluginId) {
      setEditingPluginId(pluginId);
    }
  }

  function runPluginClicked(pluginId: PluginId) {
    modalManager.setModalState(pluginId, 'open');
  }

  /**
   * Overwrites the plugin with the given plugin id, killing its process
   * if it has a process. If `pluginId` is undefined, saves a new plugin.
   */
  const saveAndReloadPlugin = (newName: string, newCode: string, pluginId?: PluginId): void => {
    if (pluginId && newCode) {
      pluginManager?.overwritePlugin(newName || 'no name', newCode, pluginId);
    } else {
      // Auto generate a PluginId
      const pluginId = uuidv4() as PluginId;
      pluginManager?.addPluginToLibrary(pluginId, newName || 'no name', newCode || '');
    }
  };

  const onAcceptWarningClick = () => {
    if (clicksUntilHasPlugins === 1) {
      account && setSetting(config, Setting.HasAcceptedPluginRisk, true + '');
      setWarningIsOpen(false);
    }

    setClicksUntilHasPlugins(clicksUntilHasPlugins - 1);
  };

  /**
   * When we first load this component, make sure that we've loaded all
   * the plugins from disk.
   */
  useEffect(() => {
    pluginManager.load(isAdmin, forceReloadEmbeddedPlugins);
  }, [pluginManager, isAdmin, forceReloadEmbeddedPlugins]);

  // function addPluginClicked(): void {
  //   openEditorForPlugin(undefined);
  // }

  function deletePluginClicked(pluginId: PluginId) {
    if (confirm('are you sure you want to delete this plugin?')) {
      pluginManager.deletePlugin(pluginId);
      modalManager.clearModalPosition(pluginId);
      setEditorIsOpen(false);
    }
  }

  function onPluginReorder(newOrder: SerializedPlugin[]) {
    pluginManager?.reorderPlugins(newOrder.map((p) => p.id));
  }

  /**
   * The Dark Forest process list.
   */
  function renderPluginsList() {
    if (plugins.length === 0) {
      return 'you have no plugins!';
    }

    return (
      <ReactSortable list={plugins} setList={onPluginReorder}>
        {plugins.map((plugin) => (
          <div key={plugin.id}>
            <Truncate maxWidth={'150px'} style={{ verticalAlign: 'unset' }}>
              <Sub>{plugin.name}</Sub>
            </Truncate>

            <Spacer width={8} />
            <Actions>
              {/* // Disable editing plugin
              <Btn className='blue' onClick={() => openEditorForPlugin(plugin.id)}>
                edit
              </Btn>
              */}
              <Spacer width={4} />
              <Btn className='red' onClick={() => deletePluginClicked(plugin.id)}>
                del
              </Btn>
              <Spacer width={4} />
              <Btn className='green' onClick={() => runPluginClicked(plugin.id)}>
                run
              </Btn>
            </Actions>
          </div>
        ))}
      </ReactSortable>
    );
  }

  function onPluginClosed(pluginId: PluginId) {
    pluginManager.destroy(pluginId);
    modalManager.setModalState(pluginId, 'closed');
  }
  function onPluginRendered(pluginId: PluginId, el: HTMLDivElement) {
    // This is `async` but we don't care about the result
    pluginManager.render(pluginId, el);
  }

  const pluginModals = plugins.map((plugin) => {
    return (
      <PluginModal
        key={plugin.id}
        id={plugin.id}
        title={plugin.name}
        container={modalsContainer}
        onClose={() => onPluginClosed(plugin.id)}
        onRender={(el) => onPluginRendered(plugin.id, el)}
      />
    );
  });

  return (
    <>
      <RemoteModal
        id={ModalName.PluginWarning}
        container={modalsContainer}
        title='WARNING'
        visible={warningIsOpen}
        onClose={() => setWarningIsOpen(false)}
        width={RECOMMENDED_MODAL_WIDTH}
      >
        <p>
          Dark Forest supports plugins, which allow you to write JavaScript code that can interact
          with the game. Plugins are powerful and can enhance your gameplay experience, but they can
          also be dangerous!
        </p>
        <br />
        <p>
          Be careful using plugins that were authored by somebody other than yourself! Plugins can
          impersonate your account, and steal all your money. A malicious plugin could transfer all
          your planets and artifacts to somebody else!
        </p>
        <br />
        <Btn variant='danger' onClick={onAcceptWarningClick}>
          Click {clicksUntilHasPlugins} times for Plugins
        </Btn>
      </RemoteModal>
      <RemoteModal
        id={ModalName.PluginEditor}
        container={modalsContainer}
        title='Plugin Editor'
        visible={editorIsOpen}
        onClose={() => setEditorIsOpen(false)}
      >
        <PluginEditorPane
          key={currentlyEditingPluginId + '' + editorNonce}
          pluginId={currentlyEditingPluginId}
          setIsOpen={setEditorIsOpen}
          pluginHost={pluginManager}
          overwrite={saveAndReloadPlugin}
        />
      </RemoteModal>

      {pluginModals}


      <ModalPane
        visible={visible}
        onClose={onClose}
        id={ModalName.Plugins}
        title={'Plugin Library'}
        helpContent={HelpContent}
        width={RECOMMENDED_MODAL_WIDTH}
      >
        {renderPluginsList()}

        {/* // Disable adding plugin
          <Spacer height={8} />
          <Btn onClick={addPluginClicked}>Add Plugin</Btn>
        */}
      </ModalPane>

    </>
  );
}
