import {
  PAYLOAD_PROJECTDETAIL,
  PROJECTDETAIL_SET_STATUS,
  SET_PROJECT_PROPS
} from "../constants/actionTypes";

export const initialState = {
  status: 0,
  studyName: "",
  studyDate: "",
  patientName: "",
  patientID: "",
  modality: "",
  location: "",
  defaultName: ""
};

export default (
  state = initialState,
  { type, projectDetail = {}, status = 0, ...settings }
) => {
  switch (type) {
    case PAYLOAD_PROJECTDETAIL:
      return {
        ...state,
        ...projectDetail
      };
    case PROJECTDETAIL_SET_STATUS:
      return { ...state, status };
    case SET_PROJECT_PROPS: {
      return { ...state, ...settings };
    }
    default:
      return state;
  }
};
