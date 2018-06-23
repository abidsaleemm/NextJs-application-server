import { studies } from "./";

export default ({ patientID = "" }) =>
  Object.values(studies).filter(v => v.patientID === patientID);
