import { del as uploadDel } from "../upload";
import pageProjects from "./pageProjects";
import { fetchAction } from "../actions";

export default async ({ socket, action: props = {}, user }) => {
  await socket.emit("action", fetchAction(true));
  await uploadDel(props);

  pageProjects({ socket, user });
};
