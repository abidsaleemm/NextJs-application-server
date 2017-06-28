import { queryStudies } from '../dicom';
import { queryProjectList } from '../projects';
import getStatusName from '../helpers/getStatusName';
import getClientNameById from '../helpers/getClientNameById';

export default ({ server, app }) =>
    server.get("/projects", async (req, res) => {
        if (req.isAuthenticated()) {
            // Building query for data
            // TODO Is there a better place for this?
            const studies = await queryStudies();
            const projectsList = await queryProjectList();
            const projects = studies.map(study => {
                // Lookup if there is a project
                const project = projectsList.find(({ studyUID }) => study.studyUID === studyUID) || {};
                const { client, status } = project;

                console.log('project', project);

                return project !== undefined ? 
                    { 
                        ...study, 
                        status: getStatusName(status) || 'Uploaded', 
                        client: getClientNameById(client) 
                    } :
                    { ...study, status: '' };
            });

            return app.render(req, res, "/projects", { ...req.query, projects });
        }

        console.log('/projects not auth');
        return res.redirect('/');
    });