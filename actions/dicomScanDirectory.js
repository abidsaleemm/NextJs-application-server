import { DICOM_DATA } from '../constants/actionTypes';
import dicomScanDirectory from '../helpers/dicomScanDirectory';

export default (dicomDirectory) => (dispatch, getState) => {
  // const { dicomDirectory = '' } = getState();
  dicomScanDirectory(dicomDirectory, (err, tags) => {
    if (tags) {
      const { studyUID, fullPath } = tags;
      if (studyUID) {
        dispatch({ type: DICOM_DATA, ...tags, fullPath });
      }
    }
  });
};
