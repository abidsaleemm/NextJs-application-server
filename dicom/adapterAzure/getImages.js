import azure from "azure-storage";
import queryTable from "./helpers/queryTable";
import { tablePrefix } from "./";

export default async ({ seriesUID }) => {
  const images = await queryTable({
    query: new azure.TableQuery()
      .select(["instanceUID", "imageNumber"])
      .where("seriesUID eq ?", seriesUID),
    tableName: `${tablePrefix}Images`
  });

  return images
    .sort((a, b) => a.imageNumber - b.imageNumber)
    .map(({ instanceUID }) => ({ instanceUID }));
};
