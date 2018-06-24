import azure from "./azure";
import local from "./local";
import dicom from "./dicom";
import video from "./video";
import { compose } from "ramda";

export default () => {
  const enhancer =
    process.env.LOCAL !== undefined ? local() : azure();

  return compose(
    dicom,
    video
  )(enhancer);
};
