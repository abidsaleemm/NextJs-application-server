import queryProjectsList from "../helpers/queryProjectsList";
import queryProjectsListDefault from "../helpers/queryProjectsListDefault";

import {
  payloadProjects,
  payloadProjectsSettings,
  payloadUsers
} from "../actions";
import { adapter } from "../server";

export default async ({
  socket,
  user,
  user: { role, id, teams = [] } = {}
}) => {
  const {
    users: { getUsers = () => {}, getUserProps = () => {} } = {}
  } = adapter;

  // TODO Optimize with promise?
  const { projectsSettings } = await getUserProps(id, ["projectsSettings"]);

  // TODO Reusablable function used in route/projects.  Wrap in helper?
  const users = await getUsers();
  const usersSelected =
    role === "admin"
      ? users
      : teams.reduce((a, v) => {
          const { isTeamAdmin = false, id } = v;
          const ret = isTeamAdmin
            ? users.filter(({ teams = [] }) => teams.some(v => v.id === id))
            : [];

          return [...a, ...ret];
        }, []);

  const [projects, projectsListDefault] = await Promise.all([
    queryProjectsList({
      role:
        role === "admin"
          ? role
          : teams.some(({ isTeamAdmin }) => isTeamAdmin)
            ? "admin"
            : "user",
      userID: id,
      userList: usersSelected
    }),
    queryProjectsListDefault()
  ]);

  socket.emit(
    "action",
    payloadUsers({
      data: usersSelected.length === 0 ? [{ ...user }] : usersSelected
    })
  );

  socket.emit("action", payloadProjects({ projects, projectsListDefault }));
  socket.emit("action", payloadProjectsSettings(projectsSettings));
};
