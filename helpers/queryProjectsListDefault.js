import { adapter } from "../server";

import projectsListEnhancer from "./projectsListEnhancer";

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
  const projectsListDefault = (await Promise.all(
    studies
      .map(study => [
        study,
        projects.find(({ studyUID = "" }) => study.studyUID === studyUID)
      ])
      // TODO Filter out projectType ===
      .filter(
        ([study, { projectType } = {}]) =>
          study !== undefined && projectType !== "Removed"
      )
      .map(projectsListEnhancer({ adapter }))
  ))
    .filter(({ hasProjectSnapshots = false }) => hasProjectSnapshots === true)
    .filter(({ defaultCheck = false }) => defaultCheck === true);

  return projectsListDefault;
};
