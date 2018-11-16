export default () => {
  var query = new azure.TableQuery().where(
    "expiryDate lt ?",
    new Date(Date.now())
  );
  var store = this;
  store.log("cleaning up expired sessions");
  getEntries(store.table, query, null);
};
