// import { queryStudyByUID } from '../dicom';
import { queryProjects } from '../projects';

export default ({ server, app }) =>
    server.get("/portal", async (req, res) => {
        if (req.isAuthenticated()) {
            const projects = await queryProjects; // TODO add customer/user query
            // TODO query DICOM studies?
            return app.render(req, res, "/portal", { ...req.query, projects });
        }

        // TODO create this as a reusable function
        // Also user the Flash to send an error message
        console.log('/portal not auth') 
        return res.redirect('/');
    });