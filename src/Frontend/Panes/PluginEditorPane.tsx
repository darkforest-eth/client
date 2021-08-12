import * as Prism from 'prismjs';
import * as React from 'react';
import { useState } from 'react';
import Editor from 'react-simple-code-editor';
import styled from 'styled-components';
import { PluginManager } from '../../Backend/GameLogic/PluginManager';
import { PLUGIN_TEMPLATE } from '../../Backend/Plugins/PluginTemplate';
import { PluginId } from '../../Backend/Plugins/SerializedPlugin';
import { Btn } from '../Components/Btn';
import { Padded, Spacer } from '../Components/CoreUI';
import { Input } from '../Components/Input';
import dfstyles from '../Styles/dfstyles';
require('prismjs/themes/prism-dark.css');

/**
 * Make sure the editor scrolls, and is always the same size.
 */
const EditorContainer = styled.div`
  overflow-y: scroll;
  border: 1px solid ${dfstyles.colors.borderDark};
  border-radius: ${dfstyles.borderRadius};
  width: 500px;
  height: 500px;

  .df-editor {
    width: 100%;
    min-height: 100%;
  }
`;

/**
 * Component for editing plugins. Saving causes its containing modal
 * to be closed, and the `overwrite` to be called, indicating that the
 * given plugin's source should be overwritten and reloaded. If no
 * plugin id is provided, assumes we're editing a new plugin.
 */
export function PluginEditorPane({
  pluginHost,
  pluginId,
  setIsOpen,
  overwrite,
}: {
  pluginHost?: PluginManager | null;
  pluginId?: PluginId;
  setIsOpen: (open: boolean) => void;
  overwrite: (newPluginName: string, newPluginCode: string, pluginId?: PluginId) => void;
}) {
  const plugin = pluginId ? pluginHost?.getPluginFromLibrary(pluginId) : undefined;

  const [name, setName] = useState(plugin?.name);
  const [code, setCode] = useState(plugin?.code || PLUGIN_TEMPLATE);

  function onSaveClick() {
    overwrite(name || 'no name', code || '', pluginId);
    setIsOpen(false);
  }

  function onNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  return (
    <Padded>
      <Input wide placeholder='no name' value={name} onChange={onNameInputChange} />
      <Spacer height={8} />
      <EditorContainer>
        <Editor
          className={'df-editor'}
          value={code || ''}
          onValueChange={setCode}
          highlight={(code) => Prism.highlight(code, Prism.languages.javascript, 'javascript')}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </EditorContainer>
      <Spacer height={8} />
      <Btn wide onClick={onSaveClick} style={{ height: '3em' }}>
        Save
      </Btn>
    </Padded>
  );
}
