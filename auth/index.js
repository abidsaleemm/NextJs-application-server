// TODO Add azure strategy at some point
export default from './local';

// TODO hard coded table for beta test
// NOTE: This is not secure.  This should only be used for dev.
// Production should user Auth0 or Azure AD
// This can probably be moved to separate folder
// export const users = () => [
//   {
//     name: "Warren Goble",
//     username: "warren@hack.expert",
//     password: "test",
//     id: 1, // TODO update to 
//     admin: true,
//   },
//   {
//     name: "Sandeep Shah",
//     username: "hisandeepshah@gmail.com",
//     password: "test",
//     id: 2,
//     admin: true,
//   },
//   {
//     name: "Warren Goble",
//     username: "warrengoble@gmail.com",
//     password: "test",
//     id: 3,
//   },
//   {
//     name: "NHF",
//     username: "user@nhf.com",
//     password: "test",
//     id: 4,
//     client: true,
//   }
// ];
