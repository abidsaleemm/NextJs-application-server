import walk from "walk"; // TODO Replace with own better version of walk
import fs from "fs";
import parseRaw from "./dicomParseRaw";

import getImageData from "./getImageData";
import getImages from "./getImages";
import getSeries from "./getSeries";
import getStudies from "./getStudies";
import getStudiesByPatientID from "./getStudiesByPatientID";
// import { PAYLOAD_USERS } from "../../../constants/actionTypes";

// export let series = {};
// export let studies = {};
// export let images = {};
// export const path = process.env.DICOM_PATH || "../backup/test"; // TODO Make this an env var or arg. Modify this to point to your local DICOM files

// // Export API calls
// export { default as getStudies } from "./getStudies";
// export { default as getStudy } from "./getStudy";
// export { default as getSeries } from "./getSeries";
// export { default as getImages } from "./getImages";
// export { default as getImageData } from "./getImageData";
// export {
//   default as getStudiesByPatientID
// } from "./getStudiesByPatientID";

// Self Invoking function used for testing locally
// const scanForDICOM = (directory = path) =>
//   new Promise((resolve, reject) => {
//     const walker = walk.walk(directory, {});

//     walker.on("file", (root, { name }, next) => {
//       const fullPath = `${root}/${name}`;

//       fs.readFile(fullPath, (error, data) => {
//         if (error) {
//           reject(error);
//           return;
//         }

//         // Override here
//         let newPath = fullPath.replace(path, "");
//         newPath =
//           newPath.indexOf("/") === 0
//             ? newPath.substring(1)
//             : location;

//         const location = newPath.substring(0, newPath.indexOf("/"));
//         const { mtime: uploadDateTime } = fs.statSync(fullPath);

//         const {
//           studyUID,
//           studyName,
//           studyDate,
//           patientName,
//           patientID,
//           patientBirthDate,
//           patientSex,
//           //   patientAge,
//           modality,
//           seriesName,
//           seriesUID,
//           checksum,
//           imageNumber,
//           instanceUID,
//           pixelData,
//           bitsAllocated,
//           bitsStored,
//           highbit,
//           columns,
//           rows,
//           // imageNumber,
//           imageOrientation,
//           imagePosition,
//           pixelAspectRatio,
//           pixelSpacing,
//           sliceThickness,
//           windowCenter,
//           windowWidth,
//           institutionName,
//           manufacturer
//         } = parseRaw(data, { bypassData: true, path: newPath });

//         if (
//           studyUID === undefined ||
//           seriesUID === undefined ||
//           instanceUID === undefined
//         ) {
//           next();
//           return;
//         }

//         // Merge
//         studies = {
//           ...studies,
//           [studyUID]: {
//             studyUID,
//             studyName,
//             studyDate,
//             patientName,
//             patientID,
//             patientBirthDate,
//             modality,
//             location,
//             patientSex,
//             uploadDateTime
//           }
//         };

//         series = {
//           ...series,
//           [seriesUID]: {
//             studyUID,
//             seriesName,
//             seriesUID,
//             patientID,
//             // Extra props
//             patientName,
//             patientSex,
//             patientBirthDate,
//             studyName,
//             studyDate,
//             modality,
//             institutionName,
//             manufacturer
//           }
//         };

//         images = {
//           ...images,
//           [instanceUID]: {
//             path: newPath,
//             checksum,
//             imageNumber,
//             seriesUID,
//             studyUID,
//             instanceUID,
//             patientID,
//             location,
//             instanceUID,
//             bitsAllocated,
//             bitsStored,
//             highbit,
//             columns,
//             rows,
//             // imageNumber,
//             imageOrientation,
//             imagePosition,
//             pixelAspectRatio,
//             pixelSpacing,
//             sliceThickness,
//             windowCenter,
//             windowWidth
//           }
//         };

//         next();
//       });
//     });

