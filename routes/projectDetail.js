// import queryProjectDetail from "../query/projectDetail";
import queryProjectDetail from "../helpers/queryProjectDetail";
import authMiddleware from "../auth/middleware";

export default ({ server, app }) =>
  server.get(
    "/projectDetail",
    authMiddleware(),
    async ({ ...req, query: { ...query, studyUID = "" } = {} }, res) => {
      return app.render(req, res, "/projectDetail", {
        ...query,
        projectDetail: await queryProjectDetail({ studyUID })
      })
    }
  );