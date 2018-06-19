import { setProject } from "../projects";

export default async ({ action: { studyUID, ...props } = {} }) => {
  setProject({ studyUID, props });
};
