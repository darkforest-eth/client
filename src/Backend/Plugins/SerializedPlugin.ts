import { PluginId } from '@darkforest_eth/types';

/**
 * Represents a plugin that the user has added to their game. Used
 * internally for storing plugins. Not used for evaluating plugins!
 */
export interface SerializedPlugin {
  /**
   * Unique ID, assigned at the time the plugin is first saved.
   */
  id: PluginId;

  /**
   * This code is a javascript object that complies with the
   * {@link PluginProcess} interface.
   */
  code: string;

  /**
   * Shown in the list of plugins.
   */
  name: string;

  /**
   * {@code new Date.getTime()} at the point that this plugin was saved
   */
  lastEdited: number;
}
