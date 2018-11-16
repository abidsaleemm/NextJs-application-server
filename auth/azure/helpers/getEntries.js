export default (table, query, contuationToken) => {
  store.tableService.queryEntities(table, query, continuationToken, (
    error,
    result,
    response
  ) => {
    if (error) {
      store.logError("Error when checking for expired sessions: " + error);
    } else {
      deleteEntries(result);
    }
  });
};
