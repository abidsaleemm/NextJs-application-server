//

import {
  videoSave,
  videoLoad,
  videoExists,
  videoDelete
} from "./adapter";

// TODO Move to helpers?
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
  // TODO Where is best place to put this?
  videoSave: async ({ session, studyUID }) => {
    // Create read stream using temp file in tmp dir
    const videoPath = `${os.tmpdir()}/${session}/video.mp4`;
    const readStream = fs.createReadStream(videoPath);

    return await videoSave({ session, studyUID, readStream });
  }
};
