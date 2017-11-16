import queryProjectDetail from "../helpers/queryProjectDetail";
import authMiddleware from "../auth/middleware";
import { getDefaultList } from "../defaults";
import { getUserProps } from "../authUsers";

export default ({ server, app }) =>
  server.get("/projectDetail", authMiddleware(), async (req, res) => {
    const {
      user: { id } = {},
      query: { studyUID = "", ...query } = {}
    } = req;
    const { projectDetailSettings } = await getUserProps(id, [
      "projectDetailSettings"
    ]);

    return app.render(req, res, "/projectDetail", {
      studyUID,
      ...query,
      projectDetailSettings,
      projectDetail: await queryProjectDetail({ studyUID }),
      defaultList: await getDefaultList()
    });
  });
