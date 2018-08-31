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
  const projectsListDefault = await Promise.all(
    studies
      .map(study => [
        study,
        projects.find(({ studyUID = "" }) => study.studyUID === studyUID)
      ])
      .filter(
        ([study, { status } = {}]) =>
          status === "Delivered" || status === "Archived"
      )
      .filter(
        ([study, { deleted = false } = {}]) =>
          study !== undefined && deleted !== true
      )
      .map(projectsListEnhancer(adapter))
    //   .filter(({ hasProjectSnapshots = false }) => hasProjectSnapshots)
  );

  return projectsListDefault;
};
