export default ({
  filter: {
    sample: sampleFilter = false,
    patientName: patientNameFilter,
    patientBirthDate: patientBirthDateFilter,
    studyName: studyNameFilter,
    location: locationFilter
  }
}) => ({
  patientName: ({ patientName }) =>
    new RegExp(patientNameFilter, "gi").test(patientName),
  patientBirthDate: ({ patientBirthDate }) =>
    new RegExp(patientBirthDateFilter, "gi").test(patientBirthDate),
  studyName: ({ studyName }) =>
    new RegExp(studyNameFilter, "gi").test(studyName),
  location: ({ location }) =>
    new RegExp(locationFilter, "gi").test(location),
  sample: ({ sample }) => sampleFilter === sample
});
