import azure from "azure-storage";
import queryTable from "../../helpers/azure/queryTable";
import { tablePrefix } from "./";
import pullBlob from "./helpers/pullBlob";
import { tableService } from "./";

function swap16(val) {
  return ((val & 0xff) << 8) | ((val >> 8) & 0xff);
}

export default async ({ instanceUID }) => {
  const imageData = await pullBlob({
    container: `${process.env.CONTAINER_NAME}-cache`,
    blobName: instanceUID
  });

  // TODO Kinda Hacked should use Array methods
  const pixelData = new Array(imageData.length / 2)
    .fill(0)
    .map((v, i) => imageData[i * 2] + (imageData[i * 2 + 1] << 8))
    .map((v, i) => (v & 0x8000 ? 0 : v)); // TODO If last bit set then clear.  This will have to be done on indexer so it's much cleaner

  return pixelData;
};
