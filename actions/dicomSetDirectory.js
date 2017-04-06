import {
  DICOM_DIRECTORY,
  DICOM_DATA,
} from '../constants/actionTypes';

export default (directory) => (dispatch) => {
  dispatch({ type: DICOM_DIRECTORY, directory });
};
