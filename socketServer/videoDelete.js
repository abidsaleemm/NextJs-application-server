import pageProjects from "./pageProjects";
import { adapter } from "../server";

export default async ({ socket, action: { studyUID }, user }) => {
  const { video: { videoDelete = () => {} } = {} } = adapter;

  await videoDelete({ studyUID });

  pageProjects({ socket, user });
};
