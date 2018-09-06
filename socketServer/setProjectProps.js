import { adapter } from "../server";

export default async ({ action: { studyUID, type, ...props } = {} }) => {
  const {
    projects: { setProject = () => {} } = {},
    renders: { setRenderQueue = () => {} } = {}
  } = adapter;

  const { status } = props;

  if (status === "Done") {
    setRenderQueue({
      studyUID,
      template: "spine"
    });

    setRenderQueue({
      studyUID,
      template: "spineImages"
    });
  }

  setProject({ studyUID, props });
};
