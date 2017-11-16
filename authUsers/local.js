import fs from "fs";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";

export const defaultUsers = [
  {
    id: 1,
    name: "Warren Goble",
    username: "warren@hack.expert",
    password: "test91a",
    admin: true
  },
  {
    id: 2,
    name: "Sandeep Shah",
    username: "hisandeepshah@gmail.com",
    password: "test91a",
    admin: true
  },
  {
    id: 4,
    name: "NHF",
    username: "user@nhf.com",
    password: "test91a",
    client: true,
    address: "6781 Hollywood Blvd",
    city: "Los Angeles",
    state: "California",
    zip: "90028",
    phone: "+1 234-789-4555"
  },
  {
    id: 6,
    name: "Tharon",
    username: "tharonica@gmail.com",
    password: "test91a",
    admin: true
  }
];

export const path = "./projectsLocal";
export const pathUsers = `${path}/users.json`;

// TODO this should be some sort of reusable function under helpers
export const checkExists = () => {
  if (fs.existsSync(path) === false) {
    fs.mkdirSync(path);
  }
};

checkExists();
const db = low(new FileSync(pathUsers));
db.defaults({ users: defaultUsers }).write();

export const setSettings = async (id = 0, settings = {}) => {
  db
    .get("users")
    .find({ id: id })
    .assign({ settings: settings })
    .write();
};

export const getSettings = async (id = 0) => {
  const { settings = {} } = db
    .get("users")
    .find({ id: id })
    .value();

  return settings;
};

export const getUser = async ({ username = "", password = "" }) => {
  const user = db
    .get("users")
    .find({ username: username })
    .value();

  const { password: passwordTest = "" } = user;
  return password.toLocaleLowerCase() ===
    passwordTest.toLocaleLowerCase()
    ? user
    : undefined;
};

export const getClientInfo = async ({ clientID = 0 }) =>
  (({ name, address, city, state, country, zip }) => ({
    name,
    address,
    city,
    state,
    country,
    zip
  }))(
    db
      .get("users")
      .find({ id: clientID })
      .value()
  );

// TODO should only be for admins
// Do we need this at all?
export const getClients = async () => {
  return users
    .filter(({ client }) => client !== undefined)
    .map(({ id, name }) => ({ id, name }));
};
