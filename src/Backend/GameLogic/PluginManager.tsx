import { Monomitter, monomitter } from '@darkforest_eth/events';
import { PluginId } from '@darkforest_eth/types';
import { EmbeddedPlugin, getEmbeddedPlugins } from '../Plugins/EmbeddedPluginLoader';
import { PluginProcess } from '../Plugins/PluginProcess';
import { SerializedPlugin } from '../Plugins/SerializedPlugin';
import GameManager from './GameManager';

/**
 * Represents book-keeping information about a running process. We keep it
 * separate from the process code, so that the plugin doesn't accidentally
 * overwrite this information.
 */
export class ProcessInfo {
  rendered = false;
  hasError = false;
}

/**
 * This class keeps track of all the plugins that this player has loaded
 * into their game. Acts as a task manager, supports all CRUD operations
 * for plugins, as well as instantiating and destroying running plugins.
 * All library operations are also persisted to IndexDB.
 *
 * Important! Does not run plugins until the user clicks 'run' somewhere in
 * this UI. This is important, because if someone develops a buggy plugin,
 * it would suck if that bricked their game.
 */
export class PluginManager {
  private gameManager: GameManager;

  /**
   * All the plugins in the player's library. Not all of the player's plugins
   * are running, and therefore not all exist in `pluginInstances`.
   * `PluginsManager` keeps this field in sync with the plugins the user has
   * saved in the IndexDB via {@link PersistentChunkStore}
   */
  private pluginLibrary: SerializedPlugin[];

  /**
   * Plugins that are currently loaded into the game, and are rendering into a modal.
   * `PluginsManager` makes sure that when a plugin starts executing, it is added into
   * `pluginInstances`, and that once a plugin is unloaded, its `.destroy()` method is called, and
   * that the plugin is removed from `pluginInstances`.
   */
  private pluginProcesses: Record<string, PluginProcess>;

  /**
   * parallel to pluginProcesses
   */
  private pluginProcessInfos: Record<string, ProcessInfo>;

  /**
   * Event emitter that publishes whenever the set of plugins changes.
   */
  public plugins$: Monomitter<SerializedPlugin[]>;

  public constructor(gameManager: GameManager) {
    this.gameManager = gameManager;
    this.pluginLibrary = [];
    this.pluginProcesses = {};
    this.pluginProcessInfos = {};
    this.plugins$ = monomitter<SerializedPlugin[]>();
  }

  /**
   * If a plugin with the given id is running, call its `.destroy()` method,
   * and remove it from `pluginInstances`. Stop listening for new local plugins.
   */
  public destroy(id: PluginId): void {
    if (this.pluginProcesses[id]) {
      try {
        const process = this.pluginProcesses[id];
        if (process && typeof process.destroy === 'function') {
          // TODO: destroy should also receive the element to cleanup event handlers, etc
          process.destroy();
        }
      } catch (e) {
        this.pluginProcessInfos[id].hasError = true;
        console.error('error when destroying plugin', e);
      } finally {
        delete this.pluginProcesses[id];
        delete this.pluginProcessInfos[id];
      }
    }
  }

  /**
   * Load all plugins from this disk into `pluginLibrary`. Insert the default
   * plugins into the player's library if the default plugins have never been
   * added before. Effectively idempotent after the first time you call it.
   * @param isAdmin Is an admin loading the plugins.
   * @param overwriteEmbeddedPlugins Reload all embedded plugins even if a local copy is found.
   * Useful for plugin development.
   */
  public async load(isAdmin: boolean, overwriteEmbeddedPlugins: boolean): Promise<void> {
    this.pluginLibrary = await this.gameManager.loadPlugins();

    this.onNewEmbeddedPlugins(getEmbeddedPlugins(isAdmin), overwriteEmbeddedPlugins);

    this.notifyPluginLibraryUpdated();
  }

  /**
   * Remove the given plugin both from the player's library, and kills
   * the plugin if it is running.
   */
  public async deletePlugin(pluginId: PluginId): Promise<void> {
    this.pluginLibrary = this.pluginLibrary.filter((p) => p.id !== pluginId);
    this.destroy(pluginId);
    await this.gameManager.savePlugins(this.pluginLibrary);

    this.notifyPluginLibraryUpdated();
  }

  /**
   * Gets the serialized plugin with the given id from the player's plugin
   * library. `undefined` if no plugin exists.
   */
  public getPluginFromLibrary(id?: PluginId): SerializedPlugin | undefined {
    return this.pluginLibrary.find((p) => p.id === id);
  }

  /**
   * 1) kills the plugin if it's running
   * 2) edits the plugin-library version of this plugin
   * 3) if a plugin was edited, save the plugin library to disk
   */
  public overwritePlugin(newName: string, pluginCode: string, id: PluginId): void {
    this.destroy(id);

    const plugin = this.getPluginFromLibrary(id);

    if (plugin) {
      plugin.code = pluginCode;
      plugin.name = newName;
      plugin.lastEdited = new Date().getTime();
      this.gameManager.savePlugins(this.pluginLibrary);
    }

    this.notifyPluginLibraryUpdated();
  }

