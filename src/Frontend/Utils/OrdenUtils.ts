export const getOrdenSettings = () => {
    let settings = localStorage.getItem('ORDEN_SETTINGS');
    
    return settings ? JSON.parse(settings) : false;
}

interface Settings {
    allies: boolean,
    'double range': boolean,
    'double defence': boolean,
    'double energy': boolean
}

export const setOrdenSettings = (settings: Settings) => {

    return localStorage.setItem('ORDEN_SETTINGS', JSON.stringify(settings));
}