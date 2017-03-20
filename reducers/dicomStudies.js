import {
  DICOM_DATA,
  DICOM_CLEAR,
} from '../constants/actionTypes';

// issue-28
export default (state = [], action) => {
  const {
    type,
    studyUID,
    studyName,
    modality,
    studyDate,
    patientName,
  } = action;

  switch (type) {
    case DICOM_DATA: {
      const index = state.findIndex(
        v => v.studyUID === studyUID
      );

      if (index < 0) {
        return [
          ...state,
          {
            studyUID,
            studyName,
            studyDate,
            modality,
            patientName,
          }
        ];
      }

      return state;
    }
    case DICOM_CLEAR:
      return [];
    default:
      return state;
  }
};
