
export default (authenticationType) => {
    return {
        isAuth: (req, res, next) => {
            // console.log("------------auth type--------------\n",authenticationType);
            if (authenticationType === "api")
                (req.isAuthenticated()) ? next() : res.status(403).send('You are not authorized to access this page');
            else
          (req.isAuthenticated()) ? next() : res.redirect('/');
        },
        //create more function //
    }
}





