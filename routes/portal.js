import { getStudies } from '../dicom';
import { getProjectList } from '../projects';

export default ({ server, app }) =>
    server.get("/portal", async (req, res) => {
        if (req.isAuthenticated()) { // issue-15
            // TODO This should be integrated in as middleware
            // Check if Client
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
        }

        // TODO create this as a reusable function
        // Also user the Flash to send an error message
        console.log('/portal not auth');
        return res.redirect('/');
    });