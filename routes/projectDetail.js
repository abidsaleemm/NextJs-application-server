import { getStudy } from '../dicom';
import {
    createProject,
    getProject,
    setProjectSnapshot,
} from '../projects';

export default ({ server, app }) =>
    server.get("/projectDetail/:projectid", async (req, res) => {
        if (req.isAuthenticated()) { // TODO Middleware?
            // TODO This should be integrated in as middleware
            // Check if Client
            const { user: { client = false } } = req;
            if (client === true) {
                // No access redirect to portal
                return res.redirect('/portal');
            }

            const { projectid: studyUID = '' } = req.params;
            const study = await getStudy({ studyUID });
            let project = await getProject({ studyUID });

            if (project === undefined) {
                console.log('Creating new project');
                project = createProject({ studyUID }); // TODO Add function to create default from existing

                setProjectSnapshot({ studyUID, payload: project });
            }

            // Merge project and study table
            project = { ...project, ...study };

            const projectDetails = {};

            return app.render(req, res, "/projectDetail", {
                ...req.query,
                projectDetail: project,
            });
        }

        console.log('/projects not auth')
        return res.redirect('/');
    });
