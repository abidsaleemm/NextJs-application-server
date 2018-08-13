import authMiddleware from "../auth/middleware";
import queryProjectsList from "../helpers/queryProjectsList";
// import { getUserProps } from "../authUsers";
import { adapter } from "../server";

export default ({ server, app }) => {
  const { users: { getUserProps = () => {} } = {} } = adapter;

  server.get("/projects", authMiddleware(), async (req, res) => {
    const {
      user: { role = "user", id }
    } = req;

    const { projectsSettings } =
      (await getUserProps(id, ["projectsSettings"])) || {};

    return app.render(req, res, "/projects", {
      ...req.query,
      projectsSettings,
      projects: await queryProjectsList({ role })
    });
  });
};
