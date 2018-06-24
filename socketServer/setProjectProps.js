import { adapter } from "../server";

export default async ({ action: { studyUID, ...props } = {} }) => {
  const { projects: { setProject = () => {} } = {} } = adapter;

  setProject({ studyUID, props });
};
