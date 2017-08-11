import { getStudies } from '../dicom';
import { getProjectList } from '../projects';

export default ({ server, app }) =>
    server.get("/portal", async (req, res) => {
        
            const { user: { client = false, id } } = req;
            if (client === true) {
                const studies = await getStudies();
                let projects = await getProjectList();
                projects = projects
                    .filter(v => v.client == id) // TODO fix typing?
                    .map(v => {
                        // Find matching Study
                        const study = studies.find(({ studyUID }) => v.studyUID === studyUID);
                        return { ...v, ...study }; 
                    });
                
                return app.render(req, res, "/portal", { ...req.query, projects });
            }
            return res.redirect('/projects');
    });