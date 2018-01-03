import {
  PAYLOAD_PORTAL,
  PORTAL_UPDATE_STUDY
} from "../constants/actionTypes";

export const initialState = {
  portalList: []
};

export default (
  state = {},
  { type, portal = {}, props = {}, studyUID = "" }
) => {
  switch (type) {
    case PAYLOAD_PORTAL:
      return { ...state, ...portal };
    case PORTAL_UPDATE_STUDY: {
      if (studyUID === "") {
        return state;
      }
      const { portalList = [] } = state;
      const projectRowIndex = portalList.findIndex(
        ({ studies = [] }) =>
          studies.some(v => v.studyUID === studyUID)
      );

      if (projectRowIndex >= 0) {
        const { [projectRowIndex]: projectRow = {} } = portalList;
        const { studies = [] } = projectRow;

        const studyRowIndex = studies.findIndex(
          v => v.studyUID === studyUID
        );

        if (studyRowIndex >= 0) {
          const { [studyRowIndex]: studyRow = {} } = studies;

          return {
            ...state,
            portalList: [
              ...portalList.slice(0, projectRowIndex),
              {
                ...projectRow,
                studies: [
                  ...studies.slice(0, studyRowIndex),
                  { ...studyRow, ...props },
                  ...studies.slice(studyRowIndex + 1)
                ]
              },
              ...portalList.slice(projectRowIndex + 1)
            ]
          };
        }
      }

      return state;
    }
    default:
      return state;
  }
};
