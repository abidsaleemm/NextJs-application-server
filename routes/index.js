import projects from "./projects";
import projectDetail from "./projectDetail";
import portal from "./portal";
import video from "./video";
import uploadGet from "./uploadGet";
import projectExport from "./projectExport";
import authLogout from "./authLogout";
import users from "./users";

export default props => {
  // Pages
  projects(props);
  projectDetail(props);
  portal(props);
  users(props);
  // Requests
  video(props);
  uploadGet(props);
  projectExport(props);
  authLogout(props);
};
