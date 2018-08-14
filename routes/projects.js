import authMiddleware from "../auth/middleware";
import queryProjectsList from "../helpers/queryProjectsList";
import { adapter } from "../server";

export default ({ server, app }) => {
  const { users: { getUsers = () => {}, getUserProps = () => {} } = {} } = adapter;

  server.get("/projects", authMiddleware(), async (req, res) => {
    const {
      user,
      user: { role = "user", id, teams = [] }
    } = req;

    const { projectsSettings } = (await getUserProps(id, ["projectsSettings"])) || {};

    // TODO Reusablable function used in projectPages.  Wrap in helper?
    const users = await getUsers();
    const usersSelected =
      role === "admin"
        ? users
        : teams.reduce((a, v) => {
            const { isTeamAdmin = false, id } = v;
            const ret = isTeamAdmin ? users.filter(({ teams = [] }) => teams.some(v => v.id === id)) : [];

            return [...a, ...ret];
          }, []);

    const projects = await queryProjectsList({
      role: role === "admin" ? role : teams.some(({ isTeamAdmin }) => isTeamAdmin) ? "admin" : "user",
      userID: id,
      userList: usersSelected
    });

    return app.render(req, res, "/projects", {
      ...req.query,
      users: usersSelected.length === 0 ? [{ ...user }] : usersSelected,
      projectsSettings,
      projects
    });
  });
};
