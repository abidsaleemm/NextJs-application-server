import proxy from 'http-proxy-middleware';

export default ({ server, app }) =>
    server.use("/client", (req, res) => {
        if (req.isAuthenticated()) { // issue-15
            // Dev
            if (process.env.NODE_ENV === 'dev') {
                return proxy({
                    target: 'http://localhost:8081',
                    changeOrigin: true,
                    pathRewrite: { '^/client': '/' },
                })(req, res);
            }

            // Production
            return proxy({
                target: 'http://application-interface:8081',
                changeOrigin: true,
                pathRewrite: { '^/client': '/' },
            })(req, res);
        }

        console.log('/client not auth');
        return res.send('Client server error');
    });