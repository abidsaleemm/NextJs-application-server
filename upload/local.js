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
};

export const list = async ({ studyUID }) => {
  checkExists({ studyUID });

  // get file listing
  const studyDir = `${pathUploads}/${studyUID}`;
  
  if (fs.existsSync(studyDir) !== false) {
    const files = fs.readdirSync(studyDir);
    return files;
  }

  return [];
};

export const get = async ({ studyUID, name }) => {
  checkExists({ studyUID });

  const studyDir = `${pathUploads}/${studyUID}`;
  if (fs.existsSync(studyDir) === false) {
    fs.mkdirSync(studyDir);
  }

  const filePath = `${pathUploads}/${studyUID}/${name}`;
  if (fs.existsSync(filePath)) {
    return fs.createReadStream(filePath);
  }
};

export const put = ({ studyUID, name, stream }) => new Promise((resolve, reject) => {
  checkExists({ studyUID });

  const studyDir = `${pathUploads}/${studyUID}`;
  if (fs.existsSync(studyDir) === false) {
    fs.mkdirSync(studyDir);
  }

  const writeStream = fs.createWriteStream(`${studyDir}/${name}`);
  stream.pipe(writeStream);
  stream.on('end', () => resolve());
  stream.on('error', () => reject());
});

// TODO Get this working with admin account
export const del = async ({ studyUID, file }) => {
  checkExists({ studyUID });


};