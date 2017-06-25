import passport from "passport";
import { Strategy } from "passport-local";

// TODO hard coded table for beta test
// NOTE: This is not secure.  This should only be used for dev.
// Production should user Auth0 or Azure AD
// This can probably be moved to separate folder
const users = [
  {
    name: "Warren Goble",
    username: "warren@hack.expert",
    password: "test",
    id: 1, // TODO update to 
    admin: true,
  },
  {
    name: "Sandeep Shah",
    username: "hisandeepshah@gmail.com",
    password: "test",
    id: 2,
    admin: true,
  },
  {
    name: "Warren Goble",
    username: "warrengoble@gmail.com",
    password: "test",
    id: 3,
  },
  {
    name: "NHF",
    username: "user@nhf.com",
    password: "test",
    id: 4,
    client: true,
  }
];

// TODO put users here?
export default server => {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.use(
    new Strategy((username, password, done) => {
      const user = users.find(user =>
        user.username === username && user.password === password);

      if (user !== undefined) {
        console.log('User found logging in')
        return done(null, user);
      }

      return done(null, false);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    const user = users.find(user => user.id === id);

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
    // res.clearCookie('connect.sid'); // TODO do we need this?
    req.session.destroy(function (err) {
      res.redirect("/");
    });
  });

  return passport;
};
