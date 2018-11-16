export default (sid, fn, retry) => {
  var store = this;
  var cleanSid = sanitize(sid);

  if (!fn) {
    fn = noop;
  }
  //this.log('connect-azuretables called GET ' + sid);
  try {
    store.tableService.retrieveEntity(store.table, cleanSid, cleanSid, function(
      error,
      result
    ) {
      if (error && error.statusCode == 404 && !retry) {
        store.get(sid, fn, true);
      } else {
        var error = null;
        return error || !result
          ? fn(error)
          : fn(null, JSON.parse(result.data._));
      }
    });
  } catch (error) {
    console.log(error);
  }
};