  /**
   * Reorders the current plugins. plugin ids in `newPluginIdOrder` must correspond
   * 1:1 to plugins in the plugin library.
   */
  public reorderPlugins(newPluginIdOrder: string[]) {
    const newPluginsList = newPluginIdOrder
      .map((id) => this.pluginLibrary.find((p) => p.id === id))
      .filter((p) => !!p) as SerializedPlugin[];

    if (newPluginsList.length !== this.pluginLibrary.length) {
      throw new Error('to reorder the plugins, you must pass in precisely one id for each plugin');
    }

    this.pluginLibrary = newPluginsList;
    this.gameManager.savePlugins(this.pluginLibrary);

    this.notifyPluginLibraryUpdated();
  }

  /**
   * adds a new plugin into the plugin library.
   */
  public addPluginToLibrary(id: PluginId, name: string, code: string): SerializedPlugin {
    const newPlugin: SerializedPlugin = {
      id,
      lastEdited: new Date().getTime(),
      name,
      code,
    };

    this.pluginLibrary.push(newPlugin);
    this.gameManager.savePlugins(this.pluginLibrary);

    this.notifyPluginLibraryUpdated();

    return PluginManager.copy(newPlugin);
  }

  /**
   * Either spawns the given plugin by evaluating its `pluginCode`, or
   * returns the already running plugin instance. If starting a plugin
   * throws an error then returns `undefined`.
   */
  public async spawn(id: PluginId): Promise<PluginProcess | undefined> {
    if (this.pluginProcesses[id as string]) {
      return this.pluginProcesses[id as string];
    }

    const plugin = this.getPluginFromLibrary(id);

    if (!plugin) {
      return;
    }

    this.pluginProcessInfos[plugin.id] = new ProcessInfo();

    const moduleFile = new File([plugin.code], plugin.name, {
      type: 'text/javascript',
      lastModified: plugin.lastEdited,
    });
    const moduleUrl = URL.createObjectURL(moduleFile);
    try {
      // The `webpackIgnore` "magic comment" is almost undocumented, but it makes
      // webpack skip over this dynamic `import` call so it won't be transformed into
      // a weird _webpack_require_dynamic_ call
      const { default: Plugin } = await import(/* webpackIgnore: true */ moduleUrl);
      if (this.pluginProcesses[id] === undefined) {
        // instantiate the plugin and attach it to the process list
        this.pluginProcesses[id] = new Plugin();
      }
    } catch (e) {
      console.error(`Failed to start plugin: ${plugin.name} - Please review stack trace\n`, e);
      this.pluginProcessInfos[id].hasError = true;
    }

    return this.pluginProcesses[plugin.id];
  }

  /**
   * If this plugin's `render` method has not been called yet, then
   * call it! Remembers that this plugin has been rendered.
   */
  public async render(id: PluginId, element: HTMLDivElement): Promise<void> {
    const process = await this.spawn(id);
    const processInfo = this.pluginProcessInfos[id];

    if (process && typeof process.render === 'function' && processInfo && !processInfo.rendered) {
      try {
        // Allows a plugin render to be async which in turns allows
        // any method to be async since this is the entry point into it
        await process.render(element);
        processInfo.rendered = true;
      } catch (e) {
        processInfo.hasError = true;
        console.log('failed to render plugin', e);
      }
    }
  }

  /**
   * Gets all the plugins in this player's library.
   */
  public getLibrary(): SerializedPlugin[] {
    return this.pluginLibrary.map(PluginManager.copy);
  }

  /**
   * If this process has been started, gets its info
   */
  public getProcessInfo(id: PluginId): ProcessInfo {
    return PluginManager.copy(this.pluginProcessInfos[id as string]);
  }

  /**
   * Gets a map of all the currently running processes
   */
  public getAllProcessInfos(): Map<PluginId, ProcessInfo> {
    const map = new Map();

    for (const id of Object.getOwnPropertyNames(this.pluginProcessInfos)) {
      map.set(id as PluginId, PluginManager.copy(this.pluginProcessInfos[id]));
    }

    return map;
  }

  /**
   * For each currently running plugin, if the plugin has a 'draw'
   * function, then draw that plugin to the screen.
   */
  public drawAllRunningPlugins(ctx: CanvasRenderingContext2D) {
    for (const plugin of this.pluginLibrary) {
      const processInfo = this.pluginProcessInfos[plugin.id];
      const pluginInstance = this.pluginProcesses[plugin.id];

      if (pluginInstance && typeof pluginInstance.draw === 'function' && !processInfo.hasError) {
        try {
          pluginInstance.draw(ctx);
        } catch (e) {
          console.log('failed to draw plugin', e);
          processInfo.hasError = true;
        }
      }
    }
  }

  private hasPlugin(plugin: EmbeddedPlugin): boolean {
    return this.pluginLibrary.some((p) => p.id === plugin.id);
  }

  private onNewEmbeddedPlugins(newPlugins: EmbeddedPlugin[], overwriteEmbeddedPlugins: boolean) {
    for (const plugin of newPlugins) {
      if (!this.hasPlugin(plugin)) {
        this.addPluginToLibrary(plugin.id, plugin.name, plugin.code);
      } else if (overwriteEmbeddedPlugins) {
        this.overwritePlugin(plugin.name, plugin.code, plugin.id);
      }
    }
  }

  private notifyPluginLibraryUpdated() {
    this.plugins$.publish(this.getLibrary());
  }

  /**
   * To prevent users of this class from modifying our plugins library,
   * we return clones of the plugins. This should probably be a function
   * in a Utils file somewhere, but I thought I should leave a good comment
   * about why we return copies of the plugins from the library.
   */
  private static copy<T>(plugin: T): T {
    return JSON.parse(JSON.stringify(plugin)) as T;
  }
}
