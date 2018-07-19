import saveImage from "../video/saveImage";

export default async ({ socket, action }) => {
  const { data, session, index = 0, numFrames = 1 } = action;

  if (session) {
    await Promise.all(
      new Array(numFrames).fill().map((v, i) =>
        saveImage({
          session,
          index: index + i,
          // TODO Duplicate code?
          data: new Buffer(
            data.replace(/^data:image\/(png|jpeg);base64,/, ""),
            "base64"
          )
        })
      )
    );

    // Send Action back to start render of next frame
    // TODO There is an issue with this
    socket.emit("action", {
      type: "CAPTURE_FRAME_DONE"
    });
  }
};
