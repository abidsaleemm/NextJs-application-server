import pageProjects from "./pageProjects";

export default async ({
  socket,
  action: { name, studyUID } = {},
  user,
  adapter
}) => {
  const {
    file: { del: uploadDel = () => {} }
  } = adapter;

  const path = `${studyUID}/${name}`;

  await uploadDel({ path });

  pageProjects({ socket, user, adapter });
};
