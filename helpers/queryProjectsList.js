import { adapter } from "../server";
import createVideoFileName from "../helpers/createVideoFileName";

export default async () => {
  const {
    file: { list: fileList = () => {}, get: fileGet = () => {} } = {},
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

          // TODO Cleanup.  Check for multiple video files an images
          const { studyDate, patientName, studyType } = study;
          const videoFileName = createVideoFileName({
            patientName,
            studyType,
            studyDate
          });

          return {
            ...project,
            ...study,
            // TODO Remove this
            studyName:
              studyName.length > 20
                ? studyName.substr(0, 20).concat("...")
                : studyName, // TODO Trim here. Maybe better place or way?
            studyUID,
            multusID,
            status: status,
            videoExists:
              (await fileGet({
                path: `${studyUID}/${videoFileName}`
              })) !== undefined,
            uploadedFiles: await fileList({ path: studyUID }),
            sample
          };
        }
      )
  );

  return ret;
};
