import { generateVideo, cleanup } from "../video";
import { adapter } from "../server";
import os from "os";
import fs from "fs";

export default async ({ socket, action }) => {
  const {
    projects: { setProject = () => {} } = {},
    file: { put: filePut = () => {} }
  } = adapter;

  const { session, numberImages = 0, studyUID = "" } = action;

  if (session) {
    console.log("Capture done. Generating video.", studyUID);

    await setProject({
      studyUID,
      props: { encoding: new Date().toString() }
    });

    socket.emit("action", { type: "CAPTURE_CLOSE" });

    try {
      // TODO Handle as stream in future.
      const ret = await generateVideo({ session, numberImages });

      console.log("Saving Video.");
      const path = `${studyUID}/video.mp4`; // TODO create filename based on
      const videoPath = `${os.tmpdir()}/${session}/video.mp4`;
      const readStream = fs.createReadStream(videoPath);
      await filePut({ path, readStream });

      console.log("Video saved cleaning up resources.");
      await cleanup({ session });

      console.log("Video done.");
    } catch (e) {
      console.log("Video error.", e);
    }

    setProject({
      studyUID,
      props: { encoding: "" }
    });
  }
};
