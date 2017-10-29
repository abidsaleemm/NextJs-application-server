import authMiddleware from "../auth/middleware";
import queryPortalList from "../helpers/queryPortalList";

export default ({ server, app }) => {
  server.get(
    "/portal",
    authMiddleware(),
    async ({ ...req, user: { admin = false, id: clientID }, query }, res) =>
      app.render(req, res, "/portal", {
        ...query,
        portalList: await queryPortalList({ clientID, admin })
      })
  );
};
