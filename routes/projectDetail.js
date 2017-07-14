import { getStudy } from '../dicom';
import {
    getProject,
    setProject,
    setProjectSnapshot,
} from '../projects';

import createProject from '../projects/createProject';

export default ({ server, app }) =>
    server.get("/projectDetail/:projectid", async (req, res) => {
        if (req.isAuthenticated()) { // issue-15
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

            // TODO Should project creation be handled here?
            if (project === undefined) {
                console.log('Creating new project');
                project = createProject({ studyUID }); // TODO Add function to create default from existing
                await setProject({ studyUID, props: { status: 0, client: 0 } });
                await setProjectSnapshot({ studyUID, payload: project });
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
