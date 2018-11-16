export default (sid, fn) => {
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
}