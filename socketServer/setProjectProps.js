import { adapter } from "../server";

export default async ({
  action: { studyUID, type, ...props } = {}
}) => {
  const { projects: { setProject = () => {} } = {} } = adapter;

  setProject({ studyUID, props });
};
