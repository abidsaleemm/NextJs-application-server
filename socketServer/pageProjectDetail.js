import queryProjectDetail from "../helpers/queryProjectDetail";
import { payloadProjectDetail } from "../actions";

export default async ({
  socket,
  action: { studyUID = "" },
  user
}) => {
  const projectDetail = await queryProjectDetail({ studyUID });
  console.log("projectDetail", projectDetail);
  socket.emit("action", payloadProjectDetail(projectDetail));
};
