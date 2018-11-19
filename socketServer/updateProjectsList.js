import queryProjectsList from "../helpers/queryProjectsList";

import { payloadProjects } from "../actions";

import { adapter } from "../server";

// TODO There is a bunch of duplicate code here.  WG
export default async ({
  socket,
  user,
  user: { role, id, teams = [] } = {}
}) => {
  const {
    users: { getUsers = () => {}, getUserProps = () => {} } = {},
    renders: { getRenderQueue = () => {} } = {}
  } = adapter;

  const { projectsSettings } = await getUserProps(id, ["projectsSettings"]);

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
    userList: usersSelected
  });

  socket.emit("action", payloadProjects({ projects }));
};
