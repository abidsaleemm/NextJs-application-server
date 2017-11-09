import queryProjectsList from "../helpers/queryProjectsList";
import {
  payloadProjects,
  fetchAction,
  setDefaultList
} from "../actions";
import { getDefaultList } from "../defaults";

export default async ({ socket, user: { admin } }) => {
  const projects = await queryProjectsList({ admin });
  const defaults = await getDefaultList();

  await socket.emit("action", payloadProjects({ projects }));
  await socket.emit("action", setDefaultList(defaults));
  await socket.emit("action", fetchAction(false));
};
