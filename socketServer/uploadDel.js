import { del as uploadDel } from "../upload";
import pageProjects from "./pageProjects";

export default async ({ socket, action: props = {}, user }) => {
  await uploadDel(props);

  pageProjects({ socket, user });
};
