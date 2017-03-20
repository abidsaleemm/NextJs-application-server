import {
  DICOM_DATA,
  DICOM_CLEAR,
} from '../constants/actionTypes';

// issue-28
export default (state = [], action) => {
  const {
    type,
    imageNumber,
    instanceUID,
    seriesUID,
    rows,
    columns,
    bitsAllocated,
    bitsStored,
    highbit,
    windowCenter,
    windowWidth,
    imagePosition,
    imageOrientation,
    pixelSpacing,
    imageLocation,
    pixelData,
  } = action;

  switch (type) {
    case DICOM_DATA: {
      const index =
        state.findIndex(v => v.instanceUID === instanceUID);

      if (index < 0) {
        return [
          ...state,
          {
            imageNumber,
            instanceUID,
            seriesUID,
            studyUID,
            rows,
            columns,
            bitsAllocated,
            bitsStored,
            highbit,
            windowCenter,
            windowWidth,
            imagePosition,
            imageOrientation,
            pixelSpacing,
            imageLocation,
            // pixelData,
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
