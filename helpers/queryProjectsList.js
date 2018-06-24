import getStatusName from "../helpers/getStatusName";

import { adapter } from "../server";

export default async () => {
  const {
    video: { videoExists = () => {} } = {},
    upload: { list: uploadList = () => {} } = {},
    projects: {
      getProject = () => {},
      getProjectList = () => {}
    } = {},
    dicom: { getStudies = () => {} } = {}
  } = adapter;

  // TODO Do query directly getProjectList instead of filtering with javascript
  const [projects = [], studies = []] = await Promise.all([
    getProjectList(),
    getStudies()
  ]);

  const ret = await Promise.all(
    studies
      .map(study => [
        study,
        projects.find(
          ({ studyUID = "" }) => study.studyUID === studyUID
        )
      ])
      .filter(
        ([study, { deleted = false } = {}]) =>
          study !== undefined && deleted !== true
      )
      .map(
        async ([
          { studyUID, studyName = "", ...study } = {},
          { status, sample = false, ...project } = {}
        ]) => {
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
            multusID,
            statusName: getStatusName(status || 0),
            status: status || 0,
            videoExists: await videoExists({ studyUID }),
            uploadedFiles: await uploadList({ studyUID }),
            sample
          };
        }
      )
  );

  return ret;
};
