import authMiddleware from "../auth/middleware";
import { get as uploadGet } from "../upload";

export default ({ server, app }) =>
  server.get("/uploadGet", authMiddleware(), async (req, res) => {
    // TODO Should authMiddleware deal with studyUID checking?
    const { query: { id, name } = {} } = req;

    // TODO clean up type? Seems to work fine without this header
    // res.setHeader("Content-Type", "video/mp4");

    const stream = await uploadGet({ studyUID: id, name });
    if (stream) {
      stream.pipe(res);
    }
  });
