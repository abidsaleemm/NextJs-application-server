import { adapter } from "../server";

import projectsListEnhancer from "./projectsListEnhancer";

export default async ({ role, userID, userList = [] }) => {
  const {
    projects: { getProjectList = () => {} } = {},
    dicom: { getStudies = () => {} } = {},
    renders: { getRenderQueue = () => {} } = {}
  } = adapter;

  // TODO Do query directly getProjectList instead of filtering with javascript
  const [projects = [], studies = [], renders = []] = await Promise.all([
    getProjectList(),
    getStudies(),
    getRenderQueue()
  ]);

  // Merging studies and projects table
  const projectsList = await Promise.all(
    studies
      .map(study => [
        study,
        projects.find(({ studyUID = "" }) => study.studyUID === studyUID),
        renders
          .filter(({ studyUID = "" }) => study.studyUID === studyUID)
          .map(({ studyUID, ...props }) => props)
      ])
      // TODO Move this to separate function
      .filter(([study, { userID: projectUserID, status } = {}]) => {
        if (
          role !== "admin" &&
          status !== "Start" &&
          status !== "Segmentation" &&
          status !== "QC" &&
          status !== "Review" &&
          status !== "Done" // TODO Should we remove this?
        ) {
          return false;
        }

        // TODO Fix with type check?
        if (projectUserID == userID) {
          return true;
        }

        if (role === "admin") {
          return true;
        }

        if (role === "teamAdmin" && projectUserID === undefined) {
          return true;
        }

        // TODO Fix with type check?
        return userList.some(({ id }) => id == projectUserID);
      })
      .filter(
        ([study, { deleted = false } = {}]) =>
          study !== undefined && deleted !== true
      )
      .map(projectsListEnhancer({ adapter }))
  );

  return projectsList;
};
