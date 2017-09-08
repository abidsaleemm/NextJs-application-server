// import { saveImage } from '../video/videoApi';

export default async ({ socket, action }) => {
  const { session, index = 0 } = action;

  // TODO handle frame number?
  if (session) {
    // Decode png image
    // const output = data.replace(/^data:image\/(png|jpg);base64,/, "");
    // TODO Handle any conversion?
    // const imageBuffer = new Buffer(output, "base64");

    console.log('Render done', session, index);
    // await saveImage({ session, index, data: imageBuffer, overlay });
  }

  //   socket.emit('action', {
  //     type: 'VOLUME_SET',
  //     volume,
  //   });
};