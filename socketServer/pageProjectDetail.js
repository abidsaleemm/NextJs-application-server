import queryProjectDetail from "../helpers/queryProjectDetail";
import { getSettings } from '../settings/adapterJSON/setSettings';
import { payloadProjectDetail, fetchAction, setProjectDetailSettings} from "../actions";

export default async ({
  socket,
  action: { studyUID = "" },
  user: { id: clientID }
}) => {
  await socket.emit("action", fetchAction(true));
  const projectDetail = await queryProjectDetail({ studyUID });
  await socket.emit("action", payloadProjectDetail(projectDetail));
  const settings = getSettings(clientID).projectDetailSettings;
  await socket.emit("action", setProjectDetailSettings(settings));
  socket.emit("action", fetchAction(false));
};
