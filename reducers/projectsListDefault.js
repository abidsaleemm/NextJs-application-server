import { PAYLOAD_PROJECTS } from "../constants/actionTypes";

export default (state = [], { type, projectsListDefault }) => {
  switch (type) {
    case PAYLOAD_PROJECTS:
      return projectsListDefault !== undefined
        ? [...projectsListDefault]
        : [...state];
    default:
      return state;
  }
};
