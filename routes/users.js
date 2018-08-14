import authMiddleware from "../auth/middleware";
// import { getUsers } from "../authUsers/local";
// import { getUserProps } from "../authUsers";
import { adapter } from "../server";

export default ({ server, app }) => {
  const { users: { getUsers = () => {}, getTeams = () => {}, getUserProps = () => {} } = {} } = adapter;

  server.get("/users", authMiddleware(), async (req, res) => {
    const {
      user: { role = "user", id }
    } = req;
    const { projectsSettings } = await getUserProps(id, ["projectsSettings"]);

    return app.render(req, res, "/users", {
      ...req.query,
      projectsSettings,
      users: await getUsers(),
      teams: await getTeams()
    });
  });
};
