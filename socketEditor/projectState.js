import { adapter } from "../server";
import { values, mergeWith, merge, indexBy, prop } from "ramda";

const arrayMergeKey = ({ key, left, right }) =>
  values(mergeWith(merge, indexBy(prop(key), left), indexBy(prop(key), right)));

// TODO Create a module proxy for this and move code for other modules spine, shoulder, etc.
const stateProxy = ({ vertebra, ...state }) => ({
  vertebra: vertebraPayload
}) => {
  return {
    ...state,
    vertebra: vertebraPayload
      ? arrayMergeKey({ key: "name", left: vertebra, right: vertebraPayload })
      : vertebra
  };
};

export default async ({ socket, action }) => {
  const {
    projects: {
      setProjectSnapshot = () => {},
      getProjectSnapshot = () => {}
    } = {}
  } = adapter;

  const { payload = {} } = action;
  const { studyUID } = payload;

  const existingSnapshot = await getProjectSnapshot({ studyUID });
  const payloadUpdated = stateProxy(existingSnapshot)(payload);

  setProjectSnapshot({ studyUID, payload: payloadUpdated });
};
