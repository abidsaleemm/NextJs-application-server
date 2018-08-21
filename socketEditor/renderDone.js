import os from "os";
import fs from "fs";
import zipFolder from "zip-folder";

import { generateVideo, cleanup } from "../video";
import { adapter } from "../server";
import createVideoFileName from "../helpers/createVideoFileName";
import { resolve } from "dns";

// TODO Move this someplace else?
// TODO Cut up into seperate functions for now
const templateActions = {
  spine: async ({
    studyUID,
    adapter,
    patientName,
    studyType,
    studyDate,
    session,
    numberImages,
    anonymous = false,
    debug = false
  }) => {
    const {
      projects: { setProject = () => {} } = {},
      file: { put: filePut = () => {} } = {}
    } = adapter;

    await setProject({
      studyUID,
      props: { encoding: new Date().toString() }
    });

    const videoFileName = createVideoFileName({
      patientName: anonymous ? "Anonymous" : debug ? "Debug" : patientName,
      studyType,
      studyDate
    });

    try {
      // TODO Return stream instead?
      await generateVideo({ session, numberImages });

      console.log("Saving Video.");

      const path = `${studyUID}/${videoFileName}`; // TODO create filename based on
      const stream = fs.createReadStream(`${os.tmpdir()}/${session}/video.mp4`);

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
  },
  spineImages: ({
    studyUID,
    session,
    patientName,
    studyType,
    studyDate,
    adapter,
    anonymous = false,
    debug = false
  }) =>
    new Promise((resolve, reject) => {
      const { file: { put: filePut = () => {} } = {} } = adapter;

      const zipFileName = `Images ${
        anonymous ? "Anonymous" : debug ? "Debug" : patientName
      }-${studyType}-${studyDate}.zip`;
      const zipFilePath = `${os.tmpdir()}/${session}.zip`;

      zipFolder(`${os.tmpdir()}/${session}`, zipFilePath, async err => {
        if (err) {
          console.log("Error", err);
          reject(err);
          return;
        }

        const stream = fs.createReadStream(zipFilePath);

        const path = `${studyUID}/${zipFileName}`;
        await filePut({ path, stream });

        // Removing generated zip file.
        // TODO maybe use direct stream instead?
        fs.unlinkSync(zipFilePath);

        await cleanup({ session });
        resolve();
      });
    }),
  spineComparison: async ({
    studyUID,
    adapter,
    patientName,
    studyType,
    studyDate,
    session,
    numberImages
  }) => {
    const {
      projects: { setProject = () => {} } = {},
      file: { put: filePut = () => {} } = {}
    } = adapter;

    await setProject({
      studyUID,
      props: { encoding: new Date().toString() }
    });

    // Create video name
    const videoFileName = `Compare ${patientName}-${studyType}-${studyDate}.mp4`;

    try {
      // TODO Return stream instead?
      await generateVideo({ session, numberImages });

      console.log("Saving Video.");

      const path = `${studyUID}/${videoFileName}`; // TODO create filename based on
      const stream = fs.createReadStream(`${os.tmpdir()}/${session}/video.mp4`);

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

export default async ({ socket, action }) => {
  const { dicom: { getStudy = () => {} } = {} } = adapter;

  const { session, studyUID = "", templateName } = action;

  const { [templateName]: templateFunction } = templateActions;

  if (session) {
    console.log("Render done. Generating resources.", studyUID);

    const study = await getStudy({ studyUID });

    await templateFunction({
      ...study,
      ...action,
      adapter,
      studyUID
    });

    socket.emit("action", { type: "CAPTURE_CLOSE" });
  }
};
