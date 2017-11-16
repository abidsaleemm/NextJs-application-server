import queryPortalList from "../helpers/queryPortalList";
import {
  payloadPortal,
  fetchAction,
  setPortalSettings
} from "../actions";
import { getUserProps } from "../authUsers";

export default async ({
  socket,
  user: { id: clientID, admin } = {}
}) => {
  const portalList = await queryPortalList({ clientID, admin });
  const { portalSettings = {} } = await getUserProps(clientID, [
    "portalSettings"
  ]);

  await socket.emit(
    "action",
    payloadPortal({
      portalList
    })
  );

  await socket.emit("action", setPortalSettings(portalSettings));
  socket.emit("action", fetchAction(false));
};
