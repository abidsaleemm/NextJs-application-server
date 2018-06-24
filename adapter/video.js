import fs from "fs";
import os from "os";

export default props => {
  const { video: { videoSave, ...videoProps } = {} } = props;

  return {
    ...props,
    video: {
      ...videoProps,
      videoSave: async ({ session, studyUID }) => {
        // Create read stream using temp file in tmp dir
        const videoPath = `${os.tmpdir()}/${session}/video.mp4`;
        const readStream = fs.createReadStream(videoPath);

        return await videoSave({ session, studyUID, readStream });
      }
    }
  };
};
