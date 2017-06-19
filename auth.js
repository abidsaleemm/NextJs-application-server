import passport from 'passport';
import jwtDecode from 'jwt-decode';
import AzureAdOAuth2Strategy from 'passport-azure-ad-oauth2';

// TODO put users here?
export default app => {
  passport.use(
    new AzureAdOAuth2Strategy(
      {
        clientID: "7b57cefe-26e8-43b8-9288-a24c86569219",
        clientSecret: "vQszCj1EoKb5oez8gdRc94czT4WfjQ6DPihRiZ3dwaA=",
        callbackURL: "https://multus.azurewebsites.net/auth/azureadoauth2/callback",
        // callbackURL: "http://localhost/auth/azureadoauth2/callback",
        resource: "00000002-0000-0000-c000-000000000000",
        tenant: "multusad.onmicrosoft.com",
      },
      (accessToken, refresh_token, params, profile, done) => {
        // const waadProfile = profile || jwt.decode(params.id_token, "", true);
        const waadProfile = jwtDecode(params.id_token);
        // const waadProfile = profile || jwt.decode(params.id_token, "", true);

        console.log('waadProfile', waadProfile);

        // Hanlde users here
        // User.findOrCreate({ id: waadProfile.upn }, (err, user) => {
        //   done(err, user);
        // });
      }));

  app.get("/auth/azureadoauth2", passport.authenticate("azure_ad_oauth2"));

  app.get(
    "/auth/azureadoauth2/callback",
    passport.authenticate("azure_ad_oauth2", { failureRedirect: "/login" }),
    (req, res) => {
      console.log('authcallback ok')

      // Successful authentication, redirect home.
      res.redirect("/");// TODO clean this up
    }
  );

  app.use(passport.initialize());
  app.use(passport.session());
};