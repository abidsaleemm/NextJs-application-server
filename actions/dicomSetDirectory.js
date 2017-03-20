import {
  DICOM_DIRECTORY,
  DICOM_DATA,
} from '../constants/actionTypes';

import dicomScandirectory from '../helpers/dicomScandirectory';

export default (directory) => (dispatch) => {
  dispatch({ type: DICOM_DIRECTORY, directory });
  // dispatch(dicomScandirectory());
};
