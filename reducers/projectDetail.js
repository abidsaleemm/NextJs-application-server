import { 
  PAYLOAD_PROJECTDETAIL,
  PROJECTDETAIL_SET_CLIENT,
  PROJECTDETAIL_SET_STATUS,
} from "../constants/actionTypes";

export const initialState = {
  status: 0,
  client: 0,
  studyName: '',
  studyDate: '',
  patientName: '',
  patientID: '',
  modality: '',
  location: '',
};

export default (
  state = initialState, 
  { type, projectDetail = {}, client = 0, status = 0 }
) => {
  switch (type) {
    case PAYLOAD_PROJECTDETAIL:
      return {
        ...state,
        ...projectDetail,
      };
    case PROJECTDETAIL_SET_CLIENT: return { ...state, client };
    case PROJECTDETAIL_SET_STATUS: return { ...state, status };
    default: return state;
  }
};
