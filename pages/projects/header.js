export default ({ admin = false } = {}) => ({
  action: "",
  statusRender: "Status",
  sampleRender: "Sample",
  userRender: "Assign User",
  ...(admin ? { videoOptions: "Rendered" } : {}),
  patientName: "Patient Name",
  patientAge: "Age",
  patientSex: "Gender",
  patientBirthDate: "Patient DOB",
  studyType: "Study Type",
  studyDate: "Study Date",
  location: "Facility",
  uploadDateTime: "Date Uploaded",
  upload: "Attach Records",
  notes: "Notes"
});
