import * as React from 'react';
import { useState } from 'react';
import { Btn } from '../app/GameWindowComponents/Btn';
import { PluginManager } from './PluginManager';
import Editor from 'react-simple-code-editor';
import * as Prism from 'prismjs';
import styled from 'styled-components';
import { Input, Spacer } from '../app/GameWindowPanes/CoreUI';
import { PluginId } from './SerializedPlugin';
import { template } from './Template';
require('prismjs/themes/prism-dark.css');

/**
 * Make sure the editor scrolls, and is always the same size.
 */
const EditorContainer = styled.div`
  overflow-y: scroll;
  border: 1px solid white;
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
export function PluginEditor({
  pluginHost,
  pluginId,
  setIsOpen,
  overwrite,
}: {
  pluginHost?: PluginManager | null;
  pluginId?: PluginId;
  setIsOpen: (open: boolean) => void;
  overwrite: (
    newPluginName: string,
    newPluginCode: string,
    pluginId?: PluginId
  ) => void;
}) {
  const plugin = pluginId
    ? pluginHost?.getPluginFromLibrary(pluginId)
    : undefined;

  const [name, setName] = useState(plugin?.name);
  const [code, setCode] = useState(plugin?.code || template);

  function onSaveClick() {
    overwrite(name || 'no name', code || '', pluginId);
    setIsOpen(false);
  }

  function onNameInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value);
  }

  return (
    <>
      <Input placeholder='no name' value={name} onChange={onNameInputChange} />
      <Spacer height={4} />
      <EditorContainer>
        <Editor
          className={'df-editor'}
          value={code || ''}
          onValueChange={setCode}
          highlight={(code) =>
            Prism.highlight(code, Prism.languages.javascript, 'javascript')
          }
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
          }}
        />
      </EditorContainer>
      <Spacer height={4} />
      <Btn onClick={onSaveClick}>save</Btn>
    </>
  );
}
