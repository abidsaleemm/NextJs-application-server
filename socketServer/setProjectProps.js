import { adapter } from "../server";

export default async ({ action: { studyUID, type, ...props } = {} }) => {
  const {
    projects: { setProject = () => {} } = {},
    renders: { setRender = () => {} } = {}
  } = adapter;

  const { status } = props;

  if (status === "Done") {
    // TODO Will need to add extra template for images
    // A single template should also be passed on
    // Also if there is alrady an existing render thats the
    // same don't add to queue
    await setRender({ studyUID });
  }

  setProject({ studyUID, props });
};
