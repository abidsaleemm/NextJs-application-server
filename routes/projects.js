import authMiddleware from "../auth/middleware";
import queryProjectsList from "../helpers/queryProjectsList";
import { getDefaultList } from "../defaults";

export default ({ server, app }) =>
  server.get("/projects", authMiddleware(), async (req, res) => {
    const { user: { admin = false } } = req;

    app.render(req, res, "/projects", {
      ...req.query,
      projects: await queryProjectsList({ admin }),
      defaultList: await getDefaultList()
    });
  });
