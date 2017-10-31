import queryProjectDetail from "../helpers/queryProjectDetail";
import { payloadProjectDetail, fetchAction } from "../actions";

export default async ({
  socket,
  action: { studyUID = "" },
  user
}) => {
  await socket.emit("action", fetchAction(true));
  const projectDetail = await queryProjectDetail({ studyUID });
  await socket.emit("action", payloadProjectDetail(projectDetail));
  socket.emit("action", fetchAction(false));
};
