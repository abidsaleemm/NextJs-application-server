import queryPortalList from "../helpers/queryPortalList";
import payloadPortal from "../actions/payloadPortal";

export default async ({
  socket,
  user: { id: clientID, admin } = {}
}) => {
  const portalList = await queryPortalList({ clientID, admin });
  socket.emit(
    "action",
    payloadPortal({
      portalList
    })
  );
};
