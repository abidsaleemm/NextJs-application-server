import shallowDiff from "shallow-diff";
import filterProps from "../helpers/filterProps";

export default store => next => action => {
  const { type } = action;
  const prevState = store.getState();
  const result = next(action);
  const currentState = store.getState();

  if (/SETTINGS$/.test(action.type)) {
    const { updated } = shallowDiff(prevState, currentState);
    const action = filterProps(updated)(currentState);
    store.dispatch({
      type: "server/setSettings",
      action
    });
  }

  return result;
};
