const strSort = (a = "", b = "") => {
  const strA = a.toUpperCase();
  const strB = b.toUpperCase();

  if (strA < strB) {
    return -1;
  }

  if (strA > strB) {
    return 1;
  }

  return 0;
};

export default () => ({
  statusRender: ({ status: a = "" }, { status: b = "" }) =>
    strSort(a, b),
  videoOptions: ({ videoExists: a }, { videoExists: b }) => a - b,
  patientName: ({ patientName: a }, { patientName: b }) =>
    strSort(a, b),
  patientAge: ({ patientAge: a }, { patientAge: b }) => {
    const testA = parseInt(a);
    const testB = parseInt(b);

    return (isNaN(testA) ? 0 : testA) - (isNaN(testB) ? 0 : testB);
  },
  patientSex: ({ patientSex: a }, { patientSex: b }) => strSort(a, b),
  patientBirthDate: (
    { patientBirthDate: a },
    { patientBirthDate: b }
  ) => strSort(a, b),
  studyName: ({ studyName: a }, { studyName: b }) => strSort(a, b),
  studyDate: ({ studyDate: a }, { studyDate: b }) => strSort(a, b),
  location: ({ location: a }, { location: b }) => strSort(a, b),
  uploadDateTime: ({ uploadDateTime: a }, { uploadDateTime: b }) =>
    strSort(a, b),
  upload: ({ uploadedFiles: a = [] }, { uploadedFiles: b = [] }) =>
    a.length - b.length
});
