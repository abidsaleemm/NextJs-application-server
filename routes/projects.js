import authMiddleware from "../auth/middleware";
import queryProjectsList from "../helpers/queryProjectsList";
import { getDefaultList } from "../defaults";
import { getSettings } from "../authUsers";

export default ({ server, app }) =>
  server.get("/projects", authMiddleware(), async (req, res) => {
    const { user: { admin = false, id } } = req;

    app.render(req, res, "/projects", {
      ...req.query,
      projects: await queryProjectsList({ admin }),
      projectsSettings: (({ projectsSettings }) => projectsSettings)(
        await getSettings(id)
      ),
      defaultList: await getDefaultList()
    });
  });
