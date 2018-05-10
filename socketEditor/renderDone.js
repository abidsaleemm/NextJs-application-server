import { generateVideo, cleanup, videoSave } from "../video";
import { setProject } from "../projects";

export default async ({ socket, action }) => {
  const { session, numberImages = 0, studyUID = "" } = action;

  if (session) {
    console.log("Capture done. Generating video.", studyUID);

    await setProject({
      studyUID,
      props: { encoding: new Date().toString() }
    });

    try {
      const ret = await generateVideo({ session, numberImages });

      console.log("Saving Video.");
      await videoSave({ studyUID, session });

      console.log("Video saved cleaning up resources.");
      await cleanup({ session });

      console.log("Video done.");
    } catch (e) {
      console.log("Video error.", e);
    }

    setProject({
      studyUID,
      props: { encoding: '' }
    });
  }
};
