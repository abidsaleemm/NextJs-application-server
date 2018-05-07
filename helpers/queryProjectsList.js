import { getStudies } from "../dicom";
import { getProjectList } from "../projects";
import { getUserProps } from "../authUsers";
import { getProject } from "../projects";
import getStatusName from "../helpers/getStatusName";
import { list as uploadList } from "../upload";
import { videoExists } from "../video";

export default async ({ clientID = 0, admin = false } = {}) => {
  // TODO Do query directly getProjectList instead of filtering with javascript
  const [projects, studies] = await Promise.all([
    getProjectList(),
    getStudies()
  ]);

  const ret = await Promise.all(
    studies
      // TODO Add better permissions for this?
      // .filter(study => (admin ? true : study.clientID == clientID)) // TODO fix typing or query directly using table storage?
      .map(study => [
        study,
        projects.find(
          ({ studyUID = "" }) => study.studyUID === studyUID
        )
      ])
      .filter(([study]) => study !== undefined)
      .map(
        async ([
          { studyUID, studyName, clientID = 0, ...study } = {},
          { status, ...project } = {}
        ]) => {
          const { name: client } = await getUserProps(clientID, [
            "name"
          ]);

          const { multusID = "" } =
            (await getProject({ studyUID })) || {};

          return {
            ...project,
            ...study,
            studyName:
              studyName.length > 20
                ? studyName.substr(0, 20).concat("...")
                : studyName, // TODO Trim here. Maybe better place or way?
            studyUID,
            client,
            multusID,
            statusName: getStatusName(status || 0),
            status: status || 0,
            videoExists: await videoExists({ studyUID }),
            uploadedFiles: await uploadList({ studyUID })
          };
        }
      )
  );

  return ret;
};
