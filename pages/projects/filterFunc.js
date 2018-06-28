// TODO Update if status is stored as string
const statusCheck = ({ statusFilter = "", status }) =>
  [
    statusFilter === "",
    statusFilter === "All",
    statusFilter === "Not Delivered" && parseInt(status) !== 7,
    statusFilter === "Pending" && parseInt(status) === 1,
    statusFilter === "Segmentation" && parseInt(status) === 2,
    statusFilter === "Injuries" && parseInt(status) === 3,
    statusFilter === "Review" && parseInt(status) === 4,
    statusFilter === "Done" && parseInt(status) === 5,
    statusFilter === "Rendered" && parseInt(status) === 6,
    statusFilter === "Delivered" && parseInt(status) === 7
  ].some(v => v);

export default ({
  filter: {
    sample: sampleFilter = false,
    patientName: patientNameFilter,
    patientBirthDate: patientBirthDateFilter,
    studyName: studyNameFilter,
    location: locationFilter,
    studyDate: studyDateFilter,
    uploadDateTime: uploadDateTimeFilter,
    status: statusFilter
  }
}) => ({
  status: ({ status }) => statusCheck({ statusFilter, status }),
  patientName: ({ patientName }) =>
    new RegExp(patientNameFilter, "gi").test(patientName),
  patientBirthDate: ({ patientBirthDate }) =>
    new RegExp(patientBirthDateFilter, "gi").test(patientBirthDate),
  studyName: ({ studyName }) =>
    new RegExp(studyNameFilter, "gi").test(studyName),
  location: ({ location }) =>
    new RegExp(locationFilter, "gi").test(location),
  uploadDateTime: ({ uploadDateTime }) =>
    new RegExp(uploadDateTimeFilter, "gi").test(uploadDateTime),
  studyDate: ({ studyDate }) =>
    new RegExp(studyDateFilter, "gi").test(studyDate),
  sample: ({ sample = false }) => sampleFilter === sample
});
