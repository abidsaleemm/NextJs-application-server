import fs from "fs";

const list = async ({ path }) => {
  if (fs.existsSync(studyDir) !== false) {
    const files = fs.readdirSync(path);
    return files;
  }

  return [];
};

const get = async ({ path }) => {
  if (fs.existsSync(path)) {
    return fs.createReadStream(path);
  }
};

// const putSync = async ({ path }) => {
//   const stream = fs.createReadStream(path);
//   return await put({ session, studyUID, stream });
// };

const put = ({ stream, path }) =>
  new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(path);
    stream.pipe(writeStream);
    stream.on("end", () => resolve());
    stream.on("error", () => reject());
  });

const del = async ({ path }) => {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    console.log(e);
  }
};

// TODO Update with this
const query = async ({ path }) => {};

// TODO pass a base directory?
export default () => {
  return {
    get: async props => await get({ ...props }),
    put: async props => await put({ ...props }),
    del: async props => await del({ ...props }),
    list: async props => await list({ ...props })
  };
};
