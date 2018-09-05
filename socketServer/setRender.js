import { adapter } from "../server";

export default async ({
  action: { studyUID, anonymous = false, debug = false } = {}
}) => {
  const { renders: { setRender = () => {} } = {} } = adapter;

  await setRender({
    studyUID,
    debug,
    anonymous,
    rendering: false
  });
};
