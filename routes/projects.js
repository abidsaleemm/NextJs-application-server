// import queryProjects from "query/projects";
import authMiddleware from "../auth/middleware";
import queryProjectsList from "../helpers/queryProjectsList";

export default ({ server, app }) =>
  server.get("/projects", authMiddleware(), async (req, res) =>
    app.render(req, res, "/projects", {
      ...req.query,
      // projects: await queryProjects()
      projects: await queryProjectsList()
    })
  );
