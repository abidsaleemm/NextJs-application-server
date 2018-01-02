import { setProject } from "../projects";
import queryPortalList from "../helpers/queryPortalList";
import { payloadPortal } from "../actions";

export default async ({
  socket,
  action: { studyUID, props } = {},
  user: { id: clientID, admin } = {}
}) => {
  await setProject({ studyUID, props });
  const portalList = await queryPortalList({ clientID, admin });

  await socket.emit(
    "action",
    payloadPortal({
      portalList
    })
  );
};
