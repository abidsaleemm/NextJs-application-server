import passport from "passport";
import { Strategy } from "passport-local";
import users from './users';

import bcrypt from 'bcrypt';
import azure from 'azure-storage';
const saltRounds = 10;
// const tableService = azure.createTableService();
// const entGen = azure.TableUtilities.entityGenerator;

export default server => {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.use(
    new Strategy((username, password, done) => {
      const user = users().find(user =>
        user.username === username && user.password === password);

      if (user !== undefined) {
        console.log('User found logging in')
        return done(null, user);
      }

      return done(null, false);
    })
  );

  /*============================================================================================
  ======================= login user data from azure storage issue =============================
  =============================================================================================*/


  /**
   * users data from azure table storage implementation
   * used package --> azure (to fetch user info from table)
   * used package --> bcrypt for encryption or decryption of passwords.. 
   */

  // passport.use(
  //   new Strategy((username, password, done) => {
  //     const user = {};
  //     // retrieving from azure table storage
  //     tableService.retrieveEntity('users', username, username, function (error, result, response) {
  //       if (!error) {
  //         // bcrypt compares the hash with password provided
  //         bcrypt.compare(password, response.body.password, function (err, res) {
  //           // if it's true then returns username and name provided from azure table data 
  //           if (res === true) {
  //             console.log('user found logged in');
  //             user.username = username;
  //             user.name = response.body.name;
  //             user.client = response.body.client;
  //             return done(null, user);
  //           } else {
  //             return done(null, false);
  //           }
  //         });
  //       }
  //     });

  //   })
  // );

/*===================================================================================================*/
/*===================================================================================================*/

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    if (user === undefined) {
      done(err);
      return;
    }

    done(null, user);
  });

  server.post("/auth/local", (req, res, next) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err)
      }

      if (!user) {
        // TODO Create a reusable function for this
        req.session.sessionFlash = {
          error: 'Invalid username / password',
        };

        return res.redirect("/")
      }

      req.login(user, loginErr => {
        if (loginErr) {
          return next(loginErr);
        }

        if (req.user.client)
          return res.redirect ('/portal');

        return res.redirect("/projects");
      });
    })(req, res, next);
  });

  server.get("/auth/logout", (req, res) => {
    res.clearCookie('express.sid'); // TODO do we need this?
    req.session.destroy(function (err) {console.log(err)
      res.redirect("/");
    });
  });

  return passport;
};
