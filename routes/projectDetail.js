import queryProjectDetail from "../helpers/queryProjectDetail";
import authMiddleware from "../auth/middleware";
import { getDefaultList } from '../defaults';

export default ({ server, app }) =>
  server.get(
    "/projectDetail",
    authMiddleware(),
    async ({ ...req, query: { ...query, studyUID = "" } = {} }, res) => {
      return app.render(req, res, "/projectDetail", {
        ...query,
        projectDetail: await queryProjectDetail({ studyUID }),
        defaultList: await getDefaultList(),
      })
    }
  );
  