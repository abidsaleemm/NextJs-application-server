import getSeries from "./getSeries";
import getStudies from "./getStudies";
import getStudy from "./getStudy";
import getImages from "./getImages";
import getImageData from "./getImageData";
import getStudiesByPatientID from "./getStudiesByPatientID";

export default ({ blobService, tableService }) => {
  const tablePrefix = process.env.CONTAINER_NAME || "dicom"; // TODO MMake this a passthrough prop

  return {
    getSeries: async props =>
      await getSeries({ ...props, tablePrefix }),
    getStudies: async props =>
      await getStudies({ ...props, tablePrefix, tableService }),
    getStudy: async props =>
      await getStudy({ ...props, tablePrefix, tableService }),
    getImages: async props =>
      await getImages({ ...props, tablePrefix, tableService }),
    getImageData: async props =>
      await getImageData({ ...props, tablePrefix, blobService }),
    getStudiesByPatientID: async props =>
      await getStudiesByPatientID({
        ...props,
        tablePrefix,
        tableService
      })
  };
};
