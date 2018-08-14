import queryProjectsList from "../helpers/queryProjectsList";
import { payloadProjects, payloadProjectsSettings, payloadUsers } from "../actions";
import { adapter } from "../server";

export default async ({ socket, user: { role, id, teams = [] } = {} }) => {
  const { users: { getUsers = () => {}, getUserProps = () => {} } = {} } = adapter;

  // TODO Optimize with promise
  const projects = await queryProjectsList({
    role: role === "admin" ? role : teams.some(({ isTeamAdmin }) => isTeamAdmin) ? "admin" : "user",
    userID: id
  });
  const { projectsSettings } = await getUserProps(id, ["projectsSettings"]);

  // TODO Reusablable function used in route/projects.  Wrap in helper?
  const users = await getUsers();
  const usersSelected =
    role === "admin"
      ? users
      : teams.reduce((a, v) => {
          const { isTeamAdmin = false, id } = v;
          const ret = isTeamAdmin ? users.filter(({ teams = [] }) => teams.some(v => v.id === id)) : [];

          return [...a, ...ret];
        }, []);

  socket.emit("action", payloadUsers({ data: usersSelected }));
  socket.emit("action", payloadProjects({ projects }));
  socket.emit("action", payloadProjectsSettings(projectsSettings));
};
