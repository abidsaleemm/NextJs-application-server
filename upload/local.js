import fs from "fs";
export const pathProjects = "./projectsLocal";
export const pathUploads = "./projectsLocal/uploads";

// Add paths if doesn't exist
export const checkExists = ({ studyUID }) => {
  if (fs.existsSync(pathProjects) === false) {
    fs.mkdirSync(pathProjects);
  }

  if (fs.existsSync(pathUploads) === false) {
    fs.mkdirSync(pathUploads);
  }

  // const studyDir = `${pathUploads}/${studyUID}`;
  // if (fs.existsSync(studyDir) === false) {
  //   fs.mkdirSync(studyDir);
  // }
};

export const list = async ({ studyUID }) => {
  checkExists({ studyUID });

  // get file listing
  const studyDir = `${pathUploads}/${studyUID}`;
  
  if (fs.existsSync(studyDir) !== false) {
    // console.log('studyDir', studyDir);
    // Do something
    const files = fs.readdirSync(studyDir);
    // console.log('files', files);
    return files;
  }

  return [];
};

export const get = async ({ studyUID, file }) => {
  checkExists({ studyUID });
};

export const put = async ({ studyUID, name, data }) => {
  checkExists({ studyUID });

  const studyDir = `${pathUploads}/${studyUID}`;
  if (fs.existsSync(studyDir) === false) {
    fs.mkdirSync(studyDir);
  }

  fs.writeFileSync(`${studyDir}/${name}`, data);

  console.log("upload written", name);
};

export const del = async ({ studyUID, file }) => {
  checkExists({ studyUID });
};
