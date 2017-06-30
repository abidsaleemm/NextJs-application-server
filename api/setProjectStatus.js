import { queryStudies } from '../dicom';
import { setProjectStatus } from '../projects';

export default ({ server, app }) =>
    server.get("/api/setProjectStatus/:studyUID/:status", async (req, res) => {
        const { 
            studyUID = '', // TODO Same as projectid for now
            status = 0,
        } = req.params;

        if (req.isAuthenticated()) { // TODO add to middleware
            console.log('setProjectStatus', studyUID,  status);
            setProjectStatus({ studyUID, status }); // TODO Handle error
            
            res.json({ status });
            return;
        }

        console.log('/api/setProjectStatus not auth');
        return res.sendStatus(403);
    });