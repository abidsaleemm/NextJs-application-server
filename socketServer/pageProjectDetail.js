import queryProjectDetail from "../helpers/queryProjectDetail";
import queryProjectsList from "../helpers/queryProjectsList";
import {
  payloadProjectDetail,
  payloadProjects,
  setProjectDetailSettings
} from "../actions";
import { getUserProps } from "../authUsers";

export default async ({
  socket,
  action: { studyUID = "" },
  user: { id: userID, admin = false } = {}
}) => {
  // TODO Optimize loading
  const projectDetail = await queryProjectDetail({ studyUID });
  const { projectDetailSettings } = await getUserProps(userID, [
    "projectDetailSettings"
  ]);

  socket.emit("action", payloadProjectDetail(projectDetail));

  const projects = await queryProjectsList({ admin });
  socket.emit("action", payloadProjects({ projects }));

  socket.emit(
    "action",
    setProjectDetailSettings(projectDetailSettings)
  );
};
