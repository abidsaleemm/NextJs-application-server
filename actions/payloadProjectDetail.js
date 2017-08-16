import { PAYLOAD_PROJECTDETAIL } from '../constants/actionTypes';

export default (projectDetail = {}) => ({
  type: PAYLOAD_PROJECTDETAIL,
  projectDetail
});