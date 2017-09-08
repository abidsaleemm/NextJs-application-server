import { saveImage } from '../video/videoApi';

export default async ({ socket, action }) => {
  const { data, session, index = 0 } = action;

  if (session) {
    // Decode png image
    const output = data.replace(/^data:image\/(png|jpg);base64,/, "");
    const imageBuffer = new Buffer(output, "base64");

    console.log('Received frame', session, index);
    await saveImage({ session, index, data: imageBuffer });

    // TODO Handle composite?
  }
};