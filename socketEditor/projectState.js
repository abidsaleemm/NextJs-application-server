import { adapter } from "../server";

export default async ({ socket, action }) => {
  const {
    projects: { setProjectSnapshot = () => {} } = {}
  } = adapter;

  const { payload = {} } = action;
  const { studyUID } = payload;

  console.log("Saving snapshot", studyUID);

  setProjectSnapshot({ studyUID, payload });
};
