import {
  generateVideo,
  cleanupImages,
  cleanupVideo,
  videoSave,
} from '../video';

export default async ({ socket, action }) => {
  const { session, numberImages = 0, studyUID = '' } = action;

  
  if (session) {
    console.log('Capture done. Generating video.', studyUID);
    const ret = await generateVideo({ session, numberImages });

    console.log("Render done. Cleaning up.", session, numberImages);
    // await cleanupImages({ session });

    console.log('Cleanup done.  Saving Video');
    await videoSave({ studyUID, session }); 

    // TODO Cleanup the cleanup function
    // await cleanupVideo({ session });
  }
};