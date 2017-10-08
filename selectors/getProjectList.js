import R from "ramda";

export default store => {
  const { projects, projSettings, ...rest } = store;
  console.log(store);
  // stubed settigs
  const settings = {
    filter: {
      patientName: "",
      studyName: "",
      status: "",
      studyDate: "",
      modality: "",
      location: "",
      client: ""
    },
    sort: {
      key: "studyDate",
      reverse: false
    }
  };

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
      R.toPairs(projSettings.filter)
    );

  // Sort by key: key, cb
  const sortByKey = key => R.sortBy(R.compose(R.toLower, R.prop(key)));
  const sortedList = sortByKey(settings.sort.key);

  // Set list order
  const orderedList = list => (settings.sort.reverse ? R.reverse(list) : list);

  return {
    projects: R.compose(orderedList, filteredList, sortedList)(
      projects.projects
    ),
    ...rest
  };
};
