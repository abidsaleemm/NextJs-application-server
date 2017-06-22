import passport from "passport";
import { Strategy } from "passport-local";

const users = [
  {
    username: "test-user",
    password: "test-password",
    id: 1
  }
];

// TODO put users here?
export default server => {
  server.use(passport.initialize());
  server.use(passport.session());

  passport.use(
    new Strategy((username, password, done) => {
      // lookup user
      console.log("looking up user", username, password);

      // TODO do functional lookup. Hardcoded for now.
      if (username === 'test' && password === 'test') {
        console.log('User found logging in')
        return done(null, users[0]);
      }

      return done(null, false);
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    done(null, users[0]);
    // User.findById(id, function(err, user) {
    //   if (err) return done(err);
    //   done(null, user);
    // });
  });

  //   passport.serializeUser((user, done) => {
  //     done(null, user);
  //   });

  //   passport.deserializeUser((user, done) => {
  //     done(null, user);
  //   });

  server.post(
    "/auth/local",
    passport.authenticate("local", {
      failureRedirect: "/",
      successRedirect: "/projects",
    })
  );

  server.get("/auth/logout", (req, res) => {
    // res.clearCookie('connect.sid'); // TODO do we need this?
    req.session.destroy(function(err) {
      res.redirect("/");
    });
  });

  return passport;
};
