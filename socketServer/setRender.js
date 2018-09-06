import { adapter } from "../server";

export default async ({
  action: { studyUID, anonymous = false, debug = false } = {}
}) => {
  const { renders: { setRenderQueue = () => {} } = {} } = adapter;

  await setRenderQueue({
    studyUID,
    debug,
    anonymous
  });
};
