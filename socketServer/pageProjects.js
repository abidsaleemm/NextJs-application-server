import queryProjectsList from "../helpers/queryProjectsList";
import {
  payloadProjects,
  fetchAction,
  setProjectsSettings
} from "../actions";
import { getUserProps } from "../authUsers";

export default async ({ socket, user: { admin, id } = {} }) => {
  const projects = await queryProjectsList({ admin });
  const { projectsSettings } = await getUserProps(id, [
    "projectsSettings"
  ]);

  await socket.emit("action", payloadProjects({ projects }));
  await socket.emit("action", setProjectsSettings(projectsSettings));
  await socket.emit("action", fetchAction(false));
};
