import queryPortalList from "../helpers/queryPortalList";
import { getSettings } from "../authUsers";
import {
  payloadPortal,
  fetchAction,
  setPortalSettings
} from "../actions";

export default async ({
  socket,
  user: { id: clientID, admin } = {}
}) => {
  const portalList = await queryPortalList({ clientID, admin });
  const { portalSettings = {} } = await getSettings(clientID);

  await socket.emit(
    "action",
    payloadPortal({
      portalList
    })
  );

  await socket.emit("action", setPortalSettings(portalSettings));
  socket.emit("action", fetchAction(false));
};
