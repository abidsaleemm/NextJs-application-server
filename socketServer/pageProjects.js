import queryProjectsList from "../helpers/queryProjectsList";
import { payloadProjects, setProjectsSettings } from "../actions";
import { getUserProps } from "../authUsers";

export default async ({ socket, user: { admin, id } = {} }) => {
  // TODO Optimize with promise
  const projects = await queryProjectsList({ admin });
  const { projectsSettings } = await getUserProps(id, [
    "projectsSettings"
  ]);

  socket.emit("action", payloadProjects({ projects }));
  socket.emit("action", setProjectsSettings(projectsSettings));
};
