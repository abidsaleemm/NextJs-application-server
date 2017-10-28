// import queryStudiesProjects from './queryStudiesProjects';
// import queryPatients from './queryPatients';
// import getStatusName from "./getStatusName";

// import { videoExists } from "../video";
// import { getClientInfo } from "../authUsers";
// import { list as uploadList } from "../upload";

// export default async ({ clientID }) => {
//   const studies = await queryStudiesProjects({ clientID });
//   return queryPatients(await Promise.all(studies.
//     .map(
//       async (props) => ({
//         ...props,
//         studyUID,
//         videoExists: await videoExists({ studyUID }),
//         uploadedFiles: await uploadList({ studyUID }) // TODO Move to separate query
//       })
//     )))
//   }

//   // import queryPortal from '../query/portal';
// // export default async ({ user: { id: clientID = 0, admin =  false }}) => await queryPortal({ clientID, admin })
// // import React from "react";

// import * as R from 'ramda';
import { getStudies } from "../dicom";
import { getProjectList } from "../projects";
// import { videoExists } from "../video";
import { getClientInfo } from "../authUsers";
import getStatusName from "../helpers/getStatusName";
// import { list as uploadList } from "../upload";

export default async ({ clientID } = {}) => {
  // TODO Do query directly getProjectList instead of filtering with javascript
  const projects = await getProjectList();
  const studies = await getStudies();

  return await Promise.all(
    studies
      .filter(study => (clientID ? study.clientID == clientID : true)) // TODO fix typing or query directly using table storage?
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

  // import queryStudiesProjects from './queryStudiesProjects';
  // import queryPatients from './queryPatients';
  // import getStatusName from "./getStatusName";

  // import { videoExists } from "../video";
  // import { getClientInfo } from "../authUsers";
  // import { list as uploadList } from "../upload";

  // export default async ({ clientID }) => {
  //   // TODO Do query directly getProjectList instead of filtering with javascript
  //   const studies = await queryStudiesProjects({ clientID });
  //   return { patients: queryPatients(await Promise.all(studies.
  //     .map(
  //       async (
  //         [
  //           { studyUID, clientID = 0, ...study },
  //           { status = 0, ...project } = {}
  //         ]
  //       ) => ({
  //         ...project,
  //         ...study,
  //         studyUID,
  //         status: getStatusName(status || 0),
  //         videoExists: await videoExists({ studyUID }),
  //         client: (({ name }) => name)(await getClientInfo({ clientID })),
  //         uploadedFiles: await uploadList({ studyUID })
  //       })
  //     )))
  //   };

  // const patients = R.uniqWith(
  //   (a, b) => a.patientName === b.patientName
  // )(
  //   studies
  // ).map(({ client, patientName, patientID, patientBirthDate }) => {
  //   return {
  //     client,
  //     patientName,
  //     patientID,
  //     patientBirthDate,
  //     studies: studies
  //       .filter(v => v.patientID === patientID)
  //       .map(
  //         ({ // Refactor to remove unused props
  //           studyUID,
  //           studyName,
  //           studyDate,
  //           status,
  //           location,
  //           client,
  //           videoExists,
  //           uploadedFiles
  //         }) => ({
  //           studyUID,
  //           studyName,
  //           studyDate,
  //           status,
  //           location,
  //           client,
  //           videoExists,
  //           uploadedFiles
  //         })
  //       )
  //   };
  // });

  // return {
  //   projects: patients
  // };
};
