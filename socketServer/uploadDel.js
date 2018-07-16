import pageProjects from "./pageProjects";
import { adapter } from "../server";

export default async ({
  socket,
  action: { name, studyUID } = {},
  user
}) => {
  const {
    file: { del: uploadDel = () => {} }
  } = adapter;

  const path = `${studyUID}/${name}`;

  await uploadDel({ path });

  pageProjects({ socket, user });
};
