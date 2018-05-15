import { fetchAction } from "../actions";
import { setProject } from "../projects";
import pageProjectDetail from "./pageProjectDetail";

export default async ({
  socket,
  action: { studyUID, ...props } = {}
}) => {
  await setProject({ studyUID, props });
  pageProjectDetail({ socket, action: { studyUID } });
};
