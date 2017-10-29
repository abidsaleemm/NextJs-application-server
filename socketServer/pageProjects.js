import queryProjectsList from "../helpers/queryProjectsList";
import { payloadProjects } from "../actions";

export default async ({ socket, user: { admin } }) => {
  const projects = await queryProjectsList({ admin });
  socket.emit("action", payloadProjects({ projects }));
};
