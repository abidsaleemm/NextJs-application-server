import authMiddleware from "../auth/middleware";
import { videoLoad } from '../video';

export default ({ server, app }) => {
  server.get(
    "/video",
    authMiddleware(),
    async ({ ...req, user: { client = false }, query }, res) => {
        const { query: { id } = {} } = req;

        res.setHeader("Content-Type", "video/mp4");
        const stream = await videoLoad({ studyUID: id });
        stream.pipe(res);
    }
  );
};
