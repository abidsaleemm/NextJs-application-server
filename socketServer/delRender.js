import { adapter } from "../server";

export default async ({
  action: { studyUID, template, anonymous, debug } = {}
}) => {
  const { renders: { delRenderQueue = () => {} } = {} } = adapter;

  await delRenderQueue({
    studyUID,
    template,
    debug,
    anonymous
  });
};
