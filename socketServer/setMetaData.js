// import { fetchAction } from "../actions";
import { setMetaData } from "../metaData";

export default async ({
  socket,
  action: { studyUID, props } = {}
}) => {
  await setMetaData({ studyUID, props });
  // await setProject({ studyUID, props });
  // pageProjectDetail({ socket, action: { studyUID } });
};
