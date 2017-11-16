import * as R from "ramda";

export default R.pipe(
  R.toPairs,
  R.filter(([k, v]) => v !== undefined && v !== null),
  R.map(([k, v]) => {
    try {
      return [k, JSON.parse(v)];
    } catch (e) {
      return [k, v];
    }
  }),
  R.fromPairs
);
