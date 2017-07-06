import azure from "azure-storage";
import readFile from './helpers/readFile';
import queryTable from './helpers/queryTable';
import parseRaw from '../parseRaw';

export default async ({ seriesUID }) => {
    const images = await queryTable({
        query: new azure.TableQuery()
            .select(['path', 'imageNumber'])
            .where('seriesUID eq ?', seriesUID),
        tableName: `${process.env.APPSETTING_CONTAINER}Images`,
    });

    return await Promise.all(
        images
            .sort((a, b) => a.imageNumber - b.imageNumber)
            .map(async ({ path }) => parseRaw(await readFile({ path }))))
};