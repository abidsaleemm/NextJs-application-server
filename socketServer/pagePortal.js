import queryPortalList from "../helpers/queryPortalList";
import payloadPortal from "../actions/payloadPortal";

export default async ({ socket, action: { clientID } = {} }) => {
  const portalList = await queryPortalList();
  socket.emit(
    "action",
    payloadPortal({
      portalList
    })
  );
};
