import saveImage from "../video/saveImage";

export default async ({ socket, action }) => {
  const { data, session, index = 0, numFrames = 1 } = action;

  if (session) {
    // Decode png image
    const output = data.replace(/^data:image\/(png|jpg);base64,/, "");
    const imageBuffer = new Buffer(output, "base64");

    console.log("Received frame", session, index);

    await Promise.all(
      new Array(numFrames)
        .fill()
        .map((v, i) =>
          saveImage({ session, index: index + i, data: imageBuffer })
        )
    );

    // Send Action back to start render of next frame
    socket.emit("action", { type: "CAPTURE_FRAME_DONE", index: index + numFrames });
  }
};
