import azure from "azure-storage";
import queryTable from "../../helpers/azure/queryTable";
import { tablePrefix } from "./";
import pullBlob from "./helpers/pullBlob";
import { tableService } from "./";

export default async ({ instanceUID }) => {
  const imageData = await pullBlob({
    container: `${process.env.DICOM_CONTAINER}-cache`,
    blobName: instanceUID
  });

  // TODO Kinda Hacked should use Array methods
  const pixelData = new Array(imageData.length / 2)
    .fill(0)
    .map((v, i) => imageData[i*2] + (imageData[(i*2)+1] << 8));

  return pixelData;
};
