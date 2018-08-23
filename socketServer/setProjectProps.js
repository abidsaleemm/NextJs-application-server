import { adapter } from "../server";

export default async ({
  action: { studyUID, type, ...props } = {}
}) => {
  
  const { projects: { setProject = () => {} } = {}, renders: { setRender = () => {} } = {} } = adapter;
  if(props.status === "Done")
    setRender({ studyUID });
  else  
    setProject({ studyUID, props });
};
