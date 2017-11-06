import queryProjectsList from "../helpers/queryProjectsList";
import { payloadProjects, fetchAction } from "../actions";

export default async ({ socket, user: { admin } }) => {
  const projects = await queryProjectsList({ admin });

  await socket.emit("action", payloadProjects({ projects }));
  await socket.emit("action", fetchAction(false));
};
