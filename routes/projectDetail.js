import queryProjectDetail from "../helpers/queryProjectDetail";
import { getSettings } from '../settings/adapterJSON/setSettings';
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
        projectSettings: getSettings(clientID).projectDetailSettings,
        defaultList: await getDefaultList(),
      })
    }
  );
