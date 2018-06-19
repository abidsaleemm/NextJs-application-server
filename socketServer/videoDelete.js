import { videoDelete } from "../video";
// import { fetchAction } from "../actions";
import pageProjects from "./pageProjects";

export default async ({ socket, action: { studyUID }, user }) => {
  //   socket.emit("action", fetchAction(true));

  await videoDelete({ studyUID });

  //
  pageProjects({ socket, user });
};
