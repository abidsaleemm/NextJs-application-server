import middleware from '../auth/middleware';

export default ({ server, app }) =>
    server.get("/successRedirect", middleware("route").isAuth,  async (req, res) => {
        console.log("user logged in successfully ",req.session.passport);
            return app.render(req, res, "/successRedirect",{});
    });