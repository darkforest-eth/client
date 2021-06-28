import { PluginId } from './SerializedPlugin';

/**
 * This interface represents a local plugin, which is stored in local_plugins/src.
 */
export interface LocalPlugin {
  id: PluginId;
  name: string;
  code: string;
}

/**
 * Load all of the local plugins in the dist directory of the `local_plugins/` project
 * as Plain Text files. This means that `local_plugins/` can't use `import` for relative paths.
 */
const pluginsContext = require.context('../../../local_plugins/', false, /\.[jt]sx?$/);

function cleanFilename(filename: string) {
  return filename
    .replace(/^\.\//, '')
    .replace(/[_-]/g, ' ')
    .replace(/\.[jt]sx?$/, '');
}

export function getLocalPlugins() {
  return pluginsContext.keys().map((filename) => {
    return {
      id: filename as PluginId,
      name: cleanFilename(filename),
      code: pluginsContext<{ default: string }>(filename).default,
    };
  });
}
