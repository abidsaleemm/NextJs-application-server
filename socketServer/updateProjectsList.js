import queryProjectsList from "../helpers/queryProjectsList";

import { payloadProjects } from "../actions";

// TODO There is a bunch of duplicate code here.  WG
export default async ({
  socket,
  user: { role, id, teams = [] } = {},
  action: { projectsSettings = {} },
  adapter
}) => {
  const { users: { getUsers = () => {} } = {} } = adapter;

  // TODO Reusablable function used in route/projects.  Wrap in helper? WG
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

  const projects = await queryProjectsList({
    settings: projectsSettings,
    role:
      role === "admin"
        ? role
        : teams.some(({ isTeamAdmin }) => isTeamAdmin)
        ? "teamAdmin"
        : "user",
    userID: id,
    userList: usersSelected,
    adapter
  });

  socket.emit("action", payloadProjects({ projects }));
};
