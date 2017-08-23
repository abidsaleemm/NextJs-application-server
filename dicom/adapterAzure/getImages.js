import azure from "azure-storage";
import readFile from './helpers/readFile';
import queryTable from './helpers/queryTable';
import parseRaw from '../parseRaw';
import { tablePrefix } from './';
import pullBlob from './helpers/pullBlob';

export default async ({ seriesUID }) => {
    const images = await queryTable({
        query: new azure.TableQuery()
            .select(['instanceUID', 'imageNumber'])
            .where('seriesUID eq ?', seriesUID),
        tableName: `${tablePrefix}Images`,
    });

    return await Promise.all(
        images
            .sort((a, b) => a.imageNumber - b.imageNumber)
            .map(async ({ instanceUID }) => parseRaw(await pullBlob({ instanceUID }))))
};