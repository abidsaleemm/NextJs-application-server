import { adapter } from "../server";

export default async ({
  action: { studyUID, type, ...props } = {}
}) => {
  
  const { projects: { setProject = () => {} } = {}, renders: { setRender = () => {} } = {} } = adapter;
  if(props.status === "Done")
  {
    await setRender({ p: studyUID });
    await setRender({ p: studyUID, debug: true });
    await setRender({ p: studyUID, anonymous: true });
    await setRender({ p: studyUID, template: "spineImages" });
    await setRender({ p: studyUID, template: "spineImages", anonymouse: true });
    await setRender({ p: studyUID, template: "spineComparison" });
  }
  else  
    setProject({ studyUID, props });
};
