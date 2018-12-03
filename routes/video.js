import authMiddleware from "../auth/middleware";
// import { videoLoad } from "../video";

export default ({ server, app, adapter }) => {
  const { video: { videoLoad = () => {} } = {} } = adapter;

  server.get("/video", authMiddleware(), async (req, res) => {
    const { query: { id, patientName } = {} } = req;

    res.setHeader("Content-Type", "video/mp4");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${patientName}.mp4"`
    );

    const stream = await videoLoad({ studyUID: id });
    stream.pipe(res);
  });
};
