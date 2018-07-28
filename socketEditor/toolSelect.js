// TODO Handle adapter as passthrough prop
import { adapter } from "../server";

export default async ({ socket, action }) => {
  const {
    projects: { getProjectSnapshotList = () => {} } = {}
  } = adapter;

  const list = getProjectSnapshotList({ key });
};
