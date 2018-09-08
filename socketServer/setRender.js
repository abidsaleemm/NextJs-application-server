import { adapter } from "../server";

export default async ({
  action: { studyUID, template, anonymous, debug } = {}
}) => {
  const { renders: { setRenderQueue = () => {} } = {} } = adapter;

  await setRenderQueue({
    studyUID,
    template,
    debug,
    anonymous
  });
};
