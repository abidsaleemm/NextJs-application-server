export default ({ redirect = true } = {}) => (req, res, next) => {
    // Check if a user session
    if (!req.isAuthenticated()) {
        if (redirect === true) {
            res.redirect('/');
        } else {
            res.status(403).send('You are not authorized to access this page');
        }
        return;
    } 

    const { 
        user: { client = false, id: clientId }, 
        path = '',
    } = req;

    // TODO Handle using routing middleware
    // Handle user type redirection
    if (client === true && path === '/projects') {
        console.log('redirect to portal');
        res.redirect('/portal');
        return;
    } 

    if (client === false && path === '/portal') {
        console.log('redirect to projects');
        res.redirect('/projects');
        return;
    }

    next();
}





