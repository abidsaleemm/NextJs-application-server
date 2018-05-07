import { Vector3 } from "three";
import { series } from "./";
import { images } from "./";

export default async ({ studyUID }) =>
  Object.values(series)
    .filter(v => v.studyUID === studyUID)
    .map(({ seriesUID, seriesName }) => {
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
        direction
      };
    }) || [];
