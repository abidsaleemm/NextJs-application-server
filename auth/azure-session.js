"use strict";

var azure = require("azure-storage");
var util = require("util");
var CronJob = require("cron").CronJob;
var DEFAULT_TABLE = "azureSessionsStore"; // TODO See issue comments regarding this
var RETRY_LIMIT = 3;
var RETRY_INTERVAL = 3000; //miliseconds
var options = {
  logger: console.log,
  errorLogger: console.log,
  sessionTimeOut: 86400000,
  overrideCron: "0 0 */1 * * *"
};
module.exports = function(session) {
  console.log("session: ",session.Store);
  var Store = session.Store;

  function AzureTablesStore() {
    var self = this;

    options = options || {};
    self.log = options.logger || noop;
    self.logError = options.errorLogger || noop;
    self.sessionTimeOut = options.sessionTimeOut;
    self.cronPattern = options.overrideCron || "59 * * * * *";

    Store.call(this, options);

    //todo: allow retry policy to bet set on options
    var retryOperations = new azure.LinearRetryPolicyFilter(
      RETRY_LIMIT,
      RETRY_INTERVAL
    );
    var azureStorageConnectionString =
      process.env.AZURE_STORAGE_CONNECTION_STRING;

    if (azureStorageConnectionString) {
      self.tableService = azure
        .createTableService()
        .withFilter(retryOperations);
    } else {
      var storageAccount =
        process.env.STORAGE_ACCOUNT || options.storageAccount;
      var accessKey =
        process.env.STORAGE_ACCOUNT_KEY || options.accessKey;
      self.tableService = azure
        .createTableService(storageAccount, accessKey)
        .withFilter(retryOperations);
    }

    /*
        table setup
        table name can be supplied on options
        */

    self.table = options.table || DEFAULT_TABLE;
    self.tableService.createTableIfNotExists(self.table, logOrThrow);

    //schedule expired session cleanup if session timeout is set
    if (options.sessionTimeOut) {
      self.startBackgroundCleanUp();
    }

    //reducing function complexity to keep code climate happy
    function logOrThrow(error, result) {
      if (result) {
        //self.log('connect-azuretables created table ' + self.table);
      }

      if (error) {
        throw "failed to create table: " + error;
      }
    }
  }

  util.inherits(AzureTablesStore, Store);

  //all - optional function

  //destroy - required function
  AzureTablesStore.prototype.destroy = function(sid, fn) {
    var store = this;
    var cleanSid = sanitize(sid);
    var entGen = azure.TableUtilities.entityGenerator;
    var session = {
      PartitionKey: entGen.String(cleanSid),
      RowKey: entGen.String(cleanSid)
    };

    if (!fn) {
      fn = noop;
    }

    this.log("connect-azuretables called DESTROY " + sid);

    store.tableService.deleteEntity(store.table, session, function(
      error,
      result
    ) {
      return errorOrResult(error, result, fn);
    });
  };

  //get - required function
  AzureTablesStore.prototype.get = function(sid, fn, retry) {
    var store = this;
    var cleanSid = sanitize(sid);

    if (!fn) {
      fn = noop;
    }
    //this.log('connect-azuretables called GET ' + sid);
    try {
      store.tableService.retrieveEntity(
        store.table,
        cleanSid,
        cleanSid,
        function(error, result) {
          if (error && error.statusCode == 404 && !retry) {
            store.get(sid, fn, true);
          } else {
            var error = null;
            return error || !result
              ? fn(error)
              : fn(null, JSON.parse(result.data._));
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  //set - required function
  AzureTablesStore.prototype.set = function(sid, data, fn) {
    this.update("SET", sid, data, fn);
  };

  //touch - optional function
  AzureTablesStore.prototype.touch = function(sid, data, fn) {
    this.update("TOUCH", sid, data, fn);
  };

  //updates a session
  AzureTablesStore.prototype.update = function(
    method,
    sid,
    data,
    fn
  ) {
    //this.log('connect-azuretables called ' + method + ' ' + sid);
    var store = this;
    var cleanSid = sanitize(sid);
    var entGen = azure.TableUtilities.entityGenerator;
    var session = {
      PartitionKey: entGen.String(cleanSid),
      RowKey: entGen.String(cleanSid),
      data: entGen.String(JSON.stringify(data))
    };

    var expiryDate = getExpiryDate(store, data);

    if (expiryDate) {
      session.expiryDate = entGen.DateTime(expiryDate);
    }

    if (!fn) {
      fn = noop;
    }

    store.tableService.insertOrReplaceEntity(
      store.table,
      session,
      function(error, result) {
        if (!error) {
          store.startBackgroundCleanUp();
        }

        return errorOrResult(error, result, fn);
      }
    );
  };

  //start cron job
  AzureTablesStore.prototype.startBackgroundCleanUp = function() {
    if (!this.isRunningCleanUp) {
      var store = this;
      //store.log('starting session cleanup cron job with cron pattern ' + store.cronPattern);
      new CronJob(
        store.cronPattern,
        function() {
          store.cleanUp();
        },
        null,
        true
      );

      this.isRunningCleanUp = true;
    }
  };

  //remove timed out sessions from the store
  AzureTablesStore.prototype.cleanUp = function() {
    var query = new azure.TableQuery().where(
      "expiryDate lt ?",
      new Date(Date.now())
    );
    var store = this;
    store.log("cleaning up expired sessions");
    getEntries(store.table, query, null);

    function getEntries(table, query, continuationToken) {
      store.tableService.queryEntities(
        table,
        query,
        continuationToken,
        function(error, result, response) {
          if (error) {
            store.logError(
              "Error when checking for expired sessions: " + error
            );
          } else {
            deleteEntries(result);
          }
        }
      );
    }

    function deleteEntries(result) {
      result.entries.forEach(deleteEntry);

      if (result.continuationToken) {
        getEntries(store.table, query, result.continuationToken);
      }
    }

    function deleteEntry(entry) {
      console.log("Deleting sessions Entry");
      store.tableService.deleteEntity(store.table, entry, function(
        error,
        result
      ) {
        if (error) {
          //404 probably means the session was already deleted
          //either by a logout or by a clean up running on another server
          if (error.statusCode != 404) {
            store.logError("Error deleting session: " + error);
          }
        } else {
          store.log("cleaned up session " + entry.PartitionKey._);
        }
      });
    }
  };

  //ensure sid is suitable as a row key
  function sanitize(sid) {
    return sid.replace(/[^0-9A-Za-z]/g, "");
  }

  //no-op function
  function noop() {}

  //removing duplicate code to keep code climate happy
  function errorOrResult(error, result, fn) {
    return error ? fn(error) : fn(null, result);
  }

  //expiry date for sessions
  function getExpiryDate(store, data) {
    var offset;

    if (data.cookie.originalMaxAge) {
      offset = data.cookie.originalMaxAge;
    } else {
      offset = store.sessionTimeOut * 60000;
    }

    return offset ? new Date(Date.now() + offset) : null;
  }

  //export factory methodt instead of constructor for easier unit testing
  var factory = {
    create: function() {
      return new AzureTablesStore();
    }
  };

  return factory;
};
