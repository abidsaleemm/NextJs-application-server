export default (projects) => (studyUID) =>
  projects.find(v => v.studyUID === studyUID);
