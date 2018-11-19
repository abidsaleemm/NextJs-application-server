import { where } from "ramda";
import { adapter } from "../server";

import filterProjectsByUser from "./filterProjectsByUser";

// TODO Add filter fuctions here for now. WG
const statusCheck = ({ statusFilter = "", status }) =>
  [
    statusFilter === "",
    statusFilter === "All",
    statusFilter === "Not Delivered" &&
      status !== "Delivered" &&
      status !== "Archived",
    statusFilter === "Start" && status === "Start",
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
  userList = []
}) => {
  const {
    file: { list: fileList = () => {} } = {},
    projects: { getProjectList = () => {} } = {},
    dicom: { getStudies = () => {} } = {}
  } = adapter;

  const [projects = [], studies = []] = await Promise.all([
    getProjectList({
      filter: ({ status, projectType = "Live" }) => {
        const pred = where({
          status: v => statusCheck({ statusFilter, status: v }),
          projectType: v =>
            projectTypeCheck({ projectTypeFilter, projectType: v })
        });

        return pred({ status, projectType });
      }
    }),
    // TODO Merges all studies for now?
    // TODO Query list of studies based project getProjectList list. WG
    getStudies()
  ]);

  // Merging studies and projects table
  const projectsList = await Promise.all(
    studies
      .map(study => [
        study,
        projects.find(({ studyUID = "" }) => study.studyUID === studyUID)
      ])
      .filter(
        ([study, project]) => study !== undefined && project !== undefined
      )
      .filter(([, project]) => {
        if (project) {
          const { status, projectType } = project;
          return (
            statusCheck({ statusFilter, status }) &&
            projectTypeCheck({ projectTypeFilter, projectType })
          );
        }

        return true;
      })
      .filter(filterProjectsByUser({ role, userID, userList }))
      .filter(([, { projectType } = {}]) =>
        projectType === "Removed" ? role === "admin" : true
      )
      .map(async ([{ studyUID, ...study } = {}, project]) => ({
        ...study,
        ...project,
        studyUID,
        uploadedFiles: await fileList({ path: studyUID }) // Get attached file list
      }))
  );

  return projectsList;
};
