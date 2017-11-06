import queryPortalList from "../helpers/queryPortalList";
import { payloadPortal, fetchAction } from "../actions";

export default async ({
  socket,
  user: { id: clientID, admin } = {}
}) => {
  const portalList = await queryPortalList({ clientID, admin });
  await socket.emit(
    "action",
    payloadPortal({
      portalList
    })
  );
  socket.emit("action", fetchAction(false));
};
