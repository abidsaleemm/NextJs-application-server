import queryProjectDetail from "../helpers/queryProjectDetail";
import { getSettings } from "../authUsers";
import authMiddleware from "../auth/middleware";
import { getDefaultList } from "../defaults";

export default ({ server, app }) =>
  server.get("/projectDetail", authMiddleware(), async (req, res) => {
    const {
      user: { id } = {},
      query: { studyUID = "", ...query } = {}
    } = req;

    return app.render(req, res, "/projectDetail", {
      studyUID,
      ...query,
      projectDetail: await queryProjectDetail({ studyUID }),
      projectDetailSettings: (({ projectDetailSettings }) =>
        projectDetailSettings)(await getSettings(id)),
      defaultList: await getDefaultList()
    });
  });
