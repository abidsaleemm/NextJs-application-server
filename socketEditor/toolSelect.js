export default async ({ socket, action, adapter }) => {
  const {
    projects: { getProjectSnapshotList = () => {} } = {}
  } = adapter;

  const list = getProjectSnapshotList({ key });
};
