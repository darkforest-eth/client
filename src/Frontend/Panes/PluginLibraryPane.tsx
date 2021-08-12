/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import { v4 as uuidv4 } from 'uuid';
import GameUIManager from '../../Backend/GameLogic/GameUIManager';
import { PluginId, SerializedPlugin } from '../../Backend/Plugins/SerializedPlugin';
import { Btn } from '../Components/Btn';
import { Link, PaddedRecommendedModalWidth, Spacer } from '../Components/CoreUI';
import { RemoteModal } from '../Components/RemoteModal';
import dfstyles from '../Styles/dfstyles';
import { useEmitterValue } from '../Utils/EmitterHooks';
import { getBooleanSetting, setSetting, Setting } from '../Utils/SettingsHooks';
import { ModalHook, ModalName, ModalPane } from '../Views/ModalPane';
import { OwnedPluginView } from '../Views/OwnedPluginView';
import { PluginEditorPane } from './PluginEditorPane';

function HelpContent() {
  return (
    <div>
      <p>
        Plugins are bits of code that can be written by anyone, and allow the writer to program the
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

/**
 * This modal presents an overview of all of the player's plugins. Has a button
 * to add a new plugin, and lists out all the existing plugins, allowing the
 * user to view their titles, as well as either edit, delete, or open their window.
 *
 * You can think of this as the plugin process list, the Activity Monitor of
 * Dark forest.
 */
export function PluginLibraryPane({
  gameUIManager,
  hook,
  modalsContainer,
}: {
  gameUIManager: GameUIManager;
  hook: ModalHook;
  modalsContainer: Element;
}) {
  const pluginManager = gameUIManager.getPluginManager();
  const plugins = useEmitterValue(pluginManager.plugins$, pluginManager.getLibrary());
  const account = gameUIManager.getAccount();
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  const [warningIsOpen, setWarningIsOpen] = useState(false);
  const [clicksUntilHasPlugins, setClicksUntilHasPlugins] = useState(8);

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
  function openEditorForPlugin(pluginId?: PluginId): () => void {
    if (!account || !getBooleanSetting(account, Setting.HasAcceptedPluginRisk)) {
      setWarningIsOpen(true);
      return () => {};
    }

    setWarningIsOpen(false);
    setEditorIsOpen(true);
    setEditorNonce(editorNonce + 1);

    if (currentlyEditingPluginId !== pluginId) {
      setEditingPluginId(pluginId);
    }

    return () => {
      setEditorIsOpen(false);
    };
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
      account && setSetting(account, Setting.HasAcceptedPluginRisk, true + '');
      setWarningIsOpen(false);
    }

    setClicksUntilHasPlugins(clicksUntilHasPlugins - 1);
  };

  /**
   * When we first load this component, make sure that we've loaded all
   * the plugins from disk.
   */
  useEffect(() => {
    pluginManager?.load();
  }, [pluginManager]);

  function addPluginClicked(): void {
    openEditorForPlugin(undefined);
  }

  function deletePluginClicked(id: PluginId) {
    if (confirm('are you sure you want to delete this plugin?')) {
      pluginManager?.deletePlugin(id);
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
      <>
        <ReactSortable list={plugins} setList={onPluginReorder}>
          {plugins.map((plugin) => (
            <OwnedPluginView
              key={plugin.id + plugin.lastEdited}
              pluginManager={pluginManager}
              plugin={plugin}
              openEditorForPlugin={openEditorForPlugin}
              deletePlugin={deletePluginClicked}
              modalsContainer={modalsContainer}
            />
          ))}
        </ReactSortable>
      </>
    );
  }

  if (!pluginManager) {
    return null;
  }

  return (
    <>
      <RemoteModal
        container={modalsContainer}
        title={'WARNING'}
        hook={[warningIsOpen, setWarningIsOpen]}
      >
        <PaddedRecommendedModalWidth>
          <p>
            Dark Forest supports plugins, which allow you to write JavaScript code that can interact
            with the game. Plugins are powerful and can enhance your gameplay experience, but they
            can also be dangerous!
          </p>
          <br />
          <p>
            Be careful using plugins that were authored by somebody other than yourself! Plugins can
            impersonate your account, and steal all your money. A malicious plugin could transfer
            all your planets and artifacts to somebody else!
          </p>
          <br />
          <Btn
            borderColor={dfstyles.colors.dfred}
            textColor={dfstyles.colors.dfred}
            onClick={onAcceptWarningClick}
          >
            Click {clicksUntilHasPlugins} times for Plugins
          </Btn>
        </PaddedRecommendedModalWidth>
      </RemoteModal>
      <RemoteModal
        container={modalsContainer}
        title={'Plugin Editor'}
        hook={[editorIsOpen, setEditorIsOpen]}
      >
        <PluginEditorPane
          key={currentlyEditingPluginId + '' + editorNonce}
          pluginId={currentlyEditingPluginId}
          setIsOpen={setEditorIsOpen}
          pluginHost={pluginManager}
          overwrite={saveAndReloadPlugin}
        />
      </RemoteModal>

      <ModalPane
        hook={hook}
        title='Plugin Library'
        name={ModalName.Plugins}
        helpContent={HelpContent}
      >
        <PaddedRecommendedModalWidth>
          {renderPluginsList()}
          <Spacer height={8} />
          <Btn onClick={addPluginClicked}>Add Plugin</Btn>
        </PaddedRecommendedModalWidth>
      </ModalPane>
    </>
  );
}
