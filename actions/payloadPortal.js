import { PAYLOAD_PORTAL } from '../constants/actionTypes';

export default (portal = {}) => ({
  type: PAYLOAD_PORTAL,
  portal,
});