import passport from 'passport';
import jwtDecode from 'jwt-decode';
import AzureAdOAuth2Strategy from 'passport-azure-ad-oauth2';


export default app => {
  app.use(passport.initialize());
  app.use(passport.session());

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
         const waadProfile = profile || jwt.decode(params.id_token, "", true);
        //const waadProfile = jwtDecode(params.id_token);
        // const waadProfile = profile || jwt.decode(params.id_token, "", true);

        console.log('waadProfile', waadProfile);
        
        User.findOrCreate({ id: waadProfile.upn }, (err, user) => {
          done(err, user);
        });
      }));


/*=============================================================================================*/ 
  //// new application from new microsoft account for testing from different azure account ////
/*=============================================================================================*/ 


// passport.use(
// new AzureAdOAuth2Strategy(
// {
// clientID: "b534d21c-cd24-47c8-8aef-4f3cd2c3229c",
// clientSecret: "ACCHhZb7cqmyAh8ZZNC+QrwmiDrYHNsicOho9uCTfKU=",
// //callbackURL: "http://abctest.com/auth/ganesh/callback",
// callbackURL: "http://localhost:3000/auth/azureadoauth2/callback",
// resource: "00000002-0000-0000-c000-000000000000",
// //tenant: "multusad.onmicrosoft.com",
// },
// (accessToken, refresh_token, params, profile, done) => {

// const waadProfile = jwtDecode(params.id_token);
//         // const waadProfile = profile || jwt.decode(params.id_token, "", true);

//         console.log('waadProfile', waadProfile);
//         done(null, waadProfile);
// }));

/*===============================================================================*/
/*===============================================================================*/ 

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



  app.get("/auth/azureadoauth2", passport.authenticate("azure_ad_oauth2"));

  app.get(
    "/auth/azureadoauth2/callback",
    passport.authenticate("azure_ad_oauth2", {failureRedirect: "/",successRedirect:"/successRedirect"} 
  ));
};
