import * as api from '../api';
import middleware from '../auth/middleware';

export default ({ server }) =>
    server.post("/api",middleware.isAuth, async (req, res) => {
            const { body: { action = '', props } } = req;
            const { [action]: apiAction = () => { } } = api;
            res.json(await apiAction(props) || {});
            return;
    });