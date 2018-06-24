import azure from "azure-storage";
import bcrypt from "bcryptjs";
import { queryTable } from "../table";
import mapStringifyJSON from "../../../helpers/mapStringifyJSON";
import mapParseJSON from "../../../helpers/mapParseJSON";

// Using reusable table service
// import { tableService } from "../projects/adapterAzure/";

const tableName = "users";

/**
 * validates/invalidates the username/password auth from azure
 * @param {*} username
 * @param {*} password
 */
export const getUser = async ({
  username = "",
  password,
  tableService
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

export const setUserProps = async (id = 0, props = {}) => {
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

export const getUserProps = async (id = 0, props = []) => {
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
