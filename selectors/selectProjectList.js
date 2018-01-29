import * as R from "ramda";
import { createSelector } from "reselect";

// TODO Handle this through settings instead
const filterByKey = (key, query) =>
  R.filter(item =>
    R.propSatisfies(
      x =>
        !query
          ? true
          : x
            ? R.toLower(x.toString()).includes(
                R.toLower(query.toString())
              )
            : false,
      key,
      item
    )
  );

export default createSelector(
  [({ projects }) => projects, ({ settings }) => settings],
  (projects, { filter, filterFunc, sortKey, sortDesc }) => {
    console.log("projects", projects);
    const filteredList = list =>
      R.reduce(
        (acc, [key, query]) => filterByKey(key, query)(acc),
        list,
        R.toPairs(filter)
      );

    // Sort by key: key, cb
    // TODO Handle this through settings instead
    const sortedList = R.sortBy(R.prop(sortKey));

    // Set list order
    const orderedList = list => (sortDesc ? R.reverse(list) : list);

    return R.compose(orderedList, sortedList, filteredList)(projects);
  }
);
