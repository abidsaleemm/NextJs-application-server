import { adapter } from "../server";

export default async ({
  action: { studyUID, template, anonymous = false, debug = false } = {}
}) => {
  const { renders: { setRenderQueue = () => {} } = {} } = adapter;

  await setRenderQueue({
    studyUID,
    template,
    debug,
    anonymous
  });
};
