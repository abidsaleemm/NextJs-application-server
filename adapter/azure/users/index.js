import azure from "azure-storage";
import bcrypt from "bcryptjs";

// TODO make these more global and reusable?
import mapStringifyJSON from "../../../helpers/mapStringifyJSON";
import mapParseJSON from "../../../helpers/mapParseJSON";

const getUser = async ({
  username = "",
  password,
  tableName,
  tableAdapter: { queryTable }
}) => {
  // Always handle and store as lower case
  const query = new azure.TableQuery().where(
    "username eq ?",
    username.toLowerCase()
  );
  const {
    0: { password: passwordCheck, ...user } = {}
  } = await queryTable({ query, tableName });

  // check if the query corresponding entry has been found or not
  if (passwordCheck) {
    const res = await bcrypt.compare(password, passwordCheck);
    return res === true ? user : false;
  }
  return false;
};

const setUserProps = async ({
  id = 0,
  props = {},
  tableName,
  tableAdapter: { mergeEntity }
}) => {
  const updatedTask = {
    PartitionKey: id,
    RowKey: id,
    ...mapStringifyJSON(props)
  };

  return await mergeEntity({ tableName, entity: updatedTask });
};

const getUserProps = async ({
  id = 0,
  props = [],
  tableName,
  tableAdapter: { queryTable }
}) => {
  const query = new azure.TableQuery()
    .select(props)
    .where("id eq ?", parseInt(id));

  const [user] = await queryTable({
    query,
    tableName
  });

  return mapParseJSON(user);
};

export default ({ tableAdapter }) => {
  const tableName = "users";

  return {
    createUser: async user =>
      await createUser({ user, tableName, tableAdapter }),
    deleteUser: async id =>
      await deleteUser({ id, tableName, tableAdapter }),
    getUsers: async () =>
      await getUsers({ db, tableName, tableAdapter }),
    getUser: async props =>
      await getUser({ ...props, tableName, tableAdapter }),
    getUserProps: async (id = 0, props = []) =>
      await getUserProps({ id, props, tableName, tableAdapter }),
    setUserProps: async (id = 0, props = []) =>
      await setUserProps({ id, props, tableName, tableAdapter }),
    createTeam: async team =>
      await createTeam({ team, tableName, tableAdapter }),
  };
};
