import { getStudy } from '../dicom';
import {
  getProject,
  getProjectSnapshot
} from "../projects";
import { getClientInfo } from "../authUsers";

export default async ({ studyUID = 0 }) => {
  const { clientID = 0, ...study } = await getStudy({ studyUID });
  const project = {
    ...await getProject({ studyUID }),
    ...await getProjectSnapshot({ studyUID })
  };

  // Merge project and study table
  return {
    ...project,
    ...study,
    studyUID,
    client: (({ name }) => name)(await getClientInfo({ clientID }))
  };
};
