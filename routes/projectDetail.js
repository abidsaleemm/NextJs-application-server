import queryProjectDetail from "../helpers/queryProjectDetail";
import { getSettings } from '../authUsers';
import authMiddleware from "../auth/middleware";
import { getDefaultList } from '../defaults';

export default ({ server, app }) =>
  server.get(
    "/projectDetail",
    authMiddleware(),
    async ({...req, query: { ...query, studyUID = "", user: { id: clientID } } = {} }, res) => {
      return app.render(req, res, "/projectDetail", {
        ...query,
        projectDetail: await queryProjectDetail({ studyUID }),
        projectDetailSettings: (({ projectDetailSettings }) => projectDetailSettings)(await getSettings(clientID)),
        defaultList: await getDefaultList(),
      })
    }
  );
