import { PAYLOAD_PROJECTS } from '../constants/actionTypes';

export default ({ projects = [] }) => ({ type: PAYLOAD_PROJECTS, projects });