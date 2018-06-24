import passport from "passport";
import { Strategy } from "passport-local";
import { adapter } from "../server";
// import { getUser } from "../authUsers";

export default server => {
  const { users: { getUser = () => {} } = {} } = adapter;

  server.use(passport.initialize());
  server.use(passport.session());
  passport.use(
    new Strategy((username, password, done) =>
      getUser({ username, password }).then(user => done(null, user))
    )
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
        return next(err);
      }

      if (!user) {
        req.session.sessionFlash = {
          error: "Invalid username / password"
        };

        return res.redirect("/");
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
    res.clearCookie("express.sid"); // TODO do we need this?
    req.session.destroy(function(err) {
      console.log(err);
      res.redirect("/");
    });
  });

  return passport;
};
