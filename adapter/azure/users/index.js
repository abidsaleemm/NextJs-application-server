import azure from "azure-storage";
import bcrypt from "bcryptjs";
import uuid from "uuid";

// TODO make these more global and reusable?
import mapStringifyJSON from "../../../helpers/mapStringifyJSON";
import mapParseJSON from "../../../helpers/mapParseJSON";

const saltRounds = 10;

const hashPassword = password =>
  new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function(err, hash) {
      if (err) {
        reject(err);
        return;
      }
      // Store hash in your password DB.
      resolve(hash);
    });
  });

const editUser = async ({ tableName, user, tableAdapter }) => {
  const { id: userID, username, name, password, role, teams } = user;
  const { mergeEntity } = tableAdapter;

  const entity = {
    PartitionKey: `${userID}`, // TODO PartitionKey and RowKey the same? or should just use row key? WG
    RowKey: `${userID}`,
    username,
    name,
    role,
    password: await hashPassword(password),
    id: userID,
    teams: JSON.stringify(teams)
  };

  await mergeEntity({ tableName, entity });
};

const deleteUser = async ({ id, tableName, tableAdapter }) => {
  const { deleteEntity } = tableAdapter;

  await deleteEntity({ tableName, key: id });
};

const createUser = async ({ user, tableName, tableAdapter }) => {
  const { password, id, teams } = user;
  const { insertOrMergeEntity } = tableAdapter;

  // TODO Reusable some place else? WG
  const users = await getUsers({ tableName, tableAdapter });

  // Get highest id value + 1
  // TODO Should we just use UUID instead? WG
  const userID = users.reduce((a, { id }) => (parseInt(id) > a ? parseInt(id) : a), 0) + 1;

  const entity = {
    PartitionKey: `${userID}`, // TODO PartitionKey and RowKey the same? or should just use row key? WG
    RowKey: `${userID}`,
    ...user,
    id: userID,
    password: await hashPassword(password),
    teams: JSON.stringify(teams)
  };

  // TODO Create crytocryptic hash for storing password
  console.log("entity", entity);

  await insertOrMergeEntity({ tableName, entity });
};

const getUser = async ({ username = "", password, tableName, tableAdapter: { queryTable } }) => {
  // Always handle and store as lower case
  const query = new azure.TableQuery().where("username eq ?", username.toLowerCase());
  const { 0: { password: passwordCheck, admin = false, teams = `[]`, ...user } = {} } = await queryTable({
    query,
    tableName
  });

  // check if the query corresponding entry has been found or not
  if (passwordCheck) {
    const res = await bcrypt.compare(password, passwordCheck);
    return res === true ? { ...user, teams: JSON.parse(teams), role: admin ? "admin" : "user" } : false;
  }
  return false;
};

const getUsers = async ({ tableName, tableAdapter: { queryTableAll } }) => {
  const values = await queryTableAll({ tableName });
  return values.map(({ teams = `[]`, admin = false, ...v }) => ({
    ...v,
    role: admin ? "admin" : "user",
    teams: JSON.parse(teams)
  }));
};

const createTeam = async ({ tableName, teamData, tableAdapter }) => {
  const { insertOrMergeEntity = () => {} } = tableAdapter;
  const { id } = teamData;

  const entity = {
    PartitionKey: id, // TODO Should these match?
    RowKey: id,
    ...teamData
  };

  await insertOrMergeEntity({ tableName, entity });
};

const deleteTeams = async ({ ids = [], tableName, tableAdapter }) => {
  const { deleteEntity } = tableAdapter;

  await Promise.all(ids.map(async id => await deleteEntity({ tableName, key: id })));
};

const getTeams = async ({ tableName, tableAdapter: { queryTableAll } }) => {
  const values = await queryTableAll({ tableName });
  return values;
};

const setUserProps = async ({ id = 0, props = {}, tableName, tableAdapter: { mergeEntity } }) => {
  const updatedTask = {
    PartitionKey: id,
    RowKey: id,
    ...mapStringifyJSON(props)
  };

  return await mergeEntity({ tableName, entity: updatedTask });
};

const getUserProps = async ({ id = 0, props = [], tableName, tableAdapter: { queryTable } }) => {
  const query = new azure.TableQuery().select(props).where("id eq ?", parseInt(id));

  const [user] = await queryTable({
    query,
    tableName
  });

  return mapParseJSON(user);
};

export default ({ tableAdapter }) => {
  const { createTableIfNotExists } = tableAdapter;

  const tableName = "users";
  const tableNameTeams = "teams";

  createTableIfNotExists({ tableName });
  createTableIfNotExists({ tableName: tableNameTeams });

  return {
    createUser: async user => await createUser({ user, tableName, tableAdapter }),
    editUser: async user => await editUser({ user, tableName, tableAdapter }),
    deleteUser: async id => await deleteUser({ id, tableName, tableAdapter }),
    getUsers: async () => await getUsers({ tableName, tableAdapter }),
    getUser: async props => await getUser({ ...props, tableName, tableAdapter }),
    // TODO Might be redunant function? WG
    getUserProps: async (id = 0, props = []) => await getUserProps({ id, props, tableName, tableAdapter }),
    setUserProps: async (id = 0, props = []) => await setUserProps({ id, props, tableName, tableAdapter }),
    // Teams
    createTeam: async teamData => await createTeam({ teamData, tableName: tableNameTeams, tableAdapter }),
    getTeams: async () => await getTeams({ tableName: tableNameTeams, tableAdapter }),
    deleteTeams: async ids => await deleteTeams({ ids, tableName: tableNameTeams, tableAdapter })
  };
};
