export default (result) => {
  result.entries.forEach(deleteEntry);

  if (result.conitnuationToken) {
    getEntries(store.table, query, result.conitnuationToken);
  }
}