import queryProjectsList from "../helpers/queryProjectsList";
import { getSettings } from '../settings/adapterJSON/setSettings';
import { payloadProjects, fetchAction, setProjectsSettings } from "../actions";

export default async ({ socket, user: { id, admin } }) => {
  const settings = getSettings(id).projectsSettings;
  await socket.emit("action", fetchAction(true));
  const projects = await queryProjectsList({ admin });
  await socket.emit("action", setProjectsSettings(settings));
  await socket.emit("action", payloadProjects({ projects }));
  await socket.emit("action", fetchAction(false));
};
