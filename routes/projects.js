import { getStudies } from '../dicom';
import { getProjectList } from '../projects';
import getStatusName from '../helpers/getStatusName';
import getClientNameById from '../helpers/getClientNameById';
import middleware from '../auth/middleware';

export default ({ server, app }) =>
    server.get("/projects", middleware.isLoggedin,async (req, res) => {
            // Check if Client
            const { user: { client = false } } = req;
            if (client === true) {
                // No access redirect to portal
                return res.redirect('/portal');
            }
            // Building query for data
            const studies = await getStudies();
            const projectsList = await getProjectList();
            const projects = studies.map(study => {
                // Lookup if there is a project
                const project = projectsList.find(({ studyUID }) => study.studyUID === studyUID);

                return project ?
                    { 
                        ...study, 
                        status: getStatusName(project.status || 0), 
                        client: getClientNameById(project.client) 
                    } :
                    { ...study, status: '' };
            });
            return app.render(req, res, "/projects", { ...req.query, projects });
    });