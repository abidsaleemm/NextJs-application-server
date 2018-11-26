const strSort = (a = "", b = "") => {
  const strA = `${a}`.toUpperCase();
  const strB = `${b}`.toUpperCase();

  if (strA < strB) {
    return -1;
  }

  if (strA > strB) {
    return 1;
  }

  return 0;
};

const statusIndex = {
  None: 0,
  Start: 1,
  Error: 2,
  Segmentation: 3,
  QC: 4,
  Review: 5,
  Done: 6,
  Rendered: 7,
  Delivered: 8,
  Archived: 9
};

export default () => ({
  priorityRender: ({ priority: a = "" }, { priority: b = "" }) => a - b,
  userRender: ({ userName: a = "" }, { userName: b = "" }) => strSort(a, b),
  statusRender: ({ status: a = "" }, { status: b = "" }) => {
    const { [a]: aIndex = 0, [b]: bIndex = 0 } = statusIndex;

    return aIndex - bIndex;
  },
  patientName: ({ patientName: a }, { patientName: b }) => strSort(a, b),
  patientAge: ({ patientAge: a }, { patientAge: b }) => {
    const testA = parseInt(a);
    const testB = parseInt(b);

    return (isNaN(testA) ? 0 : testA) - (isNaN(testB) ? 0 : testB);
  },
  patientSex: ({ patientSex: a }, { patientSex: b }) => strSort(a, b),
  patientBirthDate: ({ patientBirthDate: a }, { patientBirthDate: b }) =>
    strSort(a, b),
  studyName: ({ studyName: a }, { studyName: b }) => strSort(a, b),
  studyDate: ({ studyDate: a }, { studyDate: b }) => strSort(a, b),
  location: ({ location: a }, { location: b }) => strSort(a, b),
  uploadDateTime: ({ uploadDateTime: a }, { uploadDateTime: b }) =>
    strSort(a, b),
  upload: ({ uploadedFiles: a = [] }, { uploadedFiles: b = [] }) =>
    a.length - b.length,
  projectTypeRender: ({ projectType: a }, { projectType: b }) => strSort(a, b)
});
