import queryProjectsList from "../helpers/queryProjectsList";
import { payloadProjects, setProjectsSettings } from "../actions";
import { adapter } from "../server";

export default async ({ socket, user: { role, id } = {} }) => {
  const { users: { getUserProps = () => {} } = {} } = adapter;

  // TODO Optimize with promise
  const projects = await queryProjectsList({ role });
  const { projectsSettings } = await getUserProps(id, [
    "projectsSettings"
  ]);

  socket.emit("action", payloadProjects({ projects }));
  socket.emit("action", setProjectsSettings(projectsSettings));
};
