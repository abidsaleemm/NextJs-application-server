export default ({
  filter: {
    patientName: patientNameFilter,
    patientBirthDate: patientBirthDateFilter,
    studyName: studyNameFilter,
    location: locationFilter,
    studyDate: studyDateFilter,
    uploadDateTime: uploadDateTimeFilter
  }
}) => ({
  patientName: ({ patientName }) =>
    new RegExp(patientNameFilter, "gi").test(patientName),
  patientBirthDate: ({ patientBirthDate }) =>
    new RegExp(patientBirthDateFilter, "gi").test(patientBirthDate),
  studyName: ({ studyName }) =>
    new RegExp(studyNameFilter, "gi").test(studyName),
  location: ({ location }) => new RegExp(locationFilter, "gi").test(location),
  uploadDateTime: ({ uploadDateTime }) =>
    new RegExp(uploadDateTimeFilter, "gi").test(uploadDateTime),
  studyDate: ({ studyDate }) =>
    new RegExp(studyDateFilter, "gi").test(studyDate)
});
