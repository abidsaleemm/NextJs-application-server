import authMiddleware from "../auth/middleware";
import queryPortal from "../query/portal";

export default ({ server, app }) => {
  server.get(
    "/portal",
    authMiddleware(),
    async ({ ...req, user: { admin = false, client = false, id: clientId }, query }, res) =>
      app.render(req, res, "/portal", {
        ...query,
        portal: await queryPortal({ clientId, admin })
      })
  );


};
