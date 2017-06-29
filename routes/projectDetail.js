import { queryStudyByUID } from '../dicom';
import { 
    queryProject, 
    createProject, 
    createSnapshot,
} from '../projects';

export default ({ server, app }) =>
    server.get("/projectDetail/:projectid", async (req, res) => {
        const { projectid: studyUID = '' } = req.params;
        const study = await queryStudyByUID({ studyUID });
        let project = await queryProject({ studyUID });

        if (project === undefined) {
            console.log('Creating new project');
            project = createProject({ studyUID }); // TODO Add function to create default from existing

            createSnapshot({ studyUID, payload: project });
        }

        // Merge project and study table
        project = { ...project, ...study };

        if (req.isAuthenticated()) {
            const projectDetails = {};

            return app.render(req, res, "/projectDetail", {
                ...req.query,
                projectDetail: project,
            });
        }

        console.log('/projects not auth')
        return res.redirect('/');
    });
