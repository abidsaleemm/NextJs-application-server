import authMiddleware from "../auth/middleware";
import queryProjectsList from "../helpers/queryProjectsList";

export default ({ server, app }) =>
  server.get("/projects", authMiddleware(), async (req, res) => {
    const { user: { admin = false } } = req;

    app.render(req, res, "/projects", {
      ...req.query,
      projects: await queryProjectsList({ admin })
    });
  });
