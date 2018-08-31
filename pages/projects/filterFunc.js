const statusCheck = ({ statusFilter = "", status }) =>
  [
    statusFilter === "",
    statusFilter === "All",
    statusFilter === "Not Delivered" &&
      status !== "Delivered" &&
      status !== "Archived",
    statusFilter === "Start" && status === "Start",
    statusFilter === "Segmentation" && status === "Segmentation",
    statusFilter === "QC" && status === "QC",
    statusFilter === "Review" && status === "Review",
    statusFilter === "Done" && status === "Done",
    statusFilter === "Rendered" && status === "Rendered",
    statusFilter === "Delivered" && status === "Delivered",
    statusFilter === "Archived" && status === "Archived"
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
  location: ({ location }) => new RegExp(locationFilter, "gi").test(location),
  uploadDateTime: ({ uploadDateTime }) =>
    new RegExp(uploadDateTimeFilter, "gi").test(uploadDateTime),
  studyDate: ({ studyDate }) =>
    new RegExp(studyDateFilter, "gi").test(studyDate),
  sample: ({ sample = false }) => sampleFilter === sample
});
