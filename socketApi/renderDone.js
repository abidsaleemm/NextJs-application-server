import generateVideo from '../video/generateVideo';
import cleanupImages from "../video/cleanupImages";
import cleanupVideo from "../video/cleanupVideo";

export default async ({ socket, action }) => {
  const { session, numberImages = 0 } = action;

  if (session) {

    const ret = await generateVideo({ session, numberImages });

    console.log("Render done. Cleaning up.", session, numberImages);

    await cleanupImages({ session });

    console.log('Cleanup done');
  }

  // TODO Should we send a response?
  //   socket.emit('action', {
  //     type: 'VOLUME_SET',
  //     volume,
  //   });
};