import * as R from "ramda";

export default props =>
  R.pipe(
    R.toPairs,
    R.filter(([k, v]) => props.some(t => t === k)),
    R.fromPairs
  );
