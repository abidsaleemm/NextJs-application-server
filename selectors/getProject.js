export default (projects) => (studyUID) => {
  const projectFind = projects.find(v => v.studyUID === studyUID);
};
