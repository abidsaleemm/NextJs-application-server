import os from 'os';
import ffmpeg from 'fluent-ffmpeg';

// Default option but can be overided
// const options = {
//   fps: 30,
//   loop: 0.1, // seconds
//   transition: false,
//   transitionDuration: 0.1, // seconds
//   videoBitrate: 1024,
//   videoCodec: "libx264",
//   size: "640x?",
//   audioBitrate: "128k", // TODO No audio at the moment. Will add in later.
//   audioChannels: 2,
//   format: "mp4",
//   pixelFormat: "yuv420p"
// };

export default async ({ session, numberImages = 0 }) => {
  // TODO Error check to make sure all frames exist?
  const videoPath = `${os.tmpdir()}/${session}.mp4`;
  // console.log("videoPath", videoPath);

  return new Promise((resolve, reject) => {
    const command = ffmpeg()
      .addInput(`${os.tmpdir()}/${session}/frames/%04d.png`) // TODO Will break if more than 9999 frames
      .on('end', () => {
        resolve();
      })
      .on('error', (err) => {
        console.log('error' + err.message);
        reject(err);
      })
    .save(videoPath);
  });
};