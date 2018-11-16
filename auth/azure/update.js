export default (method, sid, data, fn) => {
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

  store.tableService.insertOrReplaceEntity(store.table, session, function(
    error,
    result
  ) {
    if (!error) {
      store.startBackgroundCleanUp();
    }

    return errorOrResult(error, result, fn);
  });
};
