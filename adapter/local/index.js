import dicom from "./dicom";
import projects from "./projects";
import upload from "./upload";
import users from "./users";
import video from "./video";

export default () => {
  //

  return {
    dicom: dicom(),
    projects: projects(),
    upload: upload(),
    users: users(),
    video: video()
  };
};
