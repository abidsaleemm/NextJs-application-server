import proxy from 'http-proxy-middleware';
import middleware from '../auth/middleware';

export default ({ server, app }) =>
    server.use("/client", middleware('api').isAuth, (req, res) => {
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
    });