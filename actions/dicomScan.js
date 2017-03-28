import { DICOM_DATA } from '../constants/actionTypes';
import dicomScan from '../helpers/dicomScan';

export default (dicomDirectory) => (dispatch, getState) => {
  console.log('Scaning DICOM files');

  dicomScan((err, tags) => {
    if (tags) {
      const { studyUID } = tags;
      if (studyUID) {
        dispatch({ type: DICOM_DATA, ...tags });
      }
    };
  });
};
