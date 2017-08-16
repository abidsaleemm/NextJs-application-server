import queryProjectDetail from "../query/projectDetail";
import authMiddleware from "../auth/middleware";

export default ({ server, app }) =>
  server.get(
    "/projectDetail",
    authMiddleware(),
    async ({ ...req, query: { ...query, studyUID = "" } = {} }, res) =>
      app.render(req, res, "/projectDetail", {
        ...query,
        projectDetail: await queryProjectDetail({ studyUID })
      })
  );
