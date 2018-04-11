import authMiddleware from "../auth/middleware";
import { getUsers } from "../authUsers/local";
import { getUserProps } from "../authUsers";

export default ({ server, app }) =>
  server.get("/users", authMiddleware(), async (req, res) => {
    const { user: { admin = false, id } } = req;
    const { projectsSettings } = await getUserProps(id, [
      "projectsSettings"
    ]);

    return app.render(req, res, "/users", {
      ...req.query,
      projectsSettings,
      users: await getUsers()
    });
  });
