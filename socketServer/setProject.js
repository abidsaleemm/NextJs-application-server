import { queryStudies } from "../dicom";
import { setProject } from "../projects";

// export default async ({ studyUID, ...props }) => {
export default async ({
  socket,
  action: { studyUID, ...props } = {}
}) => {
  setProject({ studyUID, props });

  // TODO send updated project 
  return props;
};
