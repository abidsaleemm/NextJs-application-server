import { getStudies } from "../dicom";
import { getProjectList } from "../projects";
import { getUserProps } from "../authUsers";
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
            { status, ...project } = {}
          ]
        ) => {
          const { name: client } = await getUserProps(clientID, [
            "name"
          ]);

          return {
            ...project,
            ...study,
            studyUID,
            client,
            statusName: getStatusName(status || 0),
            status: status
          };
        }
      )
  );
};
