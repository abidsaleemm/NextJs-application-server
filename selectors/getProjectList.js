import R from "ramda";

export default ( data , { filter, sort } ) => {
  // Filter list by given key and query
  const filterByKey = (key, query) =>
    R.filter(item =>
      R.propSatisfies(
        x =>
          !query ? true : x ? R.toLower(x).includes(R.toLower(query)) : false,
        key,
        item
      )
    );

  // Use filterByKey for each key in settings
  const filteredList = list =>
    R.reduce(
      (acc, [key, query]) => filterByKey(key, query)(acc),
      list,
      R.toPairs(filter)
    );

  // Sort by key: key, cb
  const sortedList = R.sortBy(R.prop(sort.id));

  // Set list order
  const orderedList = list => sort.desc ? R.reverse(list) : list;

  return R.compose(orderedList, filteredList, sortedList)(data.projects)
};
