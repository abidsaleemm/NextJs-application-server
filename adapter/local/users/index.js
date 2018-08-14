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
    teams: []
  },
  {
    id: 7,
    name: "Test",
    username: "test@test.com",
    password: "test91a",
    role: "admin",
    teams: []
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
  return password.toLocaleLowerCase() === passwordTest.toLocaleLowerCase() ? user : undefined;
};

// TODO Should we... use helpers for these? filter out passwords here?
const getUsers = ({ db }) => {
  return db.get("users").value();
};

const deleteUser = async ({ id, db }) => {
  await db
    .get("users")
    .remove({ id })
    .write();
};

const editUser = async ({ user, db }) => {
  const { id, username, name, password, role, teams } = user;
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
};

const createUser = async ({ user, db }) => {
  await db
    .get("users")
    .push(user)
    .write();
};

const createTeam = async ({ teamData, db_team }) => {
  await db_team
    .get("teams")
    .push(teamData)
    .write();
};

const getTeams = ({ db_team }) => {
  return db_team.get("teams").value();
};

const deleteTeams = async ({ ids, db_team }) => {
  await db_team
    .get("teams")
    .remove(teamId => ids.includes(teamId.id))
    .write();
};

export default ({ path }) => {
  const pathUsers = `${path}/users.json`;
  const pathTeams = `${path}/teams.json`;

  const db = low(new FileSync(pathUsers));
  db.defaults({ users: defaultUsers }).write();

  const db_team = low(new FileSync(pathTeams));
  db_team.defaults({ teams: [] }).write();
  // TODO Refactor higher order code implimentation.  Should only pass object properties not params.
  return {
    createUser: async user => await createUser({ user, db }),
    editUser: async user => await editUser({ user, db }),
    deleteUser: async id => await deleteUser({ id, db }),
    getUsers: async () => await getUsers({ db }),
    getUser: async props => await getUser({ ...props, db }),
    getTeams: async () => await getTeams({ db_team }),
    getUserProps: async (id = 0, props = []) => await getUserProps({ id, props, db }),
    setUserProps: async (id = 0, props = []) => await setUserProps({ id, props, db }),
    createTeam: async teamData => await createTeam({ teamData, db_team }),
    deleteTeams: async ids => await deleteTeams({ ids, db_team })
  };
};
