import queryProjectDetail from "../helpers/queryProjectDetail";
// import queryProjectsList from "../helpers/queryProjectsList";
import queryProjectsListDefault from "../helpers/queryProjectsListDefault";
import {
  payloadProjectDetail,
  payloadProjects,
  setProjectDetailSettings
} from "../actions";
import { adapter } from "../server";

export default async ({
  socket,
  action: { studyUID = "" },
  user: { id: userID, role = "user" } = {}
}) => {
  const { users: { getUserProps = () => {} } = {} } = adapter;

  // TODO Optimize loading
  const projectDetail = await queryProjectDetail({ studyUID });
  const { projectDetailSettings } = await getUserProps(userID, [
    "projectDetailSettings"
  ]);

  socket.emit("action", payloadProjectDetail(projectDetail));

  //   const projects = await queryProjectsList({ role });
  // TODO Handle using Promise.all
  //   const projects = await queryProjectsListDefault();
  const projectsListDefault = await queryProjectsListDefault();
  socket.emit("action", payloadProjects({ projectsListDefault }));

  socket.emit("action", setProjectDetailSettings(projectDetailSettings));
};
