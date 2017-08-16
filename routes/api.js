import * as api from "../api";
import authMiddleware from "../auth/middleware";

export default ({ server }) => {
  server.post("/api", authMiddleware(), async (req, res) => {
    const { body: { action = "", props } } = req;
    const { [action]: apiAction = () => {} } = api;
    res.json((await apiAction(props)) || {});
    return;
  });
};
