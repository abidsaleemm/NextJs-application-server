import {
  DICOM_DIRECTORY,
} from '../constants/actionTypes';

// issue-28
export default (state = '', action) => {
  const { type, directory } = action;
  switch (type) {
    case DICOM_DIRECTORY:
      return directory;
    default:
      return state;
  }
};
