import { videoDelete } from "../video";
import pageProjects from "./pageProjects";

export default async ({ socket, action: { studyUID }, user }) => {
  await videoDelete({ studyUID });

  pageProjects({ socket, user });
};
