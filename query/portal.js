import React from "react";
import R from "ramda";
import { getStudies } from "../dicom";
import { getProjectList } from "../projects";
import { videoExists } from "../video";
import { getClientInfo } from "../authUsers";
import getStatusName from "../helpers/getStatusName";
import { list as uploadList } from "../upload";

export default async ({ clientID = 0, admin = false }) => {
  // TODO Do query directly getProjectList instead of filtering with javascript
  const projects = await getProjectList();

  let studies = await getStudies();
  studies = await Promise.all(
    studies
      .filter(study => (admin ? true : study.clientID == clientID)) // TODO fix typing?
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
          videoExists: await videoExists({ studyUID }),
          client: (({ name }) => name)(await getClientInfo({ clientID })),
          uploadedFiles: await uploadList({ studyUID })
        })
      )
  );

  const patients = R.uniqWith(
    (a, b) => a.patientName === b.patientName
  )(
    studies
  ).map(({ client, patientName, patientID, patientBirthDate }) => {
    return {
      client,
      patientName,
      patientID,
      patientBirthDate,
      studies: studies
        .filter(v => v.patientID === patientID)
        .map(
          ({ // Refactor to remove unused props
            studyUID,
            studyName,
            studyDate,
            status,
            location,
            client,
            videoExists,
            uploadedFiles
          }) => ({
            studyUID,
            studyName,
            studyDate,
            status,
            location,
            client,
            videoExists,
            uploadedFiles
          })
        )
    };
  });

  return {
    projects: patients
  };
};
