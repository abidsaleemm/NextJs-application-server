import { queryStudies } from '../dicom';

export default ({ server, app }) =>
    server.get("/projects", async (req, res) => {
        if (req.isAuthenticated()) {
            const projects = await queryStudies();
            return app.render(req, res, "/projects", { ...req.query, projects });
        }

        console.log('/projects not auth')
        return res.redirect('/');
    });