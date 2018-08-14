import authMiddleware from "../auth/middleware";
import queryProjectsList from "../helpers/queryProjectsList";
import { adapter } from "../server";

export default ({ server, app }) => {
  const { users: { getUsers = () => {}, getUserProps = () => {} } = {} } = adapter;

  server.get("/projects", authMiddleware(), async (req, res) => {
    const {
      user: { role = "user", id }
    } = req;

    const { projectsSettings } = (await getUserProps(id, ["projectsSettings"])) || {};

    return app.render(req, res, "/projects", {
      ...req.query,
      users: await getUsers(),
      projectsSettings,
      projects: await queryProjectsList({ role })
    });
  });
};
