import { Vector3 } from "three";
import azure from "azure-storage";
import { queryTable } from "../table";
import getImages from "./getImages";
import getStudy from "./getStudy";
// import { tablIePrefix } from "./";

export default async ({ studyUID, tablePrefix, tableService }) => {
  const [
    {
      patientName,
      patientSex,
      patientBirthDate,
      studyName,
      studyDate,
      modality,
      institutionName,
      manufacturer
    },
    series
  ] = await Promise.all([
    getStudy({ studyUID }),
    queryTable({
      query: new azure.TableQuery()
        .select(["seriesName", "seriesUID"])
        .where("studyUID eq ?", studyUID),
      tableName: `${tablePrefix}Series`,
      tableService
    })
  ]);

  // Get direction of single image in volume
  const enhancedValues = await Promise.all(
    series.map(async v => {
      const { seriesUID, seriesName } = v;
      const images = await getImages({ seriesUID });
      const {
        [0]: {
          imageOrientation: [oX, oY] = [
            { x: 0, y: 0, z: 0 },
            { x: 0, y: 0, z: 0 }
          ]
        } = {}
      } = images.filter(({ imageOrientation }) => imageOrientation);
      const direction = new Vector3().crossVectors(oX, oY);
      return {
        ...v,
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
    })
  );

  return enhancedValues;
};
