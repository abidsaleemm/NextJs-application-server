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

    return app.render(req, res, "/projectDetail", {
      studyUID,
      ...query,
      projectDetailSettings,
      projectDetail: await queryProjectDetail({ studyUID }), // TODO Wrap in promise
      projectsListDefault: await queryProjectsListDefault() // TODO Wrap in promise
    });
  });
};
