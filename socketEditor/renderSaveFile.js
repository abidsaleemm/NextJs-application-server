import saveFile from "../video/saveFile";

export default async ({ socket, action }) => {
  const { data, session, name } = action;

  if (session) {
    saveFile({
      session,
      name,
      // TODO Duplicate code?
      data: new Buffer(
        data.replace(/^data:image\/(png|jpeg);base64,/, ""),
        "base64"
      )
    });

    // Send Action back to start render of next frame
    socket.emit("action", {
      type: "CAPTURE_FRAME_DONE"
    });
  }
};
