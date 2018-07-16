import fs from "fs";
import { default as pathNode } from "path";

const list = async ({ path }) => {
  if (fs.existsSync(path) !== false) {
    // TODO test if directory?
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

const put = ({ stream, path }) => {
  const dir = pathNode.dirname(path);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  return new Promise((resolve, reject) => {
    const writeStream = fs.createWriteStream(path);
    stream.pipe(writeStream);
    stream.on("end", () => resolve());
    stream.on("error", () => reject());
  });
};

const del = async ({ path }) => {
  try {
    fs.unlinkSync(path);
  } catch (e) {
    console.log(e);
  }
};

export default ({ path = "projectsLocal" }) => {
  const pathFiles = `${path}/uploads`;

  return {
    get: async ({ path, ...props }) =>
      await get({ ...props, path: `${pathFiles}/${path}` }),
    put: async ({ path, ...props }) =>
      await put({ ...props, path: `${pathFiles}/${path}` }),
    del: async ({ path, ...props }) =>
      await del({ ...props, path: `${pathFiles}/${path}` }),
    list: async ({ path, ...props }) =>
      await list({ ...props, path: `${pathFiles}/${path}` })
  };
};
