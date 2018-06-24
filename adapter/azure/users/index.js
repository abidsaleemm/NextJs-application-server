import azure from "azure-storage";
import bcrypt from "bcryptjs";
import { queryTable } from "../table";
import mapStringifyJSON from "../../../helpers/mapStringifyJSON";
import mapParseJSON from "../../../helpers/mapParseJSON";

const getUser = async ({
  username = "",
  password,
  tableService,
  tableName
}) => {
  // Always handle and store as lower case
  const query = new azure.TableQuery().where(
    "username eq ?",
    username.toLowerCase()
  );
  const {
    0: { password: passwordCheck, ...user } = {}
  } = await queryTable({ tableService, query, tableName });

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
  tableService
}) => {
  const updatedTask = {
    PartitionKey: id,
    RowKey: id,
    ...mapStringifyJSON(props)
  };

  // TODO Reusable should move to helper area?
  await new Promise((resolve, reject) => {
    tableService.mergeEntity(
      tableName,
      updatedTask,
      (error, result, response) => {
        if (error) {
          return reject(error);
        }
        resolve(result);
      }
    );
  });
};

const getUserProps = async ({
  id = 0,
  props = [],
  tableName,
  tableService
}) => {
  const query = new azure.TableQuery()
    .select(props)
    .where("id eq ?", parseInt(id));
  const [user] = await queryTable({
    tableService,
    query,
    tableName
  });

  return mapParseJSON(user);
};

export default ({ tableService }) => {
  const tableName = "users";

  return {
    createUser: async user => await createUser({ user, tableName }),
    deleteUser: async id =>
      await deleteUser({ id, tableName, tableService }),
    getUsers: async () =>
      await getUsers({ db, tableName, tableService }),
    getUser: async props =>
      await getUser({ ...props, tableName, tableService }),
    getUserProps: async (id = 0, props = []) =>
      await getUserProps({ id, props, tableName, tableService }),
    setUserProps: async (id = 0, props = []) =>
      await setUserProps({ id, props, tableName, tableService })
  };
};
