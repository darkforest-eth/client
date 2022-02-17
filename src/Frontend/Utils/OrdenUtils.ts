export const getOrdenSettings = (): OrdenSettings => {
  const settings = localStorage.getItem('ORDEN_SETTINGS');
  
  return settings ? JSON.parse(settings) as OrdenSettings : {};
}

// TODO consider to move to a better place
export interface OrdenSettings {
  [key: string]: boolean
}

export const setOrdenSettings = (settings: OrdenSettings) => {
  return localStorage.setItem('ORDEN_SETTINGS', JSON.stringify(settings));
}
