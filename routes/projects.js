import authMiddleware from "../auth/middleware";
import queryProjectsList from "../helpers/queryProjectsList";
import { getDefaultList } from "../defaults";
import { getUserProps } from "../authUsers";

export default ({ server, app }) =>
  server.get("/projects", authMiddleware(), async (req, res) => {
    const { user: { admin = false, id } } = req;
    const { projectsSettings } = await getUserProps(id, [
      "projectsSettings"
    ]);

    return app.render(req, res, "/projects", {
      ...req.query,
      projectsSettings,
      projects: await queryProjectsList({ admin }),
  });
