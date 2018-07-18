import shallowDiff from "shallow-diff";
import { pipe, toPairs, filter, fromPairs } from "ramda";

const filterProps = props =>
  pipe(
    toPairs,
    filter(([k, v]) => props.some(t => t === k)),
    fromPairs
  );

export default store => next => action => {
  const { type } = action;
  const prevState = store.getState();
  const result = next(action);
  const currentState = store.getState();

  if (/SETTINGS$/.test(type)) {
    const { updated } = shallowDiff(prevState, currentState);
    const action = filterProps(updated)(currentState);
    store.dispatch({
      type: "server/setSettings",
      action
    });
  }

  return result;
};
