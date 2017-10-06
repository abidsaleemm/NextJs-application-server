import { videoSave, videoLoad, videoExists } from './adapter';
import cleanupImages from './cleanupImages';
import cleanupVideo from './cleanupVideo';
import generateVideo from './generateVideo';
import saveImage from './saveImage';
import fs from 'fs';
import os from 'os';

module.exports = {
    generateVideo,
    cleanupImages,
    cleanupVideo,
    saveImage,
    videoLoad,
    videoExists,
    videoSave: async ({ session, studyUID }) => {
        // Create read stream using temp file in tmp dir
        const videoPath = `${os.tmpdir()}/${session}.mp4`;
        const readStream = fs.createReadStream(videoPath);

        return await videoSave({ session, studyUID, readStream });
    },
};