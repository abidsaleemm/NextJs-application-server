import * as R from "ramda";
import queryProjectsList from "./queryProjectsList";
import getStatusName from "./getStatusName";
import { videoExists } from "../video";
import { getUserProps } from "../authUsers";
import { list as uploadList } from "../upload";

const reducePatients = studies =>
  R.uniqWith((a, b) => a.patientName === b.patientName)(studies).map(
    ({ client, patientName, patientID, patientBirthDate }) => {
      return {
        client,
        patientName,
        patientID,
        patientBirthDate,
        studies: studies
          .filter(v => v.patientID === patientID)
          .map(({ // TODO Refactor to remove unused props?
            studyUID, studyName, studyDate, status, location, client, videoExists, uploadedFiles, multusID }) => ({
            studyUID,
            studyName,
            studyDate,
            status,
            statusName: getStatusName(status || 0),
            location,
            client,
            videoExists,
            uploadedFiles,
            multusID
          }))
      };
    }
  );

export default async ({ clientID, admin } = {}) => {
  const studies = await queryProjectsList({ clientID, admin });
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
