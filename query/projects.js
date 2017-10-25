import { getStudies } from "../dicom";
import { getProjectList } from "../projects";
import getStatusName from "../helpers/getStatusName";
import { getClientName } from "../authUsers";

export default async () => {
  let studies = await getStudies();
  const projectsList = await getProjectList();

  const projects = await Promise.all(
    studies.map(async ({ clientID = 0, ...study}) => {
      const project =
        projectsList.find(({ studyUID }) => study.studyUID === studyUID) || {};

      const client = await getClientName({ clientID });
      const status = getStatusName(parseInt(project.status) || 0);

      const { uploadDateTime } = study;
      
      return {
        ...study,
        client,
        status,
        uploadDateTime: uploadDateTime ? new Date(uploadDateTime).toISOString() : ''
      };
    })
  );

  
  return projects;
};
