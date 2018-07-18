import { Vector3 } from "three";

export default async ({ studyUID, series = {}, images = {} }) =>
  Object.values(series)
    .filter(v => v.studyUID === studyUID)
    .map(
      ({
        seriesUID,
        seriesName,
        seriesDate,
        seriesTime,
        seriesNumber,
        seriesType,
        //
        patientName,
        patientSex,
        patientBirthDate,
        studyName,
        studyDate,
        modality,
        institutionName,
        manufacturer
      }) => {
        // Get a single image orientation
        const {
          [0]: {
            imageOrientation: [oX, oY] = [
              { x: 0, y: 0, z: 0 },
              { x: 0, y: 0, z: 0 }
            ]
          } = {}
        } = Object.values(images).filter(
          f => f.seriesUID === seriesUID && f.imageOrientation
        );

        const direction = new Vector3().crossVectors(oX, oY);
        return {
          seriesUID,
          seriesName,
          seriesDate,
          seriesTime,
          seriesNumber,
          seriesType,
          //
          direction,
          patientName,
          patientSex,
          patientBirthDate,
          studyName,
          studyDate,
          modality,
          institutionName,
          manufacturer
        };
      }
    ) || [];
