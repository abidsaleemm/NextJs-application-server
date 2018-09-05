import { adapter } from "../server";

export default async ({ action: { studyUID, type, ...props } = {} }) => {
  const {
    projects: { setProject = () => {} } = {},
    renders: { setRender = () => {} } = {}
  } = adapter;

  const { status } = props;

  if (status === "Done") {
    setRender({ studyUID, rendering: false });
    setRender({
      studyUID,
      template: "spineImages",
      rendering: false
    });
  }

  setProject({ studyUID, props });
};
