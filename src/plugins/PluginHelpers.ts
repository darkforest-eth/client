import { GameObjects } from '../api/GameObjects';
import { isLocatable, Planet } from '../_types/global/GlobalTypes';
import { PluginProcess } from './PluginProcess';

/**
 * Functions that would be helpful for plugin authors to have,
 * in addition to just the references to a {@link GameManager}
 * and a {@link GameUIManager}
 */
export class PluginHelpers {
  public register: (plugin: PluginProcess) => void;

  constructor(register: (plugin: PluginProcess) => void) {
    this.register = register;
  }

  public isPlanetMineable(p: Planet) {
    if (isLocatable(p)) {
      return GameObjects.isPlanetMineable(p);
    }
  }
}
