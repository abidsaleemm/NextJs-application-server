import azure from "./azure";
import local from "./local";
import dicom from "./dicom";
import { compose } from "ramda";

export default () => {
  const enhancer =
    process.env.LOCAL !== undefined
      ? local()
      : azure({
          storageAccount: process.env.STORAGE_ACCOUNT,
          storageKey: process.env.STORAGE_ACCOUNT_KEY
        });

  return compose(dicom)(enhancer);
};
