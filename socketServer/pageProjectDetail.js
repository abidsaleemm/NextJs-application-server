import queryProjectDetail from "../helpers/queryProjectDetail";
import {
  payloadProjectDetail,
  setDefaultList,
  fetchAction
} from "../actions";
import { getDefaultList } from "../defaults";

export default async ({
  socket,
  action: { studyUID = "" },
  user
}) => {
  const projectDetail = await queryProjectDetail({ studyUID });
  const defaults = await getDefaultList();

  await socket.emit("action", payloadProjectDetail(projectDetail));
  await socket.emit("action", setDefaultList(defaults));
  socket.emit("action", fetchAction(false));
};
