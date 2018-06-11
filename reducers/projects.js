import {
  PAYLOAD_PROJECTS,
  SET_PROJECT_PROPS
} from "../constants/actionTypes";

export const initialState = {
  projects: []
};

export default (
  state = initialState,
  { type, projects = [], studyUID, ...props }
) => {
  switch (type) {
    case PAYLOAD_PROJECTS:
      return { ...state, projects };
    case SET_PROJECT_PROPS: {
      const { projects } = state;
      const index = projects.findIndex(v => v.studyUID === studyUID);

      return index >= 0
        ? {
            projects: [
              ...projects.slice(0, index),
              { ...projects[index], ...props },
              ...projects.slice(index + 1)
            ]
          }
        : state;
    }
    default:
      return state;
  }
};
