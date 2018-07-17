import os from "os";
import fs from "fs";

import { generateVideo, cleanup } from "../video";
import { adapter } from "../server";
import createVideoFileName from "../helpers/createVideoFileName";

export default async ({ socket, action }) => {
  const {
    projects: { setProject = () => {} } = {},
    file: { put: filePut = () => {} } = {},
    dicom: { getStudy = () => {} } = {}
  } = adapter;

  const {
    session,
    numberImages = 0,
    studyUID = "",
    template
  } = action;

  if (session) {
    console.log("Capture done. Generating video.", studyUID);

    await setProject({
      studyUID,
      props: { encoding: new Date().toString() }
    });

    // TODO Get study data
    const { patientName, studyType, studyDate } = await getStudy({
      studyUID
    });

    // TODO Handle based on templates
    // template
    const videoFileName = createVideoFileName({
      patientName,
      studyType,
      studyDate
    });

    socket.emit("action", { type: "CAPTURE_CLOSE" });

    try {
      // TODO Return stream instead?
      await generateVideo({ session, numberImages });

      console.log("Saving Video.");

      const path = `${studyUID}/${videoFileName}`; // TODO create filename based on
      const stream = fs.createReadStream(
        `${os.tmpdir()}/${session}/video.mp4`
      );

      await filePut({ path, stream });

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
