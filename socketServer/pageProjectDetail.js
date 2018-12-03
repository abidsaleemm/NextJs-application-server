import queryProjectDetail from "../helpers/queryProjectDetail";
// import queryProjectsList from "../helpers/queryProjectsList";
import queryProjectsListDefault from "../helpers/queryProjectsListDefault";
import {
  payloadProjectDetail,
  payloadProjects,
  setProjectDetailSettings
} from "../actions";

export default async ({
  socket,
  action: { studyUID = "" },
  user: { id: userID, role = "user" } = {},
  adapter
}) => {
  const { users: { getUserProps = () => {} } = {} } = adapter;

  const { projectDetailSettings } = await getUserProps(userID, [
    "projectDetailSettings"
  ]);

  const [projectDetail, projectsListDefault] = await Promise.all([
    queryProjectDetail({ studyUID, adapter }),
    queryProjectsListDefault(adapter)
  ]);

  //
  socket.emit("action", payloadProjectDetail(projectDetail));
  socket.emit("action", payloadProjects({ projectsListDefault }));
  socket.emit("action", setProjectDetailSettings(projectDetailSettings));
};
