import { adapter } from "../server";
import { values, mergeWith, merge, indexBy, prop } from "ramda";

const arrayMergeKey = ({ key, left, right }) =>
  values(mergeWith(merge, indexBy(prop(key), left), indexBy(prop(key), right)));

// TODO Create a module proxy for this and move code for other modules spine, shoulder, etc.
const stateProxy = ({ vertebra, segments, discs, ...state }) => ({
  vertebra: vertebraPayload,
  segments: segmentsPayload,
  discs: discsPayload
}) => {
  return {
    ...state,
    vertebra: vertebraPayload
      ? arrayMergeKey({ key: "name", left: vertebra, right: vertebraPayload })
      : vertebra,
    segments: segmentsPayload
      ? arrayMergeKey({ key: "name", left: segments, right: segmentsPayload })
      : segments,
    discs: discsPayload ? { ...discs, ...discsPayload } : discs
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
