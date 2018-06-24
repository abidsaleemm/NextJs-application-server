import authMiddleware from "../auth/middleware";
// import { get as uploadGet } from "../upload";
import { adapter } from "../server";

export default ({ server, app }) => {
  const { upload: { get: uploadGet = () => {} } = {} } = adapter;

  server.get("/uploadGet", authMiddleware(), async (req, res) => {
    // TODO Should authMiddleware deal with studyUID checking?
    const { query: { id, name } = {} } = req;

    res.setHeader(
      "Content-Disposition",
      `inline; filename="${name}"`
    );

    const stream = await uploadGet({ studyUID: id, name });
    if (stream) {
      stream.pipe(res);
    }
  });
};
