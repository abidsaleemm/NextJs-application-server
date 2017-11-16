import queryProjectDetail from "../helpers/queryProjectDetail";
import {
  payloadProjectDetail,
  setDefaultList,
  fetchAction,
  setProjectDetailSettings
} from "../actions";
import { getDefaultList } from "../defaults";
import { getSettings } from "../settings/adapterJSON/setSettings";

export default async ({
  socket,
  action: { studyUID = "" },
  user: { id: clientID }
}) => {
  const projectDetail = await queryProjectDetail({ studyUID });
  const defaults = await getDefaultList();
  const settings = getSettings(clientID).projectDetailSettings;

  await socket.emit("action", payloadProjectDetail(projectDetail));
  await socket.emit("action", setDefaultList(defaults));
  await socket.emit("action", setProjectDetailSettings(settings));

  socket.emit("action", fetchAction(false));
};
