import queryProjects from "query/projects";
import authMiddleware from "../auth/middleware";

export default ({ server, app }) =>
  server.get("/projects", authMiddleware(), async (req, res) =>
    app.render(req, res, "/projects", {
      ...req.query,
      projects: await queryProjects()
    })
  );