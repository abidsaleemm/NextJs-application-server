import { DICOM_DATA } from '../constants/actionTypes';
// import dicomScanDirectory from '../helpers/dicomScanDirectory';
import dicomReadAzureFiles from '../helpers/dicomReadAzureFiles';

export default (dicomDirectory) => (dispatch, getState) => {
  dicomReadAzureFiles((err, tags) => {
    if (tags) {
      const { studyUID } = tags;
      if (studyUID) {
        dispatch({ type: DICOM_DATA, ...tags });
      }
    };
  });

  // const { dicomDirectory = '' } = getState();
  // dicomScanDirectory(dicomDirectory, (err, tags) => {
  //   if (tags) {
  //     const { studyUID } = tags;
  //     if (studyUID) {
  //       dispatch({ type: DICOM_DATA, ...tags });
  //     }
  //   }
  // });
};
