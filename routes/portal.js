import authMiddleware from "../auth/middleware";
import queryPortalList from "../helpers/queryPortalList";
import { getUserProps } from "../authUsers";

export default ({ server, app }) => {
  server.get("/portal", authMiddleware(), async (req, res) => {
    const { user: { admin = false, id: clientID }, query } = req;
    const { portalSettings } = await getUserProps(clientID, [
      "portalSettings"
    ]);

    return app.render(req, res, "/portal", {
      ...query,
      portalSettings,
      portalList: await queryPortalList({ clientID, admin })
    });
  });
};
