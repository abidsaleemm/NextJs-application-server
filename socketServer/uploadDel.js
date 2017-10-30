import { del as uploadDel } from "../upload";
import pagePortal from "./pagePortal";
import { fetchAction } from "../actions";

export default async ({ socket, action: props = {}, user }) => {
  await socket.emit("action", fetchAction(true));
  await uploadDel(props);

  pagePortal({ socket, user });
};