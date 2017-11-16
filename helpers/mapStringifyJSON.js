import * as R from "ramda";

export default R.pipe(
  R.toPairs,
  R.filter(([k, v]) => v !== undefined && v !== null),
  R.map(([k, v]) => {
    const mappedValue = typeof v === "object" ? JSON.stringify(v) : v;
    return [k, mappedValue];
  }),
  R.fromPairs
);
