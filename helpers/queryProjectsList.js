import { where } from "ramda";
import filterProjectsByUser from "./filterProjectsByUser";

// TODO Add filter fuctions here for now. Can probably clean this up. WG
const statusCheck = ({ statusFilter = "", status = "", adapter }) =>
  [
    (statusFilter === "" || statusFilter === "None") &&
      (status === "None" || status === ""),
    statusFilter === "All",
    statusFilter === "Not Delivered" &&
      status !== "Delivered" &&
      status !== "Archived",
    statusFilter === "Start" && status === "Start",
    statusFilter === "Error" && status === "Error",
    statusFilter === "Error - Alignment" && status === "Error - Alignment",
    statusFilter === "Error - No Injury" && status === "Error - No Injury",
    statusFilter === "Segmentation" && status === "Segmentation",
    statusFilter === "QC" && status === "QC",
    statusFilter === "Review" && status === "Review",
    statusFilter === "Done" && status === "Done",
    statusFilter === "Rendered" && status === "Rendered",
    statusFilter === "Delivered" && status === "Delivered",
    statusFilter === "Archived" && status === "Archived"
  ].some(v => v);

const projectTypeCheck = ({ projectTypeFilter, projectType }) =>
  projectTypeFilter === "All"
    ? true
    : projectTypeFilter === "Not Removed"
    ? projectType !== "Removed"
    : projectType === projectTypeFilter;

export default async ({
  role,
  settings: {
    filter: {
      status: statusFilter = "",
      projectType: projectTypeFilter = "All"
    } = {}
  } = {},
  userID,
  userList = [],
  adapter
}) => {
  const {
    file: { list: fileList = () => {} } = {},
    projects: {
      getProjectList = () => {},
      hasProjectSnapshots = () => {}
    } = {},
    dicom: { getStudies = () => {} } = {}
  } = adapter;

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
      .filter(([study]) => study !== undefined)
      .filter(([, { status, projectType = "Live" } = {}]) => {
        const pred = where({
          status: v => statusCheck({ statusFilter, status: v }),
          projectType: v =>
            projectTypeCheck({ projectTypeFilter, projectType: v })
        });

        return pred({ status, projectType });
      })
      .filter(filterProjectsByUser({ role, userID, userList }))
      .filter(([, { projectType } = {}]) =>
        projectType === "Removed" ? role === "admin" : true
      )
      .map(async ([{ studyUID, ...study } = {}, project]) => {
        return {
          ...study,
          ...(project !== undefined ? project : {}),
          studyUID,
          hasProjectSnapshots:
            project !== undefined
              ? await hasProjectSnapshots({ studyUID })
              : false,
          uploadedFiles: await fileList({ path: studyUID })
        };
      })
  );

  return projectsList;
};
