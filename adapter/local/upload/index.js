import fs from "fs";

const list = async ({ studyUID, pathUploads }) => {
  // get file listing
  const studyDir = `${pathUploads}/${studyUID}`;

  if (fs.existsSync(studyDir) !== false) {
    const files = fs.readdirSync(studyDir);
    return files;
  }

  return [];
};

const get = async ({ studyUID, name, pathUploads }) => {
  const studyDir = `${pathUploads}/${studyUID}`;
  if (fs.existsSync(studyDir) === false) {
    fs.mkdirSync(studyDir);
  }

  const filePath = `${pathUploads}/${studyUID}/${name}`;
  if (fs.existsSync(filePath)) {
    return fs.createReadStream(filePath);
  }
};

const put = ({ studyUID, name, stream, pathUploads }) =>
  new Promise((resolve, reject) => {
    const studyDir = `${pathUploads}/${studyUID}`;
    if (fs.existsSync(studyDir) === false) {
      fs.mkdirSync(studyDir);
    }

    const writeStream = fs.createWriteStream(`${studyDir}/${name}`);
    stream.pipe(writeStream);
    stream.on("end", () => resolve());
    stream.on("error", () => reject());
  });

// TODO Get this working with admin account?
const del = async ({ studyUID, name, pathUploads }) => {
  const studyDir = `${pathUploads}/${studyUID}`;
  if (fs.existsSync(studyDir) === false) {
    fs.mkdirSync(studyDir);
  }

  const filePath = `${pathUploads}/${studyUID}/${name}`;

  try {
    fs.unlinkSync(filePath);
  } catch (e) {
    console.log(e);
  }
};

export default ({ path }) => {
  const pathUploads = `${path}/uploads`;

  return {
    get: async props => await get({ ...props, pathUploads }),
    put: async props => await put({ ...props, pathUploads }),
    del: async props => await del({ ...props, pathUploads }),
    list: async props => await list({ ...props, pathUploads })
  };
};
