import queryProjectsList from "../helpers/queryProjectsList";
import {
  payloadProjects,
  fetchAction,
  setDefaultList,
  setProjectsSettings
} from "../actions";
import { getDefaultList } from "../defaults";
import { getUserProps } from "../authUsers";

export default async ({ socket, user: { admin, id } = {}}) => {
  const projects = await queryProjectsList({ admin });
  const defaults = await getDefaultList();
  const { projectsSettings } = await getUserProps(id, [
    "projectsSettings"
  ]);

  await socket.emit("action", payloadProjects({ projects }));
  await socket.emit("action", setDefaultList(defaults));
  await socket.emit("action", setProjectsSettings(projectsSettings));
  await socket.emit("action", fetchAction(false));
};
