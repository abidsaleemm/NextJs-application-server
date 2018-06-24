import dicom from "./dicom";
import projects from "./projects";
import upload from "./upload";
import users from "./users";
import video from "./video";

export default () => {
  const path = "./projectsLocal";

  // Initialize all adapters
  return {
    dicom: dicom({ path }),
    projects: projects({ path }),
    upload: upload({ path }),
    users: users({ path }),
    video: video({ path })
  };
};
