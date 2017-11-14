import queryPortalList from "../helpers/queryPortalList";
import { getSettings } from '../settings/adapterJSON/setSettings';
import { payloadPortal, fetchAction, setPortalSettings } from "../actions";

export default async ({
  socket,
  user: { id: clientID, admin } = {}
}) => {
  await socket.emit("action", fetchAction(true));
  const portalList = await queryPortalList({ clientID, admin });
  await socket.emit(
    "action",
    payloadPortal({
      portalList
    })
  );
  const settings = getSettings(clientID).portalSettings;
  await socket.emit("action", setPortalSettings(settings));
  socket.emit("action", fetchAction(false));
};
