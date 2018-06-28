export default () => ({
  statusRender: ({ status: a }, { status: b }) =>
    parseInt(a) - parseInt(b), // TODO Fix if data type is string
  videoOptions: ({ videoExists: a }, { videoExists: b }) => a - b,
  patientName: ({ patientName: a }, { patientName: b }) => a - b,
  patientAge: ({ patientAge: a }, { patientAge: b }) => a - b,
  patientSex: ({ patientSex: a }, { patientSex: b }) => a - b,
  patientBirthDate: (
    { patientBirthDate: a },
    { patientBirthDate: b }
  ) => a - b,
  studyName: ({ studyName: a }, { studyName: b }) => a - b,
  studyDate: ({ studyDate: a }, { studyDate: b }) => a - b,
  location: ({ location: a }, { location: b }) => a - b,
  uploadDateTime: ({ uploadDateTime: a }, { uploadDateTime: b }) =>
    a - b,
  upload: ({ uploadedFiles: a = [] }, { uploadedFiles: b = [] }) =>
    a.length - b.length
});
