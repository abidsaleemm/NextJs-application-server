import { getStudy } from '../dicom';
import {
    getProject,
    setProject,
    setProjectSnapshot,
} from '../projects';
import createProject from '../projects/createProject';
import middleware from '../auth/middleware';


export default ({ server, app }) => {

    /**
     * Adding client side routing
     * fetch the project details
     */
    server.get('/fetchProjectDetails/:projectid', async (req, res) => {

        // console.log ('looking for id '+ req.params.projectId);
        // if (req.isAuthenticated()) {
        // console.log (req.client);

        // res.send ({success: true});
        // console.log ('request');
        // console.log (req.client);

        const { user, client = false  } = req;
        // let client = false;
        // if (client) {
        //     // No access redirect to portal
        //     // console.log ('here');
        //     return res.redirect('/portal');
        // }

        const { projectid: studyUID = '' } = req.params;
        const study = await getStudy({ studyUID });
        let project = await getProject({ studyUID });

        // TODO Should project creation be handled here?
        if (project === undefined) {
            console.log('Creating new project', studyUID);
            project = createProject({ studyUID }); // TODO Add function to create default from existing
            await setProject({ studyUID, props: { status: 0, client: 0 } });
            await setProjectSnapshot({ studyUID, payload: project });
        }

        // Merge project and study table
        project = { ...project, ...study };

        res.send({ projectDetail: project });
    });

    // server.get("/getProjectDetail/:projectid", async (req, res) => {
    //     if (req.isAuthenticated()) { // issue-15
    //         // TODO This should be integrated in as middleware
    //         // Check if Client
    //         const { user: { client = false } } = req;
    //         if (client === true) {
    //             // No access redirect to portal
    //             return res.redirect('/portal');
    //         }

    //         const { projectid: studyUID = '' } = req.params;
    //         const study = await getStudy({ studyUID });
    //         let project = await getProject({ studyUID });

    //         // TODO Should project creation be handled here?
    //         if (project === undefined) {
    //             console.log('Creating new project', studyUID);
    //             project = createProject({ studyUID }); // TODO Add function to create default from existing
    //             await setProject({ studyUID, props: { status: 0, client: 0 } });
    //             await setProjectSnapshot({ studyUID, payload: project });
    //         }

    //         // Merge project and study table
    //         project = { ...project, ...study };

    //         const projectDetails = {};

    //         return app.render(req, res, "/projectDetail", {
    //             ...req.query,
    //             projectDetail: project,
    //         });
    //     }

    //     console.log('/projects not auth')
    //     return res.redirect('/');
    // });
}