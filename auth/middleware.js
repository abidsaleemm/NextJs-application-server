export default {


    isLoggedin: (req, res, next) => {
        (req.isAuthenticated())?next():res.redirect('/');
    },
    isAuth: (req, res, next) => {
        (req.isAuthenticated())?next():res.status(403).send('You are not authorized to access this page');
    }

};





