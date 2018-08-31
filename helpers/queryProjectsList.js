import { adapter } from "../server";

import projectsListEnhancer from "./projectsListEnhancer";

export default async ({ role, userID, userList = [] }) => {
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
  const projectsList = await Promise.all(
    studies
      .map(study => [
        study,
        projects.find(({ studyUID = "" }) => study.studyUID === studyUID)
      ])
      // TODO Move this to separate function
      .filter(([study, { userID: projectUserID } = {}]) => {
        if (
          projectUserID === undefined ||
          projectUserID === null ||
          projectUserID == "" ||
          projectUserID == userID
        ) {
          return true;
        }

        if (role === "admin") {
          return true;
        }

        return userList.some(({ id }) => id === projectUserID);
      })
      .filter(
        ([study, { deleted = false } = {}]) =>
          study !== undefined && deleted !== true
      )
      .map(projectsListEnhancer({ adapter }))
  );

  return projectsList;
};
