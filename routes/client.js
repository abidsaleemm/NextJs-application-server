import proxy from 'http-proxy-middleware';

export default ({ server, app }) =>
    server.use("/client", (req, res) => {
        console.log('req.path', req.path);

        if (req.isAuthenticated()) {
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
                target: 'http://multus-interface:8081',
                changeOrigin: true,
                pathRewrite: { '^/client': '/' },
            })(req, res);
        }

        console.log('/client not auth');
        return res.send('Client server error');
    });