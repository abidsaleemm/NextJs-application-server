import { setProject } from "../projects";
import { payloadPortal } from "../actions";

export default async ({
  socket,
  action: { studyUID, props } = {},
  user: { id: clientID, admin } = {}
}) => {
  setProject({ studyUID, props });
};
