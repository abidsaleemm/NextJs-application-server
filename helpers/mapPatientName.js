export default ({ patientName = "" }) =>
  patientName
    .replace(/\^/g, " ")
    .trim()
    .toLocaleUpperCase();
