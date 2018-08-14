import queryProjectDetail from "../helpers/queryProjectDetail";
import queryProjectsList from "../helpers/queryProjectsList";
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

  const projects = await queryProjectsList({ role });
  socket.emit("action", payloadProjects({ projects }));

  socket.emit(
    "action",
    setProjectDetailSettings(projectDetailSettings)
  );
};
