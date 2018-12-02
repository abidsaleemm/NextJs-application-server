import { adapter } from "../server";

export default async () => {
  const {
    projects: { getProjectList = () => {} } = {},
    dicom: { getStudies = () => {} } = {}
  } = adapter;

  // TODO Do query directly getProjectList instead of filtering with javascript
  const [projects = [], studies = []] = await Promise.all([
    getProjectList(),
    getStudies()
  ]);

  // Merging studies and projects table
  const projectsListDefault = studies
    // TODO Use ramda merge function? WG
    .map(study => [
      study,
      projects.find(({ studyUID = "" }) => study.studyUID === studyUID)
    ])
    .map(([study, project]) => ({
      ...project,
      ...study
    }));
  // .filter(({ defaultCheck = false }) => defaultCheck === true);

  //   console.log("projectsListDefault", projectsListDefault);
  return projectsListDefault;
};
