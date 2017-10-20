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
    name: "NHF",
    username: "user@nhf.com",
    password: "test91a",
    id: 4,
    client: true,
    address: '6781 Hollywood Blvd',
    city: 'Los Angeles',
    state: 'California',
    zip: '90028',
    phone: '+1 234-789-4555',
  },
  {
    name: "Test User",
    username: "user@test.com",
    password: "test91a",
    id: 5
  },
];

export const getUser = async ({ username, password }) =>
  users.find(user => user.username === username && user.password === password);

export const getClients = async () => {
  // console.log("users", users);
  
  return users
    .filter(({ client }) => client !== undefined)
    .map(({ id, name }) => ({ id, name }));
}
