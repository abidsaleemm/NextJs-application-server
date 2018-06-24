import pageProjects from "./pageProjects";
import { adapter } from "../server";

export default async ({ socket, action: props = {}, user }) => {
  const { upload: { del: uploadDel = () => {} } = {} } = adapter;

  await uploadDel(props);

  pageProjects({ socket, user });
};
