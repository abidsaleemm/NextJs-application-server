import * as R from "ramda";
import queryProjectsList from "./queryProjectsList";
import getStatusName from "./getStatusName";
import { videoExists } from "../video";
import { getUserProps } from "../authUsers";
import { list as uploadList } from "../upload";
import { getStudies } from "../dicom";
import { getProject, getProjectList } from "../projects";

const reducePatients = studies =>
  R.uniqWith((a, b) => a.patientID === b.patientID)(studies).map(
    ({ client, patientName, patientID, patientBirthDate }) => {
      return {
        client,
        patientName,
        patientID,
        patientBirthDate,
        studies: studies
          .filter(v => v.patientID === patientID)
          .map(({ // TODO Refactor to remove unused props?
            studyUID, studyName, studyDate, status, location, client, videoExists, uploadedFiles, multusID, uploadDateTime, modality }) => ({
            studyUID,
            studyName,
            studyDate,
            status,
            statusName: getStatusName(status || 0),
            location,
            client,
            videoExists,
            uploadedFiles,
            multusID,
            uploadDateTime,
            modality
          }))
      };
    }
  );

const getStudiesList = async ({
  clientID = 0,
  admin = false
} = {}) => {
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
        async ([
          { studyUID, clientID = 0, ...study },
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
            studyUID,
            client,
            multusID,
            statusName: getStatusName(status || 0),
            status: status || ""
          };
        }
      )
  );
};

export default async ({ clientID, admin } = {}) => {
  const studies = await getStudiesList({ clientID, admin });

  return reducePatients(
    await Promise.all(
      studies.map(async ({ studyUID, ...props }) => {
        return {
          ...props,
          studyUID,
          videoExists: await videoExists({ studyUID }),
          uploadedFiles: await uploadList({ studyUID }) // TODO Move to separate query
        };
      })
    )
  );
};
