import { Vector3 } from "three";
import azure from "azure-storage";
import queryTable from "./helpers/queryTable";
import getImages from "./getImages";
import { tablePrefix } from "./";

export default async ({ studyUID }) => {
  const values = await queryTable({
    query: new azure.TableQuery()
      .select(["seriesName", "seriesUID"])
      .where("studyUID eq ?", studyUID),
    tableName: `${tablePrefix}Series`
  });

  // Get direction of single image in volume
  const enhancedValues = await Promise.all(
    values.map(async v => {
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
      return { ...v, direction };
    })
  );

  return enhancedValues;
};
