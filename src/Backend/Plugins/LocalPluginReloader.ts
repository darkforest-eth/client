/**
 * This file is basically one long wizard incantation to make HMR actually do its job
 *
 * https://github.com/jauco/webpack-hot-module-reload-with-context-example/blob/master/hmr_example.js
 */

import { monomitter } from '../../Frontend/Utils/Monomitter';
import { PluginProcess } from './PluginProcess';

/**
 * This interface represents a local plugin, which is stored in local_plugins/src.
 */
export interface HMRPlugin {
  name: string;
  filename: string;
}

/**
 * Load all of the local plugins in the dist directory of the local_plugins project
 * as Plain Text files. We don't want to load them as modules. The primary reason we don't
 * want to load them as modules, is we want to discourage people from writing plugins
 * in the style of modules. The reason for this is that it's impossible to load a
 * module given the module as a string, at runtime. Trust me, I've tried.
 */
let pluginsContext = require.context('../../../local_plugins/', false, /\.[jt]sx?$/, 'lazy');

export const hmrPlugins$ = monomitter<HMRPlugin[]>();
let hmrPlugins: HMRPlugin[] = [];

function cleanFilename(filename: string) {
  return filename
    .replace(/^\.\//, '')
    .replace(/[_-]/g, ' ')
    .replace(/\.[jt]sx?$/, '');
}

function reloadPluginModules() {
  hmrPlugins = pluginsContext.keys().map((filename) => {
    return {
      name: cleanFilename(filename),
      filename,
    };
  });
  hmrPlugins$.publish(hmrPlugins);
}

export function getHmrPlugins() {
  return hmrPlugins;
}

export function loadLocalPlugin(filename: string): Promise<{ default: PluginProcess }> {
  return pluginsContext(filename);
}

if (module.hot) {
  module.hot.accept(pluginsContext.id, () => {
    // we need this require a 2nd time, otherwise HMR just
    // refreshes the entire page.
    pluginsContext = require.context('../../../local_plugins/', false, /\.[jt]sx?$/, 'lazy');
    reloadPluginModules();
  });
}

reloadPluginModules();
