import queryProjectDetail from "../helpers/queryProjectDetail";
import queryProjectsList from "../helpers/queryProjectsList";
import {
  payloadProjectDetail,
  payloadProjects,
  fetchAction,
  setProjectDetailSettings
} from "../actions";
import { getUserProps } from "../authUsers";

export default async ({
  socket,
  action: { studyUID = "" },
  user: { id: userID, admin = false } = {}
}) => {
  const projectDetail = await queryProjectDetail({ studyUID });
  const { projectDetailSettings } = await getUserProps(userID, [
    "projectDetailSettings"
  ]);

  await socket.emit("action", payloadProjectDetail(projectDetail));

  const projects = await queryProjectsList({ admin });
  await socket.emit("action", payloadProjects({ projects }));

  await socket.emit(
    "action",
    setProjectDetailSettings(projectDetailSettings)
  );

  socket.emit("action", fetchAction(false));
};
