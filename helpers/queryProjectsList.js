import { getStudies } from "../dicom";
import { getProjectList } from "../projects";
import { getClientInfo } from "../authUsers";
import getStatusName from "../helpers/getStatusName";

export default async ({ clientID = 0, admin = false } = {}) => {
  // TODO Do query directly getProjectList instead of filtering with javascript
  const projects = await getProjectList();
  const studies = await getStudies();

  return await Promise.all(
    studies
      .filter(study => (admin ? true : study.clientID == clientID)) // TODO fix typing or query directly using table storage?
      .map(study => [
        study,
        projects.find(
          ({ studyUID = "" }) => study.studyUID === studyUID
        )
      ])
      .map(
        async (
          [
            { studyUID, clientID = 0, ...study },
            { status = 0, ...project } = {}
          ]
        ) => ({
          ...project,
          ...study,
          studyUID,
          status: getStatusName(status || 0),
          client: (({ name }) => name)(
            await getClientInfo({ clientID })
          )
        })
      )
  );
};
