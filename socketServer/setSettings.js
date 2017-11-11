import queryPortalList from "../helpers/queryPortalList";
import { setSettings, getSettings } from '../settings/adapterJSON/setSettings';

export default async ({ socket, user, action }) => {
  setSettings(user.id, action.action);
  socket.emit();
};
