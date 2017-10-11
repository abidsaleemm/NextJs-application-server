import R from "ramda";

export default ( data , settings ) => {
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
      (acc, i) => filterByKey(i[0], i[1])(acc),
      list,
      R.toPairs(settings.filter)
    );

  // Sort by key: key, cb
  const sortedList = R.sortBy(R.prop(settings.sort.id));

  // Set list order
  const orderedList = list => settings.sort.desc ? R.reverse(list) : list;

  return R.compose(orderedList, filteredList, sortedList)(data.projects)
};
