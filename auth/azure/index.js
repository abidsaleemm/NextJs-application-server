import azure from "azure-storage";
import destroy from "./destroy";
import get from "./get";
import set from "./set";
import touch from "./touch";
import update from "./update";
import startBackgroundCleanUp from "./startBackgroundCleanUp";
import cleanUp from "./cleanUp";

import util from "util";
import { start } from "repl";
let DEFAULT_TABLE = "azureSessionsStore"; // TODO: See issue comments regarding this
let RETRY_LIMIT = 3;
let RETRY_INTERVAL = 3000; //miliseconds
let options = {
  logger: console.log,
  errorLogger: console.log,
  sessionTimeOut: 86400000,
  overrideCron: "0 0 */1 * * *"
};

export default ({ session }) => {
  let Store = session.Store;

  options = options || {};
  const log = options.logger || noop;
  const logError = options.errorLogger || noop;
  const sessionTimeOut = options.sessionTimeOut;
  const cronPattern = options.overrideCron || "59 * * * * *";

  Store.call(this, options);

  //TODO: allow retry policy to bet set on options
  let retryOperations = new azure.LinearRetryPolicyFilter(
    RETRY_LIMIT,
    RETRY_INTERVAL
  );
  let azureStorageConnectionString =
    process.env.AZURE_STORAGE_CONNECTION_STRING;
  let tableService;
  if (azureStorageConnectionString) {
    tableService = azure.createTableService().withFilter(retryOperations);
  } else {
    const storageAccount =
      process.env.STORAGE_ACCOUNT || options.storageAccount;
    const accessKey = process.env.STORAGE_ACCOUNT_KEY || options.accessKey;
    tableService = azure
      .createTableService(storageAccount, accessKey)
      .withFilter(retryOperations);
  }

  let table = options.table || DEFAULT_TABLE;
  tableService.createTableIfNotExists(table, logOrThrow);

  return {
    cleanUp: async props => await cleanUp(...props),
    destroy: async props => await destroy(...props),
    get: async props => await get(...props),
    set: async props => await set(...props),
    startBackgroundCleanUp: async props =>
      await startBackgroundCleanUp(...props),
    touch: async props => await touch(...props),
    update: async props => await update(...props)
  };
};
