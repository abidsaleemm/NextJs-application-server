
import passport from "passport";
import {
  Strategy
} from "passport-local";
import users from './users';
import azure from 'azure-storage';
const saltRounds = 10;
import bcrypt from 'bcrypt';
import queryTable from '../helpers/azure/queryTable';
const tableService = azure.createTableService();
export default server => {
  server.use(passport.initialize());
  server.use(passport.session());


  
 
  passport.use(
    new Strategy((username, password, done) => {

      if (process.env.NODE_ENV !== 'dev') {
        let query = new azure.TableQuery().top(5).where('PartitionKey eq ?', username);
        queryTable({tableService, query, tableName:'users'}).then((response)=>{
            bcrypt.compare(password, response['0'].password, function (err, res) { 
              if (res === true) { 
                const {PartitionKey, RowKey, Timestamp, password, '.metadata':undefined, ...user} = response['0'];
                return done(null,user);
              } else {
                return done(null, false);
              }
            })
          }).catch(error=>{
            console.log(error);
            throw new Error (error);
          })
      } else {
        const user = users().find(user =>
          user.username === username && user.password === password);
        return done(null, user);
      }
    })
  );





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
          return res.redirect('/portal');

        return res.redirect("/projects");
      });
    })(req, res, next);
  });

  server.get("/auth/logout", (req, res) => {
    res.clearCookie('express.sid'); // TODO do we need this?
    req.session.destroy(function (err) {
      console.log(err)
      res.redirect("/");
    });
  });

  return passport;
};