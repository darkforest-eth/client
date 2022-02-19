import { PluginId } from '@darkforest_eth/types';

/**
 * This interface represents an embedded plugin, which is stored in `embedded_plugins/`.
 */
export interface EmbeddedPlugin {
  id: PluginId;
  name: string;
  code: string;
}

/**
 * Load all of the embedded plugins in the dist directory of the `embedded_plugins/` project
 * as Plain Text files. This means that `embedded_plugins/` can't use `import` for relative paths.
 */
const pluginsContext = require.context('../../../embedded_plugins/', false, /\.[jt]sx?$/);

function cleanFilename(filename: string) {
  return filename
    .replace(/^\.\//, '')
    .replace(/[_-]/g, ' ')
    .replace(/\.[jt]sx?$/, '');
}

export function getEmbeddedPlugins(isAdmin: boolean) {
  return pluginsContext
    .keys()
    .filter((filename) => {
      if (isAdmin) {
        return true;
      } else {
        return !filename.startsWith('./Admin-Controls');
      }
    })
    .map((filename) => {
      return {
        id: filename as PluginId,
        name: cleanFilename(filename),
        code: pluginsContext<{ default: string }>(filename).default,
      };
    });
}
