
export default (reqType) => {
    return {
        isAuth : (req, res, next) => {
            // for api calling reqType will be 'api' or for page rendering it will be 'page'
            if (reqType === "api") {
                (req.isAuthenticated()) ? next() : res.status(403).send('You are not authorized to access this page');
            } else {
                (req.isAuthenticated()) ? next() : res.redirect('/');
            }
        }
    }
}





