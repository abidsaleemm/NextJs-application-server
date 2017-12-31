import fs from "fs";

// TODO Should be some sort of global import
const rootPath = "projectsLocal";
const savePath = "projectsLocal/metaData";

// TODO this should be some sort of reusable function under helpers
// Add path if doesn't exist
const checkExists = () => {
  if (fs.existsSync(rootPath) === false) {
    fs.mkdirSync(rootPath);
  }

  if (fs.existsSync(savePath) === false) {
    fs.mkdirSync(savePath);
  }
};

export const setMetaData = async ({ studyUID, props = {} }) => {
  checkExists();

  if (studyUID) {
    console.log("props", props);
  }

  // try {
  // const data = fs.readFileSync(`${savePath}/${name}.json`);
  // return JSON.parse(data);
  // } catch (e) {
  //   console.log("error", e);
  // }
};

export const getMetaData = async ({ studyUID }) => {
  checkExists();

  // const list = fs.readdirSync(savePath);
  // return list.map((v = "") => v.substring(0, v.lastIndexOf(".")));
};
