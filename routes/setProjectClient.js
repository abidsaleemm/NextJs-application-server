import { queryStudies } from '../dicom';
import { setProjectClient } from '../projects';

export default ({ server, app }) =>
    server.get("/api/setProjectClient/:studyUID/:client", async (req, res) => {
        const { 
            studyUID = '', 
            client = 0,
        } = req.params;

        if (req.isAuthenticated()) {
            console.log('setProjectClient', studyUID, client);
            setProjectClient({ studyUID, client });

            res.json({ client });
            return;
        }
    
        console.log('/api/setProjectClient not auth');
        res.sendStatus(403);
    });