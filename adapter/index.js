import azure from "./azure";
import local from "./local";
import dicom from "./dicom";

export default () => {
  const enhancer =
    process.env.LOCAL !== undefined ? local() : azure();

  return dicom(enhancer);
};