//     walker.on("errors", (root, nodeStatsArray, next) => {
//       reject(nodeStatsArray);
//       next();
//     });

//     walker.on("end", () => {
//       console.log("DICOM walk done");
//       resolve();
//     });
//   });

export default ({ path }) => {
  let series = {};
  let studies = {};
  let images = {};

  const directory = process.env.DICOM_PATH || "../backup/test"; // TODO Make this an env var or arg. Modify this to point to your local DICOM files

  const walker = walk.walk(directory, {});

  walker.on("file", (root, { name }, next) => {
    const fullPath = `${root}/${name}`;

    fs.readFile(fullPath, (error, data) => {
      if (error) {
        reject(error);
        return;
      }

      // Override here
      let newPath = fullPath.replace(path, "");
      newPath =
        newPath.indexOf("/") === 0 ? newPath.substring(1) : location;

      const location = newPath.substring(0, newPath.indexOf("/"));
      const { mtime: uploadDateTime } = fs.statSync(fullPath);

      const {
        studyUID,
        studyName,
        studyDate,
        patientName,
        patientID,
        patientBirthDate,
        patientSex,
        //   patientAge,
        modality,
        seriesName,
        seriesUID,
        checksum,
        imageNumber,
        instanceUID,
        pixelData,
        bitsAllocated,
        bitsStored,
        highbit,
        columns,
        rows,
        // imageNumber,
        imageOrientation,
        imagePosition,
        pixelAspectRatio,
        pixelSpacing,
        sliceThickness,
        windowCenter,
        windowWidth,
        institutionName,
        manufacturer
      } = parseRaw(data, { bypassData: true, path: newPath });

      if (
        studyUID === undefined ||
        seriesUID === undefined ||
        instanceUID === undefined
      ) {
        next();
        return;
      }

      // Merge
      studies = {
        ...studies,
        [studyUID]: {
          studyUID,
          studyName,
          studyDate,
          patientName,
          patientID,
          patientBirthDate,
          modality,
          location,
          patientSex,
          uploadDateTime
        }
      };

      series = {
        ...series,
        [seriesUID]: {
          studyUID,
          seriesName,
          seriesUID,
          patientID,
          // Extra props
          patientName,
          patientSex,
          patientBirthDate,
          studyName,
          studyDate,
          modality,
          institutionName,
          manufacturer
        }
      };

      images = {
        ...images,
        [instanceUID]: {
          path: newPath,
          checksum,
          imageNumber,
          seriesUID,
          studyUID,
          instanceUID,
          patientID,
          location,
          instanceUID,
          bitsAllocated,
          bitsStored,
          highbit,
          columns,
          rows,
          // imageNumber,
          imageOrientation,
          imagePosition,
          pixelAspectRatio,
          pixelSpacing,
          sliceThickness,
          windowCenter,
          windowWidth
        }
      };

      next();
    });
  });

  walker.on("errors", (root, nodeStatsArray, next) => {
    // reject(nodeStatsArray);
    next();
  });

  walker.on("end", () => {
    console.log("DICOM walk done");
    // resolve();
  });

  // // Export API calls
  // export { default as getStudies } from "./getStudies";
  // export { default as getStudy } from "./getStudy";
  // export { default as getSeries } from "./getSeries";
  // export { default as getImages } from "./getImages";
  // export { default as getImageData } from "./getImageData";
  // export {
  //   default as getStudiesByPatientID
  // } from "./getStudiesByPatientID";

  //   let series = {};
  //   let studies = {};
  //   let images = {};

  return {
    getStudies: async props =>
      await getStudies({ ...props, studies }),
    getStudy: async props => await getStudy({ ...props, studies }),
    getSeries: async props =>
      await getSeries({ ...props, series, images }),
    getImages: async props => await getImages({ ...props, images }),
    getImageData: async props =>
      await getImageData({ ...props, path: directory }),
    getStudiesByPatientID: async props =>
      await getStudiesByPatientID({ ...props, studies })
  };
};
