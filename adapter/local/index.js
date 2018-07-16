import dicom from "./dicom";
import projects from "./projects";
import file from "./file";
import users from "./users";

export default () => {
  const path = "./projectsLocal";

  // TODO Maybe pass more setting as props here?
  // Initialize all adapters
  return {
    dicom: dicom({ path }),
    projects: projects({ path }),
    file: file({ path }),
    users: users({ path })
  };
};
