import queryProjectDetail from "../helpers/queryProjectDetail";
import queryProjectsListDefault from "../helpers/queryProjectsListDefault";

import authMiddleware from "../auth/middleware";
import { adapter } from "../server";

export default ({ server, app }) => {
  const { users: { getUserProps = () => {} } = {} } = adapter;

  server.get("/projectDetail", authMiddleware(), async (req, res) => {
    const {
      user: { id, role = "user" } = {},
      query: { studyUID = "", ...query } = {}
    } = req;

    const { projectDetailSettings } =
      (await getUserProps(id, ["projectDetailSettings"])) || {};

    const [projectDetail, projectsListDefault] = await Promise.all([
      queryProjectDetail({ studyUID }),
      queryProjectsListDefault()
    ]);

    return app.render(req, res, "/projectDetail", {
      studyUID,
      ...query,
      projectDetailSettings,
      projectDetail,
      projectsListDefault
    });
  });
};
