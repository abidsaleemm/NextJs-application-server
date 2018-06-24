import fs from "fs";

const videoSave = async ({ studyUID, readStream, savePath }) => {
  if (fs.existsSync(savePath) === false) {
    fs.mkdirSync(savePath);
  }

  const writeStream = fs.createWriteStream(
    `${savePath}/${studyUID}.mp4`
  );
  readStream.pipe(writeStream);
};

const videoLoad = ({ studyUID, savePath }) => {
  return fs.createReadStream(`${savePath}/${studyUID}.mp4`);
};

const videoExists = ({ studyUID, savePath }) => {
  return fs.existsSync(`${savePath}/${studyUID}.mp4`);
};

const videoDelete = ({ studyUID, savePath }) => {
  fs.unlinkSync(`${savePath}/${studyUID}.mp4`);
};

export default ({ path }) => {
  const savePath = `${path}/video`;

  return {
    videoSave: async props => await videoSave({ ...props, savePath }),
    videoLoad: async props => await videoLoad({ ...props, savePath }),
    videoExists: async props =>
      await videoExists({ ...props, videoExists }),
    videoDelete: async props =>
      await videoDelete({ ...props, savePath })
  };
};
