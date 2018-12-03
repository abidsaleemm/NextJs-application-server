import pageProjects from "./pageProjects";

export default async ({ socket, action: { studyUID }, user, adapter }) => {
  const { video: { videoDelete = () => {} } = {} } = adapter;

  await videoDelete({ studyUID });

  pageProjects({ socket, user, adapter });
};
