import * as api from '../api';

export default ({ server }) =>
    server.post("/api", async (req, res) => {
        if (req.isAuthenticated()) { // issue-15
            const { body: { action = '', props } } = req;
            const { [action]: apiAction = () => { } } = api;

            res.json(await apiAction(props) || {});
            return;
        }
    
        console.log('/api not auth');
        res.sendStatus(403);
    });