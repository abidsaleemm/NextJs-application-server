import fs from "fs";
import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import filterProps from "../helpers/filterProps";

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
  },
  {
    id: 7,
    name: "Test",
    username: "test@test.com",
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

export const setUserProps = async (id = 0, props = {}) => {
  db
    .get("users")
    .find({ id: id })
    .assign(props)
    .write();
};

// props - array of keys
export const getUserProps = async (id = 0, props = []) => {
  const user = db
    .get("users")
    .find({ id: id })
    .value();

  return filterProps(props)(user);
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

// TODO should only be for admins
// Do we need this at all?
export const getClients = async () => {
  return users
    .filter(({ client }) => client !== undefined)
    .map(({ id, name }) => ({ id, name }));
};

//Should we... use helpers for these? filter out passwords here?
export const getUsers = () => {
  return db.get("users");
};

export const deleteUser = id => {
  db
    .get("users")
    .remove({ id })
    .write()
    .then(console.log(id, "delete User"));
};

export const createUser = user => {
  db
    .get("users")
    .push(user)
    .write()
    .then(console.log(user, "create User"));
};
