import { adapter } from "../server";

export default async ({ action: { studyUID, type, ...props } = {} }) => {
  const {
    projects: { setProject = () => {} } = {},
    renders: { setRender = () => {} } = {}
  } = adapter;

  const { status } = props;

  if (status === "Done") {
    await setRender({ p: studyUID, rendering: false, uniqueID: `${studyUID}`});
    await setRender({ p: studyUID, debug: true , rendering: false, uniqueID: `${studyUID}-debug`});
    await setRender({ p: studyUID, anonymous: true , rendering: false, uniqueID: `${studyUID}-anonymous`});
    await setRender({ p: studyUID, template: "spineImages" , rendering: false, uniqueID: `${studyUID}-template-spineImages`});
    await setRender({ p: studyUID, template: "spineImages", anonymous: true , rendering: false, uniqueID: `${studyUID}-template-spineImages-anonymous`});
    await setRender({ p: studyUID, template: "spineComparison" , rendering: false, uniqueID: `${studyUID}-template-spineComparison`});
  }

  setProject({ studyUID, props });
};
