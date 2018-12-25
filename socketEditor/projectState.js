import { values, mergeWith, merge, indexBy, prop } from "ramda";

const arrayMergeKey = ({ key, left, right }) =>
  values(mergeWith(merge, indexBy(prop(key), left), indexBy(prop(key), right)));

// TODO Create a module proxy for this and move code for other modules spine, shoulder, etc.
const stateProxy = ({ vertebra, segments, discs }) => ({
  vertebra: vertebraPayload,
  segments: segmentsPayload,
  discs: discsPayload,
  ...payload
}) => {
  return {
    ...payload,
    ...(vertebraPayload
      ? {
          vertebra: arrayMergeKey({
            key: "name",
            left: vertebra,
            right: vertebraPayload
          })
        }
      : {}),
    ...(segmentsPayload
      ? {
          segments: arrayMergeKey({
            key: "name",
            left: segments,
            right: segmentsPayload
          })
        }
      : {}),
    ...(discsPayload ? { discs: { ...discs, ...discsPayload } } : {})
  };
};

export default async ({ socket, action, adapter }) => {
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
