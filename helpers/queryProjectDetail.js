export default async ({ studyUID = 0, adapter }) => {
  const {
    file: { list: fileList = () => {} } = {},
    projects: { getProject = () => {} } = {},
    dicom: { getStudy = () => {}, getSeries = () => {} } = {}
  } = adapter;

  const { ...study } = await getStudy({ studyUID });
  const project = await getProject({ studyUID });
  const series = await getSeries({ studyUID });
  
  // TODO Filter out video resources
  const uploadedFiles = await fileList({ path: studyUID });

  // Merge project and study table
  return {
    ...study,
    ...project,
    studyUID,
    series,
    uploadedFiles
  };
};
