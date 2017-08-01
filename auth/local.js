import passport from "passport";
import { Strategy } from "passport-local";
import users from './users';

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
