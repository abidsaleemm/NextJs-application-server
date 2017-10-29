import settingsStore from 'settingsStore';
import settingStore from '../settingsStore';
import { setSettings, getSettings } from '../settings/adapterJSON/setSettings';

export default async ({user, ...action}) => {
    const userSettings = getSettings(user.id);
    const store = settingStore(userSettings);
    store.dispatch(action);
    setSettings(user.id, store.getState());
}