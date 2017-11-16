import projects from "./projects";
import projectDetail from "./projectDetail";
import portal from "./portal";
import invoice from "./invoice";
import video from "./video";
import uploadGet from "./uploadGet";
import projectExport from './projectExport';

export default props => {
  // Pages
  projects(props);
  projectDetail(props);
  portal(props);
  // Requests
  invoice(props);
  video(props);
  uploadGet(props);
  projectExport(props);
};
