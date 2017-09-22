import {
  generateVideo,
  cleanupImages,
  // cleanupVideo,
  saveVideo,
} from '../video';

export default async ({ socket, action }) => {
  const { session, numberImages = 0, studyUID = '' } = action;

  console.log('studyUID', studyUID);

  if (session) {
    const ret = await generateVideo({ session, numberImages });

    console.log("Render done. Cleaning up.", session, numberImages);
    await cleanupImages({ session });

    console.log('Cleanup done.  Saving Video');
    await saveVideo({ studyUID, session }); 
  }

  // TODO Should we send a response?
  //   socket.emit('action', {
  //     type: 'VOLUME_SET',
  //     volume,
  //   });
};