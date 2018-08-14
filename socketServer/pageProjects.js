import queryProjectsList from "../helpers/queryProjectsList";
import { payloadProjects, payloadProjectsSettings, payloadUsers } from "../actions";
import { adapter } from "../server";

export default async ({ socket, user: { role, id } = {} }) => {
  const { users: { getUsers = () => {}, getUserProps = () => {} } = {} } = adapter;

  // TODO Optimize with promise
  const projects = await queryProjectsList({ role });
  const { projectsSettings } = await getUserProps(id, ["projectsSettings"]);

  const users = await getUsers();

  socket.emit("action", payloadUsers({ data: users }));
  socket.emit("action", payloadProjects({ projects }));
  socket.emit("action", payloadProjectsSettings(projectsSettings));
};
