/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useState, useEffect } from 'react';
import GameUIManager from '../app/board/GameUIManager';
import { Btn } from '../app/GameWindowComponents/GameWindowComponents';
import { MaxWidth, Spacer } from '../app/GameWindowPanes/CoreUI';
import {
  ModalHook,
  ModalName,
  ModalPane,
} from '../app/GameWindowPanes/ModalPane';
import { PluginEditor } from './PluginEditor';
import { OwnedPluginView } from './OwnedPluginView';
import { RemoteModal } from './RemoteModal';
import { PluginId, SerializedPlugin } from './SerializedPlugin';
import { UIDataKey } from '../api/UIStateStorageManager';
import dfstyles from '../styles/dfstyles';
import { ReactSortable } from 'react-sortablejs';

/**
 * This modal presents an overview of all of the player's plugins. Has a button
 * to add a new plugin, and lists out all the existing plugins, allowing the
 * user to view their titles, as well as either edit, delete, or open their window.
 *
 * You can think of this as the plugin process list, the Activity Monitor of
 * Dark forest.
 */
export function PluginLibraryView({
  gameUIManager,
  hook,
  modalsContainer,
}: {
  gameUIManager: GameUIManager;
  hook: ModalHook;
  modalsContainer: Element;
}) {
  const pluginManager = gameUIManager.getPluginManager();
  const [editorIsOpen, setEditorIsOpen] = useState(false);
  const [warningIsOpen, setWarningIsOpen] = useState(false);
  const [clicksUntilHasPlugins, setClicksUntilHasPlugins] = useState(8);

  /**
   * the id of the plugin that the user is currently editing.
   */
  const [currentlyEditingPluginId, setEditingPluginId] = useState<
    PluginId | undefined
  >();

  /**
   * to get a unique editor for every time we open the editor. this means that every
   * time you open the editor, you get a fresh copy of your plugin, or a blank state.
   * if we did not do this, then the previous unsaved edits would persist in the editor
   * ui.
   */
  const [editorNonce, setEditorNonce] = useState(0);

  /**
   * A list of all of the plugins that this user has in their library.
   */
  const [savedPlugins, setSavedPlugins] = useState<SerializedPlugin[]>([]);

  /**
   * Opens an editor that would overwrite an existing plugin if one
   * exists for the given plugin id. If one doesn't exist, opens
   * an editor that will save a new plugin. Returns a function that
   * closes the editor.
   */
  function openEditorForPlugin(pluginId?: PluginId): () => void {
    if (!gameUIManager.getUIDataItem(UIDataKey.hasAcceptedPluginRisk)) {
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
  const saveAndReloadPlugin = (
    newName: string,
    newCode: string,
    pluginId?: PluginId
  ): void => {
    if (pluginId && newCode) {
      pluginManager?.overwritePlugin(newName || 'no name', newCode, pluginId);
    } else {
      pluginManager?.addPluginToLibrary(newName || 'no name', newCode || '');
    }

    if (pluginManager) {
      pluginManager?.load().then(() => {
        setSavedPlugins(pluginManager?.getLibrary());
      });
    }
  };

  const onAcceptWarningClick = () => {
    if (clicksUntilHasPlugins === 1) {
      gameUIManager.setUIDataItem(UIDataKey.hasAcceptedPluginRisk, true);
      setWarningIsOpen(false);
    }

    setClicksUntilHasPlugins(clicksUntilHasPlugins - 1);
  };

  /**
   * When we first load this component, make sure that we've loaded all
   * the plugins from disk.
   */
  useEffect(() => {
    pluginManager
      ?.load()
      .then(() => setSavedPlugins(pluginManager?.getLibrary() || []));
  }, [pluginManager]);

  function addPluginClicked(): void {
    openEditorForPlugin(undefined);
  }

  function deletePluginClicked(id: PluginId) {
    if (confirm('are you sure you want to delete this plugin?')) {
      pluginManager
        ?.deletePlugin(id)
        .then(() => setSavedPlugins(pluginManager?.getLibrary() || []));
    }
  }

  function onPluginReorder(newOrder: SerializedPlugin[]) {
    pluginManager?.reorderPlugins(newOrder.map((p) => p.id));
    setSavedPlugins(pluginManager?.getLibrary() || []);
  }

  /**
   * The Dark Forest process list.
   */
  function renderPluginsList() {
    if (!savedPlugins || savedPlugins.length === 0) {
      return 'you have no plugins!';
    }

    return (
      <>
        <ReactSortable list={savedPlugins} setList={onPluginReorder}>
          {savedPlugins.map((plugin) => (
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

  const editingPluginTitle = currentlyEditingPluginId
    ? 'New Plugin'
    : pluginManager.getPluginFromLibrary(currentlyEditingPluginId)?.name ||
      'no name';

  return (
    <>
      <RemoteModal
        container={modalsContainer}
        title={'WARNING'}
        hook={[warningIsOpen, setWarningIsOpen]}
      >
        <MaxWidth width='400px'>
          <p>
            Dark Forest supports plugins, which allow you to write JavaScript
            code that can interact with the game. Plugins are powerful and can
            enhance your gameplay experience, but they can also be dangerous!
          </p>
          <br />
          <p>
            Be careful using plugins that were authored by somebody other than
            yourself! Plugins can impersonate your account, and steal all your
            money. A malicious plugin could transfer all your planets and
            artifacts to somebody else!
          </p>
          <br />
          <Btn
            borderColor={dfstyles.colors.dfred}
            textColor={dfstyles.colors.dfred}
            onClick={onAcceptWarningClick}
          >
            Click {clicksUntilHasPlugins} times for Plugins
          </Btn>
        </MaxWidth>
      </RemoteModal>
      <RemoteModal
        container={modalsContainer}
        title={editingPluginTitle}
        hook={[editorIsOpen, setEditorIsOpen]}
      >
        <PluginEditor
          key={currentlyEditingPluginId + '' + editorNonce}
          pluginId={currentlyEditingPluginId}
          setIsOpen={setEditorIsOpen}
          pluginHost={pluginManager}
          overwrite={saveAndReloadPlugin}
        />
      </RemoteModal>
      <ModalPane hook={hook} title='Plugin Library' name={ModalName.Plugins}>
        {renderPluginsList()}
        <Spacer height={8} />
        <Btn onClick={addPluginClicked}>Add Plugin</Btn>
      </ModalPane>
    </>
  );
}
