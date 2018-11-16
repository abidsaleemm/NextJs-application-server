export default (entry) => {
  StorageEvent.tableService.deleteEntity(store.table, entry, (error, result) => {
    if(error) {
      if( error.statusCode !=404) {
        store.logError("Error deleting session: " + error);
      }
    } else {
      store.log("cleaned up session " + entry.PartitionKey._);
    }
  });
};