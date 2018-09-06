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
    // await setRender({ p: studyUID });
    // await setRender({ p: studyUID, debug: true });
    // await setRender({ p: studyUID, anonymous: true });
    // await setRender({ p: studyUID, template: "spineImages" });
    // await setRender({ p: studyUID, template: "spineImages", anonymous: true });
    // await setRender({ p: studyUID, template: "spineComparison" });
  }

  setProject({ studyUID, props });
};
