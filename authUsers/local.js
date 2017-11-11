export const users = [
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
    address: "6781 Hollywood Blvd",
    city: "Los Angeles",
    state: "California",
    zip: "90028",
    phone: "+1 234-789-4555"
  },
  {
    name: "Tharon",
    username: "tharonica@gmail.com",
    password: "test91a",
    id: 6,
    admin: true
  }
];

export const getUser = async ({ username, password }) =>
  users.find(
    user => user.username === username && user.password === password
  );

export const getClientInfo = async ({ clientID = 0 }) =>
  (({ name, address, city, state, country, zip }) => ({
    name,
    address,
    city,
    state,
    country,
    zip
  }))(users.find(user => user.id == clientID && user.client));

// TODO should only be for admins
export const getClients = async () => {
  return users
    .filter(({ client }) => client !== undefined)
    .map(({ id, name }) => ({ id, name }));
};
