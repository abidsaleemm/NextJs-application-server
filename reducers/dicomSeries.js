import {
  DICOM_DATA,
  DICOM_CLEAR,
} from '../constants/actionTypes';

// issue-28
export default (state = [], action) => {
  const { type, studyUID, seriesUID, seriesName } = action;
  switch (type) {
    case DICOM_DATA: {
      const index =
        state.findIndex(v => v.seriesUID === seriesUID);

      if (index < 0) {
        return [
          ...state,
          {
            seriesUID,
            seriesName,
            studyUID,
            // modality,
            // patientName,
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
