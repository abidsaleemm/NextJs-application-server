import { setMetaData } from "../metaData";

export default async ({
  socket,
  action: { studyUID, props } = {}
}) => {
  await setMetaData({ studyUID, props });
};
