import { Vector3 } from "three";
import azure from "azure-storage";
import getImages from "./getImages";
import getStudy from "./getStudy";

export default async ({
  studyUID,
  tablePrefix,
  tableAdapter,
  tableAdapter: { queryTable }
}) => {
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
    getStudy({ studyUID, tablePrefix, tableAdapter }),
    queryTable({
      query: new azure.TableQuery()
        .select(["seriesName", "seriesUID"])
        .where("studyUID eq ?", studyUID),
      tableName: `${tablePrefix}Series`
    })
  ]);

  // Get direction of single image in volume
  const enhancedValues = await Promise.all(
    series.map(async v => {
      const { seriesUID, seriesName } = v;
      const images = await getImages({
        seriesUID,
        tablePrefix,
        tableAdapter
      });
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
