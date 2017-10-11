import {
  generateVideo,
  cleanup,
  videoSave,
} from '../video';

export default async ({ socket, action }) => {
  const { session, numberImages = 0, studyUID = '' } = action;
  
  if (session) {
    console.log('Capture done. Generating video.', studyUID);
    const ret = await generateVideo({ session, numberImages });

    console.log('Saving Video.');
    await videoSave({ studyUID, session }); 

    console.log('Video saved cleaning up resources.');
    await cleanup({ session });

    console.log('Video done.');
  }
};