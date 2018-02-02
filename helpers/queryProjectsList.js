import { getStudies } from "../dicom";
import { getProjectList } from "../projects";
import { getUserProps } from "../authUsers";
import { getProject } from "../projects";
import getStatusName from "../helpers/getStatusName";
import { list as uploadList } from "../upload";

export default async ({ clientID = 0, admin = false } = {}) => {
  // TODO Do query directly getProjectList instead of filtering with javascript
  const projects = await getProjectList();
  const studies = await getStudies();

  const ret = await Promise.all(
    projects
      .filter(
        ({ multusID }) => multusID !== undefined && multusID !== ""
      )
      // TODO Add better permissions for this?
      // .filter(study => (admin ? true : study.clientID == clientID)) // TODO fix typing or query directly using table storage?
      .map(project => [
        studies.find(
          ({ studyUID = "" }) => project.studyUID === studyUID
        ),
        project
      ])
      .filter(([study]) => study !== undefined)
      .map(
        async ([
          { studyUID, clientID = 0, ...study } = {},
          { status, ...project } = {}
        ]) => {
          const { name: client } = await getUserProps(clientID, [
            "name"
          ]);

          const uploadedList = await uploadList({ studyUID });

          const { multusID = "" } =
            (await getProject({ studyUID })) || {};

          return {
            ...project,
            ...study,
            studyUID,
            client,
            multusID,
            statusName: getStatusName(status || 0),
            status: status || 0,
            uploadedList
          };
        }
      )
  );

  return ret.filter(
    ({ uploadedList = [] }) => uploadedList.length > 0
  );
};
