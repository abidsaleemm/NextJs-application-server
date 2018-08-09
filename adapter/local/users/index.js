import low from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
import * as R from "ramda";

const filterProps = props =>
  R.pipe(
    R.toPairs,
    R.filter(([k, v]) => props.some(t => t === k)),
    R.fromPairs
  );

export const defaultUsers = [
  {
    id: 1,
    name: "Warren Goble",
    username: "warren@hack.expert",
    password: "test91a",
    role: "admin",
    teams: [{
      "id": 1,
      "title": "Team1",
      "isTeamAdmin": false
    }]
  },
  {
    id: 7,
    name: "Test",
    username: "test@test.com",
    password: "test91a",
    role: "admin",
    teams: [{
      "id": 1,
      "title": "Team1",
      "isTeamAdmin": false
    }]
  }
];

const setUserProps = async ({ id = 0, props = {}, db }) => {
  db.get("users")
    .find({ id: id })
    .assign(props)
    .write();
};

// props - array of keys
const getUserProps = async ({ id = 0, props = [], db }) => {
  const user = db
    .get("users")
    .find({ id: id })
    .value();

  return filterProps(props)(user);
};

const getUser = async ({ username = "", password = "", db }) => {
  const user = db
    .get("users")
    .find({ username: username })
    .value();

  const { password: passwordTest = "" } = user || {};
  return password.toLocaleLowerCase() ===
    passwordTest.toLocaleLowerCase()
    ? user
    : undefined;
};

// TODO Should we... use helpers for these? filter out passwords here?
const getUsers = ({ db }) => {
  return db.get("users");
};

const deleteUser = async ({ id, db }) => {
  await db
    .get("users")
    .remove({ id })
    .write();
  console.log(id, "Deleted User");
};

const editUser = async ({ user, db }) => {
  const { id, username, name, password, role, teams} = user;
  await db
    .get("users")
    .find({ id: id })
    .assign({
      username,
      name,
      password,
      role,
      teams
    })
    .write();
  console.log(user, "Edited User");
};

const createUser = async ({ user, db }) => {
  await db
    .get("users")
    .push(user)
    .write();
  console.log(user, "Created User");
};

export default ({ path }) => {
  const pathUsers = `${path}/users.json`;

  const db = low(new FileSync(pathUsers));
  db.defaults({ users: defaultUsers }).write();

  // TODO Refactor higher order code implimentation.  Should only pass object properties not params.
  return {
    createUser: async user => await createUser({ user, db }),
    editUser: async user => await editUser({ user, db }),
    deleteUser: async id => await deleteUser({ id, db }),
    getUsers: async () => await getUsers({ db }),
    getUser: async props => await getUser({ ...props, db }),
    getUserProps: async (id = 0, props = []) =>
      await getUserProps({ id, props, db }),
    setUserProps: async (id = 0, props = []) =>
      await setUserProps({ id, props, db })
  };
};
