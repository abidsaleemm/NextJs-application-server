import { adapter } from "../server";

export default async ({ studyUID = 0 }) => {
  const {
    upload: { list: uploadList = () => {} } = {},
    projects: { getProject = () => {} } = {},
    dicom: { getStudy = () => {} } = {}
  } = adapter;

  const { ...study } = await getStudy({ studyUID });
  const project = await getProject({ studyUID });
  const uploadedFiles = await uploadList({ studyUID });

  // Merge project and study table
  return {
    ...study,
    ...project,
    studyUID,
    uploadedFiles
  };
};
