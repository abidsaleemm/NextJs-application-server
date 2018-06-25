import getSeries from "./getSeries";
import getStudies from "./getStudies";
import getStudy from "./getStudy";
import getImages from "./getImages";
import getImageData from "./getImageData";
import getStudiesByPatientID from "./getStudiesByPatientID";

export default ({ blobAdapter, tableAdapter }) => {
  const tablePrefix = process.env.CONTAINER_NAME || "dicom"; // TODO MMake this a passthrough prop

  return {
    getSeries: async props =>
      await getSeries({ ...props, tablePrefix, tableAdapter }),
    getStudies: async props =>
      await getStudies({ ...props, tablePrefix, tableAdapter }),
    getStudy: async props =>
      await getStudy({ ...props, tablePrefix, tableAdapter }),
    getImages: async props =>
      await getImages({ ...props, tablePrefix, tableAdapter }),
    getImageData: async props =>
      await getImageData({
        ...props,
        tablePrefix,
        tableAdapter,
        blobAdapter
      }),
    getStudiesByPatientID: async props =>
      await getStudiesByPatientID({
        ...props,
        tablePrefix,
        tableAdapter
      })
  };
};
