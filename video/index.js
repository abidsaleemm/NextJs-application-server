import {
  videoSave,
  videoLoad,
  videoExists,
  videoDelete
} from "./adapter";
import cleanup from "./cleanup";
import generateVideo from "./generateVideo";
import saveImage from "./saveImage";
import fs from "fs";
import os from "os";

module.exports = {
  generateVideo,
  cleanup,
  saveImage,
  videoLoad,
  videoExists,
  videoDelete,
  videoSave: async ({ session, studyUID }) => {
    // Create read stream using temp file in tmp dir
    const videoPath = `${os.tmpdir()}/${session}/video.mp4`;
    const readStream = fs.createReadStream(videoPath);

    return await videoSave({ session, studyUID, readStream });
  }
};
