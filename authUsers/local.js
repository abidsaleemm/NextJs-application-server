const users = [
  {
    name: "Warren Goble",
    username: "warren@hack.expert",
    password: "test91a",
    id: 1, // TODO update to
    admin: true
  },
  {
    name: "Sandeep Shah",
    username: "hisandeepshah@gmail.com",
    password: "test91a",
    id: 2,
    admin: true
  },
  {
    name: "Warren Goble",
    username: "warrengoble@gmail.com",
    password: "test91a",
    id: 3
  },
  {
    name: "NHF",
    username: "user@nhf.com",
    password: "test91a",
    id: 4,
    client: true
  },
  {
    name: "Test User",
    username: "user@test.com",
    password: "test91a",
    id: 5
  },
  {
    name: "Test Client",
    username: "client@test.com",
    password: "test91a",
    id: 6,
    client: true
  }
];

export const getUser = async ({ username, password }) =>
  users.find(user => user.username === username && user.password === password);

export const getClients = async () => {
  // console.log("users", users);
  
  return users
    .filter(({ client }) => client !== undefined)
    .map(({ id, name }) => ({ id, name }));
}
