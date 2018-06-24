import queryProjectDetail from "../helpers/queryProjectDetail";
import queryProjectsList from "../helpers/queryProjectsList";
import authMiddleware from "../auth/middleware";
import { adapter } from "../server";
// import { getUserProps } from "../authUsers";

export default ({ server, app }) => {
  const { users: { getUserProps = () => {} } = {} } = adapter;

  server.get("/projectDetail", authMiddleware(), async (req, res) => {
    const {
      user: { id, admin = false } = {},
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
      projects: await queryProjectsList({ admin })
    });
  });
};
