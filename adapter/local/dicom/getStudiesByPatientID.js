// import { studies } from "./";

export default ({ patientID = "", studies = {} }) =>
  Object.values(studies).filter(v => v.patientID === patientID);
